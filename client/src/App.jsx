import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import Skills from './components/Skills'
import Footer from './components/Footer'
import TopNav from './components/TopNav'
import Certificates from './components/Certificates'
import Courses from './components/Courses'
import CV from './components/CV'
import CompetitiveProgramming from './components/CompetitiveProgramming'
import Hackathons from './components/Hackathons'
import Hobbies from './components/Hobbies'
import BackgroundDecorations from './components/BackgroundDecorations'
import './App.css'

const API_BASE = '/api'

function App() {
  const [data, setData] = useState(getFallbackData())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Artificial delay to preserve the retro "boot sequence" loading animation
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
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
      <BackgroundDecorations />
      <TopNav personal={data.personal} />
      <Hero personal={data.personal} />
      <About about={data.about} />
      <Skills expertise={data.expertise} />
      <FeaturedWork projects={data.projects} filters={data.filters} />
      <CompetitiveProgramming stats={data.cpStats} />
      <Hackathons hackathons={data.hackathons} />
      <Courses courses={data.courses} />
      <Certificates certificates={data.certificates} />
      <CV cvLink={data.personal?.cvLink} />
      <Hobbies hobbies={data.hobbies} />
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
      cvLink: '/resume.pdf'
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
      { id: 1, title: 'SYNC SPACE', category: ['mern', 'fullstack'], image: '/images/sync_space_bg_1774287330921.png', icon: 'video_board', githubLink: 'https://github.com/Strange-101/SyncSpace' },
      { id: 2, title: 'STRIDE SYNC', category: ['fullstack'], image: '/images/stride_sync_bg_1774287357661.png', icon: 'phone', githubLink: 'https://github.com/Strange-101/StrideSync' },
      { id: 3, title: 'KomiCK', category: ['mern', 'fullstack'], image: '/images/komick_bg_1774287382756.png', icon: 'book_star', githubLink: 'https://github.com/Strange-101/KomiCK' },
      { id: 4, title: 'GATE TRACKER', category: ['fullstack'], image: '/images/gate_tracker_bg_1774287406071.png', icon: 'target_list', githubLink: 'https://github.com/Strange-101/GATE_Tracker' },
      { id: 5, title: 'RECOMMENDATION ENGINE', category: ['aiml'], image: '/images/recommender_bg_1774287430803.png', icon: 'brain', githubLink: 'https://github.com/Strange-101/MERN_PEP' },
      { id: 6, title: 'WINDOW PIN', category: ['devops'], image: '/images/window_pin_bg_1774287451832.png', icon: 'pin_window', githubLink: 'https://github.com/Strange-101/WindowPin' },
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
    cpStats: [
      { platform: 'CodeChef', rank: 'Bronze Badge', problemsSolved: 81, accuracy: '65%', link: 'https://www.codechef.com/users/s_trang_e' },
      { platform: 'LeetCode', rank: 'Beginner', problemsSolved: 50, accuracy: '70%', link: 'https://leetcode.com/u/strange_/' },
      { platform: 'Codolio', rank: 'Verified Gold', problemsSolved: 160, accuracy: '23d Streak', link: 'https://codolio.com/profile/strange' }
    ],
    hackathons: [
      { id: 1, name: 'Cipherthon 2.0', project: 'Intelligent Hiring Ecosystem', date: '2024', status: 'Participant' },
      { id: 2, name: 'HackJNU', project: 'Decentralized Voting DApp', date: '2024', status: 'Participant' },
      { id: 3, name: 'Hackmania', project: 'Agricultural E-Commerce Marketplace', date: '2023', status: 'Participant' }
    ],
    courses: [
      { id: 1, name: 'TensorFlow-Keras Bootcamp', provider: 'OpenCV University', status: 'COMPLETED' },
      { id: 2, name: 'OpenCV Bootcamp', provider: 'OpenCV University', status: 'COMPLETED' },
      { id: 3, name: 'Nmap for Ethical Hackers', provider: 'Udemy', status: 'COMPLETED' },
      { id: 4, name: 'Wireshark: Packet Analysis & Ethical Hacking', provider: 'Udemy', status: 'COMPLETED' },
      { id: 5, name: 'Intro to Artificial Intelligence', provider: 'Great Learning', status: 'COMPLETED' },
      { id: 6, name: 'Python Programming', provider: 'HCL GUVI', status: 'COMPLETED' }
    ],
    certificates: [
      { id: 1, name: 'Programming in C++: Hands-on Intro', issuer: 'Codio', date: 'Jun 2024', image: '/images/certs/cert_cpp_codio_1774290355643.png' },
      { id: 2, name: 'Machine Learning with Python', issuer: 'freeCodeCamp', date: 'Feb 2024', image: '/images/certs/cert_ml_freecodecamp_1774290372970.png' },
      { id: 3, name: 'Python (Basic)', issuer: 'HackerRank', date: 'Feb 2024', image: '/images/certs/cert_python_hackerrank_1774290390964.png' },
      { id: 4, name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: 'Oct 2023', image: '/images/certs/cert_rwd_freecodecamp_1774290406585.png' },
      { id: 5, name: 'TensorFlow Developer Bootcamp', issuer: 'Udemy', date: 'Jan 2024', image: '/images/certs/cert_tensorflow_udemy_1774290422450.png' },
      { id: 6, name: 'Introduction to Generative AI', issuer: 'Google Cloud', date: 'Jan 2024', image: '/images/certs/cert_genai_google_1774290443150.png' }
    ],
    hobbies: {
      strava: { weeklyDist: '45 KM', avgPace: '5:20 /KM', longestRun: '21.1 KM (Half Marathon)' },
      basketball: { position: 'Point Guard', player: 'Luka Doncic', team: 'Los Angeles Lakers' },
      f1: { team: 'Red Bull Racing', driver: 'Max Verstappen', memorableRace: 'Monaco GP 2024' },
      wrc: { team: 'Toyota Gazoo Racing', car: 'GR Yaris Rally1', dreamRally: 'Rally Finland' }
    }
  }
}

export default App
