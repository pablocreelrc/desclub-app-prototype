export default function LoginScreen({ onLogin }) {
  return (
    <div className="h-full flex flex-col">
      {/* Hero */}
      <div className="bg-primary-500 px-10 pt-16 pb-8 flex flex-col items-center text-center">
        <div className="bg-white/20 rounded-xl px-8 py-3 mb-4">
          <span className="text-white text-3xl font-bold tracking-tight">DescluB</span>
        </div>
        <p className="text-white text-lg font-medium leading-relaxed">
          Miles de descuentos.<br />Una sola membresía.
        </p>
        <div className="flex gap-5 mt-6">
          {['6,000+ establecimientos', '500+ marcas', '24/7 soporte'].map((s) => (
            <span key={s} className="text-white/80 text-[11px] font-medium">{s}</span>
          ))}
        </div>
      </div>

      {/* Auth */}
      <div className="flex-1 px-8 pt-7 flex flex-col gap-3.5">
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-black text-white rounded-xl font-semibold text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
           Continuar con Apple
        </button>
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-gray-50 border border-gray-200 text-gray-800 rounded-xl font-semibold text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-accent-500 text-white rounded-xl font-bold text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          Continuar con Email
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Phone */}
        <div className="w-full h-[52px] border-[1.5px] border-gray-300 rounded-xl flex items-center px-4 gap-2">
          <span className="text-sm font-medium text-gray-700">🇲🇽 +52</span>
          <input
            type="tel"
            placeholder="Tu número de celular"
            className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          />
        </div>

        <p className="text-center text-xs text-gray-400 mt-1 leading-relaxed">
          Al continuar aceptas nuestros <span className="underline">Términos</span> y <span className="underline">Política de Privacidad</span>
        </p>

        <button onClick={onLogin} className="text-accent-500 font-medium text-sm mt-1">
          Explorar sin cuenta →
        </button>
      </div>
    </div>
  )
}
