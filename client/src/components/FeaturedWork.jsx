import { useState, useEffect, useRef } from 'react'
import { PixelTree, PixelLeafTree, PixelFlower, PixelBird } from './PixelDecorations'
import '../styles/FeaturedWork.css'

const ICONS = {
  monitor: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="6" y="8" width="40" height="28" rx="3" stroke="white" strokeWidth="2" />
      <circle cx="26" cy="22" r="7" stroke="#4FC3F7" strokeWidth="2" />
      <path d="M26 15v14M19 22h14" stroke="#4FC3F7" strokeWidth="1.5" />
      <line x1="18" y1="40" x2="34" y2="40" stroke="white" strokeWidth="2" />
    </svg>
  ),
  brain: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="16" r="6" stroke="#BB86FC" strokeWidth="2" />
      <circle cx="13" cy="36" r="5" stroke="#BB86FC" strokeWidth="2" />
      <circle cx="39" cy="36" r="5" stroke="#BB86FC" strokeWidth="2" />
      <line x1="23" y1="21" x2="16" y2="32" stroke="#BB86FC" strokeWidth="1.5" />
      <line x1="29" y1="21" x2="36" y2="32" stroke="#BB86FC" strokeWidth="1.5" />
      <line x1="18" y1="36" x2="34" y2="36" stroke="#BB86FC" strokeWidth="1.5" />
    </svg>
  ),
  terminal: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="6" y="8" width="40" height="30" rx="2" stroke="#66BB6A" strokeWidth="2" />
      <text x="12" y="28" fill="#66BB6A" fontSize="12" fontFamily="monospace">&gt;_</text>
      <rect x="16" y="42" width="20" height="6" rx="1" stroke="#66BB6A" strokeWidth="1.5" />
      <line x1="26" y1="38" x2="26" y2="42" stroke="#66BB6A" strokeWidth="1.5" />
    </svg>
  ),
  phone: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="14" y="4" width="24" height="44" rx="4" stroke="#4DD0E1" strokeWidth="2" />
      <circle cx="26" cy="42" r="2.5" stroke="#4DD0E1" strokeWidth="1.5" />
      <rect x="18" y="10" width="16" height="26" rx="1" stroke="#4DD0E1" strokeWidth="1" />
      <path d="M22 20h8M22 24h5M22 28h7" stroke="#4DD0E1" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  chart: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path d="M8 40L16 22L26 30L36 12L46 26" stroke="#FF7043" strokeWidth="2" fill="none" />
      <circle cx="16" cy="22" r="2.5" fill="#FF7043" />
      <circle cx="26" cy="30" r="2.5" fill="#FF7043" />
      <circle cx="36" cy="12" r="2.5" fill="#FF7043" />
      <circle cx="46" cy="26" r="2.5" fill="#FF7043" />
      <line x1="6" y1="44" x2="48" y2="44" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="6" y1="8" x2="6" y2="44" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  container: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="8" y="12" width="14" height="28" rx="2" stroke="#42A5F5" strokeWidth="1.5" />
      <rect x="30" y="12" width="14" height="28" rx="2" stroke="#42A5F5" strokeWidth="1.5" />
      <path d="M22 22h8M22 26h8M22 30h8" stroke="#42A5F5" strokeWidth="1.5" strokeDasharray="2,2" />
      <circle cx="15" cy="18" r="2" fill="#42A5F5" />
      <circle cx="37" cy="18" r="2" fill="#42A5F5" />
    </svg>
  ),
  video_board: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="6" y="12" width="40" height="28" rx="2" stroke="#fff" strokeWidth="2" />
      <circle cx="26" cy="12" r="3" fill="#fff" />
      <path d="M14 20 Q 20 16 26 22 T 38 20" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="40" x2="32" y2="40" stroke="#fff" strokeWidth="2" />
      <line x1="26" y1="40" x2="26" y2="44" stroke="#fff" strokeWidth="2" />
    </svg>
  ),
  book_star: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path d="M26 40 L26 12 C26 12 20 8 10 10 L10 38 C20 36 26 40 26 40Z" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M26 40 L26 12 C26 12 32 8 42 10 L42 38 C32 36 26 40 26 40Z" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M26 16 L28 22 H34 L29 26 L31 32 L26 28 L21 32 L23 26 L18 22 H24 Z" fill="#FDD835" />
    </svg>
  ),
  target_list: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="18" cy="26" r="10" stroke="#FF5252" strokeWidth="2" />
      <circle cx="18" cy="26" r="5" stroke="#FF5252" strokeWidth="2" />
      <circle cx="18" cy="26" r="1.5" fill="#FF5252" />
      <rect x="34" y="16" width="12" height="2" fill="#fff" />
      <rect x="34" y="24" width="12" height="2" fill="#fff" />
      <rect x="34" y="32" width="8" height="2" fill="#fff" />
    </svg>
  ),
  pin_window: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="8" y="14" width="36" height="26" rx="2" stroke="#fff" strokeWidth="2" />
      <line x1="8" y1="20" x2="44" y2="20" stroke="#fff" strokeWidth="1" />
      <circle cx="12" cy="17" r="1" fill="#FF5252" />
      <circle cx="16" cy="17" r="1" fill="#FFCA28" />
      <circle cx="20" cy="17" r="1" fill="#8BC34A" />
      <path d="M26 4 L30 14 H22 Z" fill="#E0E0E0" />
      <line x1="26" y1="14" x2="26" y2="24" stroke="#E0E0E0" strokeWidth="2" />
    </svg>
  ),
}

