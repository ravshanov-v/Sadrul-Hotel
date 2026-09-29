const BASE = { xmlns: "http://www.w3.org/2000/svg" }

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...BASE} {...props}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CheckCircleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function XCircleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EnvelopeIcon({ stroke = "#D4AF37", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={stroke} strokeWidth="1.5" />
      <path d="M22 6L12 13L2 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...BASE} {...props}>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
