import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('glass rounded-2xl p-6', className)}>{children}</div>
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn('mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14', className)}>{children}</main>
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">{eyebrow}</p>}
        <h1 className="text-balance text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2.5 w-full overflow-hidden rounded-full bg-white/10"
    >
      <div
        className="h-full rounded-full bg-brand-gradient shadow-[0_0_12px_var(--brand-cyan)] transition-[width] duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function LoadingState() {
  return (
    <PageShell>
      <div className="grid gap-4 md:grid-cols-3" aria-busy="true" aria-label="Loading">
        <div className="glass h-40 animate-pulse rounded-2xl md:col-span-2" />
        <div className="glass h-40 animate-pulse rounded-2xl" />
        <div className="glass h-56 animate-pulse rounded-2xl md:col-span-3" />
      </div>
    </PageShell>
  )
}
