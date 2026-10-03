export const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

export const btnPrimary = `${btnBase} bg-brand-gradient text-white shadow-[0_0_24px_-6px_var(--brand-purple)] hover:-translate-y-0.5 hover:shadow-[0_0_32px_-4px_var(--brand-cyan)]`

export const btnSecondary = `${btnBase} glass text-foreground hover:-translate-y-0.5 hover:bg-white/10`

export const btnSuccess = `${btnBase} border border-success/40 bg-success/10 text-success hover:-translate-y-0.5 hover:bg-success/20`
