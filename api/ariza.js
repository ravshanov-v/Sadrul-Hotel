const TELEGRAM_API = process.env.TELEGRAM_API_URL || "https://api.telegram.org";

const MAX_FIELD = 500;
const MAX_BODY_BYTES = 16384;
const PHONE_RE = /^[+()\d\s-]{6,32}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 5;
const RATE_MAX_KEYS = 5000;

const rateHits = new Map();

function clean(value, max = MAX_FIELD) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function send(res, status, payload, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.end(JSON.stringify(payload));
}

function clientKey(req) {
  const fwd = req.headers?.["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : typeof fwd === "string" ? fwd.split(",")[0] : "";
  return (first || req.socket?.remoteAddress || "unknown").trim();
}

function prune(now) {
  for (const [key, entry] of rateHits) {
    if (now > entry.resetAt) rateHits.delete(key);
  }
  while (rateHits.size > RATE_MAX_KEYS) {
    rateHits.delete(rateHits.keys().next().value);
  }
}

function rateLimit(key) {
  const now = Date.now();
  const entry = rateHits.get(key);

  if (!entry || now > entry.resetAt) {
    if (rateHits.size >= RATE_MAX_KEYS) prune(now);
    rateHits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }

  entry.count += 1;
  if (entry.count > RATE_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  }
  return null;
}

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "method_not_allowed" });
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    return send(res, 500, { ok: false, error: "not_configured" });
  }

  const declaredLength = Number(req.headers?.["content-length"] || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return send(res, 413, { ok: false, error: "payload_too_large" });
  }

  const key = clientKey(req);
  const retryAfter = rateLimit(key);

  if (retryAfter !== null) {
    return send(
      res,
      429,
      { ok: false, error: "too_many_requests" },
      { "Retry-After": String(retryAfter), "X-RateLimit-Remaining": "0" }
    );
  }

  const { fullName, phone, email, position, coverLetter, labels, website } = req.body ?? {};

  if (clean(website, 200)) {
    return send(res, 200, { ok: true });
  }

  const data = {
    fullName: clean(fullName, 120),
    phone: clean(phone, 32),
    email: clean(email, 160),
    position: clean(position, 160),
    coverLetter: clean(coverLetter, 4000),
  };

  if (!data.fullName) return send(res, 400, { ok: false, error: "full_name" });
  if (!PHONE_RE.test(data.phone)) return send(res, 400, { ok: false, error: "phone" });
  if (!EMAIL_RE.test(data.email)) return send(res, 400, { ok: false, error: "email" });

  const l = {
    title: clean(labels?.title, 80) || "New Application",
    name: clean(labels?.name, 80) || "Name",
    phone: clean(labels?.phone, 80) || "Phone",
    email: clean(labels?.email, 80) || "Email",
    position: clean(labels?.position, 80) || "Position",
    letter: clean(labels?.letter, 80) || "Letter",
  };

  const text = [
    `📩 ${l.title}`,
    "",
    `${l.name}: ${data.fullName}`,
    `${l.phone}: ${data.phone}`,
    `${l.email}: ${data.email}`,
    `${l.position}: ${data.position}`,
    "",
    `${l.letter}:`,
    data.coverLetter || "-",
  ].join("\n");

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      return send(res, 502, { ok: false, error: "telegram_failed" });
    }

    return send(res, 200, { ok: true });
  } catch {
    return send(res, 502, { ok: false, error: "network" });
  }
}
