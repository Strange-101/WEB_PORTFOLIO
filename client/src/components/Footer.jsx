import { useState, useEffect, useRef } from 'react'
import '../styles/Footer.css'

export default function Footer({ personal }) {
  const [time, setTime] = useState('')
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  // Live clock
  useEffect(() => {
    function tick() {
      const now = new Date()
      const h = now.getHours() % 12 || 12
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const ap = now.getHours() >= 12 ? 'PM' : 'AM'
      setTime(`${h} : ${m} : ${s} ${ap}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Footer pixel wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, t = 0
    const colors = ['#4FC3F7', '#E53935', '#FFD54F', '#66BB6A', '#BB86FC', '#FF7043']

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const dot = 4, sp = 6
      for (let x = 0; x < w; x += sp) {
        for (let y = 0; y < h; y += sp) {
          const wave = Math.sin(x * 0.01 + t * 0.8) * 18 + Math.sin(x * 0.02 + t * 0.5) * 10
          const dist = Math.abs(y - (h * 0.5 + wave))
          if (dist < 22) {
            ctx.globalAlpha = (1 - dist / 22) * 0.55
            ctx.fillStyle = colors[Math.floor((x + t * 50) / 20) % colors.length]
            ctx.fillRect(x, y, dot, dot)
          }
        }
      }
      ctx.globalAlpha = 1
      t += 0.02
      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Footer animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          } else {
            entry.target.classList.remove('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('#footer .footer-big, #footer .footer-reveal')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="footer glow-edges" id="footer">
      {/* Pixel wave transition */}
      <div className="footer-wave">
        <canvas ref={canvasRef} className="footer-canvas" />
      </div>

      <div className="footer-inner">
        {/* Decorative pixel stars */}
        <div className="footer-stars">
          <PixelStar className="fstar fstar-1" size={60} />
          <PixelStar className="fstar fstar-2" size={45} />
        </div>

        {/* CTA */}
        <div className="footer-cta">
          <h2 className="footer-big">
            {"LET'S BUILD".split('').map((char, i) => (
              <span key={i} className="footer-char" style={{ transitionDelay: `${i * 0.04}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <h2 className="footer-big footer-big-indent">
            {"TOGETHER".split('').map((char, i) => (
              <span key={i} className="footer-char" style={{ transitionDelay: `${(i + 11) * 0.04}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          {/* Pill buttons */}
          <div className="footer-buttons">
            <a href={`mailto:${personal.email}`} className="pill-btn footer-reveal" style={{ transitionDelay: '0.4s' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="5" y1="9" x2="13" y2="9" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="9" y1="5" x2="9" y2="13" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              START A PROJECT
            </a>
            <a href={`mailto:${personal.email}`} className="pill-btn footer-reveal" style={{ transitionDelay: '0.5s' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              SAY HI
            </a>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="footer-meta footer-reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="footer-meta-left">
            <p className="footer-label">{personal.location}</p>
            <p className="footer-label">{time}</p>
          </div>
          <div className="footer-meta-right">
            <p className="footer-label">LAST UPDATED</p>
            <p className="footer-label">{personal.lastUpdated}</p>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links footer-reveal" style={{ transitionDelay: '0.3s' }}>
          <a href={`mailto:${personal.email}`} className="footer-link">{personal.email.toUpperCase()}</a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a>
        </div>
      </div>
    </footer>
  )
}

function PixelStar({ className, size }) {
  return (
    <div className={className}>
      <svg width={size} height={size} viewBox="0 0 60 60" style={{ imageRendering: 'pixelated' }}>
        <polygon
          points="30,2 36,22 56,22 40,34 46,54 30,42 14,54 20,34 4,22 24,22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Inner fill with colorful dots */}
        <circle cx="30" cy="28" r="2" fill="#E53935"/>
        <circle cx="26" cy="32" r="1.5" fill="#4FC3F7"/>
        <circle cx="34" cy="32" r="1.5" fill="#FFD54F"/>
        <circle cx="30" cy="36" r="1.5" fill="#66BB6A"/>
      </svg>
    </div>
  )
}
