import { useState, useRef, useEffect } from 'react'

function Edelweiss({ x, y, s = 1, d = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g className="garden-sway" style={{ animationDelay: `${d}s`, animationDuration: `${3.5 + d}s` }}>
        <path d="M0,0 Q-1,12 0,24 Q1,36 -1,48 Q0,52 1,55" stroke="#5a7a3a" strokeWidth="2.2" fill="none" />
        <path d="M0,18 Q-1,16 -2,14" stroke="#6a8a4a" strokeWidth="0.5" fill="none" />
        <path d="M-1,30 Q1,28 2,26" stroke="#6a8a4a" strokeWidth="0.5" fill="none" />
        <path d="M-1,20 Q-8,16 -12,10 Q-10,12 -8,14 Q-5,17 -1,19Z" fill="#5a7a35" />
        <path d="M0,34 Q6,28 10,22 Q8,26 6,30 Q3,33 0,34Z" fill="#5a7a35" />
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2
          const cx = Math.cos(a) * 10, cy = Math.sin(a) * 10 - 6
          const tipX = Math.cos(a) * 18, tipY = Math.sin(a) * 18 - 6
          const perpX = Math.cos(a + Math.PI / 2) * 4.5, perpY = Math.sin(a + Math.PI / 2) * 4.5
          return <path key={i} d={`M${cx - perpX},${cy - perpY} Q${tipX - perpX * 0.3},${tipY - perpY * 0.3} ${tipX},${tipY} Q${tipX + perpX * 0.3},${tipY + perpY * 0.3} ${cx + perpX},${cy + perpY}Z`} fill="#f0ead8" stroke="#d8d0b8" strokeWidth="0.3" />
        })}
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2 + 0.22
          const cx = Math.cos(a) * 5.5, cy = Math.sin(a) * 5.5 - 6
          const tipX = Math.cos(a) * 11, tipY = Math.sin(a) * 11 - 6
          const perpX = Math.cos(a + Math.PI / 2) * 3, perpY = Math.sin(a + Math.PI / 2) * 3
          return <path key={`in-${i}`} d={`M${cx - perpX},${cy - perpY} Q${tipX - perpX * 0.2},${tipY - perpY * 0.2} ${tipX},${tipY} Q${tipX + perpX * 0.2},${tipY + perpY * 0.2} ${cx + perpX},${cy + perpY}Z`} fill="#e5dcc8" stroke="#ccc5aa" strokeWidth="0.2" />
        })}
        <circle cx="-2" cy="-7" r="3" fill="#e8b830" />
        <circle cx="2" cy="-5" r="2.5" fill="#d4a520" />
        <circle cx="-0.5" cy="-4" r="2" fill="#f0c840" />
        <circle cx="1" cy="-8" r="1.8" fill="#e0b020" />
        <circle cx="-1.5" cy="-5.5" r="1.2" fill="#c89818" />
      </g>
    </g>
  )
}

