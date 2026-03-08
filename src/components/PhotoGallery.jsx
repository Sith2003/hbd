import { useState, useRef, useEffect } from 'react'

// Add your photos here - place images in public/photos/ folder
// Example: { src: '/photos/photo1.jpg', caption: 'A wonderful memory' }
const PHOTOS = [
  { src: '/photos/photo1.jpg', caption: 'Memory 1' },
  { src: '/photos/photo2.jpg', caption: 'Memory 2' },
  { src: '/photos/photo3.jpg', caption: 'Memory 3' },
]

function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const containerRef = useRef(null)

  // Minimum swipe distance
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < PHOTOS.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // If no photos configured, show placeholder
  if (PHOTOS.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center">
        <p className="text-gray-500">Add photos to public/photos/ folder</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <h3 className="text-center text-xl font-semibold text-pink-600 mb-4">
        Our Memories Together
      </h3>

      {/* Photo Container */}
      <div
        ref={containerRef}
        className="relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Photo Slider */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 aspect-square relative"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FFE4EC" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="12" fill="%23999">Photo</text></svg>'
                }}
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <p className="text-white text-center text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Desktop) */}
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors hidden md:flex"
          >
            ←
          </button>
        )}
        {currentIndex < PHOTOS.length - 1 && (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors hidden md:flex"
          >
            →
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-pink-500 w-6'
                : 'bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <p className="text-center text-xs text-gray-400 mt-2 md:hidden">
        Swipe to see more
      </p>
    </div>
  )
}

export default PhotoGallery
