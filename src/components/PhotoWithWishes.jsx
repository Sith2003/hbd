import { useState, useEffect, useRef, memo, useMemo } from 'react'

// Customize this message for May
// const BIRTHDAY_WISHES = `Happy Birthday, May!

// Thank you for being you - for your kindness, your beautiful smile, and everything that makes you so incredibly special.

// Every moment spent with you is a gift. Your warmth, your laughter, the way you are and I feel so lucky to have you in my life.

// May all your dreams come true this year and always. May your days be filled with endless joy, love, and all the wonderful things you truly deserve.

// Here's to celebrating you today and every day. You are lovely and cuteness more than words can say.`

const BIRTHDAY_WISHES = `Happy Birthday, May!`

// Floating hearts component - memoized to prevent re-renders
const FloatingHearts = memo(function FloatingHearts() {
  const hearts = ['💖', '💝', '💕', '💗', '✨', '🌟', '💫']
  // Pre-calculate random durations so they don't change
  const heartData = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      left: `${5 + (i * 8)}%`,
      delay: `${i * 0.3}s`,
      duration: `${3 + (i % 3)}s`,
      emoji: hearts[i % hearts.length]
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {heartData.map((heart, i) => (
        <span
          key={i}
          className="absolute text-lg animate-float-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
})

// Sparkle component - memoized
const Sparkle = memo(function Sparkle({ style }) {
  return (
    <span
      className="absolute text-yellow-300 animate-sparkle"
      style={style}
    >
      ✦
    </span>
  )
})

// Photo section - memoized to prevent re-renders during typing
const PhotoSection = memo(function PhotoSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative p-4 pt-6">
      {/* Photo frame with multiple borders */}
      <div className="relative mx-auto">
        {/* Sparkles around photo */}
        <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
        <Sparkle style={{ top: '20%', right: '-10px', animationDelay: '0.5s' }} />
        <Sparkle style={{ bottom: '20%', left: '-10px', animationDelay: '1s' }} />
        <Sparkle style={{ bottom: '-10px', right: '15%', animationDelay: '1.5s' }} />
        <Sparkle style={{ top: '50%', left: '-8px', animationDelay: '0.7s' }} />
        <Sparkle style={{ top: '30%', right: '-8px', animationDelay: '1.2s' }} />

        {/* Decorative frame layers */}
        <div className="relative p-2 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-2xl shadow-inner">
          <div className="p-1 bg-white rounded-xl">
            <div className="relative overflow-hidden rounded-lg">
              {/* Photo */}
              <img
                src={`${import.meta.env.BASE_URL}photos/photo1.jpg`}
                alt="May"
                className={`w-full h-auto max-h-[50vh] object-contain transition-all duration-1000 ${
                  imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FFE4EC" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="10" fill="%23999">Add photo1.jpg</text></svg>'
                }}
              />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts */}
      <FloatingHearts />
    </div>
  )
})

// Decorative elements - memoized
const TopBanner = memo(function TopBanner() {
  return (
    <div className="text-center mb-4 animate-bounce-slow">
      <span className="text-4xl">🎀</span>
      <span className="text-3xl mx-2">✨</span>
      <span className="text-4xl">🎀</span>
    </div>
  )
})

const BottomDecorations = memo(function BottomDecorations() {
  return (
    <div className="text-center mt-4 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
      <span className="text-2xl">🌸</span>
      <span className="text-3xl mx-3">💕</span>
      <span className="text-2xl">🌸</span>
    </div>
  )
})

function PhotoWithWishes({ onComplete }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const message = BIRTHDAY_WISHES
    let typeInterval

    const startTyping = () => {
      typeInterval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedText(message.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(typeInterval)
        }
      }, 50)
    }

    startTyping()

    return () => {
      if (typeInterval) clearInterval(typeInterval)
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Decorative top banner */}
      <TopBanner />

      {/* Main Card with golden frame */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400 rounded-[2rem] blur-lg opacity-50 animate-glow" />

        {/* Card */}
        <div className="relative bg-gradient-to-b from-white via-white to-pink-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-300/50">

          {/* Decorative corner ribbons */}
          <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden z-10">
            <div className="absolute -left-6 -top-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rotate-45 transform origin-bottom-right" />
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden z-10">
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-gradient-to-bl from-pink-400 to-pink-500 -rotate-45 transform origin-bottom-left" />
          </div>

          {/* Photo Section - memoized */}
          <PhotoSection />

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">💝</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
          </div>

          {/* Wishes Section */}
          <div className="px-6 pb-6 text-center">
            {/* Decorative element */}
            <div className="text-4xl mb-4 animate-pulse">
              🎉
            </div>

            {/* Typewriter wishes */}
            <div className="text-base md:text-lg text-gray-700 whitespace-pre-line leading-relaxed font-medium font-display">
              {displayedText}
              {!isComplete && <span className="typewriter-cursor" />}
            </div>

            {/* Lao text + wishes button after typing */}
            {isComplete && (
              <div className="mt-3 animate-fade-in flex flex-col items-center gap-3">
                <p
                  className="text-pink-600 font-semibold text-base md:text-lg text-center leading-relaxed"
                  style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
                >
                  ✨ ສະຫຼອງຄົບຮອບ 23 ປີ ✨ 
                </p>
                <p
                  className="text-pink-600 font-semibold text-base md:text-lg text-center leading-relaxed"
                  style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
                >
                  ຂໍອວຍພອນດ້ວຍພອນ 23 ຂໍ້ນີ້ເດີ
                </p>
                <button
                  onClick={onComplete}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                  style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
                >
                  <span className="text-2xl group-hover:animate-bounce">💌</span>
                  <span>ເປີດ 23 ຄຳອວຍພອນ</span>
                  <span className="text-2xl group-hover:animate-bounce">💌</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300" />
        </div>
      </div>

      {/* Bottom decorations */}
      <BottomDecorations />

      {/* Custom styles */}
      <style>{`
        @keyframes float-heart {
          0%, 100% {
            transform: translateY(100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-400%) rotate(20deg);
            opacity: 0;
          }
        }

        .animate-float-heart {
          animation: float-heart 4s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default PhotoWithWishes
