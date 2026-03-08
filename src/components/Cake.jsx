import { useState } from 'react'

const CANDLE_COLORS = [
  { body: '#f472b6', stripe: '#fce7f3', glow: 'rgba(244,114,182,0.4)' }, // pink
  { body: '#a78bfa', stripe: '#ede9fe', glow: 'rgba(167,139,250,0.4)' }, // purple
  { body: '#fbbf24', stripe: '#fef9c3', glow: 'rgba(251,191,36,0.4)'  }, // yellow
  { body: '#34d399', stripe: '#d1fae5', glow: 'rgba(52,211,153,0.4)'  }, // green
  { body: '#60a5fa', stripe: '#dbeafe', glow: 'rgba(96,165,250,0.4)'  }, // blue
]

const DRIP_HEIGHTS = [14, 10, 16, 8, 14, 11, 16, 9, 13]

function Candle({ index, isLit, isBlownOut, onClick }) {
  const c = CANDLE_COLORS[index]
  return (
    <button className="ck-candle" onClick={onClick} disabled={!isLit}>
      {/* Flame */}
      {isLit && (
        <div className="ck-flame-wrap">
          <div className="ck-flame-glow" style={{ background: c.glow, boxShadow: `0 0 12px 6px ${c.glow}` }} />
          <div className="ck-flame-outer" />
          <div className="ck-flame-inner" />
        </div>
      )}

      {/* Smoke */}
      {isBlownOut && (
        <div className="ck-smoke-wrap">
          <div className="ck-smoke ck-smoke-a" />
          <div className="ck-smoke ck-smoke-b" />
        </div>
      )}

      {/* Spacer when idle */}
      {!isLit && !isBlownOut && <div className="ck-spacer" />}

      {/* Wick */}
      <div className="ck-wick" />

      {/* Body — striped via repeating-gradient */}
      <div
        className="ck-body"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            ${c.body}   0px, ${c.body}   7px,
            ${c.stripe} 7px, ${c.stripe} 13px
          )`,
          boxShadow: `inset -3px 0 6px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)`,
        }}
      />

      {/* Wax drip at base */}
      <div className="ck-wax" style={{ background: c.stripe }} />
    </button>
  )
}

export default function Cake({ onComplete }) {
  const [candles, setCandles] = useState(Array(5).fill('lit'))
  const [done, setDone] = useState(false)

  const litCount = candles.filter(c => c === 'lit').length

  const blowOut = (i) => {
    if (candles[i] !== 'lit' || done) return
    const next = [...candles]
    next[i] = 'blownOut'
    setCandles(next)
    if (next.every(c => c !== 'lit')) {
      setDone(true)
      setTimeout(() => onComplete?.(), 2200)
    }
  }

  return (
    <div className="ck-root">

      {/* Instruction */}
      <div className="ck-instruction">
        {done ? (
          <p className="ck-done">✨ Wish made! 🎁 Opening your gift...</p>
        ) : (
          <p className="ck-hint"
          style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
          >
            🕯️ ເປົ່າເຄັກແມະບາງເທື່ອໄດ້ຂອງຂວັນ🤭!
            <span className="ck-badge">{litCount} left</span>
          </p>
        )}
      </div>

      {/* Candles */}
      <div className="ck-candles-row">
        {candles.map((state, i) => (
          <Candle
            key={i}
            index={i}
            isLit={state === 'lit'}
            isBlownOut={state === 'blownOut'}
            onClick={() => blowOut(i)}
          />
        ))}
      </div>

      {/* Cake body — flex column, centered */}
      <div className="ck-cake">

        {/* Top layer with frosting cap + drips */}
        <div className="ck-layer-wrap" style={{ width: 180 }}>
          {/* White frosting cap */}
          <div className="ck-frosting-cap" />
          {/* Drips */}
          <div className="ck-drips">
            {DRIP_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="ck-drip"
                style={{
                  height: h,
                  left: `${5 + i * 11.5}%`,
                }}
              />
            ))}
          </div>
          {/* Slab */}
          <div
            className="ck-slab"
            style={{
              height: 38,
              background: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
              borderRadius: '6px 6px 0 0',
            }}
          />
        </div>

        {/* Middle layer */}
        <div
          className="ck-slab"
          style={{
            width: 220,
            height: 52,
            background: 'linear-gradient(135deg, #fdba74 0%, #ea580c 100%)',
          }}
        >
          <div className="ck-mid-decos">
            {['🌸', '💕', '🌸', '💕', '🌸'].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </div>

        {/* Bottom layer */}
        <div
          className="ck-slab"
          style={{
            width: 264,
            height: 60,
            background: 'linear-gradient(135deg, #fde68a 0%, #d97706 100%)',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <div className="ck-bot-decos">
            {['✿', '✿', '✿', '✿', '✿', '✿', '✿'].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </div>

        {/* Plate */}
        <div className="ck-plate" />
      </div>

      <style>{`
        /* ===== Root ===== */
        .ck-root {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding-bottom: 4px;
          user-select: none;
        }

        /* ===== Instruction ===== */
        .ck-instruction { margin-bottom: 14px; text-align: center; }

        .ck-hint {
          color: #be185d;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .ck-badge {
          background: #fce7f3;
          color: #9d174d;
          border-radius: 9999px;
          padding: 1px 10px;
          font-size: 0.8rem;
        }

        .ck-done {
          color: #7c3aed;
          font-weight: 700;
          font-size: 1rem;
          animation: ck-pulse 1.2s ease-in-out infinite;
        }
        @keyframes ck-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }

        /* ===== Candles row ===== */
        .ck-candles-row {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 12px;
          margin-bottom: -1px;
          position: relative;
          z-index: 2;
        }

        .ck-candle {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .ck-candle:not(:disabled):hover { transform: scale(1.15) translateY(-2px); }
        .ck-candle:not(:disabled):active { transform: scale(0.9); }
        .ck-candle:disabled { cursor: default; }

        /* Flame */
        .ck-flame-wrap {
          position: relative;
          width: 18px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          margin-bottom: 2px;
        }
        .ck-flame-glow {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          animation: ck-glow 0.9s ease-in-out infinite alternate;
        }
        @keyframes ck-glow {
          0%   { transform: translateX(-50%) scale(1);   opacity: 0.5; }
          100% { transform: translateX(-50%) scale(1.4); opacity: 0.8; }
        }
        .ck-flame-outer {
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: 13px;
          height: 22px;
          background: linear-gradient(to top, #f97316, #facc15, #fef3c7);
          border-radius: 50% 50% 35% 35% / 55% 55% 45% 45%;
          transform: translateX(-50%);
          animation: ck-flicker 0.4s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }
        .ck-flame-inner {
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 5px;
          height: 11px;
          background: linear-gradient(to top, #fef08a, #ffffff);
          border-radius: 50% 50% 35% 35% / 55% 55% 45% 45%;
          transform: translateX(-50%);
          animation: ck-flicker 0.4s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }
        @keyframes ck-flicker {
          0%   { transform: translateX(-50%) scaleX(1)    rotate(-3deg); }
          100% { transform: translateX(-50%) scaleX(0.85) rotate(3deg); }
        }

        /* Smoke */
        .ck-smoke-wrap {
          position: relative;
          width: 18px;
          height: 30px;
          margin-bottom: 2px;
        }
        .ck-smoke {
          position: absolute;
          bottom: 0;
          width: 3px;
          border-radius: 9999px;
          background: linear-gradient(to top, rgba(150,150,150,0.65), transparent);
          animation: ck-smoke-up 1.5s ease-out infinite;
        }
        .ck-smoke-a { left: 30%; height: 22px; }
        .ck-smoke-b { left: 58%; height: 16px; animation-delay: 0.4s; }
        @keyframes ck-smoke-up {
          0%   { opacity: 0.7; transform: translateY(0)     scaleX(1); }
          100% { opacity: 0;   transform: translateY(-18px) scaleX(0.2) translateX(3px); }
        }

        /* Spacer */
        .ck-spacer { height: 32px; }

        /* Wick */
        .ck-wick {
          width: 2px;
          height: 7px;
          background: #374151;
          border-radius: 9999px;
        }

        /* Candle body */
        .ck-body {
          width: 16px;
          height: 54px;
          border-radius: 3px 3px 2px 2px;
        }

        /* Wax drip at base */
        .ck-wax {
          width: 10px;
          height: 7px;
          border-radius: 0 0 8px 8px;
          margin-top: -1px;
        }

        /* ===== Cake body ===== */
        .ck-cake {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top layer wrapper (for drips positioning) */
        .ck-layer-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* White frosting cap */
        .ck-frosting-cap {
          height: 10px;
          background: linear-gradient(to bottom, #fff 0%, #fce7f3 100%);
          border-radius: 8px 8px 0 0;
          border: 1.5px solid #fbcfe8;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
        }

        /* Drips container */
        .ck-drips {
          position: absolute;
          top: 5px;
          left: 0;
          right: 0;
          z-index: 0;
        }
        .ck-drip {
          position: absolute;
          width: 11px;
          background: linear-gradient(to bottom, #fce7f3, #fbcfe8);
          border-radius: 0 0 8px 8px;
          transform: translateX(-50%);
        }

        /* Generic slab */
        .ck-slab {
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 -4px 8px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.1);
        }

        /* Middle decos */
        .ck-mid-decos {
          display: flex;
          justify-content: space-around;
          width: 100%;
          padding: 0 14px;
          font-size: 1rem;
        }

        /* Bottom decos */
        .ck-bot-decos {
          display: flex;
          justify-content: space-around;
          width: 100%;
          padding: 0 12px;
          font-size: 0.8rem;
          color: #fef9c3;
        }

        /* Plate */
        .ck-plate {
          width: 296px;
          height: 14px;
          background: linear-gradient(to bottom, #f8fafc, #cbd5e1);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.13);
          margin-top: 5px;
        }
      `}</style>
    </div>
  )
}
