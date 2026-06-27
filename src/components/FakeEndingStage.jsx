import { useState, useEffect } from 'react'

export default function FakeEndingStage({ onReveal }) {
  const [phase, setPhase] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [particles, setParticles] = useState([])
  const [burstParticles, setBurstParticles] = useState([])
  const farewellText = 'Terima kasih sudah membaca sampai sini.'

  useEffect(() => {
    window.scrollTo(0, 0)
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 4 + 2, duration: 6 + Math.random() * 8,
      delay: Math.random() * 5, opacity: 0.15 + Math.random() * 0.25,
    }))
    setParticles(p)
  }, [])

  useEffect(() => {
    if (phase !== 0) return
    if (typedText.length < farewellText.length) {
      const timer = setTimeout(() => {
        setTypedText(farewellText.slice(0, typedText.length + 1))
      }, 55)
      return () => clearTimeout(timer)
    }
  }, [phase, typedText])

  useEffect(() => {
    if (phase === 2) {
      const t1 = setTimeout(() => setPhase(3), 2000)
      return () => clearTimeout(t1)
    }
    if (phase === 3) {
      const t1 = setTimeout(() => setPhase(4), 2200)
      return () => clearTimeout(t1)
    }
    if (phase === 4) {
      const bp = Array.from({ length: 50 }).map((_, i) => {
        const angle = (Math.random() * 360) * (Math.PI / 180)
        const velocity = 40 + Math.random() * 140
        return {
          id: i, x: Math.cos(angle) * velocity, y: Math.sin(angle) * velocity,
          size: 2 + Math.random() * 5,
          color: ['#f472b6', '#a78bfa', '#67e8f9', '#c084fc', '#e879f9', '#818cf8'][Math.floor(Math.random() * 6)],
          delay: Math.random() * 0.5, duration: 1.2 + Math.random() * 1.5,
        }
      })
      setBurstParticles(bp)
      const t2 = setTimeout(() => { setPhase(5); setTimeout(onReveal, 4500) }, 2500)
      return () => { clearTimeout(t2) }
    }
  }, [phase, onReveal])

  const handleClick = () => {
    if (phase === 0 && typedText.length >= farewellText.length) setPhase(1)
    else if (phase === 1) setPhase(2)
  }

  if (phase === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush via-white to-lavender" />
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(244,114,182,${p.opacity}), rgba(168,85,247,${p.opacity * 0.5}))`,
            animation: `floatParticle ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }} />
        ))}
        <div className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full bg-pink-200/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[15%] right-[10%] w-64 h-64 rounded-full bg-purple-200/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[60%] w-40 h-40 rounded-full bg-rose-200/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="relative z-10 text-center max-w-lg px-8">
          <div className="text-5xl mb-8 animate-gentleBounce">✨</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-6 leading-snug">Yak, segitu aja!</h2>
          <div className="h-14 flex items-center justify-center mb-4">
            <p className="text-gray-500 text-lg leading-relaxed">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-pink-400 ml-0.5 animate-pulse" />
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-10 opacity-0 animate-delayedFadeIn">Semoga web ini bikin hari kamu sedikit lebih berwarna.</p>
          <button onClick={handleClick} className={`px-10 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 text-gray-500 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-white/80 transition-all duration-300 cursor-pointer ${typedText.length >= farewellText.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            Selesai, tutup halaman
          </button>
          <p className="text-[11px] text-gray-300 mt-6 italic">klik untuk menutup</p>
        </div>
      </div>
    )
  }

  if (phase === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush via-white to-lavender" />
        <div className="absolute inset-0 bg-radial-vignette opacity-30" />
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(244,114,182,${p.opacity * 0.5}), transparent)`,
            animation: `floatParticle ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }} />
        ))}
        <div className="relative z-10 text-center max-w-lg px-8 animate-fadeIn">
          <div className="text-5xl mb-6">🤔</div>
          <p className="text-gray-500 text-lg mb-2 italic">Eh, bentar...</p>
          <p className="text-gray-400 text-base mb-8">Kok rasanya ada yang kurang ya?</p>
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-40 animate-pulse" />
            <button onClick={handleClick} className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer animate-subtlePulse">
              Tunggu... ada lagi? 👀
            </button>
          </div>
          <p className="text-xs text-gray-300 mt-6 italic animate-pulse">kok tombolnya beda ya...</p>
        </div>
      </div>
    )
  }

  if (phase === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush via-white to-lavender animate-dimScreen" />
        <div className="absolute inset-0 bg-black/0 animate-growDark" />
        <div className="relative z-10 text-center animate-fadeOut-slow">
          <p className="text-gray-500 text-lg tracking-wide">Menutup halaman...</p>
          <div className="mt-4 flex justify-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-dotPulse" style={{ animationDelay: '0s' }} />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-dotPulse" style={{ animationDelay: '0.3s' }} />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-dotPulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    )
  }

  if (phase === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
            background: 'rgba(168, 85, 247, 0.2)',
            animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s`,
          }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] max-w-lg h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-heartbeatLine" />
        </div>
        <div className="relative z-10 text-center animate-fadeIn-slow">
          <p className="text-white/20 text-xl sm:text-2xl font-light tracking-[0.2em]">Selesai.</p>
          <p className="text-white/10 text-sm mt-4 tracking-widest uppercase">atau...</p>
          <div className="absolute inset-0 bg-white/[0.02] animate-screenFlicker pointer-events-none" style={{ top: '-50vh', left: '-50vw', width: '200vw', height: '200vh' }} />
        </div>
      </div>
    )
  }

  if (phase === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60vmax] h-[60vmax] rounded-full bg-gradient-radial-burst animate-softExpand" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full border border-purple-400/30 animate-expandRing" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full border border-pink-400/20 animate-expandRing2" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {burstParticles.map(p => (
            <div key={p.id} className="absolute rounded-full animate-softExplode" style={{
              width: `${p.size}px`, height: `${p.size}px`, backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              '--tx': `${p.x}px`, '--ty': `${p.y}px`,
              animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-white/80 animate-softFlash" />
        </div>
        <div className="relative z-10 text-center animate-fadeScaleIn">
          <p className="text-purple-300/40 text-xs uppercase tracking-[0.5em] mb-4">tunggu...</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 leading-tight">
            Ini belum selesai.
          </h2>
        </div>
      </div>
    )
  }

  if (phase === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200vmax] h-[200vmax] animate-radialBurst">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 origin-left" style={{
                width: '50%', height: '2px',
                transform: `rotate(${i * 30}deg)`,
                background: 'linear-gradient(to right, rgba(168,85,247,0.4), rgba(236,72,153,0.2), transparent)',
              }} />
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-500/15 blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="relative z-10 text-center max-w-xl px-8 space-y-6 animate-cinematicReveal">
          <p className="text-purple-300/50 text-xs sm:text-sm uppercase tracking-[0.5em]">kamu pikir udah selesai?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white/90 leading-tight">
            Belum dong.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Ini baru mulai.</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto" />
          <p className="text-white/40 text-base sm:text-lg leading-relaxed italic">Karena kamu suka liat langit malam...</p>
          <p className="text-emerald-300/60 text-sm sm:text-base">aku siapin sesuatu yang <span className="text-white/80 font-medium">spesial</span> buat kamu.</p>
          <div className="pt-4 flex justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-dotTravel" style={{ animationDelay: '0s' }} />
            <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-dotTravel" style={{ animationDelay: '0.2s' }} />
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-dotTravel" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    )
  }

  return null
}
