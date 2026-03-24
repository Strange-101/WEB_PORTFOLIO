import { useEffect, useRef } from 'react';
import '../styles/Achievements.css';

export default function Achievements({ achievements }) {
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

  if (!achievements || achievements.length === 0) return null;

  return (
    <section className="achievements-section" ref={sectionRef} id="achievements">
      <h2 className="section-title" ref={titleRef}>
        {"ACHIEVEMENTS".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="achievements-grid">
        {achievements.map((item, index) => (
          <div 
            key={item.id} 
            className="achievement-card reveal-el" 
            style={{ transitionDelay: `${0.1 * index}s` }}
          >
            <div className="achievement-icon">
              <div className="icon-wrapper">
                {item.icon}
              </div>
            </div>
            <div className="achievement-content">
              <h3 className="achievement-title">{item.title}</h3>
              <p className="achievement-desc">{item.description}</p>
              <span className="achievement-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
