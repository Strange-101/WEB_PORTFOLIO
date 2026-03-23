import { useState, useEffect, useRef } from 'react'
import '../styles/Hobbies.css'
import StravaStats from './StravaStats'

export default function Hobbies({ hobbies }) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!isOpen || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current.querySelectorAll('.hobby-card')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [isOpen])

  if (!hobbies) return null

  return (
    <section className="hobbies-section" ref={sectionRef}>
      {!isOpen ? (
        <div className="hobbies-unlock-container">
          <button 
            className="unlock-btn" 
            onClick={() => setIsOpen(true)}
          >
            <span className="blink-arrow">▶</span> SECRET STAGE: VIEW HOBBIES
          </button>
        </div>
      ) : (
        <div className="hobbies-content">
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖ CLOSE STAGE</button>
          
          <h2 className="section-title">
            {"HOBBIES".split('').map((char, i) => (
              <span 
                key={i} 
                className="title-char revealed" 
                style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          <StravaStats stats={hobbies.strava} />

          <div className="hobbies-grid">
            {/* Basketball */}
            <div className="hobby-card bball-card reveal-el" style={{ transitionDelay: '0.2s' }}>
              <div className="hobby-icon">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="16" fill="#FF9800" stroke="#000" strokeWidth="2"/>
                  <path d="M24 8V40M8 24H40" stroke="#000" strokeWidth="2"/>
                  <path d="M14 14 Q24 24 14 34 M34 14 Q24 24 34 34" stroke="#000" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="hobby-title">BASKETBALL</h3>
              <ul className="hobby-stats">
                <li><span>POSITION:</span> {hobbies.basketball.position}</li>
                <li><span>FAV PLAYER:</span> {hobbies.basketball.player}</li>
                <li><span>FAV TEAM:</span> {hobbies.basketball.team}</li>
              </ul>
            </div>

            {/* F1 */}
            <div className="hobby-card f1-card reveal-el" style={{ transitionDelay: '0.3s' }}>
              <div className="hobby-icon">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <path d="M6 30H42L36 18H24L20 18L16 26H12L6 30Z" fill="#E53935" stroke="#000" strokeWidth="2"/>
                  <circle cx="14" cy="34" r="6" fill="#222"/>
                  <circle cx="34" cy="34" r="6" fill="#222"/>
                  <rect x="24" y="22" width="6" height="4" fill="#E0E0E0"/>
                </svg>
              </div>
              <h3 className="hobby-title">FORMULA 1</h3>
              <ul className="hobby-stats">
                <li><span>FAV TEAM:</span> {hobbies.f1.team}</li>
                <li><span>DRIVER:</span> {hobbies.f1.driver}</li>
                <li><span>MEMORABLE:</span> {hobbies.f1.memorableRace}</li>
              </ul>
            </div>

            {/* WRC */}
            <div className="hobby-card wrc-card reveal-el" style={{ transitionDelay: '0.4s' }}>
              <div className="hobby-icon">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <path d="M8 32V24L16 16H32L40 24V32H8Z" fill="#1E88E5" stroke="#000" strokeWidth="2"/>
                  <circle cx="16" cy="32" r="6" fill="#222"/>
                  <circle cx="32" cy="32" r="6" fill="#222"/>
                  <rect x="18" y="18" width="12" height="6" fill="#81D4FA" stroke="#000" strokeWidth="1"/>
                </svg>
              </div>
              <h3 className="hobby-title">WRC</h3>
              <ul className="hobby-stats">
                <li><span>FAV TEAM:</span> {hobbies.wrc.team}</li>
                <li><span>FAV CAR:</span> {hobbies.wrc.car}</li>
                <li><span>DREAM RALLY:</span> {hobbies.wrc.dreamRally}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
