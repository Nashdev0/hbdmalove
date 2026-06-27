import { useState, useRef, useEffect, useMemo } from 'react'
import { CONSTELLATIONS } from '../data'

export default function AstronomyStage({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [stars, setStars] = useState([])
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRefs = useRef([])

  const constellationBgStars = useMemo(() =>
    Array.from({ length: 6 }).map(() =>
      Array.from({ length: 20 }).map(() => ({
        cx: Math.random() * 200, cy: Math.random() * 130,
        r: 0.3 + Math.random() * 0.5, opacity: 0.1 + Math.random() * 0.2,
      }))
    ), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const generated = Array.from({ length: 150 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5, delay: Math.random() * 4,
      duration: 2 + Math.random() * 4,
    }))
    setStars(generated)
    const t1 = setTimeout(() => setPhase(1), 2500)
    const t2 = setTimeout(() => setPhase(2), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase < 2) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.section)
            setVisibleSections(prev => { const next = new Set(prev); next.add(index); return next })
          }
        })
      },
      { threshold: 0.3 }
    )
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [phase])

  return (
    <div className="min-h-screen relative bg-[#050514]">
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-[5000ms] ${phase >= 1 ? 'bg-gradient-to-b from-[#050514] via-[#0a0a2e] to-[#120a28]' : 'bg-[#050514]'}`} />
        <div className={`absolute inset-0 transition-opacity duration-[3000ms] ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          {stars.map(star => (
            <div key={star.id} className="absolute rounded-full bg-white" style={{
              left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            }} />
          ))}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-[5000ms] ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="aurora-layer aurora-1 absolute inset-0" />
          <div className="aurora-layer aurora-2 absolute inset-0" />
          <div className="aurora-layer aurora-3 absolute inset-0" />
          <div className="aurora-layer aurora-4 absolute inset-0" />
        </div>
        {phase >= 1 && (
          <>
            <div className="shooting-star absolute top-[12%] left-[8%]" />
            <div className="shooting-star-2 absolute top-[22%] left-[55%]" />
            <div className="shooting-star-3 absolute top-[8%] left-[35%]" />
          </>
        )}
      </div>

      <div className="relative z-10">
        {phase < 2 && (
          <div className="min-h-screen flex items-center justify-center">
            {phase === 0 && <div className="text-center animate-fadeIn px-8"><p className="text-white/30 text-xl sm:text-2xl tracking-widest font-light">Tutup mata sebentar...</p></div>}
            {phase === 1 && <div className="text-center animate-fadeIn px-8"><p className="text-white/50 text-xl sm:text-2xl tracking-wide font-light">Sekarang buka, dan lihat ke atas.</p></div>}
          </div>
        )}

        {phase >= 2 && (
          <div className="min-h-screen px-6 sm:px-8 py-20 max-w-3xl mx-auto space-y-32">
            <div ref={el => sectionRefs.current[0] = el} data-section="0"
              className={`text-center space-y-6 transition-all duration-1000 ${visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">plot twist</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white/90 leading-tight">Kamu pikir ini cuma web biasa?</h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
                Nggak. Ini langit malam yang aku bikin khusus buat kamu.<br />Lengkap dengan aurora dan bintang-bintangnya.
              </p>
            </div>

            <div ref={el => sectionRefs.current[1] = el} data-section="1"
              className={`text-center space-y-6 transition-all duration-1000 ${visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto" />
              <p className="text-emerald-200/80 text-lg sm:text-xl leading-relaxed">
                Aurora itu terjadi karena partikel matahari<br />menabrak atmosfer bumi.
              </p>
              <p className="text-purple-200/70 text-base sm:text-lg leading-relaxed">
                Dua hal yang seharusnya nggak pernah bertemu,<br />tapi begitu mereka bertemu,<br />sesuatu yang luar biasa indah terjadi.
              </p>
              <p className="text-white/90 text-xl font-medium mt-6">Persis kayak kamu masuk ke hidupku.</p>
              <p className="text-white/40 text-xs italic mt-2">(cheesy? biarin. ini fakta.)</p>
            </div>

            <div ref={el => sectionRefs.current[2] = el} data-section="2"
              className={`text-center space-y-4 transition-all duration-1000 ${visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto" />
              <p className="text-cyan-300/50 text-sm uppercase tracking-[0.2em]">rasi bintang</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white/90">6 Rasi Bintang yang Mengingatkanku pada Kamu</h3>
              <p className="text-white/40 text-sm">scroll pelan-pelan...</p>
            </div>

            {CONSTELLATIONS.map((constellation, i) => (
              <div key={i} ref={el => sectionRefs.current[i + 3] = el} data-section={i + 3}
                className={`transition-all duration-1000 ${visibleSections.has(i + 3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="rounded-3xl p-8 sm:p-10 bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-full max-w-xs">
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0a2e]/80 to-[#050514]/80 border border-white/5 p-4">
                        <svg viewBox="0 0 200 130" className="w-full h-auto">
                          {constellationBgStars[i]?.map((s, j) => (
                            <circle key={`bg-${j}`} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
                          ))}
                          {constellation.lines.map(([from, to], li) => (
                            <line key={`line-${li}`} x1={constellation.stars[from].x} y1={constellation.stars[from].y}
                              x2={constellation.stars[to].x} y2={constellation.stars[to].y}
                              stroke="rgba(147, 197, 253, 0.25)" strokeWidth="0.8" />
                          ))}
                          {constellation.stars.map((star, si) => (
                            <g key={`star-${si}`}>
                              <circle cx={star.x} cy={star.y} r={star.size * 2.5} fill="rgba(147, 197, 253, 0.08)" />
                              <circle cx={star.x} cy={star.y} r={star.size * 1.5} fill="rgba(200, 220, 255, 0.15)" />
                              <circle cx={star.x} cy={star.y} r={star.size} fill="#e0e7ff" className="animate-pulse"
                                style={{ animationDelay: `${si * 0.3}s`, animationDuration: `${3 + si * 0.5}s` }} />
                              {star.label && (
                                <text x={star.x} y={star.y + star.size + 8} textAnchor="middle"
                                  fill="rgba(147, 197, 253, 0.5)" fontSize="5" fontFamily="monospace">{star.label}</text>
                              )}
                            </g>
                          ))}
                        </svg>
                        <div className="absolute top-2 right-3">
                          <p className="text-[10px] text-cyan-300/30 uppercase tracking-widest font-mono">{constellation.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center sm:text-left space-y-3">
                      <div>
                        <h4 className="text-xl font-bold text-white/90">{constellation.name}</h4>
                        <p className="text-cyan-300/60 text-sm">{constellation.meaning}</p>
                      </div>
                      <p className="text-white/60 text-base leading-relaxed whitespace-pre-line">{constellation.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div ref={el => sectionRefs.current[9] = el} data-section="9"
              className={`text-center space-y-8 py-16 transition-all duration-1000 ${visibleSections.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto" />
              <div className="relative w-56 h-36 mx-auto">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <circle cx="50" cy="10" r="2.5" fill="#67e8f9" className="animate-pulse" />
                  <circle cx="50" cy="25" r="2.5" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <circle cx="50" cy="40" r="2.5" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <circle cx="50" cy="55" r="2.5" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <circle cx="50" cy="70" r="2.5" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="50" cy="85" r="2.5" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <circle cx="42" cy="20" r="2" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: '0.15s' }} />
                  <circle cx="100" cy="10" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                  <circle cx="118" cy="10" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                  <circle cx="136" cy="10" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="154" cy="10" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
                  <circle cx="148" cy="28" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                  <circle cx="140" cy="45" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
                  <circle cx="132" cy="62" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
                  <circle cx="124" cy="80" r="2.5" fill="#c4b5fd" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                  <line x1="50" y1="10" x2="50" y2="85" stroke="rgba(103,232,249,0.12)" strokeWidth="0.8" />
                  <line x1="42" y1="20" x2="50" y2="20" stroke="rgba(103,232,249,0.12)" strokeWidth="0.8" />
                  <line x1="100" y1="10" x2="154" y2="10" stroke="rgba(196,181,253,0.12)" strokeWidth="0.8" />
                  <line x1="154" y1="10" x2="124" y2="80" stroke="rgba(196,181,253,0.12)" strokeWidth="0.8" />
                </svg>
              </div>
              <p className="text-cyan-300/50 text-xs uppercase tracking-[0.3em]">Rasi Bintang ke-17</p>
              <div className="space-y-4 mt-6">
                <p className="text-white/80 text-xl sm:text-2xl leading-relaxed font-light">
                  Dan kalau suatu hari nanti<br />ada rasi bintang baru yang ditemukan...
                </p>
                <p className="text-white/90 text-xl sm:text-2xl font-medium">Aku mau namain itu pakai namamu.</p>
                <p className="text-white/40 text-sm italic mt-4">
                  Karena dari semua hal indah di langit malam,<br />nggak ada yang seindah kamu.
                </p>
              </div>
              <div className="pt-12">
                <button onClick={onComplete} className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Satu lagi... yang terakhir →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
