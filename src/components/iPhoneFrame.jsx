/**
 * iPhone 15 Pro device frame.
 * Single render — on mobile it's full-screen, on desktop it wraps in a bezel.
 */
export default function IPhoneFrame({ children, version = 'a' }) {
  const bgClass = {
    a: 'md:from-slate-200 md:via-slate-100 md:to-white',
    b: 'md:from-[#0c0c14] md:via-[#12121c] md:to-[#0c0c14]',
    c: 'md:from-[#0c0c14] md:via-[#0f1a14] md:to-[#0c0c14]',
  }[version]

  const labelClass = version === 'a' ? 'text-slate-400' : 'text-white/30'

  return (
    /* Full-height on mobile, centered showcase on desktop */
    <div className={`iphone-showcase h-full md:h-auto md:min-h-screen md:flex md:items-center md:justify-center md:py-20 md:bg-gradient-to-br ${bgClass}`}>
      <div className="h-full md:h-auto flex flex-col items-center md:gap-5">
        {/* Bezel wrapper — transparent on mobile, visible on desktop */}
        <div className="iphone-bezel relative h-full md:h-auto md:bg-[#1a1a1a] md:rounded-[55px] md:p-[11px] md:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_-15px_rgba(0,0,0,0.5),0_0_50px_-8px_rgba(0,0,0,0.2)]">
          {/* Side buttons — desktop only */}
          <div className="hidden md:block absolute -left-[2.5px] top-[130px] w-[2.5px] h-[28px] bg-[#2d2d2d] rounded-l-[2px]" />
          <div className="hidden md:block absolute -left-[2.5px] top-[175px] w-[2.5px] h-[50px] bg-[#2d2d2d] rounded-l-[2px]" />
          <div className="hidden md:block absolute -left-[2.5px] top-[235px] w-[2.5px] h-[50px] bg-[#2d2d2d] rounded-l-[2px]" />
          <div className="hidden md:block absolute -right-[2.5px] top-[190px] w-[2.5px] h-[65px] bg-[#2d2d2d] rounded-r-[2px]" />

          {/* Screen area */}
          <div className="iphone-screen w-full h-full md:w-[393px] md:h-[852px] md:rounded-[44px] overflow-hidden relative">
            {children}
            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full z-50 bg-white/20 pointer-events-none" />
          </div>
        </div>

        {/* Label — desktop only */}
        <p className={`hidden md:block text-[11px] font-medium tracking-[3px] uppercase ${labelClass}`}>
          DescluB App Prototype
        </p>
      </div>
    </div>
  )
}
