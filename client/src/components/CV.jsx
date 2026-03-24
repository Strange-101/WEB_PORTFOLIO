import { useEffect, useRef } from 'react'
import '../styles/CV.css'

export default function CV({ cvLink }) {
  const sectionRef = useRef(null)

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
      { threshold: 0.2 }
    )
    const cards = sectionRef.current?.querySelectorAll('.reveal-el');
    if (cards) cards.forEach(card => observer.observe(card));

    return () => observer.disconnect()
  }, [])

  return (
    <section className="cv-section" ref={sectionRef} id="cv">
      <div className="cv-container reveal-el">
        <div className="cv-folder-tab">RESUME.EXE</div>
        <div className="cv-content">
          <div className="cv-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="8" width="40" height="48" rx="2" fill="#FFF" stroke="#000" strokeWidth="4"/>
              <line x1="20" y1="20" x2="44" y2="20" stroke="#000" strokeWidth="4"/>
              <line x1="20" y1="28" x2="44" y2="28" stroke="#000" strokeWidth="4"/>
              <line x1="20" y1="36" x2="36" y2="36" stroke="#000" strokeWidth="4"/>
              <path d="M30 44L34 52L48 38" stroke="#E53935" strokeWidth="4" strokeLinecap="square"/>
            </svg>
          </div>
          <h3 className="cv-title">READY FOR DEPLOYMENT</h3>
          <p className="cv-desc">Download my full resume to see my complete work history, education, and technical qualifications.</p>
          <div className="cv-buttons">
            <a href={`${import.meta.env.BASE_URL}kunalllGeneralCV.pdf`} download="Kunalll_General_CV.pdf" target="_blank" rel="noreferrer" className="cv-download-btn">
              <span className="btn-icon">↓</span> GENERAL CV
            </a>
            <a href={`${import.meta.env.BASE_URL}KunalSpecialisedCV.pdf`} download="Kunal_Specialised_CV.pdf" target="_blank" rel="noreferrer" className="cv-download-btn">
              <span className="btn-icon">↓</span> SPECIALISED CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