export default function FeaturedWork({ projects, filters }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleProjects, setVisibleProjects] = useState(projects)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (activeFilter === 'all') {
      setVisibleProjects(projects)
    } else {
      setVisibleProjects(projects.filter(p => p.category.includes(activeFilter)))
    }
  }, [activeFilter, projects])

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
    const filterMenu = sectionRef.current?.querySelector('.filter-bar')
    if (filterMenu) observer.observe(filterMenu)
    const cards = sectionRef.current?.querySelectorAll('.project-card')
    cards?.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [visibleProjects])

  return (
    <section className="featured-work" ref={sectionRef} id="work">
      {/* Decorative pixel elements */}
      <div className="pixel-decos">
        <PixelTree style={{ top: 20, left: '4%' }} />
        <PixelTree style={{ top: 50, right: '6%' }} size="small" />
        <PixelTree style={{ top: 120, left: '15%' }} size="small" />
        <PixelTree style={{ top: 80, right: '20%' }} />
        <PixelLeafTree style={{ top: 30, left: '48%' }} />
        <PixelLeafTree style={{ top: 100, right: '35%' }} size="small" />
        <PixelFlower style={{ top: 50, left: '22%' }} color="#E53935" />
        <PixelFlower style={{ top: 90, left: '38%' }} color="#FFD54F" />
        <PixelFlower style={{ top: 30, left: '58%' }} color="#E53935" />
        <PixelFlower style={{ top: 70, right: '25%' }} color="#FFD54F" />
        <PixelFlower style={{ top: 110, left: '70%' }} color="#E53935" />
        <PixelFlower style={{ top: 60, left: '12%' }} color="#FFD54F" />
        <PixelBird style={{ top: 45, left: '30%' }} delay={0} />
        <PixelBird style={{ top: 65, left: '50%' }} delay={3} />
        <PixelBird style={{ top: 35, left: '72%' }} delay={6} />
      </div>

      <h2 className="work-title" ref={titleRef}>
        {"FEATURED WORK".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      {/* Filter pills */}
      <div className="filter-bar reveal-el" style={{ transitionDelay: '0.4s' }}>
        {filters.map(f => (
          <button
            key={f.id}
            className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            <FilterIcon type={f.id} />
            {f.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="project-grid">
        {visibleProjects.map((project, i) => (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            key={project.id}
            className={`project-card project-reveal ${i % 2 !== 0 ? 'card-offset' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s`, textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div className="project-img">
              <div className="dither-overlay" style={{ zIndex: 2 }} />
              {project.image ? (
                <img className="project-img-bg" src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
              ) : (
                <div className="project-bg" style={{ background: project.gradient, zIndex: 1 }} />
              )}
              <div className="project-icon-wrap" style={{ zIndex: 3, background: 'rgba(0,0,0,0.6)', padding: '16px', borderRadius: '12px', backdropFilter: 'blur(2px)' }}>
                {ICONS[project.icon]}
                <span className="project-inner-label">{project.title}</span>
              </div>
            </div>
            <h3 className="project-label">
              {project.title}
              {project.githubLink && (
                <svg 
                  width="18" height="18" viewBox="0 0 24 24" fill="currentColor" 
                  style={{ marginLeft: 8, verticalAlign: 'middle', opacity: 0.6 }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
            </h3>
          </a>
        ))}
      </div>

      {/* Scattered trees between projects */}
      <div className="pixel-decos-lower">
        <PixelTree style={{ top: '30%', left: '2%' }} size="small" />
        <PixelLeafTree style={{ top: '55%', right: '3%' }} />
        <PixelTree style={{ top: '70%', right: '8%' }} size="small" />
        <PixelTree style={{ top: '85%', left: '5%' }} />
      </div>
    </section>
  )
}

function FilterIcon({ type }) {
  switch (type) {
    case 'all':
      return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
    case 'mern':
      return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3" /><ellipse cx="8" cy="8" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    case 'aiml':
      return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L10 5h4L10.5 8l1.5 4L8 9.5 4 12l1.5-4L2 5h4Z" /></svg>
    case 'devops':
      return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><polygon points="6,4 12,8 6,12" fill="currentColor" /></svg>
    case 'fullstack':
      return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5" /><line x1="8" y1="10" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" /></svg>
    default:
      return null
  }
}


