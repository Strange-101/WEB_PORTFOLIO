import { useEffect, useState, useRef } from 'react';
import '../styles/StravaStats.css';

export default function StravaStats({ stats }) {
  const [dataPoints, setDataPoints] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Generate a mock graph that looks like a training progression with realistic fluctuations
    const mockData = [10, 15, 12, 18, 24, 20, 28, 32, 26, 35, 40, 38, 45, 42, 50];
    const maxVal = Math.max(...mockData);
    const minVal = 0;
    const width = 300;
    const height = 100;
    
    const points = mockData.map((val, i) => {
      const x = (i / (mockData.length - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal)) * height;
      return `${x},${y}`;
    });
    
    setDataPoints(points);

    // Add IntersectionObserver for reveal animation
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pathD = `M0,100 L${dataPoints.join(' L')} L300,100 Z`;
  const lineD = `M${dataPoints.join(' L')}`;

  return (
    <div className="strava-stats-container reveal-el" ref={sectionRef}>
      <div className="strava-header">
        <div className="strava-title">
          <svg width="28" height="28" viewBox="0 0 48 48">
            <path d="M14 26L24 6L34 26H26L24 22L22 26H14Z" fill="#FC4C02"/>
            <path d="M24 30L29 40L34 30H24Z" fill="#FC4C02"/>
          </svg>
          <h3>STRAVA ACTIVITY</h3>
        </div>
        <a href="https://www.strava.com/athletes/190962226" target="_blank" rel="noreferrer" className="strava-link">
          VIEW PROFILE ↗
        </a>
      </div>
      
      <div className="strava-metrics-grid">
        <div className="strava-metric">
          <span className="metric-label">TOTAL DISTANCE</span>
          <span className="metric-value">1,248 <small>KM</small></span>
        </div>
        <div className="strava-metric">
          <span className="metric-label">WEEKLY AVERAGE</span>
          <span className="metric-value">{stats.weeklyDist}</span>
        </div>
        <div className="strava-metric">
          <span className="metric-label">AVERAGE PACE</span>
          <span className="metric-value">{stats.avgPace}</span>
        </div>
        <div className="strava-metric">
          <span className="metric-label">LONGEST RUN</span>
          <span className="metric-value">{stats.longestRun}</span>
        </div>
      </div>

      <div className="strava-graph-container">
        <div className="graph-label">LAST 15 WEEKS PROGRESSION</div>
        <svg className="strava-graph" viewBox="-5 -5 310 110" preserveAspectRatio="none">
          {dataPoints.length > 0 && (
            <>
              <defs>
                <linearGradient id="stravaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FC4C02" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#FC4C02" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              <path d={pathD} fill="url(#stravaGradient)" className="graph-area"/>
              <path d={lineD} fill="none" stroke="#FC4C02" strokeWidth="2.5" className="graph-line" strokeLinecap="round" strokeLinejoin="round"/>
              
              {/* Plot dots */}
              {dataPoints.map((point, i) => {
                const [x, y] = point.split(',');
                return <circle key={i} cx={x} cy={y} r="3" fill="#FFF" stroke="#FC4C02" strokeWidth="2" className="graph-dot" style={{ animationDelay: `${1.5 + i * 0.05}s` }}/>;
              })}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
