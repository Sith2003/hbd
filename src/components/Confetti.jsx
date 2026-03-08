import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

function Confetti({ trigger, onComplete }) {
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true

      // Center burst
      const burst = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFE4EC', '#FFC0CB', '#FFD700', '#FF69B4', '#FFF']
        })
      }

      // Side cannons
      const leftCannon = () => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFE4EC', '#FFC0CB', '#FFD700', '#FF69B4', '#FFF']
        })
      }

      const rightCannon = () => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFE4EC', '#FFC0CB', '#FFD700', '#FF69B4', '#FFF']
        })
      }

      // Fire confetti sequence
      burst()
      setTimeout(leftCannon, 200)
      setTimeout(rightCannon, 400)
      setTimeout(burst, 600)
      setTimeout(leftCannon, 800)
      setTimeout(rightCannon, 1000)

      // Reset trigger after animation
      setTimeout(() => {
        hasTriggered.current = false
        if (onComplete) onComplete()
      }, 2000)
    }
  }, [trigger, onComplete])

  // Reset when trigger goes false
  useEffect(() => {
    if (!trigger) {
      hasTriggered.current = false
    }
  }, [trigger])

  return null
}

export default Confetti
