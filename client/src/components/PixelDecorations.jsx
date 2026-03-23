import '../styles/PixelDecorations.css'

export function PixelTree({ style, size }) {
  const s = size === 'small' ? 0.65 : 1
  return (
    <div className="pixel-deco pixel-tree" style={{ ...style, position: 'absolute' }}>
      <svg width={50 * s} height={90 * s} viewBox="0 0 50 90" style={{ imageRendering: 'pixelated' }}>
        <polygon points="25,0 45,25 5,25" fill="#fff" stroke="#000" strokeWidth="3" />
        <polygon points="25,12 48,40 2,40" fill="#fff" stroke="#000" strokeWidth="3" />
        <polygon points="25,26 50,55 0,55" fill="#fff" stroke="#000" strokeWidth="3" />
        <rect x="20" y="55" width="10" height="18" fill="#fff" stroke="#000" strokeWidth="3" />
      </svg>
    </div>
  )
}

export function PixelLeafTree({ style, size }) {
  const s = size === 'small' ? 0.6 : 1
  return (
    <div className="pixel-deco pixel-leaf-tree" style={{ ...style, position: 'absolute' }}>
      <svg width={40 * s} height={90 * s} viewBox="0 0 40 90" style={{ imageRendering: 'pixelated' }}>
        <ellipse cx="20" cy="25" rx="16" ry="22" fill="#fff" stroke="#000" strokeWidth="3" />
        <line x1="20" y1="47" x2="20" y2="85" stroke="#000" strokeWidth="3" />
        <line x1="12" y1="70" x2="20" y2="60" stroke="#000" strokeWidth="2.5" />
        <line x1="28" y1="65" x2="20" y2="55" stroke="#000" strokeWidth="2.5" />
      </svg>
    </div>
  )
}

export function PixelFlower({ style, color }) {
  return (
    <div className="pixel-deco pixel-flower" style={{ ...style, position: 'absolute' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="0" width="4" height="4" fill={color} />
        <rect x="0" y="6" width="4" height="4" fill={color} />
        <rect x="12" y="6" width="4" height="4" fill={color} />
        <rect x="6" y="12" width="4" height="4" fill={color} />
        <rect x="6" y="6" width="4" height="4" fill="#FFD54F" />
      </svg>
    </div>
  )
}

export function PixelBird({ style, delay = 0, speed = 8 }) {
  return (
    <div 
      className="pixel-deco pixel-bird" 
      style={{ 
        ...style, 
        position: 'absolute', 
        animationDelay: `${delay}s`,
        animationDuration: `${speed}s` 
      }}
    >
      <svg width="14" height="10" viewBox="0 0 14 10">
        <path d="M0,5 Q3.5,0 7,5 Q10.5,0 14,5" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
