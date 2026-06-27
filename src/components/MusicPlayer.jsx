import { useRef, useEffect } from 'react'

export default function MusicPlayer({ currentSong }) {
  const audioA = useRef(null)
  const audioB = useRef(null)
  const activeRef = useRef('A')
  const TARGET_VOL = 0.5

  useEffect(() => {
    if (audioA.current) {
      audioA.current.volume = TARGET_VOL
      audioA.current.play().catch(() => {})
    }
  }, [])

  const prevSong = useRef(currentSong)
  useEffect(() => {
    if (prevSong.current === currentSong) return
    prevSong.current = currentSong

    const isA = activeRef.current === 'A'
    const fadeOut = isA ? audioA.current : audioB.current
    const fadeIn = isA ? audioB.current : audioA.current

    if (!fadeOut || !fadeIn) return

    const steps = 15
    let step = 0
    const fadeOutInterval = setInterval(() => {
      step++
      fadeOut.volume = Math.max(0, TARGET_VOL * (1 - step / steps))
      if (step >= steps) {
        clearInterval(fadeOutInterval)
        fadeOut.pause()
        fadeOut.volume = 0
      }
    }, 20)

    setTimeout(() => {
      fadeIn.src = currentSong
      fadeIn.volume = 0
      fadeIn.currentTime = 0
      fadeIn.load()
      fadeIn.play().catch(() => {})

      let inStep = 0
      const fadeInSteps = 20
      const fadeInInterval = setInterval(() => {
        inStep++
        fadeIn.volume = Math.min(TARGET_VOL, TARGET_VOL * (inStep / fadeInSteps))
        if (inStep >= fadeInSteps) {
          clearInterval(fadeInInterval)
          fadeIn.volume = TARGET_VOL
        }
      }, 40)
    }, 800)

    activeRef.current = isA ? 'B' : 'A'
  }, [currentSong])

  return (
    <>
      <audio ref={audioA} loop src={currentSong} preload="auto" />
      <audio ref={audioB} loop preload="auto" />
    </>
  )
}
