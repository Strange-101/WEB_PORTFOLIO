import { useEffect, useRef } from 'react'
import '../styles/Courses.css'

export default function Courses({ courses }) {
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
    const items = sectionRef.current?.querySelectorAll('.course-item')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [courses])

  if (!courses || courses.length === 0) return null

  return (
    <section className="courses-section" ref={sectionRef} id="courses">
      <h2 className="section-title" ref={titleRef}>
        {"COURSES".split('').map((char, i) => (
          <span 
            key={i} 
            className="title-char" 
            style={{ display: 'inline-block', transitionDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <div className="courses-container">
        <div className="courses-header">
          <span>COURSE NAME</span>
          <span>PROVIDER</span>
          <span>STATUS</span>
        </div>
        <div className="courses-list">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="course-item reveal-el"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="course-name">{course.name}</div>
              <div className="course-provider">{course.provider}</div>
              <div className={`course-status ${course.status.toLowerCase()}`}>
                {course.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
