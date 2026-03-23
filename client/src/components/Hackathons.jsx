import { useEffect, useRef } from 'react'
import '../styles/Hackathons.css'

export default function Hackathons({ hackathons }) {
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
    const items = sectionRef.current?.querySelectorAll('.hackathon-card')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [hackathons])

  if (!hackathons || hackathons.length === 0) return null

  return (
    <section className="hackathons-section" ref={sectionRef} id="hackathons">
      <h2 className="section-title" ref={titleRef}>
        {"HACKATHONS".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="hackathons-timeline">
        {hackathons.map((hackathon, i) => (
          <div
            key={hackathon.id}
            className="hackathon-card reveal-el"
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <div className="hack-trophy">
              {hackathon.status === 'Winner' ? (
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M12 8H28V12H32V16H28V24H24V28H16V24H12V16H8V12H12V8H12Z" fill="#FBC02D" stroke="#000" strokeWidth="2"/>
                  <rect x="16" y="32" width="8" height="4" fill="#000" />
                  <rect x="12" y="36" width="16" height="4" fill="#000" />
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="10" fill="#9E9E9E" stroke="#000" strokeWidth="2" />
                  <path d="M16 10V22M10 16H22" stroke="#000" strokeWidth="2" strokeLinecap="square" />
                </svg>
              )}
            </div>
            <div className="hack-content">
              <h3 className="hack-title">{hackathon.name}</h3>
              <p className="hack-project">Built: <strong>{hackathon.project}</strong></p>
              <div className="hack-meta">
                <span className={`hack-status ${hackathon.status.toLowerCase()}`}>{hackathon.status}</span>
                <span className="hack-date">{hackathon.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
