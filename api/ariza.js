const TELEGRAM_API = process.env.TELEGRAM_API_URL || "https://api.telegram.org";

const MAX_FIELD = 500;
const PHONE_RE = /^[+()\d\s-]{6,32}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value, max = MAX_FIELD) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
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

  const { fullName, phone, email, position, coverLetter, labels } = req.body ?? {};

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