function Rose({ x, y, s = 1, d = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g className="garden-sway" style={{ animationDelay: `${d}s`, animationDuration: `${4 + d * 0.5}s` }}>
        <path d="M0,0 Q-3,18 -1,36 Q1,48 -1,60 Q0,64 1,68" stroke="#2d5a1e" strokeWidth="2.5" fill="none" />
        <path d="M-2,22 L-5,19 L-3,20Z" fill="#2d5a1e" />
        <path d="M0,40 L4,37 L2,38Z" fill="#2d5a1e" />
        <path d="M-1,52 L-4,49 L-2,50Z" fill="#2d5a1e" />
        <path d="M-2,24 Q-10,18 -16,10 Q-14,14 -10,18 Q-6,22 -2,24Z" fill="#3a7028" />
        <path d="M-2,24 Q-9,19 -14,13" stroke="#2d5a1e" strokeWidth="0.4" fill="none" />
        <path d="M-7,19 Q-9,17 -10,15" stroke="#2d5a1e" strokeWidth="0.3" fill="none" />
        <path d="M1,44 Q8,36 14,30 Q12,35 8,40 Q5,43 1,44Z" fill="#3a7028" />
        <path d="M1,44 Q7,38 12,32" stroke="#2d5a1e" strokeWidth="0.4" fill="none" />
        <path d="M-3,-2 Q-6,2 -4,6 Q-2,3 -3,-2Z" fill="#3a7028" />
        <path d="M3,-2 Q6,2 4,6 Q2,3 3,-2Z" fill="#3a7028" />
        <path d="M-2,-4 Q-14,-8 -14,-16 Q-12,-22 -6,-20 Q-1,-18 -1,-10Z" fill="#c41e3a" />
        <path d="M2,-4 Q14,-6 16,-14 Q14,-22 8,-20 Q3,-18 2,-10Z" fill="#b81830" />
        <path d="M-1,-6 Q-8,-18 -4,-24 Q0,-28 4,-24 Q8,-18 1,-6Z" fill="#d42840" />
        <path d="M-4,-6 Q-16,-14 -12,-22 Q-8,-26 -4,-20 Q-2,-14 -4,-6Z" fill="#be1e35" />
        <path d="M4,-6 Q16,-12 14,-20 Q10,-26 6,-20 Q4,-14 4,-6Z" fill="#c82238" />
        <path d="M-1,-8 Q-10,-14 -8,-20 Q-5,-22 -2,-18 Q0,-14 -1,-8Z" fill="#a81830" />
        <path d="M1,-8 Q10,-12 10,-18 Q8,-22 5,-18 Q3,-14 1,-8Z" fill="#9e1428" />
        <path d="M0,-10 Q-6,-18 -2,-22 Q0,-24 2,-22 Q6,-18 0,-10Z" fill="#b01830" />
        <path d="M-1,-12 Q-4,-16 -2,-20 Q0,-22 2,-20 Q4,-16 1,-12Z" fill="#8b1528" />
        <path d="M0,-14 Q-2,-17 0,-19 Q2,-17 0,-14Z" fill="#6b1020" />
        <circle cx="0" cy="-16" r="1.5" fill="#7a1225" />
      </g>
    </g>
  )
}

function Tulip({ x, y, s = 1, d = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g className="garden-sway" style={{ animationDelay: `${d}s`, animationDuration: `${3.8 + d * 0.7}s` }}>
        <path d="M0,0 Q-1,16 0,32 Q1,46 0,58" stroke="#3a6828" strokeWidth="2" fill="none" />
        <path d="M-1,28 Q-8,22 -14,14 Q-16,10 -14,8 Q-12,10 -10,14 Q-6,22 -1,26Z" fill="#4a8035" />
        <path d="M-1,28 Q-8,22 -13,14" stroke="#3a6828" strokeWidth="0.3" fill="none" />
        <path d="M1,40 Q6,34 10,26 Q12,22 10,20 Q8,22 6,28 Q4,34 1,38Z" fill="#4a8035" />
        <path d="M-6,-6 Q-8,-14 -6,-22 Q-4,-28 -2,-30 Q-1,-28 -1,-22 Q-2,-14 -4,-6Z" fill="#f48fb1" stroke="#ec407a" strokeWidth="0.2" />
        <path d="M6,-6 Q8,-14 6,-22 Q4,-28 2,-30 Q1,-28 1,-22 Q2,-14 4,-6Z" fill="#f48fb1" stroke="#ec407a" strokeWidth="0.2" />
        <path d="M-4,-6 Q-5,-16 -2,-26 Q0,-30 2,-26 Q5,-16 4,-6 Q2,-4 0,-3 Q-2,-4 -4,-6Z" fill="#ec407a" stroke="#e91e63" strokeWidth="0.2" />
        <path d="M-2,-8 Q-3,-18 -1,-24 Q0,-26 1,-24 Q3,-18 2,-8 Q1,-6 0,-5 Q-1,-6 -2,-8Z" fill="#e91e63" />
        <path d="M-1,-14 Q-1,-20 0,-24 Q1,-20 1,-14 Q0.5,-12 0,-11 Q-0.5,-12 -1,-14Z" fill="#f06292" opacity="0.5" />
      </g>
    </g>
  )
}

