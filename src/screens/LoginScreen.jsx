export default function LoginScreen({ onLogin }) {
  return (
    <div className="h-full flex flex-col font-va bg-white">
      {/* Hero — gradient with geometric shapes */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 px-10 pt-safe-header md:pt-14 pb-10 flex flex-col items-center text-center relative overflow-hidden flex-1 min-h-0 justify-center">
        {/* Decorative circles */}
        <div className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full border-[20px] border-white/[0.04]" />
        <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 rounded-full border-[16px] border-white/[0.04]" />
        <div className="absolute top-1/2 left-[-20px] w-20 h-20 rounded-full bg-white/[0.03]" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl px-8 py-3.5 mb-5 border border-white/15">
            <span className="text-white text-3xl font-extrabold tracking-tight">DescluB</span>
          </div>

          <p className="text-white/90 text-lg font-semibold leading-relaxed">
            Miles de descuentos.<br />Una sola membresía.
          </p>

          <div className="flex gap-6 mt-6">
            {[
              { n: '6,000+', l: 'comercios' },
              { n: '500+', l: 'marcas' },
              { n: '24/7', l: 'soporte' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-white text-lg font-bold">{s.n}</p>
                <p className="text-white/50 text-[10px] font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth — clean, stacked */}
      <div className="px-8 pt-7 pb-8 flex flex-col gap-3" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-gray-900 text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.48C5.55 7.99 7.06 7.04 8.72 7.02C10 7 11.2 7.89 12 7.89C12.8 7.89 14.24 6.82 15.79 7C16.44 7.03 18.15 7.27 19.24 8.85C19.12 8.93 16.75 10.32 16.78 13.16C16.81 16.55 19.8 17.67 19.83 17.68C19.81 17.75 19.38 19.22 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
          Continuar con Apple
        </button>

        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-white border-[1.5px] border-gray-200 text-gray-800 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:border-gray-300"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>

        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-accent-500 text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-sm shadow-accent-500/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Continuar con Email
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs font-medium">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Phone */}
        <div className="w-full h-[52px] border-[1.5px] border-gray-200 rounded-2xl flex items-center px-4 gap-2 focus-within:border-primary-400 transition-colors">
          <span className="text-sm font-semibold text-gray-600">+52</span>
          <div className="w-px h-5 bg-gray-200" />
          <input
            type="tel"
            placeholder="Tu número de celular"
            className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          />
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-1 leading-relaxed">
          Al continuar aceptas nuestros <span className="underline decoration-gray-300">Términos</span> y <span className="underline decoration-gray-300">Privacidad</span>
        </p>

        <button onClick={onLogin} className="text-primary-500 font-semibold text-sm mt-0.5 hover:text-primary-600 transition-colors">
          Explorar sin cuenta →
        </button>
      </div>
    </div>
  )
}
