import { useEffect, useState } from 'react'

const BALLOON_COLORS = [
  '#FFB6C1', // Light pink
  '#FFD700', // Gold
  '#E6E6FA', // Lavender
  '#98FB98', // Pale green
  '#87CEEB', // Sky blue
  '#FFDAB9', // Peach
  '#DDA0DD', // Plum
]

function Balloon({ color, delay, left }) {
  return (
    <div
      className="balloon animate-float-up"
      style={{
        backgroundColor: color,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
      }}
    >
      {/* Balloon shine */}
      <div
        className="absolute top-4 left-4 w-6 h-8 rounded-full opacity-40"
        style={{ background: 'linear-gradient(135deg, white 0%, transparent 50%)' }}
      />
      {/* String */}
      <div
        className="absolute bottom-[-100px] left-1/2 w-0.5 h-24"
        style={{
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, ${color}, transparent)`,
        }}
      />
    </div>
  )
}

function Balloons({ show }) {
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    if (show) {
      // Create initial balloons
      const initialBalloons = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        delay: Math.random() * 3,
        left: 5 + Math.random() * 90,
      }))
      setBalloons(initialBalloons)

      // Add more balloons periodically
      const interval = setInterval(() => {
        setBalloons(prev => {
          if (prev.length > 20) {
            return prev.slice(-15) // Keep only recent balloons
          }
          return [
            ...prev,
            {
              id: Date.now(),
              color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
              delay: 0,
              left: 10 + Math.random() * 80,
            }
          ]
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map(balloon => (
        <Balloon
          key={balloon.id}
          color={balloon.color}
          delay={balloon.delay}
          left={balloon.left}
        />
      ))}
    </div>
  )
}

export default Balloons
