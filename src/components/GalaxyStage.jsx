import { useState, useRef, useEffect, useMemo } from 'react'
import { GALAXIES } from '../data'

export default function GalaxyStage({ onComplete }) {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [entered, setEntered] = useState(false)
  const sectionRefs = useRef([])

  const stars = useMemo(() => {
    const layers = [
      { count: 120, minS: 0.4, maxS: 1.2, minO: 0.2, maxO: 0.5 },
      { count: 60, minS: 1, maxS: 2, minO: 0.4, maxO: 0.7 },
      { count: 15, minS: 1.8, maxS: 3, minO: 0.5, maxO: 0.9 },
    ]
    const colors = ['#fff', '#e0e7ff', '#ddd6fe', '#cffafe', '#fef3c7', '#fce7f3']
    return layers.flatMap((l, li) =>
      Array.from({ length: l.count }).map((_, i) => ({
        id: `${li}-${i}`, x: Math.random() * 100, y: Math.random() * 100,
        size: l.minS + Math.random() * (l.maxS - l.minS),
        opacity: l.minO + Math.random() * (l.maxO - l.minO),
        color: colors[Math.floor(Math.random() * colors.length)],
        dur: 3 + Math.random() * 6, delay: Math.random() * 5, layer: li,
      }))
    )
  }, [])

  const galaxyStars = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      r: 20 + Math.random() * 100,
      s: 0.3 + Math.random() * 1.2,
      o: 0.3 + Math.random() * 0.5,
    })), [])

  const renderGalaxy = (galaxy, size = 280) => {
    const cx = size / 2, cy = size / 2
    const pts = galaxyStars

    if (galaxy.type === 'edge-on') {
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${galaxy.glowPx}px ${galaxy.glow})` }}>
          <defs>
            <radialGradient id={`gc-${galaxy.type}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={galaxy.coreColor} stopOpacity="0.9" />
              <stop offset="30%" stopColor={galaxy.arm1} stopOpacity="0.5" />
              <stop offset="70%" stopColor={galaxy.arm2} stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id={`gb-${galaxy.type}`}><feGaussianBlur stdDeviation="3" /></filter>
          </defs>
          <ellipse cx={cx} cy={cy} rx={size * 0.45} ry={size * 0.12} fill={`url(#gc-${galaxy.type})`} opacity="0.3" />
          <ellipse cx={cx} cy={cy} rx={size * 0.42} ry={size * 0.06} fill={galaxy.arm1} opacity="0.4" filter={`url(#gb-${galaxy.type})`} />
          <ellipse cx={cx} cy={cy + 2} rx={size * 0.40} ry={size * 0.02} fill="#1a1025" opacity="0.6" />
          <ellipse cx={cx} cy={cy} rx={size * 0.08} ry={size * 0.06} fill={galaxy.coreColor} opacity="0.8" />
          <ellipse cx={cx} cy={cy} rx={size * 0.04} ry={size * 0.03} fill="#fff" opacity="0.7" />
          {pts.filter((_, i) => i % 3 === 0).map((s, i) => (
            <circle key={i} cx={cx + Math.cos(s.angle) * s.r} cy={cy + Math.sin(s.angle) * s.r * 0.08} r={s.s * 0.6} fill={galaxy.coreColor} opacity={s.o * 0.6} />
          ))}
        </svg>
      )
    }

    if (galaxy.type === 'spiral-tight') {
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${galaxy.glowPx}px ${galaxy.glow})` }}>
          <defs>
            <radialGradient id={`gc-${galaxy.type}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={galaxy.coreColor} stopOpacity="1" />
              <stop offset="25%" stopColor={galaxy.arm1} stopOpacity="0.6" />
              <stop offset="60%" stopColor={galaxy.arm2} stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={size * 0.44} fill={`url(#gc-${galaxy.type})`} opacity="0.15" />
          {[0, 1].map(arm => (
            <path key={arm} d={`M ${cx} ${cy} ${Array.from({ length: 80 }).map((_, i) => {
              const t = i * 0.12, r = 5 + t * 5.5, a = t + arm * Math.PI
              return `L ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r * 0.85}`
            }).join(' ')}`} stroke={arm === 0 ? galaxy.arm1 : galaxy.arm2} strokeWidth="2.5" fill="none" opacity={0.4 - arm * 0.1} strokeLinecap="round" />
          ))}
          <circle cx={cx} cy={cy} r={size * 0.06} fill={galaxy.coreColor} opacity="0.8" />
          <circle cx={cx} cy={cy} r={size * 0.03} fill="#fff" opacity="0.6" />
          {pts.map((s, i) => <circle key={i} cx={cx + Math.cos(s.angle) * s.r} cy={cy + Math.sin(s.angle) * s.r * 0.85} r={s.s * 0.5} fill="#fff" opacity={s.o * 0.4} />)}
          <circle cx={cx + size * 0.35} cy={cy - size * 0.25} r={size * 0.04} fill={galaxy.arm2} opacity="0.3" />
          <circle cx={cx + size * 0.35} cy={cy - size * 0.25} r={size * 0.02} fill={galaxy.coreColor} opacity="0.5" />
        </svg>
      )
    }

    if (galaxy.type === 'spiral-loose') {
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${galaxy.glowPx}px ${galaxy.glow})` }}>
          <defs>
            <radialGradient id={`gc-${galaxy.type}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={galaxy.coreColor} stopOpacity="0.9" />
              <stop offset="30%" stopColor={galaxy.arm1} stopOpacity="0.4" />
              <stop offset="70%" stopColor={galaxy.arm2} stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={size * 0.44} fill={`url(#gc-${galaxy.type})`} opacity="0.12" />
          {[0, 1, 2].map(arm => (
            <path key={arm} d={`M ${cx} ${cy} ${Array.from({ length: 50 }).map((_, i) => {
              const t = i * 0.15, r = 8 + t * 7, a = t * 0.8 + arm * (Math.PI * 2 / 3)
              return `L ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r * 0.75}`
            }).join(' ')}`} stroke={arm % 2 === 0 ? galaxy.arm1 : galaxy.arm2} strokeWidth="3" fill="none" opacity={0.3 - arm * 0.05} strokeLinecap="round" />
          ))}
          <circle cx={cx} cy={cy} r={size * 0.07} fill={galaxy.coreColor} opacity="0.6" />
          <circle cx={cx} cy={cy} r={size * 0.035} fill="#fff" opacity="0.4" />
          {pts.map((s, i) => <circle key={i} cx={cx + Math.cos(s.angle) * s.r} cy={cy + Math.sin(s.angle) * s.r * 0.75} r={s.s * 0.5} fill="#fff" opacity={s.o * 0.35} />)}
        </svg>
      )
    }

    if (galaxy.type === 'spiral-topdown') {
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${galaxy.glowPx}px ${galaxy.glow})` }}>
          <defs>
            <radialGradient id={`gc-${galaxy.type}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="10%" stopColor={galaxy.coreColor} stopOpacity="0.9" />
              <stop offset="30%" stopColor={galaxy.arm1} stopOpacity="0.5" />
              <stop offset="60%" stopColor={galaxy.arm2} stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id={`ab-${galaxy.type}`}><feGaussianBlur stdDeviation="1.5" /></filter>
          </defs>
          <circle cx={cx} cy={cy} r={size * 0.46} fill={`url(#gc-${galaxy.type})`} opacity="0.18" />
          {[0, 1, 2, 3].map(arm => (
            <path key={arm} d={`M ${cx} ${cy} ${Array.from({ length: 90 }).map((_, i) => {
              const t = i * 0.1, r = 3 + t * 4.8, a = t + arm * (Math.PI / 2)
              return `L ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}`
            }).join(' ')}`} stroke={arm % 2 === 0 ? galaxy.arm1 : galaxy.arm2} strokeWidth={arm % 2 === 0 ? "3" : "2"} fill="none" opacity={0.35 - arm * 0.04} strokeLinecap="round" filter={`url(#ab-${galaxy.type})`} />
          ))}
          <circle cx={cx} cy={cy} r={size * 0.05} fill={galaxy.coreColor} opacity="0.9" />
          <circle cx={cx} cy={cy} r={size * 0.025} fill="#fff" opacity="0.8" />
          {pts.map((s, i) => <circle key={i} cx={cx + Math.cos(s.angle) * s.r} cy={cy + Math.sin(s.angle) * s.r} r={s.s * 0.6} fill="#fff" opacity={s.o * 0.5} />)}
          <circle cx={cx + size * 0.22} cy={cy + size * 0.08} r="2.5" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5" />
          <circle cx={cx + size * 0.22} cy={cy + size * 0.08} r="1" fill="#fbbf24" opacity="0.6" />
        </svg>
      )
    }

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${galaxy.glowPx}px ${galaxy.glow})` }}>
        <defs>
          <radialGradient id={`gc-${galaxy.type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={galaxy.coreColor} stopOpacity="1" />
            <stop offset="20%" stopColor={galaxy.arm1} stopOpacity="0.6" />
            <stop offset="55%" stopColor={galaxy.arm2} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id={`ab-${galaxy.type}`}><feGaussianBlur stdDeviation="1" /></filter>
        </defs>
        <ellipse cx={cx} cy={cy} rx={size * 0.44} ry={size * 0.28} fill={`url(#gc-${galaxy.type})`} opacity="0.15" transform={`rotate(-25 ${cx} ${cy})`} />
        {[0, 1].map(arm => (
          <path key={arm} d={`M ${cx} ${cy} ${Array.from({ length: 70 }).map((_, i) => {
            const t = i * 0.12, r = 6 + t * 5.5, a = t + arm * Math.PI
            return `L ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r * 0.6}`
          }).join(' ')}`} stroke={arm === 0 ? galaxy.arm1 : galaxy.arm2} strokeWidth="2.5" fill="none" opacity={0.4 - arm * 0.08} strokeLinecap="round" filter={`url(#ab-${galaxy.type})`} />
        ))}
        <ellipse cx={cx} cy={cy + 3} rx={size * 0.3} ry={size * 0.04} fill="#1a1025" opacity="0.2" transform={`rotate(-25 ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={size * 0.06} ry={size * 0.045} fill={galaxy.coreColor} opacity="0.85" />
        <ellipse cx={cx} cy={cy} rx={size * 0.03} ry={size * 0.02} fill="#fff" opacity="0.7" />
        {pts.map((s, i) => <circle key={i} cx={cx + Math.cos(s.angle) * s.r} cy={cy + Math.sin(s.angle) * s.r * 0.65} r={s.s * 0.5} fill="#fff" opacity={s.o * 0.4} />)}
      </svg>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setEntered(true), 500)
  }, [])

  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.galaxy)
            setVisibleSections(prev => { const next = new Set(prev); next.add(index); return next })
          }
        })
      },
      { threshold: 0.2 }
    )
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [entered])

  return (
    <div className="min-h-screen relative bg-[#020210]">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020210] via-[#08081e] to-[#0d0628]" />
        {stars.map(star => (
          <div key={star.id} className="absolute rounded-full" style={{
            left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`,
            background: star.color, opacity: star.opacity,
            animation: `twinkle ${star.dur}s ease-in-out infinite ${star.delay}s`,
            boxShadow: star.layer === 2 ? `0 0 ${star.size * 2}px ${star.color}` : 'none',
          }} />
        ))}
        <div className="absolute top-[15%] left-[5%] w-[700px] h-[500px] rounded-full bg-purple-950/20 blur-[150px]" />
        <div className="absolute top-[45%] right-[0%] w-[500px] h-[600px] rounded-full bg-blue-950/15 blur-[130px]" />
        <div className="absolute bottom-[5%] left-[25%] w-[800px] h-[400px] rounded-full bg-indigo-950/12 blur-[160px]" />
        <div className="absolute top-[70%] left-[60%] w-[300px] h-[300px] rounded-full bg-rose-950/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div ref={el => sectionRefs.current[0] = el} data-galaxy="0"
          className={`text-center space-y-6 mb-32 transition-all duration-1000 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-white/25 text-sm uppercase tracking-[0.4em]">masih belum selesai</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white/90 leading-tight">Sekarang, lebih jauh lagi.</h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-xl mx-auto">
            Kalau tadi kita lihat bintang dan rasi...<br />sekarang aku mau ajak kamu ke luar sana.<br />Ke galaksi-galaksi yang mengingatkanku pada kamu.
          </p>
        </div>

        <div className="space-y-44">
          {GALAXIES.map((galaxy, i) => (
            <div key={i} ref={el => sectionRefs.current[i + 1] = el} data-galaxy={i + 1}
              className={`transition-all duration-[1200ms] ${visibleSections.has(i + 1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div className="relative">
                <div className="flex justify-center mb-12">
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 animate-spin-slow" style={{ animationDuration: `${40 + i * 8}s` }}>
                    {renderGalaxy(galaxy)}
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-white/25 text-xs uppercase tracking-[0.3em]">{galaxy.subtitle}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white/90">{galaxy.name}</h3>
                  <p className="text-white/40 text-sm font-medium tracking-wide">{galaxy.quality}</p>
                  <div className="max-w-lg mx-auto pt-4">
                    <p className="text-white/55 text-base sm:text-lg leading-relaxed whitespace-pre-line">{galaxy.desc}</p>
                  </div>
                </div>
                <div className="w-12 h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-12" />
              </div>
            </div>
          ))}
        </div>

        <div ref={el => sectionRefs.current[6] = el} data-galaxy="6"
          className={`text-center space-y-8 pt-32 pb-16 transition-all duration-1000 ${visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent mx-auto" />
          <p className="text-white/60 text-xl sm:text-2xl leading-relaxed font-light">5 galaksi.<br />Masing-masing punya miliaran bintang.</p>
          <p className="text-white/85 text-xl sm:text-2xl font-medium">Tapi nggak ada satupun yang bisa ngalahin<br />satu orang yang lagi baca ini.</p>
          <p className="text-white/30 text-sm italic">Happy birthday, dari ujung alam semesta terjauh.</p>
          <div className="pt-10">
            <button onClick={onComplete} className="px-8 py-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-white/80 font-medium shadow-lg hover:bg-white/[0.12] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              Yang terakhir, janji. →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
