import { useState, useRef, useEffect } from 'react'
import { PASSCODE } from '../data'

export default function PasscodeStage({ onUnlock }) {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [status, setStatus] = useState('idle')
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)
    setStatus('idle')

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newDigits.every(d => d !== '')) {
      const code = newDigits.join('')
      if (code === PASSCODE) {
        setStatus('success')
        setTimeout(() => onUnlock(), 800)
      } else {
        setStatus('error')
        setTimeout(() => {
          setDigits(['', '', '', '', '', ''])
          setStatus('idle')
          inputRefs.current[0]?.focus()
        }, 700)
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      const newDigits = pasted.split('')
      setDigits(newDigits)
      inputRefs.current[5]?.focus()
      if (pasted === PASSCODE) {
        setStatus('success')
        setTimeout(() => onUnlock(), 800)
      } else {
        setStatus('error')
        setTimeout(() => {
          setDigits(['', '', '', '', '', ''])
          setStatus('idle')
          inputRefs.current[0]?.focus()
        }, 700)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blush via-white to-lavender">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-pink-200/40 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-purple-200/40 blur-xl" />
          <div className="relative -rotate-[4deg] animate-float">
            <div className="w-72 sm:w-80 lg:w-[22rem] rounded-2xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-sm bg-white/70 p-4 pb-16">
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-white">
                <img src="img/passcode.jpg" alt="My Favorit Picture" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="font-handwritten text-lg text-pink-400/90 italic">My Favorit Picture</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-8 sm:p-10 bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg mb-4 animate-pulseGlow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Enter Passcode</h2>
              <p className="text-sm text-gray-400">Type the secret code to unlock your surprise</p>
            </div>

            <div
              className={`flex justify-center gap-3 mb-6 ${status === 'error' ? 'animate-shake' : ''}`}
              onPaste={handlePaste}
            >
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className={`
                    w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold
                    rounded-xl border-2 outline-none transition-all duration-300
                    bg-white/60 backdrop-blur-sm cursor-pointer
                    ${status === 'error'
                      ? 'border-red-300 shadow-[0_0_12px_rgba(248,113,113,0.4)] text-red-500'
                      : status === 'success'
                        ? 'border-green-300 shadow-[0_0_12px_rgba(74,222,128,0.4)] text-green-500'
                        : 'border-pink-200 focus:border-pink-400 focus:shadow-[0_0_12px_rgba(244,114,182,0.3)] text-gray-700'
                    }
                  `}
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            <div className="h-6 text-center">
              {status === 'error' && (
                <p className="text-sm text-red-400 animate-fadeIn">Kode salah, coba lagi ya</p>
              )}
              {status === 'success' && (
                <p className="text-sm text-green-500 animate-fadeIn">Membuka...</p>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/40 text-center">
              <p className="text-xs text-gray-400">Hint: A special date (DDMMYY)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
