import { useState, memo } from 'react'
import confetti from 'canvas-confetti'
import Cake from './Cake'

const LAO_FONT = { fontFamily: "'Noto Sans Lao', sans-serif" }

const WISHES = [
  {
    lao: "ສຸກສັນວັນເກີດຄົບ 23 ປີ, ເມ! 🎉 ນີ້ແມ່ນວັນຂອງເມ ແລະ ເມສົມຄວນໄດ້ຮັບຄວາມສຸກທຸກຢ່າງ.",
    en: "Happy 23rd birthday, May! This is YOUR day and you deserve every bit of joy it brings."
  },
  {
    lao: "ຂໍໃຫ້ປີນີ້ເຕັມໄປດ້ວຍຄວາມສຸກ, ການຜະຈົນໄພ, ແລະ ທຸກສິ່ງທີ່ເຮັດໃຫ້ຫົວໃຈຂອງເມມີຄວາມສຸກ. 💖",
    en: "Wishing you a year full of laughter, adventure, and all the things that make your heart happy."
  },
  {
    lao: "ຂໍໃຫ້ທຸກໆເຊົ້າຂອງປີທີ 23 ນີ້ ເມຈະພົບເຈິແຕ່ສິ່ງທີ່ສວຍງາມ. 🌸",
    en: "May every morning of your 23rd year greet you with something beautiful."
  },
  {
    lao: "ເມມີຫົວໃຈທີ່ດີງາມຫຼາຍ — ໂລກນີ້ດີຂຶ້ນ ແລະ ໜ້າຢູ່ຂຶ້ນຫຼາຍເພາະມີເມຢູ່. 🌟",
    en: "You have such a kind heart — the world is genuinely a better place because you're in it."
  },
  {
    lao: "ອາຍຸ 23 ປີ ແລ້ວ ແຕ່ຍັງໜ້າຮັກຄືເດັກນ້ອຍ — ເມເອີຍ ຂໍໃຫ້ໃຫຍ່ຂຶ້ນແດ່ເດີ. 😂🎀",
    en: "Already 23 but still cute like a little kid — May, please grow up a little!"
  },
  {
    lao: "ຂ້ອຍ Google ຄຳວ່າ \"ຄົນທີ່ສວຍທີ່ສຸດໃນໂລກ\" ແຕ່ຮູບເຈົ້າບໍ່ຂຶ້ນ. Google ເພບໍ່ຈັກ. 🔍😂",
    en: "I Googled \"most beautiful person alive\" and your photo didn't show up. Google is broken."
  },
  {
    lao: "ຖ້າຈະໃຫ້ລາງວັນຄົນທີ່ໜ້າຮັກທີ່ສຸດ... ກະຊິຂໍສະເໜີຊື່ເມທຸກປີ. 🏆😂",
    en: "If there was an award for the most adorable person... I'd nominate you every single year."
  },
  {
    lao: "ຂໍໃຫ້ປີທີ 23 ຂອງເມນຳເອົາອາຫານທີ່ແຊບກວ່າ, ດົນຕີທີ່ງົດງາມ ແລະ ຄວາມຊົງຈຳທີ່ດີເລີດມາໃຫ້ເມ. 🎶🍰",
    en: "May your 23rd year bring you more good food, good music, and even better memories."
  },
  {
    lao: "ເມເຮັດໃຫ້ທຸກຢ່າງມ່ວນຂຶ້ນພຽງແຕ່ມີເມຢູ່ນຳ. ຢ່າປ່ຽນແປງສິ່ງນັ້ນເລີຍ. ✨",
    en: "You make everything more fun just by being there. Never change that."
  },
  {
    lao: "ຖ້າຄວາມໜ້າຮັກເປັນຄວາມຜິດທາງກົດໝາຍ, ເມຄືຊິຖືກຈັບໄປ 23 ປີກ່ອນແລ້ວ. 😂🚔",
    en: "If being cute was a crime, you'd have been arrested 23 years ago."
  },
  {
    lao: "ເມສົມຄວນໄດ້ຮັບຄວາມຮັກທຸກຢ່າງທີ່ເມໃຫ້ຄົນອື່ນ. ຢ່າລືມສິ່ງນັ້ນ. 💗",
    en: "You deserve all the love you so freely give to others. Don't forget that."
  },
  {
    lao: "23 ປີ ເປັນພຽງຈຸດເລີ່ມຕົ້ນ. ບົດທີ່ດີທີ່ສຸດຂອງເລື່ອງຂອງເມກຳລັງຈະຖືກຂຽນຢູ່. 🌙",
    en: "23 is just the beginning. The best parts of your story are still being written."
  },
  {
    lao: "ເມເປັນຄົນທີ່ຢາກເຮັດໃຫ້ຫົວຂວັນທຸກມື້ ເພາະການທີ່ໄດ້ເຫັນເມຫົວຫຼືມີຄວາມສຸກນັ້ນ ແມ່ນສິ່ງທີ່ດີທີ່ສຸດ. 😄💛",
    en: "You're the person I want to make laugh every day — because your laugh is genuinely the best thing."
  },
  {
    lao: "ຮູ້ບໍ່ວ່າເມຍິ້ມງາມຫຼາຍ — ແລ້ວທຸກຄັ້ງທີ່ເມຍິ້ມ, ຂ້ອຍກໍຍິ້ມຕາມໂດຍບໍ່ຮູ້ໂຕ. 😊💕",
    en: "You smile so easily — and every time you do, I smile too without even realizing it."
  },
  {
    lao: "ເມເປັນຄົນທີ່ຢາກສົ່ງຂໍ້ຄວາມໄປຫາທຸກຄັ້ງທີ່ມີເລື່ອງດີດີ ຫຼື ເລື່ອງຕະຫຼົກ. ແລະ ຍັງຈະເປັນແບບນັ້ນສະເໝີ. 💬💕",
    en: "You're the person I want to text every time something good or funny happens. That'll never change."
  },
  {
    lao: "ພະຍາຍາມຫາຂອງຂວັນທີ່ພິເສດເທົ່າກັບເມ. ແຕ່ລົ້ມເຫລວ. ເພາະເມເປັນສິ່ງທີ່ພິເສດທີ່ສຸດໃນໂລກ. 🎁😂",
    en: "I tried to find a gift as amazing as you. I failed. You're literally one of a kind."
  },
  {
    lao: "ຖ້າສາມາດຍ້ອນເວລາໄດ້, ຈະໃຊ້ມັນເພື່ອໃຊ້ເວລາກັບເມຫຼາຍຂຶ້ນ. 💫",
    en: "If I could rewind time, I'd just use it to spend more moments with you."
  },
  {
    lao: "ເຈົ້າເຮັດໃຫ້ສິ່ງທີ່ທຳມະດາທີ່ສຸດ ເປັນສິ່ງທີ່ພິເສດ ແລະ ໜ້າຈົດຈຳ. 🕊️💖",
    en: "You make even the ordinary feel like something worth remembering."
  },
  {
    lao: "ຂໍໃຫ້ປີທີ 23 ນີ້ນຳເມໄປໃຫ້ໃກ້ກັບທຸກສິ່ງທຸກຢ່າງທີ່ເມກຳລັງຕາມຫາ. 🌠",
    en: "May 23 bring you closer to everything you've been working toward."
  },
  {
    lao: "ເມນີ້ແຫຼະຄືເຫດຜົນທີ່ເຮັດໃຫ້ບາງຄວາມໝາຍຂອງເພງແຕກຕ່າງອອກໄປ. ເມຮູ້ດີວ່າເພງໃດ. 🎵😏",
    en: "You're the reason some songs hit different. You know which ones."
  },
  {
    lao: "ຈົ່ງເປັນຕົວຂອງຕົວເອງໂດຍບໍ່ລັງເລ — ເພາະນັ້ນແລະຄືຄວາມພິເສດຂອງເມ. 🦋",
    en: "Keep being unapologetically yourself — that's your superpower."
  },
  {
    lao: "ຕາມຄວາມຈິງ ຂ້ອຍພຽງຢາກເປັນເຫດຜົນທີ່ເຮັດໃຫ້ເມຍິ້ມໄດ້ໃນມື້ນີ້. ຂໍຫຼາຍໄປບໍ່? 🥺💕",
    en: "Honestly I just want to be the reason you smile today. Is that too much to ask?"
  },
  {
    lao: "ສຸກສັນວັນເກີດຄົບ 23 ປີ, ເມ! ສຸດທ້າຍແລ້ວຂ້ອຍຂໍໃຫ້ເມມີຄວາມສຸກ ແລະ ໜ້າຮັກແບບນີ້ — ທັງໃນມື້ນີ້ ແລະ ຕະຫຼອດໄປ. 💖🥂",
    en: "Happy 23rd, May! You are so loved — today and always."
  },
]