function Daisy({ x, y, s = 1, d = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g className="garden-sway" style={{ animationDelay: `${d}s`, animationDuration: `${3.5 + d * 0.6}s` }}>
        <path d="M0,0 Q-1,10 0,20 Q1,30 0,38" stroke="#4a7a30" strokeWidth="1.5" fill="none" />
        <path d="M-1,16 Q-6,12 -8,8 Q-6,10 -4,13 Q-2,15 -1,16Z" fill="#5a8a40" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2 + (i % 3) * 0.05
          const len = 7 + (i % 3) * 0.8
          const cx = Math.cos(a) * len, cy = Math.sin(a) * len - 5
          const perpX = Math.cos(a + Math.PI / 2) * 1.8, perpY = Math.sin(a + Math.PI / 2) * 1.8
          const tipX = Math.cos(a) * (len + 5), tipY = Math.sin(a) * (len + 5) - 5
          return <path key={i} d={`M${cx - perpX},${cy - perpY} Q${tipX},${tipY} ${cx + perpX},${cy + perpY}Z`} fill={i % 4 === 0 ? '#f8f8f8' : '#ffffff'} stroke="#e8e8e8" strokeWidth="0.15" />
        })}
        <circle cx="0" cy="-5" r="4.5" fill="#e8b830" />
        <circle cx="0" cy="-5" r="3.5" fill="#d4a520" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <circle key={`b-${i}`} cx={Math.cos(a) * 2} cy={Math.sin(a) * 2 - 5} r="0.7" fill="#c89818" opacity="0.6" />
        })}
        <circle cx="0" cy="-5" r="1" fill="#c89818" />
      </g>
    </g>
  )
}

function Lavender({ x, y, s = 1, d = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g className="garden-sway" style={{ animationDelay: `${d}s`, animationDuration: `${4.2 + d * 0.4}s` }}>
        <path d="M0,0 Q-1,14 0,28 Q0.5,38 0,46" stroke="#4a7a30" strokeWidth="1.3" fill="none" />
        <path d="M-1,20 Q-5,16 -7,12 Q-5,14 -3,17 Q-1,19 -1,20Z" fill="#5a8a40" />
        <path d="M1,30 Q4,26 6,22 Q4,25 2,28 Q1,29 1,30Z" fill="#5a8a40" />
        {Array.from({ length: 12 }).map((_, i) => {
          const yOff = -4 - i * 2.5
          const size = 3.2 - i * 0.15
          const xOffset = i % 2 === 0 ? -1.8 : 1.8
          const color = i < 4 ? '#7b5ea7' : i < 8 ? '#8b6eb8' : '#a080c8'
          return <ellipse key={i} cx={xOffset} cy={yOff} rx={size} ry={size * 1.2} fill={color} opacity={0.75 + i * 0.02} />
        })}
        <ellipse cx="0" cy="-35" rx="1.5" ry="2" fill="#7b5ea7" />
      </g>
    </g>
  )
}

function Butterfly({ sx, sy, color = '#f48fb1', d = 0, dur = 12 }) {
  return (
    <g className="butterfly-fly" style={{ animationDelay: `${d}s`, animationDuration: `${dur}s` }}>
      <g transform={`translate(${sx}, ${sy})`}>
        <ellipse cx="-4" cy="-2" rx="5" ry="3.5" fill={color} opacity="0.8" className="butterfly-wing-l" />
        <ellipse cx="4" cy="-2" rx="5" ry="3.5" fill={color} opacity="0.8" className="butterfly-wing-r" />
        <ellipse cx="-3" cy="1" rx="3.5" ry="2.5" fill={color} opacity="0.6" className="butterfly-wing-l" />
        <ellipse cx="3" cy="1" rx="3.5" ry="2.5" fill={color} opacity="0.6" className="butterfly-wing-r" />
        <line x1="0" y1="-4" x2="0" y2="3" stroke="#333" strokeWidth="0.5" />
      </g>
    </g>
  )
}

