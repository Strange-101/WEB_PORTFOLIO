import { useEffect, useRef } from 'react'
import '../styles/TopNav.css'

export default function TopNav({ personal }) {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="top-nav" ref={navRef}>
      <a href={`mailto:${personal.email}`} className="nav-link">
        {personal.email.toUpperCase()}
      </a>
      <a href={personal.github} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        GITHUB
      </a>
      <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">
        LINKEDIN
      </a>
    </nav>
  )
}
