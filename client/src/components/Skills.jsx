import { useEffect, useRef } from 'react'
import '../styles/Skills.css'

export default function Skills({ expertise }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skill-visible')
          } else {
            entry.target.classList.remove('skill-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.skills-head, .exp-counter')
    items?.forEach(el => observer.observe(el))

    const handleScroll = () => {
      const skiItems = sectionRef.current?.querySelectorAll('.ski-item')
      if (!skiItems) return

      const centerY = window.innerHeight / 2

      skiItems.forEach(item => {
        const rect = item.getBoundingClientRect()
        const itemCenterY = rect.top + rect.height / 2
        const dist = Math.abs(centerY - itemCenterY)
        
        const maxDist = 250 // Pixels from center before text scales down
        let scale = 1
        let opacity = 0.3
        
        if (dist < maxDist) {
           const factor = 1 - (dist / maxDist)
           const easeFactor = Math.sin(factor * Math.PI / 2) // Smooth scaling curve
           scale = 1 + (easeFactor * 0.8) // Max scale 1.8x at dead center
           opacity = 0.3 + (easeFactor * 0.7) // Max opacity 1.0
        }
        
        item.style.transform = `scale(${scale})`
        item.style.opacity = opacity
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize positions immediately

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="skills-section" ref={sectionRef} id="skills">
      {/* Experience counter */}
      <div className="exp-counter">
        <span className="exp-number">3</span>
        <span className="exp-text">YEARS IN TECH</span>
      </div>

      <h2 className="skills-head">
        {expertise.heading.split('').map((char, i) => (
          <span 
            key={i} 
            className="skill-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="skills-layout">
        {/* Left stickers */}
        <div className="sticker-col sticker-left">
          <Sticker label="⚛" bg="#20232a" color="#61DAFB" rotate={-5} />
          <Sticker label="Py" bg="#1a1a2e" color="#FFD43B" rotate={4} />
          <Sticker label="🐳" bg="#0db7ed" color="#fff" rotate={-8} />
        </div>

        {/* Skill list */}
        <div className="ski-list">
          {expertise.skills.map((s, i) => (
            <span
              key={i}
              className={`ski-item ski-${s.weight}`}
            >
              {s.name}
            </span>
          ))}
        </div>

        {/* Right stickers */}
        <div className="sticker-col sticker-right">
          <Sticker label="JS" bg="#333" color="#68A063" rotate={5} />
          <Sticker label="TF" bg="#1a1a1a" color="#FF6F00" rotate={-6} />
        </div>
      </div>


    </section>
  )
}

function Sticker({ label, bg, color, rotate }) {
  return (
    <div className="sticker" style={{ transform: `rotate(${rotate}deg)` }}>
      <svg width="68" height="68" viewBox="0 0 68 68">
        <rect x="4" y="4" width="60" height="60" rx="8" fill={bg} stroke="#444" strokeWidth="2" strokeDasharray="4,3" />
        <text x="34" y="42" textAnchor="middle" fill={color} fontSize="24" fontWeight="bold" fontFamily="monospace">
          {label}
        </text>
      </svg>
    </div>
  )
}


