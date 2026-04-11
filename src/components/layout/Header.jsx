import { USER } from '../../data/user'

export default function Header({ onBellPress, onAvatarPress }) {
  const unreadCount = 2

  return (
    <div className="shrink-0 px-4 pt-safe md:pt-14 pb-2">
      {/* Top row: points pill + bell + avatar */}
      <div className="flex items-center justify-between mb-2.5">
        {/* Points pill */}
        <div className="flex items-center gap-2 bg-[#111] border border-[#1a1a1a] rounded-full px-3 py-1.5">
          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-white text-xs font-bold">{USER.points.toLocaleString()} pts</span>
          <span className="text-[#555] text-[10px]">= ${USER.pointsValue} MXN</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Bell */}
          <button
            onClick={onBellPress}
            className="relative w-9 h-9 bg-[#111] border border-[#1a1a1a] rounded-full flex items-center justify-center"
          >
            <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <button
            onClick={onAvatarPress}
            className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{USER.initials}</span>
          </button>
        </div>
      </div>

      {/* Tier progress bar */}
      <div className="bg-[#111] border border-[#1a1a1a] rounded-xl px-3 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-[10px] font-bold">{USER.tier}</span>
            <svg className="w-3 h-3 text-[#444]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
            <span className="text-[#666] text-[10px] font-semibold">{USER.tierNext}</span>
          </div>
          <span className="text-[#555] text-[10px]">{USER.tierProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all"
            style={{ width: `${USER.tierProgress}%` }}
          />
        </div>
        <p className="text-[#555] text-[10px] mt-1">{USER.tierPointsNeeded} pts más para subir</p>
      </div>
    </div>
  )
}