export default function GardenStage({ onComplete }) {
  const [entered, setEntered] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRefs = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setEntered(true), 300)
  }, [])

  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.section)
            setVisibleSections(prev => { const next = new Set(prev); next.add(idx); return next })
          }
        })
      },
      { threshold: 0.25 }
    )
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [entered])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c8e0f8] via-[#e8d8f0] to-[#d0e8b8]" />
        <div className="absolute top-[5%] right-[10%] w-40 h-40 rounded-full bg-yellow-100/40 blur-[80px]" />
        <div className="absolute top-[3%] right-[8%] w-20 h-20 rounded-full bg-yellow-50/60 blur-[40px]" />
        <div className="absolute top-0 right-[5%] w-[2px] h-[40vh] bg-gradient-to-b from-yellow-100/20 to-transparent rotate-[15deg] origin-top" />
        <div className="absolute top-0 right-[15%] w-[1.5px] h-[35vh] bg-gradient-to-b from-yellow-100/15 to-transparent rotate-[8deg] origin-top" />
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="fixed pointer-events-none z-[5]" style={{
          left: `${Math.random() * 100}%`, top: `${Math.random() * 70}%`,
          animation: `gardenFloat ${7 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 6}s`,
        }}>
          <div style={{
            width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`,
            borderRadius: '50% 0 50% 0',
            background: ['#f8bbd0', '#f48fb1', '#fff', '#e1bee7', '#ffcdd2', '#c8e6c9'][Math.floor(Math.random() * 6)],
            opacity: 0.35, transform: `rotate(${Math.random() * 360}deg)`,
          }} />
        </div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-24">
        <div ref={el => sectionRefs.current[0] = el} data-section="0"
          className={`text-center space-y-4 transition-all duration-1000 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-green-600/40 text-sm uppercase tracking-[0.4em]">kembali ke bumi</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-700 leading-tight">Satu lagi, sebelum <span className="text-pink-500">selesai</span>.</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Dari luar angkasa, kita turun ke bumi.<br />Ke tempat yang paling cantik yang bisa aku bikin buat kamu.</p>
        </div>

        <div ref={el => sectionRefs.current[1] = el} data-section="1"
          className={`transition-all duration-1000 ${visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-white/30">
            <svg viewBox="0 0 800 450" className="w-full h-auto" preserveAspectRatio="xMidYMax slice">
              <defs>
                <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b8d8f8" /><stop offset="40%" stopColor="#e0d0e8" /><stop offset="70%" stopColor="#d8e8c8" /><stop offset="100%" stopColor="#c0d8a8" />
                </linearGradient>
                <linearGradient id="gHill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8bc06a" /><stop offset="100%" stopColor="#6aaa45" />
                </linearGradient>
                <linearGradient id="gGrass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5a9a38" /><stop offset="50%" stopColor="#4a8a2e" /><stop offset="100%" stopColor="#3a7a22" />
                </linearGradient>
                <filter id="gBlur"><feGaussianBlur stdDeviation="2" /></filter>
                <filter id="gGlow"><feGaussianBlur stdDeviation="4" /></filter>
              </defs>
              <rect width="800" height="450" fill="url(#gSky)" />
              <circle cx="650" cy="60" r="50" fill="#fff8e0" opacity="0.4" filter="url(#gGlow)" />
              <circle cx="650" cy="60" r="25" fill="#fffbe8" opacity="0.6" />
              <ellipse cx="200" cy="280" rx="280" ry="50" fill="#a8d08d" opacity="0.35" filter="url(#gBlur)" />
              <ellipse cx="600" cy="270" rx="320" ry="55" fill="#95c47a" opacity="0.3" filter="url(#gBlur)" />
              <ellipse cx="400" cy="300" rx="450" ry="40" fill="url(#gHill)" opacity="0.5" />
              <rect x="0" y="310" width="800" height="140" fill="url(#gGrass)" />
              <path d="M0,310 Q50,302 100,310 Q150,305 200,310 Q250,302 300,310 Q350,305 400,310 Q450,302 500,310 Q550,305 600,310 Q650,302 700,310 Q750,305 800,310 L800,330 L0,330Z" fill="#5a9a38" opacity="0.6" />
              {Array.from({ length: 80 }).map((_, i) => {
                const gx = i * 10 + 3, h = 8 + (i % 7) * 2, lean = ((i % 5) - 2) * 1.5
                return <path key={`gb-${i}`} d={`M${gx},318 Q${gx + lean},${318 - h * 0.6} ${gx + lean * 0.5},${318 - h}`} stroke={i % 3 === 0 ? '#4a8a2e' : '#5a9a38'} strokeWidth={0.6 + (i % 3) * 0.3} fill="none" opacity={0.5 + (i % 4) * 0.1} />
              })}
              <rect x="0" y="380" width="800" height="70" fill="white" opacity="0.08" />
              <Edelweiss x={30} y={275} s={0.5} d={0.1} /><Rose x={100} y={272} s={0.55} d={0.6} /><Tulip x={170} y={274} s={0.5} d={0.3} /><Lavender x={240} y={273} s={0.55} d={0.9} /><Daisy x={310} y={275} s={0.5} d={0.2} /><Edelweiss x={380} y={272} s={0.55} d={0.7} /><Rose x={450} y={274} s={0.5} d={1.1} /><Tulip x={520} y={273} s={0.55} d={0.4} /><Lavender x={590} y={275} s={0.5} d={0.8} /><Edelweiss x={660} y={272} s={0.55} d={1.0} /><Daisy x={730} y={274} s={0.5} d={0.5} />
              <Edelweiss x={20} y={290} s={0.7} d={0.2} /><Rose x={80} y={288} s={0.75} d={0.8} /><Tulip x={140} y={290} s={0.7} d={0.4} /><Lavender x={200} y={288} s={0.75} d={1.0} /><Edelweiss x={260} y={290} s={0.7} d={0.6} /><Daisy x={320} y={288} s={0.65} d={0.3} /><Rose x={380} y={290} s={0.75} d={1.2} /><Tulip x={440} y={288} s={0.7} d={0.5} /><Edelweiss x={500} y={290} s={0.7} d={0.9} /><Lavender x={560} y={288} s={0.75} d={0.2} /><Rose x={620} y={290} s={0.75} d={1.1} /><Tulip x={680} y={288} s={0.7} d={0.7} /><Edelweiss x={740} y={290} s={0.7} d={0.4} />
              <Rose x={10} y={304} s={0.85} d={0.5} /><Edelweiss x={65} y={302} s={0.9} d={0.1} /><Tulip x={120} y={305} s={0.85} d={0.8} /><Daisy x={175} y={303} s={0.8} d={0.3} /><Edelweiss x={230} y={304} s={0.9} d={1.0} /><Lavender x={285} y={302} s={0.85} d={0.6} /><Rose x={340} y={305} s={0.9} d={0.2} /><Tulip x={395} y={303} s={0.85} d={0.9} /><Edelweiss x={450} y={304} s={0.9} d={0.4} /><Daisy x={505} y={302} s={0.8} d={1.1} /><Rose x={560} y={305} s={0.9} d={0.7} /><Lavender x={615} y={303} s={0.85} d={0.3} /><Tulip x={670} y={304} s={0.85} d={1.0} /><Edelweiss x={725} y={302} s={0.9} d={0.5} /><Rose x={780} y={305} s={0.85} d={0.8} />
              <Rose x={25} y={318} s={1.0} d={0.5} /><Edelweiss x={80} y={316} s={1.05} d={0} /><Tulip x={135} y={319} s={1.0} d={0.9} /><Daisy x={190} y={317} s={0.95} d={0.3} /><Edelweiss x={245} y={318} s={1.1} d={0.7} /><Lavender x={300} y={316} s={1.0} d={1.1} /><Rose x={355} y={319} s={1.05} d={0.4} /><Tulip x={410} y={317} s={1.0} d={0.8} /><Edelweiss x={465} y={318} s={1.1} d={0.2} /><Daisy x={520} y={316} s={0.95} d={0.6} /><Rose x={575} y={319} s={1.05} d={1.0} /><Lavender x={630} y={317} s={1.0} d={0.3} /><Tulip x={685} y={318} s={1.0} d={0.9} /><Edelweiss x={740} y={316} s={1.1} d={0.5} />
              <Edelweiss x={15} y={332} s={1.15} d={0.4} /><Tulip x={70} y={330} s={1.1} d={0.1} /><Rose x={125} y={333} s={1.2} d={0.8} /><Edelweiss x={180} y={331} s={1.15} d={0.5} /><Lavender x={235} y={332} s={1.1} d={0.9} /><Rose x={290} y={330} s={1.2} d={0.2} /><Tulip x={345} y={333} s={1.15} d={0.7} /><Edelweiss x={400} y={331} s={1.2} d={1.1} /><Daisy x={455} y={332} s={1.05} d={0.3} /><Rose x={510} y={330} s={1.2} d={0.6} /><Edelweiss x={565} y={333} s={1.15} d={1.0} /><Tulip x={620} y={331} s={1.15} d={0.4} /><Lavender x={675} y={332} s={1.1} d={0.8} /><Rose x={730} y={330} s={1.2} d={0.2} /><Edelweiss x={785} y={333} s={1.15} d={0.6} />
              <Rose x={5} y={348} s={1.35} d={0.6} /><Edelweiss x={55} y={346} s={1.3} d={0.2} /><Tulip x={105} y={349} s={1.25} d={0.9} /><Rose x={155} y={347} s={1.35} d={0.4} /><Edelweiss x={205} y={348} s={1.3} d={1.1} /><Lavender x={255} y={346} s={1.2} d={0.7} /><Tulip x={305} y={349} s={1.3} d={0.1} /><Rose x={355} y={347} s={1.4} d={0.8} /><Edelweiss x={405} y={348} s={1.35} d={0.3} /><Daisy x={455} y={346} s={1.15} d={1.0} /><Rose x={505} y={349} s={1.35} d={0.5} /><Tulip x={555} y={347} s={1.3} d={0.2} /><Edelweiss x={605} y={348} s={1.35} d={0.9} /><Lavender x={655} y={346} s={1.2} d={0.6} /><Rose x={705} y={349} s={1.4} d={0.3} /><Edelweiss x={755} y={347} s={1.3} d={1.0} />
              <Edelweiss x={30} y={365} s={1.45} d={0.3} /><Rose x={120} y={362} s={1.5} d={0.7} /><Tulip x={220} y={366} s={1.4} d={0.1} /><Rose x={330} y={363} s={1.5} d={1.0} /><Edelweiss x={440} y={365} s={1.45} d={0.5} /><Lavender x={540} y={362} s={1.3} d={0.8} /><Rose x={640} y={366} s={1.5} d={0.2} /><Tulip x={740} y={363} s={1.4} d={0.6} />
              <Butterfly sx={120} sy={180} color="#f48fb1" d={0} dur={16} /><Butterfly sx={300} sy={150} color="#ce93d8" d={3} dur={13} /><Butterfly sx={480} sy={170} color="#ffcc80" d={1.5} dur={18} /><Butterfly sx={620} sy={140} color="#f8bbd0" d={5} dur={15} /><Butterfly sx={750} sy={190} color="#b39ddb" d={2} dur={14} /><Butterfly sx={200} sy={210} color="#80cbc4" d={4} dur={17} /><Butterfly sx={400} sy={130} color="#f48fb1" d={6} dur={12} /><Butterfly sx={560} sy={200} color="#fff59d" d={1} dur={19} />
            </svg>
          </div>
        </div>

        <div ref={el => sectionRefs.current[2] = el} data-section="2"
          className={`transition-all duration-1000 ${visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="text-3xl mb-4">🌸</div>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed italic mb-4">
              "Kalau aku bisa nanem satu bunga<br />tiap kali kamu bikin aku senyum...
            </p>
            <p className="text-pink-500 text-xl sm:text-2xl font-semibold">taman ini nggak akan cukup."</p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-green-300/50" />
              <span className="text-green-400/60 text-sm">🌿</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-green-300/50" />
            </div>
            <p className="text-gray-400 text-sm mt-4">Jadi aku bikin taman ini aja.<br />Buat kamu. Dari aku.</p>
          </div>
        </div>

        <div ref={el => sectionRefs.current[3] = el} data-section="3"
          className={`transition-all duration-1000 ${visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-700 mb-8">Bunga-bunga ini punya <span className="text-pink-500">arti</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 p-6 shadow-lg">
              <div className="text-2xl mb-3">🏔️</div>
              <h4 className="text-lg font-bold text-gray-700 mb-2">Edelweiss</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Bunga yang cuma tumbuh di puncak gunung tertinggi. Susah didapat, tapi layak diperjuangkan.<br /><span className="italic text-pink-400">Persis kayak kamu.</span></p>
            </div>
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 p-6 shadow-lg">
              <div className="text-2xl mb-3">🌹</div>
              <h4 className="text-lg font-bold text-gray-700 mb-2">Mawar Merah</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Simbol cinta yang paling klasik. Tapi klasik bukan berarti basi, karena yang tulus nggak pernah ketinggalan zaman.</p>
            </div>
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 p-6 shadow-lg">
              <div className="text-2xl mb-3">🌷</div>
              <h4 className="text-lg font-bold text-gray-700 mb-2">Tulip Pink</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Melambangkan kebahagiaan dan kehangatan. Setiap kali liat tulip pink, aku inget senyum kamu.</p>
            </div>
          </div>
        </div>

        <div ref={el => sectionRefs.current[4] = el} data-section="4"
          className={`text-center py-8 transition-all duration-1000 ${visibleSections.has(4) ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={onComplete} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            Sekarang, yang terakhir beneran... 🌸
          </button>
        </div>
      </div>
    </div>
  )
}
