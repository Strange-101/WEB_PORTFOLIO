import { useState, useEffect, useRef } from 'react'
import '../styles/Footer.css'

export default function Footer({ personal }) {
  const [time, setTime] = useState('')
  const [contactType, setContactType] = useState('collaborate')
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

          {/* Contact Form */}
          <form className="footer-contact-form footer-reveal" style={{ transitionDelay: '0.4s' }} action={`mailto:${personal.email}`} method="post" encType="text/plain">
            <div className="form-toggle">
              <label>
                <input type="radio" name="Subject" value="Project Collaboration" checked={contactType === 'collaborate'} onChange={() => setContactType('collaborate')} className="sr-only"/>
                <span className="pill-btn form-pill">LET'S COLLABORATE</span>
              </label>
              <label>
                <input type="radio" name="Subject" value="Job Inquiry" checked={contactType === 'talk'} onChange={() => setContactType('talk')} className="sr-only" />
                <span className="pill-btn form-pill">LET'S TALK</span>
              </label>
            </div>
            <div className="form-inputs">
              <input type="text" name="Name" placeholder="YOUR NAME" required className="form-input" />
              
              {contactType === 'collaborate' ? (
                <>
                  <input type="text" name="Timeline_Budget" placeholder="TIMELINE / BUDGET (OPTIONAL)" className="form-input" />
                  <textarea name="Project_Details" placeholder="WHAT ARE WE BUILDING TOGETHER?" required rows="3" className="form-input"></textarea>
                </>
              ) : (
                <>
                  <input type="text" name="Company" placeholder="COMPANY NAME" required className="form-input" />
                  <input type="text" name="Role" placeholder="ROLE / POSITION" required className="form-input" />
                  <textarea name="Message" placeholder="TELL ME ABOUT THE OPPORTUNITY" required rows="3" className="form-input"></textarea>
                </>
              )}
              
              <button type="submit" className="pill-btn submit-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 9L15 2L9 15L7 11L2 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                SEND TRANSMISSION
              </button>
            </div>
          </form>
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
