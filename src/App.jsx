import { useState } from 'react'
import './App.css'
import V1Phone from './phones/V1Phone'
import V2App from './screens/v2/V2App'

function PhoneFrame({ children, label, variant = 'light' }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="relative" style={{ width: 390, height: 844 }}>
        <div className={`w-full h-full rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col ${
          variant === 'dark' ? 'bg-[#111118]' : 'bg-white'
        }`}>
          {children}
        </div>
      </div>
      <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">{label}</span>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 gap-10">
      {/* Version A */}
      <PhoneFrame label="Version A — Consumer App" variant="light">
        <V1Phone />
      </PhoneFrame>

      {/* Version B */}
      <PhoneFrame label="Version B — Premium Pass" variant="dark">
        <V2App />
      </PhoneFrame>
    </div>
  )
}
