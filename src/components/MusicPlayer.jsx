import { useState, useRef, useEffect } from 'react'

function MusicPlayer({ autoPlay }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was prevented, user needs to interact
          setIsPlaying(false)
        })
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Playback failed:', err)
          setHasError(true)
        })
    }
  }

  const handleError = () => {
    setHasError(true)
    setIsPlaying(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/birthday.webm`}
        loop
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        disabled={hasError}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          shadow-lg transition-all duration-300
          ${hasError
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 active:scale-95'
          }
        `}
        title={hasError ? 'Music file not found' : (isPlaying ? 'Pause music' : 'Play music')}
      >
        {hasError ? (
          <span className="text-gray-500 text-lg">🔇</span>
        ) : isPlaying ? (
          <span className="text-pink-500 text-lg">⏸️</span>
        ) : (
          <span className="text-pink-500 text-lg">🎵</span>
        )}
      </button>

      {/* Playing indicator */}
      {isPlaying && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-0.5">
          <div className="w-1 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="w-1 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
        </div>
      )}

      {/* Error tooltip */}
      {hasError && (
        <div className="absolute top-14 right-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          Add music to /public/music/birthday.mp3
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
