import { useState } from 'react'
import Landing from './components/Landing'
import Confetti from './components/Confetti'
import Balloons from './components/Balloons'
import PhotoWithWishes from './components/PhotoWithWishes'
import Gift from './components/GiftBox'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [started, setStarted] = useState(false)
  const [showPhotoWishes, setShowPhotoWishes] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [triggerConfetti, setTriggerConfetti] = useState(false)

  const handleStart = () => {
    setStarted(true)
    setTriggerConfetti(true)

    // Show photo with wishes after confetti starts
    setTimeout(() => setShowPhotoWishes(true), 1500)
  }

  const handleWishesComplete = () => {
    // Show gift (which handles cake internally after its 23 wishes)
    setShowGift(true)
  }

  const handleConfettiComplete = () => {
    setTriggerConfetti(false)
  }

  if (!started) {
    return <Landing onStart={handleStart} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cream via-pastel-pink to-soft-pink -z-10" />

      {/* Music Player */}
      <MusicPlayer autoPlay={started} />

      {/* Confetti */}
      <Confetti trigger={triggerConfetti} onComplete={handleConfettiComplete} />

      {/* Balloons */}
      <Balloons show={started} />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-start min-h-screen px-4 py-8">
        {/* Photo with Wishes */}
        {showPhotoWishes && (
          <div className="animate-fade-in">
            <PhotoWithWishes onComplete={handleWishesComplete} />
          </div>
        )}

        {/* Gift Section (handles cake phase internally) */}
        {showGift && (
          <div className="animate-fade-in w-full max-w-md mx-auto">
            <Gift />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
