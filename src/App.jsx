import { useState } from 'react'
import './App.css'
import V1Phone from './phones/V1Phone'
import V2App from './screens/v2/V2App'
import V3App from './screens/v3/V3App'

const VERSIONS = [
  { key: 'all', label: 'All Versions', short: 'All' },
  { key: 'a', label: 'Version A', short: 'A', sub: 'Consumer App', variant: 'light', bg: 'bg-gray-100' },
  { key: 'b', label: 'Version B', short: 'B', sub: 'Premium Pass', variant: 'dark', bg: 'bg-[#111118]' },
  { key: 'c', label: 'Version C', short: 'C', sub: 'Neighborhood', variant: 'bilt', bg: 'bg-[#0f0f18]' },
]

function PhoneFrame({ children, variant = 'light', label, onReset, fullscreen }) {
  if (fullscreen) {
    return (
      <div className="w-full h-full flex flex-col items-center">
        <div className="relative w-full max-w-[430px] flex-1">
          <div className={`w-full h-full overflow-hidden relative flex flex-col ${
            variant === 'dark' ? 'bg-[#111118]' : variant === 'bilt' ? 'bg-[#0f0f18]' : 'bg-white'
          }`}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative" style={{ width: 390, height: 844 }}>
        <div className={`w-full h-full rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col ${
          variant === 'dark' ? 'bg-[#111118]' : variant === 'bilt' ? 'bg-[#0f0f18]' : 'bg-white'
        }`}>
          {children}
        </div>
      </div>
      <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">{label}</span>
      <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
        Start Over
      </button>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('all')
  const [v1Key, setV1Key] = useState(0)
  const [v2Key, setV2Key] = useState(0)
  const [v3Key, setV3Key] = useState(0)

  const resetCurrent = () => {
    if (view === 'a') setV1Key(k => k + 1)
    if (view === 'b') setV2Key(k => k + 1)
    if (view === 'c') setV3Key(k => k + 1)
    if (view === 'all') { setV1Key(k => k + 1); setV2Key(k => k + 1); setV3Key(k => k + 1) }
  }

  // Single version fullscreen
  if (view !== 'all') {
    const v = VERSIONS.find(v => v.key === view)
    return (
      <div className={`h-screen flex flex-col ${v.bg}`}>
        {/* Top bar */}
        <div className="shrink-0 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-4 py-2 z-50">
          <div className="flex items-center gap-1">
            {VERSIONS.map((ver) => (
              <button
                key={ver.key}
                onClick={() => setView(ver.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  view === ver.key
                    ? 'bg-white text-black shadow-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {ver.short}
              </button>
            ))}
          </div>
          <button onClick={resetCurrent} className="text-white/40 text-xs hover:text-white/70 transition-colors">
            Start Over
          </button>
        </div>

        {/* App fills remaining space */}
        <div className="flex-1 overflow-hidden">
          <PhoneFrame variant={v.variant} fullscreen>
            {view === 'a' && <V1Phone key={v1Key} />}
            {view === 'b' && <V2App key={v2Key} />}
            {view === 'c' && <V3App key={v3Key} />}
          </PhoneFrame>
        </div>
      </div>
    )
  }

  // All versions side by side
  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 z-50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-900 tracking-tight">DescluB Prototypes</span>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {VERSIONS.map((ver) => (
              <button
                key={ver.key}
                onClick={() => setView(ver.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  view === ver.key
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {ver.short}
              </button>
            ))}
          </div>
        </div>
        <button onClick={resetCurrent} className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
          Reset All
        </button>
      </div>

      {/* Three phones */}
      <div className="flex-1 flex items-center justify-center p-6 gap-8 overflow-x-auto">
        <PhoneFrame label="Version A - Consumer App" variant="light" onReset={() => setV1Key(k => k + 1)}>
          <V1Phone key={v1Key} />
        </PhoneFrame>
        <PhoneFrame label="Version B - Premium Pass" variant="dark" onReset={() => setV2Key(k => k + 1)}>
          <V2App key={v2Key} />
        </PhoneFrame>
        <PhoneFrame label="Version C - Neighborhood Rewards" variant="bilt" onReset={() => setV3Key(k => k + 1)}>
          <V3App key={v3Key} />
        </PhoneFrame>
      </div>
    </div>
  )
}
