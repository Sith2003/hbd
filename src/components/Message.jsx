import { useState, useEffect } from 'react'

// Customize this message for May
const BIRTHDAY_MESSAGE = `Happy Birthday, May!

Today is all about celebrating YOU - the amazing person you are.

May this year bring you endless joy, laughter, and all the wonderful things you deserve.

With love and best wishes...`

function Message() {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const message = BIRTHDAY_MESSAGE

    const typeInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(typeInterval)
      }
    }, 50) // Typing speed

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
      <div className="text-center">
        {/* Decorative header */}
        <div className="text-4xl mb-4">🎉</div>

        {/* Message with typewriter effect */}
        <div className="text-lg md:text-xl text-gray-700 whitespace-pre-line leading-relaxed min-h-[200px]">
          {displayedText}
          {!isComplete && <span className="typewriter-cursor" />}
        </div>

        {/* Decorative footer - shows after typing completes */}
        {isComplete && (
          <div className="mt-6 text-3xl animate-fade-in">
            💝
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
