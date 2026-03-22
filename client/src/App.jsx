import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import Skills from './components/Skills'
import Footer from './components/Footer'
import TopNav from './components/TopNav'
import './App.css'

const API_BASE = '/api'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/portfolio`)
      .then(res => res.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        // Fallback data if server is down
        setData(getFallbackData())
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    )
  }

  return (
    <div className="app">
      <TopNav personal={data.personal} />
      <Hero personal={data.personal} />
      <About about={data.about} />
      <FeaturedWork projects={data.projects} filters={data.filters} />
      <Skills expertise={data.expertise} />
      <Footer personal={data.personal} />
    </div>
  )
}

function getFallbackData() {
  return {
    personal: {
      name: { first: 'KUNAL', last: 'MAHORE' },
      role: 'FULL STACK DEVELOPER & ML ENGINEER',
      location: 'INDIA',
      email: 'kunalmahore101@gmail.com',
      github: 'https://github.com/Strange-101',
      linkedin: 'https://www.linkedin.com/in/kunal-mahore',
      tagline: 'OPEN TO WORK!',
      skills: ['MERN STACK', 'AI/ML', 'DEVOPS'],
      lastUpdated: 'MARCH 2026',
    },
    about: {
      statement: [
        { text: 'I BUILD INTELLIGENT,', weight: 'bold' },
        { text: 'SCALABLE APPLICATIONS', weight: 'bold' },
        { text: 'THAT MERGE FULL-STACK', weight: 'bold' },
        { text: 'DEVELOPMENT WITH MACHINE', weight: 'medium' },
        { text: 'LEARNING TO SOLVE REAL-WORLD PROBLEMS.', weight: 'light' },
      ],
    },
    projects: [
      { id: 1, title: 'E-COMMERCE PLATFORM', category: ['mern', 'fullstack'], gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', icon: 'monitor' },
      { id: 2, title: 'ML PREDICTION ENGINE', category: ['aiml'], gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0033 50%, #330066 100%)', icon: 'brain' },
      { id: 3, title: 'CI/CD PIPELINE MANAGER', category: ['devops', 'fullstack'], gradient: 'linear-gradient(135deg, #1b2838 0%, #2a475e 50%, #1b2838 100%)', icon: 'terminal' },
      { id: 4, title: 'AI CHAT APPLICATION', category: ['mern', 'aiml'], gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b69 50%, #11998e 100%)', icon: 'phone' },
      { id: 5, title: 'ANALYTICS DASHBOARD', category: ['mern', 'fullstack'], gradient: 'linear-gradient(135deg, #0c0c0c 0%, #434343 50%, #1a1a2e 100%)', icon: 'chart' },
      { id: 6, title: 'CONTAINER ORCHESTRATOR', category: ['devops'], gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 50%, #141e30 100%)', icon: 'container' },
    ],
    filters: [
      { id: 'all', label: 'ALL' },
      { id: 'mern', label: 'MERN' },
      { id: 'aiml', label: 'AI / ML' },
      { id: 'devops', label: 'DEVOPS' },
      { id: 'fullstack', label: 'FULL STACK' },
    ],
    expertise: {
      heading: 'SKILLS & EXPERTISE',
      skills: [
        { name: 'REACT & NODE.JS', weight: 'bold' },
        { name: 'MONGODB & EXPRESS', weight: 'bold' },
        { name: 'MACHINE LEARNING', weight: 'bold' },
        { name: 'DEEP LEARNING', weight: 'medium' },
        { name: 'TENSORFLOW & PYTORCH', weight: 'medium' },
        { name: 'DOCKER & KUBERNETES', weight: 'medium' },
        { name: 'CI/CD PIPELINES', weight: 'light' },
        { name: 'AWS & CLOUD', weight: 'light' },
        { name: 'REST APIs', weight: 'light' },
        { name: 'GIT & GITHUB', weight: 'lighter' },
      ],
      interests: ['RUNNING', 'BASKETBALL'],
    },
  }
}

export default App
