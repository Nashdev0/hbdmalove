import { useState, useRef, useEffect, useMemo } from 'react'
import { LETTER_PARAGRAPHS, REASONS, CARD_GRADIENTS } from '../data'

export default function LetterAndReasonsStage({ onComplete, onOpenEnvelope, showFinal }) {
  const [isOpen, setIsOpen] = useState(showFinal)
  const [visibleParagraphs, setVisibleParagraphs] = useState(new Set())
  const [letterDone, setLetterDone] = useState(showFinal)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [allReasonsRevealed, setAllReasonsRevealed] = useState(showFinal)
  const paragraphRefs = useRef([])
  const cardRefs = useRef([])
  const finalRef = useRef(null)

  useEffect(() => {
    if (showFinal) {
      setVisibleParagraphs(new Set(Array.from({ length: 22 }, (_, i) => i)))
      setVisibleCards(new Set(Array.from({ length: 17 }, (_, i) => i)))
    }
  }, [showFinal])

  useEffect(() => {
    if (showFinal && finalRef.current) {
      setTimeout(() => {
        finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }
  }, [showFinal])

  const hearts = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 8 + Math.random() * 14,
      dur: 6 + Math.random() * 10,
      delay: Math.random() * 6,
      color: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#e9d5ff', '#fecdd3'][Math.floor(Math.random() * 5)],
    })), [])

  const bokehOrbs = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 100,
      color: ['rgba(252,231,243,0.2)', 'rgba(233,213,255,0.15)', 'rgba(253,226,232,0.18)', 'rgba(196,181,253,0.12)'][Math.floor(Math.random() * 4)],
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    })), [])

  useEffect(() => {
    if (!isOpen) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleParagraphs(prev => {
              const next = new Set(prev)
              next.add(index)
              if (next.size === LETTER_PARAGRAPHS.length) {
                setTimeout(() => setLetterDone(true), 600)
              }
              return next
            })
          }
        })
      },
      { threshold: 0.4 }
    )
    paragraphRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [isOpen])

  useEffect(() => {
    if (!letterDone) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.cardindex)
            setVisibleCards(prev => {
              const next = new Set(prev)
              next.add(index)
              if (next.size === 17) setTimeout(() => setAllReasonsRevealed(true), 500)
              return next
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    cardRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [letterDone])

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fde2e8] via-[#fef7f0] to-[#ede9fe]" />
        <div className="absolute top-[20%] left-[15%] w-56 h-56 rounded-full bg-pink-200/20 blur-[80px]" style={{ animation: 'softGlow 7s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] right-[15%] w-64 h-64 rounded-full bg-purple-200/18 blur-[90px]" style={{ animation: 'softGlow 9s ease-in-out infinite 1.5s' }} />
        {hearts.map(h => (
          <div key={h.id} className="absolute" style={{
            left: `${h.x}%`, bottom: '-30px', fontSize: `${h.size}px`,
            color: h.color, animation: `heartRise ${h.dur}s ease-in-out infinite ${h.delay}s`,
            filter: 'blur(0.5px)',
          }}>♥</div>
        ))}
        <div className="relative z-10 text-center">
          <div onClick={() => { setIsOpen(true); onOpenEnvelope?.() }} className="cursor-pointer group relative mx-auto w-72 sm:w-80">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-pink-300/20 to-purple-300/15 blur-2xl" style={{ animation: 'softGlow 4s ease-in-out infinite' }} />
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-pink-100 shadow-2xl p-8 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.2)] group-hover:scale-[1.02]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8rem] border-r-[8rem] border-b-[3rem] border-l-transparent border-r-transparent border-b-pink-100/80 transition-all duration-500 group-hover:border-b-pink-200/80" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600 font-medium mb-2">Ada surat buat kamu</p>
                <p className="text-sm text-gray-400">tap untuk membuka</p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-1 bg-pink-100 rounded-full w-3/4 mx-auto" />
                <div className="h-1 bg-pink-50 rounded-full w-1/2 mx-auto" />
                <div className="h-1 bg-pink-50 rounded-full w-2/3 mx-auto" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-6 animate-pulse">klik amplop di atas</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-[#fde2e8] via-[#fef7f0] to-[#ede9fe]" />
      {bokehOrbs.map(orb => (
        <div key={orb.id} className="fixed rounded-full pointer-events-none" style={{
          left: `${orb.x}%`, top: `${orb.y}%`, width: `${orb.size}px`, height: `${orb.size}px`,
          background: `radial-gradient(circle, ${orb.color}, transparent)`,
          animation: `bokehDrift ${orb.dur}s ease-in-out infinite ${orb.delay}s`,
        }} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        <div className="fixed left-2 sm:left-6 top-[30%] space-y-8 pointer-events-none z-20">
          <div className="text-xl opacity-30 animate-pulse" style={{ animationDuration: '4s' }}>🌸</div>
          <div className="text-lg opacity-20 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>🦋</div>
          <div className="text-xl opacity-25 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>🌷</div>
        </div>
        <div className="fixed right-2 sm:right-6 top-[40%] space-y-8 pointer-events-none z-20">
          <div className="text-xl opacity-25 animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>🌺</div>
          <div className="text-lg opacity-20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>✿</div>
          <div className="text-xl opacity-30 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2.5s' }}>🌸</div>
        </div>

        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-2xl p-8 sm:p-12 animate-fadeIn">
          <div className="absolute -top-3 -left-3 text-2xl rotate-[-15deg] opacity-60">🌸</div>
          <div className="absolute -top-2 -right-4 text-xl rotate-[20deg] opacity-50">🌷</div>
          <div className="absolute -bottom-3 -left-2 text-xl rotate-[10deg] opacity-50">🌺</div>
          <div className="absolute -bottom-2 -right-3 text-2xl rotate-[-10deg] opacity-60">🌸</div>
          <div className="absolute top-1/2 -left-4 text-lg opacity-40">✿</div>
          <div className="absolute top-1/3 -right-3 text-lg opacity-40">❀</div>

          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-pink-200 text-lg">✿</span>
              <div className="inline-block text-3xl">💌</div>
              <span className="text-purple-200 text-lg">✿</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink-200" />
              <span className="text-pink-300 text-xs">❀</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-pink-200" />
            </div>
          </div>

          <div className="space-y-6">
            {LETTER_PARAGRAPHS.map((para, i) => (
              <div key={i} ref={el => paragraphRefs.current[i] = el} data-index={i}
                className={`transition-all duration-700 ease-out ${visibleParagraphs.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`text-gray-600 leading-relaxed whitespace-pre-line ${
                  i === 3 ? 'text-xl font-semibold text-pink-500 mt-8' :
                  i === LETTER_PARAGRAPHS.length - 1 ? 'text-right italic text-pink-400 font-handwritten text-lg mt-8' :
                  'text-base'
                }`}>{para}</p>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 ${letterDone ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink-200" />
              <span className="text-pink-300">🌸</span>
              <span className="text-purple-300">🦋</span>
              <span className="text-pink-300">🌸</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-pink-200" />
            </div>
          </div>
        </div>

        {letterDone && (
          <div className="flex items-center justify-center gap-3 animate-fadeIn">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-200/50" />
            <span className="text-pink-200/60 text-sm">✿</span>
            <span className="text-purple-200/50 text-xs">❀</span>
            <span className="text-pink-200/60 text-sm">✿</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-200/50" />
          </div>
        )}

        {letterDone && (
          <>
            <div className="text-center animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
                17 Alasan Kenapa Kamu <span className="text-pink-500">Spesial</span>
              </h2>
              <p className="text-sm text-gray-400 mt-2">scroll pelan-pelan ya, dinikmati</p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mt-4" />
            </div>

            <div className="space-y-8">
              {REASONS.map((reason, i) => (
                <div key={i} ref={el => cardRefs.current[i] = el} data-cardindex={i}
                  className={`transform transition-all duration-700 ease-out ${visibleCards.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${CARD_GRADIENTS[i]} border border-white/50 shadow-lg backdrop-blur-sm`}>
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-xl font-bold text-pink-500 shadow-sm">{reason.num}</span>
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line pt-2">{reason.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allReasonsRevealed && (
              <div className="animate-fadeIn space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
                    Kumpulan Foto <span className="text-pink-500">Kamu</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mx-auto">
                  {[
                    { rotate: '-rotate-3' }, { rotate: 'rotate-2' }, { rotate: 'rotate-3' }, { rotate: '-rotate-2' },
                    { rotate: 'rotate-2' }, { rotate: '-rotate-3' }, { rotate: '-rotate-2' }, { rotate: 'rotate-3' },
                  ].map((item, i) => (
                    <div key={i} className={`${item.rotate} hover:rotate-0 hover:scale-105 transition-all duration-300`}>
                      <div className="bg-white rounded-xl shadow-2xl p-3 pb-12 border border-gray-100">
                        <div className="w-full aspect-[4/5] rounded-md overflow-hidden bg-white">
                          <img src={`img/gallery-${i + 1}.jpg`} alt={`kenangan ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-200/50" />
              <span className="text-pink-200/60 text-sm">🌷</span>
              <span className="text-purple-200/50 text-xs">✨</span>
              <span className="text-pink-200/60 text-sm">🌷</span>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-200/50" />
            </div>

            {allReasonsRevealed && (
              <div className="animate-fadeIn space-y-10 mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                  <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-pink-100 to-rose-50 border border-white/50 shadow-lg backdrop-blur-sm">
                    <div className="text-3xl mb-4">🌸</div>
                    <p className="text-gray-700 font-semibold text-base mb-3">"Kenapa semua orang betah berlama-lama di dekat kamu?"</p>
                    <p className="text-gray-500 text-sm leading-relaxed italic">"Karena tanpa kamu sadari, kamu punya cara bikin suasana jadi hangat. Satu senyum kecil dari kamu, dan tiba-tiba dunia terasa lebih ringan buat semua orang di sekitarmu."</p>
                  </div>
                  <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-100 to-pink-50 border border-white/50 shadow-lg backdrop-blur-sm">
                    <div className="text-3xl mb-4">🦋</div>
                    <p className="text-gray-700 font-semibold text-base mb-3">"Kenapa orang sering lupa mau ngomong apa di depan kamu?"</p>
                    <p className="text-gray-500 text-sm leading-relaxed italic">"Karena begitu kamu noleh dan senyum, semua kata-kata langsung kabur dari kepala. Otak manusia emang nggak didesain buat handle kadar imut selevel kamu. Loading... loading... error. Restart. Tapi begitu mau ngomong lagi, kamu senyum lagi. Ya udah, error lagi."</p>
                  </div>
                  <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-fuchsia-100 to-purple-50 border border-white/50 shadow-lg backdrop-blur-sm">
                    <div className="text-3xl mb-4">🌙</div>
                    <p className="text-gray-700 font-semibold text-base mb-3">"Kenapa bulan selalu sembunyi di balik awan?"</p>
                    <p className="text-gray-500 text-sm leading-relaxed italic">"Karena dia malu ketemu kamu. Kecantikan kamu tuh bukan yang teriak-teriak minta dilihat, tapi yang bikin orang diem, terus mikir, 'kok bisa ya ada yang seindah ini?'"</p>
                  </div>
                </div>

                <p className="text-center italic text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">"amboy... jadi aku tuh bingung, Tuhan bikin kamu dari bahan apa sebenernya, karena rasanya nggak mungkin manusia biasa bisa selucu, seimut, dan secantik ini dalam satu paket" 🤭</p>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-200/50" />
                  <span className="text-pink-200/60 text-sm">🦋</span>
                  <span className="text-purple-200/50 text-xs">🌸</span>
                  <span className="text-pink-200/60 text-sm">🦋</span>
                  <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-200/50" />
                </div>

                <div className="space-y-6 mt-10">
                  <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-700">miaw</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
                    {[
                      { label: 'wlee' },
                      { label: 'cimimate' },
                      { label: 'brum brum' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-center">
                        <div className="bg-white rounded-xl shadow-2xl p-3 pb-12 border border-gray-100 w-full max-w-[280px]">
                          <div className="w-full aspect-square rounded-md overflow-hidden bg-white">
                            <img src={`img/cat-${i + 1}.jpg`} alt={`kucing ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <p className="font-handwritten text-base text-pink-400/80 text-center mt-3 px-1">{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-purple-200/50" />
                  <span className="text-purple-200/60 text-sm">⭐</span>
                  <span className="text-pink-200/50 text-xs">🌙</span>
                  <span className="text-purple-200/60 text-sm">⭐</span>
                  <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-purple-200/50" />
                </div>

                <div className="mt-16 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-700">
                      Rating Kamu Menurut <span className="text-purple-500">Alam Semesta</span>
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">data resmi dari NASA (sumber: trust me)</p>
                  </div>
                  <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 shadow-xl p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Kecantikan</span>
                      <span className="text-pink-500 font-bold text-lg">∞ / 10</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-pink-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Kelucuan</span>
                      <span className="text-purple-500 font-bold text-lg">error <span className="text-xs text-gray-400">(nggak bisa dihitung)</span></span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-purple-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 w-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Keimutan</span>
                      <span className="text-rose-500 font-bold text-lg">server down 🔥</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-rose-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Keanggunan</span>
                      <span className="text-fuchsia-500 font-bold text-lg">999 / 10</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-fuchsia-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-500 w-full" />
                    </div>
                    <p className="text-center text-xs text-gray-400 italic pt-4">* sistem rating alam semesta rusak sejak kamu lahir. mereka belum bisa fix sampe sekarang.</p>
                  </div>
                </div>
              </div>
            )}

            <div className={`text-center py-8 transition-all duration-700 ${allReasonsRevealed ? 'opacity-100' : 'opacity-0'}`}>
              <button onClick={onComplete} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                Udah selesai, makasih ya! →
              </button>
            </div>
          </>
        )}

        {showFinal && (
          <div ref={finalRef} className="relative animate-fadeIn">
            <div className="confetti-container absolute inset-0 pointer-events-none overflow-hidden" style={{ minHeight: '100vh' }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="confetti-piece absolute" style={{
                  left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  backgroundColor: ['#f472b6', '#a78bfa', '#fb7185', '#e879f9', '#fbbf24', '#34d399', '#60a5fa'][Math.floor(Math.random() * 7)],
                  width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px`,
                }} />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center py-20 space-y-10">
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-300/50" />
                <span className="text-pink-300/60 text-sm">🎂</span>
                <span className="text-purple-300/50 text-xs">✨</span>
                <span className="text-pink-300/60 text-sm">🎂</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-300/50" />
              </div>

              <div className="text-center">
                <div className="text-7xl sm:text-8xl mb-6 animate-bounce">🎂</div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">HAPPY 17TH</span><br />
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">BIRTHDAY!</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-lg mx-auto leading-relaxed">
                  Selamat menempuh tahun ke-17.<br />Semoga segala kebaikan selalu menemanimu.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white/50 p-3 max-w-lg w-full">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                  <img src="img/final.jpg" alt="foto spesial" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>

              <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 p-8 shadow-lg text-center max-w-lg w-full">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ini web sederhana. Nggak sempurna.<br />Tapi tiap baris kode di sini ditulis<br />sambil mikirin kamu.
                </p>
                <p className="font-handwritten text-2xl text-pink-500 mt-4">Dengan sayang,</p>
                <p className="font-handwritten text-xl text-pink-400 mt-1">Nashdev Ur Love</p>
              </div>

              <p className="text-center text-sm text-gray-400 italic pt-4 max-w-lg">
                kalo kamu scroll lagi ke bawah, nggak ada apa-apa lagi kok.
                <br />...atau ada? 👀
                <br /><br />
                (nggak ada beneran. udah selesai. serius.)
                <br /><br />
                (beneran.)
                <br /><br />
                (kenapa masih scroll?)
                <br /><br />
                (ya udah deh, selamat ulang tahun sekali lagi 💗)
              </p>

              <div className="h-32" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
