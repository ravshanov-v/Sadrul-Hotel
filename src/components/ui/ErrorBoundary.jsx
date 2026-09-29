import { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          background: "#f8f7f4",
          color: "#333",
          padding: "2rem",
          textAlign: "center",
        }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 64, height: 64, marginBottom: 16 }}>
            <path d="M2 20h20M4 20V8l4 3 4-6 4 6 4-3v12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2v2M12 6v2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: "#0a1128" }}>
            Xatolik yuz berdi
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6b7280", maxWidth: 420, marginBottom: 24 }}>
            Sahifani yuklashda muammo yuz berdi. Iltimos, sahifani yangilang yoki bosh sahifaga qayting.
          </p>
          {this.state.error && (
            <pre style={{
              maxWidth: 600,
              fontSize: "0.75rem",
              color: "#e74c3c",
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "left",
              maxHeight: 200,
            }}>
              {this.state.error.message || String(this.state.error)}
            </pre>
          )}
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = "/" }}
            style={{
              padding: "10px 28px",
              borderRadius: 12,
              border: "none",
              background: "#D4AF37",
              color: "#0a1128",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
