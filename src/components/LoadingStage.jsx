import { useState, useEffect, useMemo } from 'react'
import { LOADING_TEXTS } from '../data'

export default function LoadingStage({ onComplete }) {
  const [textIndex, setTextIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  const petals = useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 4 + Math.random() * 8,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      color: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#e9d5ff', '#ddd6fe', '#c4b5fd'][Math.floor(Math.random() * 6)],
      opacity: 0.3 + Math.random() * 0.4,
    })), [])

  useEffect(() => {
    if (textIndex >= LOADING_TEXTS.length) {
      setTimeout(onComplete, 600)
      return
    }
    const currentText = LOADING_TEXTS[textIndex]
    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[charIndex])
        setCharIndex(prev => prev + 1)
      }, 35)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1)
        setCharIndex(0)
        setDisplayedText('')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [textIndex, charIndex, onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        const jump = Math.random() > 0.85 ? -5 : Math.random() * 6 + 1
        return Math.min(100, Math.max(0, prev + jump))
      })
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fde2e8] via-[#fef7f0] to-[#ede9fe]" />
      <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-pink-200/25 blur-[80px]" style={{ animation: 'softGlow 6s ease-in-out infinite' }} />
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-purple-200/20 blur-[90px]" style={{ animation: 'softGlow 8s ease-in-out infinite 2s' }} />
      <div className="absolute top-[55%] left-[55%] w-48 h-48 rounded-full bg-rose-200/20 blur-[70px]" style={{ animation: 'softGlow 7s ease-in-out infinite 1s' }} />

      {petals.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
            animation: `floatUp ${p.dur}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}

      {['✨', '💗', '🌸', '⭐', '🦋', '💫', '🌷'].map((emoji, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-lg sm:text-xl pointer-events-none"
          style={{
            left: `${8 + i * 13}%`,
            bottom: '-30px',
            animation: `floatUp ${10 + i * 2}s ease-in-out infinite ${i * 1.5}s`,
            opacity: 0.5,
            filter: 'blur(0.3px)',
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="relative z-10 text-center px-8 max-w-lg">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 rounded-full bg-pink-300/20 blur-xl scale-150 animate-pulse" />
          <div className="relative text-5xl animate-bounce">💝</div>
        </div>

        <div className="h-16 flex items-center justify-center mb-8">
          <p className="text-lg text-gray-600 font-medium">
            {displayedText}
            <span className="inline-block w-0.5 h-5 bg-pink-400 ml-1 animate-pulse" />
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <div className="h-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-pink-100 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/80 blur-[2px] animate-pulse" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {Math.round(progress)}%{' '}
            {progress > 60 && progress < 80 ? '(sabar ya...)' : ''}
            {progress >= 90 ? '(dikit lagi!)' : ''}
          </p>
        </div>

        <div className="mt-8 space-y-1">
          {progress > 20 && progress < 40 && (
            <p className="text-xs text-pink-400/60 italic animate-fadeIn">lagi nyiapin sesuatu yang spesial...</p>
          )}
          {progress >= 40 && progress < 60 && (
            <p className="text-xs text-purple-400/60 italic animate-fadeIn">bentar lagi, jangan kemana-mana ya~</p>
          )}
          {progress >= 80 && (
            <p className="text-xs text-rose-400/60 italic animate-fadeIn">siap-siap ya... 💗</p>
          )}
        </div>
      </div>
    </div>
  )
}
