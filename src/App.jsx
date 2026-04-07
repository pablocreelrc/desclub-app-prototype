import { useState } from 'react'
import './App.css'
import V1Phone from './phones/V1Phone'
import V2App from './screens/v2/V2App'

function PhoneFrame({ children, label, variant = 'light', onReset }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative" style={{ width: 390, height: 844 }}>
        <div className={`w-full h-full rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col ${
          variant === 'dark' ? 'bg-[#111118]' : 'bg-white'
        }`}>
          {children}
        </div>
      </div>
      <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">{label}</span>
      <button
        onClick={onReset}
        className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
      >
        ↺ Start Over
      </button>
    </div>
  )
}

export default function App() {
  const [v1Key, setV1Key] = useState(0)
  const [v2Key, setV2Key] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen p-6 gap-10">
      <PhoneFrame label="Version A — Consumer App" variant="light" onReset={() => setV1Key(k => k + 1)}>
        <V1Phone key={v1Key} />
      </PhoneFrame>

      <PhoneFrame label="Version B — Premium Pass" variant="dark" onReset={() => setV2Key(k => k + 1)}>
        <V2App key={v2Key} />
      </PhoneFrame>
    </div>
  )
}
