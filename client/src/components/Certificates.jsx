import { useEffect, useRef } from 'react'
import '../styles/Certificates.css'

export default function Certificates({ certificates }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

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

    if (titleRef.current) observer.observe(titleRef.current)
    const cards = sectionRef.current?.querySelectorAll('.cert-card')
    cards?.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [certificates])

  if (!certificates || certificates.length === 0) return null

  return (
    <section className="certificates-section" ref={sectionRef} id="certificates">
      <h2 className="section-title" ref={titleRef}>
        {"CERTIFICATES".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="cert-grid">
        {certificates.map((cert, i) => (
          <div
            key={cert.id}
            className="cert-card reveal-el"
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="cert-img-wrap">
              <div className="dither-overlay" />
              {cert.image ? (
                <div className="cert-bg" style={{ backgroundImage: `url(${cert.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1 }} />
              ) : (
                <>
                  <div className="cert-bg" />
                  <div className="cert-icon">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 4L24 14L35 15L26 23L29 34L20 28L11 34L14 23L5 15L16 14L20 4Z" fill="#FBC02D" stroke="#000" strokeWidth="2"/>
                    </svg>
                  </div>
                </>
              )}
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{cert.title || cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-date">{cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
