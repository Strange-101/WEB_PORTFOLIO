import { useEffect, useRef } from 'react'
import '../styles/CompetitiveProgramming.css'

export default function CompetitiveProgramming({ stats }) {
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
    const items = sectionRef.current?.querySelectorAll('.cp-card')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [stats])

  if (!stats || stats.length === 0) return null

  return (
    <section className="cp-section" ref={sectionRef} id="cp">
      <h2 className="section-title" ref={titleRef}>
        {"CP STATS".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="cp-grid">
        {stats.map((stat, i) => (
          <div
            key={stat.id || stat.platform}
            className={`cp-card reveal-el ${stat.platform.toLowerCase()}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="cp-card-inner">
              {stat.link ? (
                <a href={stat.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <h3 className="cp-platform" style={{ margin: 0, marginRight: '8px' }}>{stat.platform}</h3>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ opacity: 0.7 }}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              ) : (
                <h3 className="cp-platform">{stat.platform}</h3>
              )}
              <div className="cp-problems">
                <span className="cp-label">SOLVED</span>
                <span className="cp-val">{stat.problemsSolved}</span>
              </div>
              <div className="cp-rank">
                <span className="cp-label">RANK</span>
                <span className="cp-val rank-val">{stat.rank}</span>
              </div>
              {stat.accuracy && (
                <div className="cp-accuracy">
                  <span className="cp-label">ACCURACY</span>
                  <span className="cp-val">{stat.accuracy}</span>
                </div>
              )}
            </div>
            {/* Decorative pixel art bar driven by problems solved instead of rating */}
            <div className="cp-deco-bar" style={{ width: `${Math.max(2, Math.min(100, (stat.problemsSolved / 250) * 100))}%` }} />
          </div>
        ))}
      </div>
    </section>
  )
}
