import { useState } from 'react'

import PasscodeStage from './components/PasscodeStage'
import LoadingStage from './components/LoadingStage'
import LetterAndReasonsStage from './components/LetterAndReasonsStage'
import FakeEndingStage from './components/FakeEndingStage'
import AstronomyStage from './components/AstronomyStage'
import GalaxyStage from './components/GalaxyStage'
import GardenStage from './components/GardenStage'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [stage, setStage] = useState('passcode')
  const [musicStarted, setMusicStarted] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const currentSong = (stage === 'fakeEnd' || stage === 'astronomy' || stage === 'galaxy')
    ? 'music-aurora.mp3' 
    : 'music.mp3'

  return (
    <>
      {stage === 'passcode' && <PasscodeStage onUnlock={() => setStage('loading')} />}
      {stage === 'loading' && <LoadingStage onComplete={() => setStage('letterReasons')} />}
      {stage === 'letterReasons' && (
        <LetterAndReasonsStage
          onComplete={() => setStage('fakeEnd')}
          onOpenEnvelope={() => setMusicStarted(true)}
          showFinal={showFinal}
        />
      )}
      {stage === 'fakeEnd' && <FakeEndingStage onReveal={() => setStage('astronomy')} />}
      {stage === 'astronomy' && <AstronomyStage onComplete={() => setStage('galaxy')} />}
      {stage === 'galaxy' && <GalaxyStage onComplete={() => setStage('garden')} />}
      {stage === 'garden' && <GardenStage onComplete={() => { setShowFinal(true); setStage('letterReasons') }} />}
      {musicStarted && <MusicPlayer currentSong={currentSong} />}
    </>
  )
}
