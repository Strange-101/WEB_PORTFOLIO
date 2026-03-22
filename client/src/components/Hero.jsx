import { useEffect, useRef } from 'react'
import heroImg from '../assets/hero.png'
import '../styles/Hero.css'

export default function Hero({ personal }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w, h, time = 0
    const particles = []
    const colors = ['#4FC3F7', '#E53935', '#FFD54F', '#66BB6A', '#BB86FC', '#FF7043', '#42A5F5']

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      initParticles()
    }

    function initParticles() {
      particles.length = 0
      const count = Math.floor((w * h) / 600)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          offset: Math.random() * Math.PI * 2,
        })
      }
    }

    function drawWaves() {
      for (let i = 0; i < 7; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${0.015 + i * 0.006})`
        ctx.lineWidth = 1.5
        for (let x = 0; x <= w; x += 3) {
          const y = h * 0.25 +
            Math.sin(x * 0.003 + time * 0.4 + i * 1.2) * (70 + i * 25) +
            Math.sin(x * 0.007 + time * 0.25 + i) * (35 + i * 12) +
            i * (h * 0.1)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const wave = Math.sin(p.x * 0.005 + time * 0.5 + p.offset) * 30
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.35 + Math.sin(time + p.offset) * 0.2
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y + wave), p.size, p.size)
      }
      ctx.globalAlpha = 1
    }

    function drawEdgeGlow() {
      // Left glow
      const lg = ctx.createLinearGradient(0, 0, 120, 0)
      lg.addColorStop(0, 'rgba(60,120,255,0.12)')
      lg.addColorStop(1, 'transparent')
      ctx.fillStyle = lg
      ctx.fillRect(0, 0, 120, h)

      // Right glow
      const rg = ctx.createLinearGradient(w, 0, w - 120, 0)
      rg.addColorStop(0, 'rgba(60,120,255,0.12)')
      rg.addColorStop(1, 'transparent')
      ctx.fillStyle = rg
      ctx.fillRect(w - 120, 0, 120, h)
    }

    function animate() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      drawWaves()
      drawParticles()
      drawEdgeGlow()
      time += 0.01
      animRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    // Scroll parallax transition
    const handleScroll = () => {
      if (!contentRef.current) return
      const scrollY = window.scrollY
      const vh = window.innerHeight

      const opacity = Math.max(0, 1 - scrollY / (vh * 0.7))
      const translateY = scrollY * 0.3

      contentRef.current.style.opacity = opacity
      contentRef.current.style.transform = `translateY(${translateY}px)`
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <section className="hero glow-edges" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content" ref={contentRef}>
        {/* Pixel speech bubble */}
        <div className="speech-bubble-wrap">
          <div className="speech-bubble">
            <span>{personal.tagline}</span>
          </div>
        </div>

        {/* Name with character in middle */}
        <h1 className="hero-name">
          <span className="name-first">{personal.name.first}</span>
          <img
            src={heroImg}
            alt="Pixel Character"
            className="pixel-character-img"
          />
          <span className="name-last">{personal.name.last}</span>


        </h1>

      </div>

      {/* Bottom info */}
      <div className="hero-bottom">
        <div className="hero-bottom-left">
          <p className="hero-info">{personal.role.split('&')[0].trim()}</p>
          <p className="hero-info">{personal.role.includes('&') ? '& ' + personal.role.split('&')[1].trim() : ''}</p>
        </div>
        
        <div className="hero-bottom-center">
          <div 
            className="pixel-arrow"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg width="24" height="14" viewBox="0 0 14 8" fill="#fff">
              <path d="M0,0 h14 v2 h-2 v2 h-2 v2 h-2 v2 h-2 v-2 h-2 v-2 h-2 v-2 h-2 v-2 Z" />
            </svg>
          </div>
        </div>

        <div className="hero-bottom-right">
          <p className="hero-info">{personal.skills.join(', ')}</p>
        </div>
      </div>
    </section>
  )
}
