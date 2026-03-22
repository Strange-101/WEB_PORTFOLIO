import { useEffect, useRef } from 'react'
import '../styles/About.css'

export default function About({ about }) {
  const sectionRef = useRef(null)

  const textRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return
      const rect = textRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      
      const start = vh * 0.85
      const end = vh * 0.35
      
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      
      const words = textRef.current.querySelectorAll('.word')
      if (!words.length) return
      
      words.forEach((word, i) => {
        const threshold = i / words.length
        if (progress > threshold) {
          word.classList.add('highlighted')
        } else {
          word.classList.remove('highlighted')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="about" ref={sectionRef} id="about">
      {/* Pixel cloud landscape */}
      <div className="cloud-landscape">
        {/* Sky clouds - multiple rows */}
        <PixelCloud className="pxc pxc-1" size={160} />
        <PixelCloud className="pxc pxc-2" size={120} />
        <PixelCloud className="pxc pxc-3" size={200} />
        <PixelCloud className="pxc pxc-4" size={100} />
        <PixelCloud className="pxc pxc-5" size={180} />
        <PixelCloud className="pxc pxc-6" size={140} />
        <PixelCloud className="pxc pxc-7" size={110} />
        <PixelCloud className="pxc pxc-8" size={170} />
        <PixelCloud className="pxc pxc-9" size={90} />
        <PixelCloud className="pxc pxc-10" size={150} />
        <PixelCloud className="pxc pxc-11" size={130} />
        <PixelCloud className="pxc pxc-12" size={160} />

        {/* Mountain/hill horizon line */}
        <div className="horizon-line">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="horizon-svg">
            <path
              d="M0,60 Q40,30 80,55 Q120,20 160,50 Q200,10 240,45 Q280,25 320,55 Q360,15 400,50 Q440,30 480,55 Q520,20 560,48 Q600,35 640,55 Q680,18 720,50 Q760,28 800,52 Q840,15 880,48 Q920,30 960,55 Q1000,20 1040,50 Q1080,35 1120,52 Q1160,18 1200,48 Q1240,30 1280,55 Q1320,22 1360,50 Q1400,35 1440,55 L1440,80 L0,80 Z"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M0,65 Q60,50 120,62 Q180,42 240,58 Q300,48 360,62 Q420,38 480,58 Q540,50 600,62 Q660,42 720,58 Q780,50 840,60 Q900,44 960,60 Q1020,48 1080,62 Q1140,40 1200,58 Q1260,50 1320,62 Q1380,46 1440,60 L1440,80 L0,80 Z"
              fill="none"
              stroke="#444"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* Statement */}
      <div className="about-text" ref={textRef}>
        {about.statement.map((line, i) => (
          <span
            key={i}
            className={`about-line about-${line.weight}`}
          >
            {line.text.split(' ').map((word, j) => (
              <span key={`${i}-${j}`} className="word">
                {word}{' '}
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  )
}

function PixelCloud({ className, size }) {
  const s = size
  const bw = Math.max(1.5, s * 0.015)
  return (
    <div className={className}>
      <svg width={s} height={s * 0.5} viewBox={`0 0 ${s} ${s * 0.5}`} style={{ imageRendering: 'auto' }}>
        {/* Main cloud body */}
        <rect x={s * 0.1} y={s * 0.32} width={s * 0.8} height={s * 0.15} rx="2" fill="#fff" stroke="#333" strokeWidth={bw} />
        {/* Bumps */}
        <rect x={s * 0.15} y={s * 0.22} width={s * 0.18} height={s * 0.18} rx="2" fill="#fff" stroke="#333" strokeWidth={bw} />
        <rect x={s * 0.3} y={s * 0.12} width={s * 0.22} height={s * 0.28} rx="2" fill="#fff" stroke="#333" strokeWidth={bw} />
        <rect x={s * 0.5} y={s * 0.08} width={s * 0.2} height={s * 0.32} rx="2" fill="#fff" stroke="#333" strokeWidth={bw} />
        <rect x={s * 0.65} y={s * 0.18} width={s * 0.16} height={s * 0.22} rx="2" fill="#fff" stroke="#333" strokeWidth={bw} />
        {/* Inner fill to cover stroke overlaps */}
        <rect x={s * 0.15} y={s * 0.25} width={s * 0.7} height={s * 0.2} fill="#fff" />
      </svg>
    </div>
  )
}
