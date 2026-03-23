import { useEffect, useState } from 'react'
import { PixelTree, PixelLeafTree, PixelFlower, PixelBird } from './PixelDecorations'

export default function BackgroundDecorations() {
  const [mounted, setMounted] = useState(false)
  
  // ensure hydration match
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="global-bg-decos" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* Background Trees */}
      <PixelTree style={{ bottom: '-10%', left: '5%' }} size="large" />
      <PixelTree style={{ bottom: '15%', right: '8%' }} size="small" />
      <PixelLeafTree style={{ bottom: '5%', left: '25%' }} size="small" />
      <PixelTree style={{ top: '35%', right: '2%' }} size="small" />
      <PixelLeafTree style={{ top: '65%', left: '1%' }} size="small" />
      <PixelTree style={{ top: '15%', left: '12%' }} size="small" opacity={0.5} />
      <PixelLeafTree style={{ bottom: '45%', right: '15%' }} />
      <PixelTree style={{ bottom: '8%', right: '30%' }} size="small" />

      {/* Background Flowers */}
      <PixelFlower style={{ bottom: '2%', left: '15%' }} color="#E53935" />
      <PixelFlower style={{ bottom: '5%', right: '25%' }} color="#FFD54F" />
      <PixelFlower style={{ top: '55%', left: '8%' }} color="#42A5F5" />
      <PixelFlower style={{ top: '85%', right: '12%' }} color="#E53935" />
      <PixelFlower style={{ bottom: '15%', left: '35%' }} color="#FFD54F" />

      {/* Birds */}
      <PixelBird style={{ top: '10%', left: '-10%' }} delay={0} speed={15} />
      <PixelBird style={{ top: '25%', right: '-10%' }} delay={5} speed={12} />
      <PixelBird style={{ top: '40%', left: '-5%' }} delay={2} speed={18} />
      <PixelBird style={{ top: '70%', right: '-15%' }} delay={8} speed={14} />
      <PixelBird style={{ bottom: '20%', left: '-20%' }} delay={4} speed={20} />
    </div>
  )
}