// Individual gift box component
const GiftBox = memo(function GiftBox({ index, isLocked, isOpen, isSelected, onOpen, delay, disabled }) {
  const colors = [
    'from-pink-400 to-pink-500',
    'from-purple-400 to-purple-500',
    'from-yellow-400 to-yellow-500',
    'from-blue-400 to-blue-500',
    'from-green-400 to-green-500',
  ]

  const ribbonColors = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-pink-300',
    'bg-yellow-300',
    'bg-pink-300',
  ]

  const photoSrc = isSelected ? '/photos/photo2.jpg' : '/photos/photo3.webp'
  const borderColor = isSelected ? 'border-red-400' : 'border-yellow-300'

  return (
    <div
      className={`relative transform transition-all duration-300 ${!disabled && isLocked ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} ${disabled && isLocked ? 'cursor-not-allowed opacity-70' : ''}`}
      onClick={() => isLocked && !disabled && onOpen(index)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isLocked ? (
        <div className="animate-bounce-slow">
          <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${colors[index]} rounded-lg shadow-lg relative overflow-hidden`}>
            <img src="/photos/photo3.webp" alt="Locked Gift" className="w-full h-full object-cover opacity-40" />
            <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 ${ribbonColors[index]}`} />
            <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 ${ribbonColors[index]}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl drop-shadow-lg">🔒</span>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/10 rounded-full blur-sm" />
        </div>
      ) : (
        <div className="animate-scale-in">
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-2xl border-4 ${borderColor} relative`}>
            <img
              src={photoSrc}
              alt="Birthday Gift"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FFE4EC" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="8" fill="%23999">photo</text></svg>'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
            {isSelected ? '❌' : '✨'}
          </div>
        </div>
      )}
    </div>
  )
})

const CARD_ANIMATIONS = [
  'wc-slide-right',    // 1
  'wc-float-up',       // 2
  'wc-zoom-in',        // 3
  'wc-slide-left',     // 4
  'wc-bounce-down',    // 5
  'wc-flip-x',         // 6
  'wc-rotate-in',      // 7
  'wc-slide-top',      // 8
  'wc-elastic',        // 9
  'wc-zoom-rotate',    // 10
  'wc-swing',          // 11
  'wc-bounce-up',      // 12
  'wc-roll-left',      // 13
  'wc-flip-y',         // 14
  'wc-drop-in',        // 15
  'wc-slide-right',    // 16
  'wc-zoom-in',        // 17
  'wc-rotate-in',      // 18
  'wc-elastic',        // 19
  'wc-float-up',       // 20
  'wc-bounce-down',    // 21
  'wc-zoom-rotate',    // 22
  'wc-grand-finale',   // 23
]

const WISH_CATS = [
  { emoji: '😸', anim: 'c-walk',    name: 'ແມວດີໃຈ' },
  { emoji: '😻', anim: 'c-love',    name: 'ແມວຮັກ' },
  { emoji: '🐱', anim: 'c-bob',     name: 'ແມວນ້ອຍ' },
  { emoji: '😹', anim: 'c-run',     name: 'ແມວຫົວ' },
  { emoji: '😼', anim: 'c-strut',   name: 'ແມວຫຼ້' },
  { emoji: '🙀', anim: 'c-shock',   name: 'ແມວຕົກໃຈ' },
  { emoji: '😺', anim: 'c-float',   name: 'ແມວລອຍ' },
  { emoji: '😽', anim: 'c-gift',    name: 'ແມວຂອງຂວັນ' },
  { emoji: '🐈', anim: 'c-walk',    name: 'ແມວຍ່າງ' },
  { emoji: '🐈‍⬛', anim: 'c-sneak', name: 'ແມວດຳ' },
  { emoji: '😾', anim: 'c-stomp',   name: 'ແມວໃຈຮ້າຍ' },
  { emoji: '😿', anim: 'c-sad',     name: 'ແມວໃຈເສຍ' },
  { emoji: '😸', anim: 'c-spin',    name: 'ແມວໝູນ' },
  { emoji: '😻', anim: 'c-fly',     name: 'ແມວບິນ' },
  { emoji: '🐱', anim: 'c-peek',    name: 'ແມວຍ່ອງ' },
  { emoji: '😹', anim: 'c-run',     name: 'ແມວເດັ໋ງ' },
  { emoji: '😼', anim: 'c-slide',   name: 'ແມວສະໄລ' },
  { emoji: '🙀', anim: 'c-zoom',    name: 'ແມວໄວ' },
  { emoji: '😺', anim: 'c-dance',   name: 'ແມວເຕັ້ນ' },
  { emoji: '😽', anim: 'c-float',   name: 'ແມວລອຍ' },
  { emoji: '🐈', anim: 'c-runback', name: 'ແມວເຮຍ' },
  { emoji: '🐈‍⬛', anim: 'c-ninja', name: 'ແມວນິນຈາ' },
  { emoji: '',   anim: 'c-twocats', name: '💕 ສຸດທ້າຍ!' },
]

// Single wish card shown inside the modal
function WishCard({ wish, index, total, onNext, animClass }) {
  const isLast = index === total - 1
  const progress = ((index + 1) / total) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl shadow-2xl p-6 max-w-sm w-full mx-4 border-4 border-yellow-300/50 wc-flip-card">

        {/* Top decoration */}
        <div className="text-center mb-3">
          <span className="text-2xl">🌸</span>
          <span className="text-xl mx-2">✨</span>
          <span className="text-2xl">🌸</span>
        </div>

        {/* Wish number */}
        <p className="text-center text-pink-400 text-sm font-semibold mb-2" style={LAO_FONT}>
          ຄຳອວຍພອນທີ {index + 1} / {total}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-pink-100 rounded-full h-2 mb-5">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Lao wish text */}
        <p
          className="text-center text-gray-800 text-lg font-medium leading-relaxed mb-4 min-h-[80px] flex items-center justify-center"
          style={LAO_FONT}
        >
          {wish.lao}
        </p>

        {/* Pixel cat stage */}
        <div className="relative h-20 overflow-hidden rounded-xl mb-4 border-2 border-pink-200"
          style={{ background: 'linear-gradient(to bottom, #fdf4ff 0%, #fce7f3 100%)' }}>
          {/* Pixel ground */}
          <div className="absolute bottom-0 left-0 right-0 h-5" style={{
            background: 'repeating-linear-gradient(to right, #f472b6 0px, #f472b6 12px, #ec4899 12px, #ec4899 24px)'
          }} />
          {/* Grass strip */}
          <div className="absolute bottom-5 left-0 right-0 h-2" style={{
            background: 'repeating-linear-gradient(to right, #86efac 0px, #86efac 8px, #4ade80 8px, #4ade80 16px)'
          }} />
          {/* Cat name tag */}
          <div className="absolute top-1 left-2 bg-white/70 rounded px-1.5 py-0.5 font-bold text-pink-500"
            style={{ ...LAO_FONT, fontSize: '11px' }}>
            {WISH_CATS[index].name}
          </div>
          {/* Cat */}
          {WISH_CATS[index].anim === 'c-twocats' ? (
            <>
              <span className="text-4xl c-twocat-left">😸</span>
              <span className="text-4xl c-twocat-right">😻</span>
            </>
          ) : (
            <span className={`text-4xl ${WISH_CATS[index].anim}`}>
              {WISH_CATS[index].emoji}
            </span>
          )}
        </div>

        {/* Next / Open Gift button */}
        <button
          onClick={onNext}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95 text-base"
          style={LAO_FONT}
        >
          {isLast ? 'ເປີດຂອງຂວັນ 🎁' : 'ຕໍ່ໄປ →'}
        </button>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-yellow-300 to-purple-300 rounded-b-3xl" />
      </div>
    </div>
  )
}

function Gift() {
  const [phase, setPhase] = useState('wishesOpen') // wishesOpen | cake | giftOpen
  const [wishIndex, setWishIndex] = useState(0)
  const [lockedGifts, setLockedGifts] = useState([true, true, true, true, true])
  const [selectedGift, setSelectedGift] = useState(null)
  const [hasChosen, setHasChosen] = useState(false)

  const handleNextWish = () => {
    if (wishIndex < WISHES.length - 1) {
      setWishIndex(prev => prev + 1)
    } else {
      // All 23 wishes done → show cake
      setPhase('cake')
    }
  }

  const handleCakeComplete = () => {
    // All candles blown → confetti burst → open gift
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FFD700', '#E6E6FA', '#98FB98', '#87CEEB', '#DDA0DD'],
    })
    setTimeout(() => setPhase('giftOpen'), 600)
  }

  const handleOpenGift = (index) => {
    if (hasChosen) return
    setHasChosen(true)
    setSelectedGift(index)

    const newLocked = [...lockedGifts]
    newLocked[index] = false
    setLockedGifts(newLocked)

    setTimeout(() => {
      const remaining = [0, 1, 2, 3, 4].filter(i => i !== index)
      remaining.forEach((giftIndex, i) => {
        setTimeout(() => {
          setLockedGifts(prev => {
            const updated = [...prev]
            updated[giftIndex] = false
            return updated
          })
        }, i * 300)
      })
    }, 1000)
  }

  const allOpened = lockedGifts.every(g => !g)

  return (
    <div className="w-full text-center mt-8">

      {/* Phase 1: Wishes cards modal */}
      {phase === 'wishesOpen' && (
        <WishCard
          key={wishIndex}
          wish={WISHES[wishIndex]}
          index={wishIndex}
          total={WISHES.length}
          onNext={handleNextWish}
          animClass={CARD_ANIMATIONS[wishIndex]}
        />
      )}

      {/* Phase 2: Cake — blow out candles to unlock the gift */}
      {phase === 'cake' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 border-4 border-yellow-300/50">
            <div className="text-center mb-4">
              <span className="text-3xl">🎂</span>
              <span className="text-2xl mx-2">✨</span>
              <span className="text-3xl">🎂</span>
            </div>
            <Cake onComplete={handleCakeComplete} />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-yellow-300 to-purple-300 rounded-b-3xl" />
          </div>
        </div>
      )}

      {/* Phase 3: Open Gift button (after all wishes) */}
      {phase === 'giftButton' && (
        <button
          onClick={() => setPhase('giftOpen')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
          style={LAO_FONT}
        >
          <span className="text-2xl group-hover:animate-bounce">🎁</span>
          <span>ເປີດຂອງຂວັນ!</span>
          <span className="text-2xl group-hover:animate-bounce">🎁</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
        </button>
      )}

      {/* Phase 4: Gift popup modal */}
      {phase === 'giftOpen' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => allOpened && setPhase('done')}
          />

          <div className="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full mx-4 animate-popup border-4 border-yellow-300/50">
            {allOpened && (
              <button
                onClick={() => setPhase('done')}
                className="absolute top-3 right-3 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors shadow-lg"
              >
                ✕
              </button>
            )}

            <div className="text-center mb-4">
              <span className="text-4xl">🎁</span>
              <span className="text-3xl mx-2">✨</span>
              <span className="text-4xl">🎁</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6 text-center" style={LAO_FONT}>
              {!hasChosen ? 'ເລືອກຂອງຂວັນໜຶ່ງ! (ໄດ້ໂອກາດດຽວ)' : allOpened ? 'ເຊີ້ງ!' : 'ກຳລັງເປີດ...'}
            </h3>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
              {[0, 1, 2, 3, 4].map((index) => (
                <GiftBox
                  key={index}
                  index={index}
                  isLocked={lockedGifts[index]}
                  isOpen={!lockedGifts[index]}
                  isSelected={selectedGift === index}
                  onOpen={handleOpenGift}
                  delay={index * 100}
                  disabled={hasChosen}
                />
              ))}
            </div>

            {allOpened && (
              <div className="text-center animate-fade-in">
                <p className="text-lg text-red-500 font-medium mb-2" style={LAO_FONT}>
                  ອຸ້ຍ! ເລືອກຜິດຊ້ຳ!
                </p>
                <p className="text-lg text-pink-600 font-medium mb-2" style={LAO_FONT}>
                  ປີໜ້າມາເລືອກໃໝ່ເດີ້! 😜
                </p>
                <p className="text-lg text-pink-600 font-medium" style={LAO_FONT}>
                  💝 ຢາກກິນມື້ໃດລະບອກເດີ້ ດຽວພາໄປ! 💝
                </p>
                <div className="mt-4 text-4xl">🎉🎊🎉</div>
                <p className="mt-4 text-sm text-gray-500" style={LAO_FONT}>
                  ກົດທາງນອກ ຫຼື ✕ ເພື່ອປິດ
                </p>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-yellow-300 to-purple-300 rounded-b-3xl" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }

        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }

        @keyframes popup {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-popup { animation: popup 0.4s ease-out forwards; }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        /* === PIXEL CAT ANIMATIONS === */

        /* walk left to right */
        @keyframes c-walk { 0% { left: -8%; } 100% { left: 108%; } }
        .c-walk { position: absolute; bottom: 18px; animation: c-walk 3s linear infinite; }

        /* run fast left to right */
        @keyframes c-run { 0% { left: -8%; } 100% { left: 108%; } }
        .c-run { position: absolute; bottom: 18px; animation: c-run 1.2s linear infinite; }

        /* sneak right to left */
        @keyframes c-sneak { 0% { left: 108%; } 100% { left: -8%; } }
        .c-sneak { position: absolute; bottom: 18px; animation: c-sneak 5s linear infinite; transform: scaleX(-1); }

        /* strut with sway */
        @keyframes c-strut {
          0% { left: -8%; transform: rotate(-5deg); }
          25% { transform: rotate(5deg); }
          50% { left: 50%; transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
          100% { left: 108%; transform: rotate(-5deg); }
        }
        .c-strut { position: absolute; bottom: 18px; animation: c-strut 4s linear infinite; }

        /* angry stomping */
        @keyframes c-stomp {
          0%   { left: -8%;  transform: translateY(0); }
          12%  { transform: translateY(-12px); }
          25%  { transform: translateY(0); }
          37%  { transform: translateY(-12px); }
          50%  { left: 50%; transform: translateY(0); }
          62%  { transform: translateY(-12px); }
          75%  { transform: translateY(0); }
          87%  { transform: translateY(-12px); }
          100% { left: 108%; transform: translateY(0); }
        }
        .c-stomp { position: absolute; bottom: 18px; animation: c-stomp 2.5s linear infinite; }

        /* sad slow walk */
        @keyframes c-sad { 0% { left: -8%; transform: rotate(8deg); } 100% { left: 108%; transform: rotate(8deg); } }
        .c-sad { position: absolute; bottom: 18px; animation: c-sad 6s linear infinite; }

        /* flies across with arc */
        @keyframes c-fly {
          0%  { left: -8%;  bottom: 18px; }
          40% { bottom: 50px; }
          60% { bottom: 50px; }
          100%{ left: 108%; bottom: 18px; }
        }
        .c-fly { position: absolute; animation: c-fly 2.5s ease-in-out infinite; }

        /* slides in from right, stops */
        @keyframes c-slide {
          0%   { left: 108%; }
          70%  { left: 15%; }
          85%  { left: 20%; }
          100% { left: 15%; }
        }
        .c-slide { position: absolute; bottom: 18px; animation: c-slide 3s ease-out infinite; }

        /* zooms super fast */
        @keyframes c-zoom { 0% { left: -8%; } 100% { left: 108%; } }
        .c-zoom { position: absolute; bottom: 18px; animation: c-zoom 0.6s linear infinite; }

        /* ninja flip across */
        @keyframes c-ninja {
          0%  { left: 108%; transform: scaleX(-1) rotate(0deg)    translateY(0); }
          30% { transform: scaleX(-1) rotate(-720deg)  translateY(-30px); }
          60% { transform: scaleX(-1) rotate(-1080deg) translateY(0); }
          100%{ left: -8%;  transform: scaleX(-1) rotate(-1440deg) translateY(0); }
        }
        .c-ninja { position: absolute; bottom: 18px; animation: c-ninja 3s ease-in-out infinite; }

        /* bounce in place */
        @keyframes c-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-22px) scale(1.1); }
        }
        .c-bounce { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-bounce 0.9s ease-in-out infinite; }

        /* gentle bob */
        @keyframes c-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .c-bob { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-bob 1.5s ease-in-out infinite; }

        /* slow float */
        @keyframes c-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-18px) scale(1.05); }
        }
        .c-float { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-float 2s ease-in-out infinite; }

        /* shock jump */
        @keyframes c-shock {
          0%, 55%, 100% { transform: translateY(0) scale(1); }
          10%  { transform: translateY(-35px) scale(1.4); }
          20%  { transform: translateY(0)     scale(0.8); }
          30%  { transform: translateY(-15px) scale(1.2); }
          40%  { transform: translateY(0)     scale(1); }
        }
        .c-shock { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-shock 2.5s ease-in-out infinite; }

        /* spin */
        @keyframes c-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .c-spin { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-spin 1s linear infinite; }

        /* dance wiggle */
        @keyframes c-dance {
          0%, 100% { transform: translateX(-14px) rotate(-12deg) scaleY(0.9); }
          50%       { transform: translateX(14px)  rotate(12deg)  scaleY(1.1); }
        }
        .c-dance { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-dance 0.5s ease-in-out infinite; }

        /* peek from right edge */
        @keyframes c-peek {
          0%, 20%   { right: -10%; transform: scaleX(-1); }
          35%, 65%  { right: 8%;   transform: scaleX(-1); }
          80%, 100% { right: -10%; transform: scaleX(-1); }
        }
        .c-peek { position: absolute; bottom: 18px; animation: c-peek 3s ease-in-out infinite; }

        /* run back and forth */
        @keyframes c-runback {
          0%   { left: 10%; transform: scaleX(1); }
          45%  { left: 80%; transform: scaleX(1); }
          50%  { left: 80%; transform: scaleX(-1); }
          95%  { left: 10%; transform: scaleX(-1); }
          100% { left: 10%; transform: scaleX(1); }
        }
        .c-runback { position: absolute; bottom: 18px; animation: c-runback 3s linear infinite; }

        /* heart path walk with floating hearts */
        @keyframes c-love-walk {
          0%   { left: -8%;  bottom: 18px; }
          25%  { bottom: 42px; }
          50%  { left: 50%;  bottom: 18px; }
          75%  { bottom: 42px; }
          100% { left: 108%; bottom: 18px; }
        }
        @keyframes c-love-heart {
          0%, 100% { transform: translateX(-50%) translateY(0);    opacity: 1; }
          50%       { transform: translateX(-50%) translateY(-16px); opacity: 0; }
        }
        .c-love { position: absolute; display: inline-block; animation: c-love-walk 4s ease-in-out infinite; }
        .c-love::after {
          content: '💕'; position: absolute; top: -18px; left: 50%;
          font-size: 0.9rem; animation: c-love-heart 1s ease-in-out infinite;
        }

        /* cat carries gift wobbling on head */
        @keyframes c-gift-walk { 0% { left: -8%; } 100% { left: 108%; } }
        @keyframes c-gift-wobble {
          0%, 100% { transform: translateX(-50%) rotate(-12deg); }
          50%       { transform: translateX(-50%) rotate(12deg); }
        }
        .c-gift { position: absolute; bottom: 18px; display: inline-block; animation: c-gift-walk 3s linear infinite; }
        .c-gift::before {
          content: '🎁'; position: absolute; top: -20px; left: 50%;
          font-size: 1rem; animation: c-gift-wobble 0.4s ease-in-out infinite;
        }

        /* two cats walk in, nuzzle, walk back */
        @keyframes c-twocat-left {
          0%   { left: -8%; }
          40%  { left: 25%; }
          55%  { left: 22%; transform: translateY(-8px) scale(1.15); }
          65%  { left: 25%; transform: translateY(0)    scale(1); }
          100% { left: -8%; }
        }
        @keyframes c-twocat-right {
          0%   { right: -8%;  transform: scaleX(-1); }
          40%  { right: 25%;  transform: scaleX(-1); }
          55%  { right: 22%;  transform: scaleX(-1) translateY(-8px) scale(1.15); }
          65%  { right: 25%;  transform: scaleX(-1) translateY(0)    scale(1); }
          100% { right: -8%;  transform: scaleX(-1); }
        }
        @keyframes c-meet-heart {
          0%, 30%, 70%, 100% { opacity: 0; transform: translateX(-50%) translateY(0); }
          45%, 60%           { opacity: 1; transform: translateX(-50%) translateY(-12px); }
        }
        .c-twocat-left  { position: absolute; bottom: 18px; display: inline-block; animation: c-twocat-left  4s ease-in-out infinite; }
        .c-twocat-right { position: absolute; bottom: 18px; animation: c-twocat-right 4s ease-in-out infinite; }
        .c-twocat-left::after {
          content: '💕'; position: absolute; top: -20px; right: -8px;
          font-size: 0.9rem; animation: c-meet-heart 4s ease-in-out infinite;
        }

        /* grand finale celebration */
        @keyframes c-finale {
          0%   { transform: scale(1)   rotate(0deg)   translateY(0); }
          15%  { transform: scale(1.4) rotate(25deg)  translateY(-28px); }
          30%  { transform: scale(1)   rotate(-15deg) translateY(0); }
          45%  { transform: scale(1.4) rotate(25deg)  translateY(-28px); }
          60%  { transform: scale(1)   rotate(-15deg) translateY(0); }
          75%  { transform: scale(1.4) rotate(25deg)  translateY(-28px); }
          90%  { transform: scale(1)   rotate(-15deg) translateY(0); }
          100% { transform: scale(1)   rotate(0deg)   translateY(0); }
        }
        .c-finale { position: absolute; bottom: 18px; left: calc(50% - 20px); animation: c-finale 1.5s ease-in-out infinite; }

        /* Flip card - Option B */
        @keyframes wc-flip-card {
          0% { transform: perspective(800px) rotateY(-90deg); opacity: 0; }
          60% { transform: perspective(800px) rotateY(10deg); opacity: 1; }
          80% { transform: perspective(800px) rotateY(-4deg); }
          100% { transform: perspective(800px) rotateY(0deg); opacity: 1; }
        }
        .wc-flip-card { animation: wc-flip-card 0.5s ease-out forwards; }

        /* 1, 16 - slide from right */
        @keyframes wc-slide-right {
          0% { transform: translateX(120px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .wc-slide-right { animation: wc-slide-right 0.4s ease-out forwards; }

        /* 2, 20 - float up */
        @keyframes wc-float-up {
          0% { transform: translateY(80px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .wc-float-up { animation: wc-float-up 0.5s ease-out forwards; }

        /* 3, 17 - zoom in */
        @keyframes wc-zoom-in {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .wc-zoom-in { animation: wc-zoom-in 0.4s ease-out forwards; }

        /* 4 - slide from left */
        @keyframes wc-slide-left {
          0% { transform: translateX(-120px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .wc-slide-left { animation: wc-slide-left 0.4s ease-out forwards; }

        /* 5, 21 - bounce down from top */
        @keyframes wc-bounce-down {
          0% { transform: translateY(-100px); opacity: 0; }
          60% { transform: translateY(12px); opacity: 1; }
          80% { transform: translateY(-6px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        .wc-bounce-down { animation: wc-bounce-down 0.55s ease-out forwards; }

        /* 6 - flip horizontal */
        @keyframes wc-flip-x {
          0% { transform: perspective(600px) rotateY(90deg); opacity: 0; }
          100% { transform: perspective(600px) rotateY(0deg); opacity: 1; }
        }
        .wc-flip-x { animation: wc-flip-x 0.5s ease-out forwards; }

        /* 7, 18 - rotate + scale */
        @keyframes wc-rotate-in {
          0% { transform: rotate(-12deg) scale(0.7); opacity: 0; }
          70% { transform: rotate(3deg) scale(1.02); opacity: 1; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        .wc-rotate-in { animation: wc-rotate-in 0.45s ease-out forwards; }

        /* 8 - slide from top */
        @keyframes wc-slide-top {
          0% { transform: translateY(-80px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .wc-slide-top { animation: wc-slide-top 0.4s ease-out forwards; }

        /* 9, 19 - elastic spring */
        @keyframes wc-elastic {
          0% { transform: scale(0); opacity: 0; }
          55% { transform: scale(1.15); opacity: 1; }
          75% { transform: scale(0.93); }
          90% { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        .wc-elastic { animation: wc-elastic 0.6s ease-out forwards; }

        /* 10, 22 - zoom + rotate */
        @keyframes wc-zoom-rotate {
          0% { transform: scale(0.6) rotate(8deg); opacity: 0; }
          70% { transform: scale(1.03) rotate(-2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .wc-zoom-rotate { animation: wc-zoom-rotate 0.45s ease-out forwards; }

        /* 11 - swing from top */
        @keyframes wc-swing {
          0% { transform: rotate(-18deg) translateY(-40px); opacity: 0; transform-origin: top center; }
          50% { transform: rotate(6deg) translateY(0); opacity: 1; transform-origin: top center; }
          70% { transform: rotate(-3deg); transform-origin: top center; }
          100% { transform: rotate(0deg); opacity: 1; transform-origin: top center; }
        }
        .wc-swing { animation: wc-swing 0.6s ease-out forwards; }

        /* 12 - bounce up from bottom */
        @keyframes wc-bounce-up {
          0% { transform: translateY(100px); opacity: 0; }
          60% { transform: translateY(-12px); opacity: 1; }
          80% { transform: translateY(6px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        .wc-bounce-up { animation: wc-bounce-up 0.55s ease-out forwards; }

        /* 13 - roll in from left */
        @keyframes wc-roll-left {
          0% { transform: translateX(-150px) rotate(-20deg); opacity: 0; }
          100% { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        .wc-roll-left { animation: wc-roll-left 0.5s ease-out forwards; }

        /* 14 - flip vertical */
        @keyframes wc-flip-y {
          0% { transform: perspective(600px) rotateX(90deg); opacity: 0; }
          100% { transform: perspective(600px) rotateX(0deg); opacity: 1; }
        }
        .wc-flip-y { animation: wc-flip-y 0.5s ease-out forwards; }

        /* 15 - drop in with impact */
        @keyframes wc-drop-in {
          0% { transform: translateY(-200px) scale(0.8); opacity: 0; }
          70% { transform: translateY(8px) scale(1.02); opacity: 1; }
          85% { transform: translateY(-4px) scale(0.99); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .wc-drop-in { animation: wc-drop-in 0.55s ease-out forwards; }

        /* 23 - grand finale */
        @keyframes wc-grand-finale {
          0% { transform: scale(0) rotate(25deg); opacity: 0; }
          40% { transform: scale(1.2) rotate(-6deg); opacity: 1; }
          60% { transform: scale(0.95) rotate(3deg); }
          80% { transform: scale(1.05) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .wc-grand-finale { animation: wc-grand-finale 0.7s ease-out forwards; }
      `}</style>
    </div>
  )
}

export default Gift
