export default function LoginScreen({ onLogin }) {
  return (
    <div className="h-full flex flex-col font-va bg-white">
      {/* Hero */}
      <div className="flex-1 bg-primary-500 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-44 h-44 rounded-full border-[18px] border-white/[0.06]" />
        <div className="absolute bottom-[-30px] left-[-30px] w-36 h-36 rounded-full border-[14px] border-white/[0.06]" />

        <div className="relative z-10">
          <div className="bg-white/20 rounded-2xl px-7 py-3 mb-5 inline-block">
            <span className="text-white text-[28px] font-bold">DescluB</span>
          </div>
          <p className="text-white text-[17px] font-medium leading-relaxed">
            Miles de descuentos.<br/>Una sola membresía.
          </p>
          <div className="flex gap-6 mt-6 justify-center">
            {[
              { n: '6,000+', l: 'comercios' },
              { n: '500+', l: 'marcas' },
              { n: '24/7', l: 'soporte' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-white text-[17px] font-bold">{s.n}</p>
                <p className="text-white/55 text-[11px] font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth */}
      <div className="shrink-0 px-6 pt-6 pb-6" style={{ paddingBottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))' }}>
        <button onClick={onLogin} className="w-full h-[50px] bg-gray-900 text-white rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-transform mb-2.5">
           Continuar con Apple
        </button>
        <button onClick={onLogin} className="w-full h-[50px] bg-white border border-gray-200 text-gray-800 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-transform mb-2.5">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <button onClick={onLogin} className="w-full h-[50px] bg-accent-500 text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-transform mb-3">
          Continuar con Email
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-text-secondary text-[12px]">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="w-full h-[50px] border border-gray-200 rounded-xl flex items-center px-3.5 gap-2 mb-3">
          <span className="text-[14px] font-medium text-gray-700">🇲🇽 +52</span>
          <div className="w-px h-5 bg-gray-200" />
          <input
            type="tel"
            placeholder="Tu número de celular"
            className="flex-1 text-[14px] outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          />
        </div>

        <p className="text-center text-[11px] text-text-secondary leading-relaxed">
          Al continuar aceptas los <span className="underline">Términos</span> y <span className="underline">Privacidad</span>
        </p>

        <button onClick={onLogin} className="block mx-auto text-primary-500 font-semibold text-[13px] mt-2">
          Explorar sin cuenta →
        </button>
      </div>
    </div>
  )
}
