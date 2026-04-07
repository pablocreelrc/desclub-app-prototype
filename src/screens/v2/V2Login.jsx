export default function V2Login({ onLogin }) {
  return (
    <div className="h-full flex flex-col bg-[#111118]">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
          <span className="text-blue-400 text-4xl font-bold">◎</span>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">DescluB</h1>
        <span className="text-[#444] text-xs font-semibold bg-[#1c1c28] px-4 py-1 rounded-full mb-6">PREMIUM PASS</span>
        <p className="text-[#666680] text-base leading-relaxed">
          Accede a descuentos exclusivos<br />en más de 500 marcas.
        </p>

        <div className="flex gap-8 mt-8">
          {['6,000+', '500+', '24/7'].map((n, i) => (
            <div key={i} className="text-center">
              <p className="text-white text-lg font-bold">{n}</p>
              <p className="text-[#555] text-[10px] mt-0.5">
                {['establecimientos', 'marcas', 'soporte'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth */}
      <div className="px-8 pb-10 flex flex-col gap-3">
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-white text-black rounded-xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
           Continuar con Apple
        </button>
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-[#1c1c28] border border-[#2a2a3a] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <button
          onClick={onLogin}
          className="w-full h-[52px] bg-blue-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          Continuar con Email
        </button>

        <div className="flex items-center gap-4 my-1">
          <div className="flex-1 h-px bg-[#2a2a3a]" />
          <span className="text-[#444] text-xs">o</span>
          <div className="flex-1 h-px bg-[#2a2a3a]" />
        </div>

        <div className="w-full h-[52px] border border-[#2a2a3a] rounded-xl flex items-center px-4 gap-2 bg-[#1c1c28]">
          <span className="text-xs font-medium text-[#888]">🇲🇽 +52</span>
          <input
            type="tel"
            placeholder="Tu número de celular"
            className="flex-1 text-sm outline-none bg-transparent text-white placeholder:text-[#555]"
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          />
        </div>

        <button onClick={onLogin} className="text-blue-400 font-medium text-xs mt-1">
          Explorar sin cuenta →
        </button>
      </div>
    </div>
  )
}
