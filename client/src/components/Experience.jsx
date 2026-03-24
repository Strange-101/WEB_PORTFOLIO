import { useEffect, useRef } from 'react';
import '../styles/Experience.css';

export default function Experience({ experience }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal-el');
    if (cards) cards.forEach(card => observer.observe(card));
    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  if (!experience || experience.length === 0) return null;

  return (
    <section className="experience-section" ref={sectionRef} id="experience">
      <h2 className="section-title" ref={titleRef}>
        {"EXPERIENCE".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="experience-timeline">
        {experience.map((exp, index) => (
          <div 
            key={exp.id} 
            className="exp-card reveal-el" 
            style={{ transitionDelay: `${0.1 * index}s` }}
          >
            <div className="exp-line-marker"></div>
            <div className="exp-content">
              <div className="exp-header">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-duration">{exp.duration}</span>
              </div>
              <h4 className="exp-company">
                {exp.company} <span className="exp-link">| {exp.link}</span>
              </h4>
              <ul className="exp-bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
