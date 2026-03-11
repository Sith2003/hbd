function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cream via-pastel-pink to-soft-pink px-4">
      <div className="text-center animate-fade-in">
        {/* Decorative elements */}
        <div className="text-6xl mb-8 animate-float">
          🎈🎂🎈
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4 font-display">
          A Special Day Day
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-md mx-auto">
          Someone wonderful has a birthday today...
        </p>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative px-10 py-5 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <span className="relative z-10">Tap to Celebrate</span>

          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
        </button>

        {/* Subtle hint */}
        <p className="mt-8 text-sm text-gray-400 animate-pulse">
          Turn up your volume 🔊
        </p>
      </div>

      {/* Floating decorations */}
      <div className="fixed top-10 left-10 text-4xl opacity-50 animate-float" style={{ animationDelay: '0s' }}>
        🎁
      </div>
      <div className="fixed top-20 right-16 text-3xl opacity-50 animate-float" style={{ animationDelay: '1s' }}>
        ✨
      </div>
      <div className="fixed bottom-32 left-16 text-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}>
        🎀
      </div>
      <div className="fixed bottom-20 right-10 text-4xl opacity-50 animate-float" style={{ animationDelay: '0.5s' }}>
        🌸
      </div>
    </div>
  )
}

export default Landing
