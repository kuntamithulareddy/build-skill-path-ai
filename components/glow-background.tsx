export function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 size-[36rem] rounded-full bg-brand-purple/25 blur-[120px] animate-float" />
      <div className="absolute -right-32 top-1/3 size-[30rem] rounded-full bg-brand-cyan/15 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-12rem] left-1/3 size-[28rem] rounded-full bg-brand-purple/15 blur-[140px] animate-float-slow" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(1 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 75%)',
        }}
      />
    </div>
  )
}
