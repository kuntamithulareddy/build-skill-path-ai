'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Award, CheckCircle2, Flame, Pencil, RotateCcw, Target } from 'lucide-react'
import { getCareer, getProgress } from '@/lib/recommendation'
import { PREFERENCES, SKILLS } from '@/lib/skillpath-data'
import { useStudent } from '@/lib/student-store'
import { btnSecondary } from '@/lib/styles'
import { NoProfile } from '../no-profile'
import { GlassCard, LoadingState, PageShell, Pill, ProgressBar } from '../shared'

export function ProfileView() {
  const router = useRouter()
  const { student, hydrated, resetProfile } = useStudent()
  if (!hydrated) return <LoadingState />
  if (!student) return <NoProfile title="No profile yet" />

  const career = getCareer(student.careerGoal)
  const progress = getProgress(student)
  const initials = student.name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleReset = () => {
    if (!window.confirm('Reset your profile and progress? This cannot be undone.')) return
    resetProfile()
    router.push('/setup')
  }

  return (
    <PageShell className="max-w-4xl">
      <GlassCard className="relative overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-brand-gradient opacity-25 blur-2xl" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-brand-gradient font-heading text-2xl font-bold text-white shadow-[0_0_36px_-6px_var(--brand-purple)]">
            {initials}
          </span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{student.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-muted-foreground">
              <Target className="size-4 text-brand-cyan" aria-hidden="true" />
              {career.name} · {student.level}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/setup" className={btnSecondary}>
              <Pencil aria-hidden="true" />
              Edit
            </Link>
            <button type="button" onClick={handleReset} className={btnSecondary} aria-label="Reset profile">
              <RotateCcw aria-hidden="true" />
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Stat icon={Flame} label="Learning streak" value={`${student.streak} day${student.streak === 1 ? '' : 's'}`} />
        <Stat icon={CheckCircle2} label="Completed skills" value={String(student.completed.length)} />
        <Stat icon={Award} label="Learning style" value={PREFERENCES.find((p) => p.id === student.preference)?.label ?? ''} />
      </div>

      <GlassCard className="mt-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-semibold">Learning Progress</h2>
          <span className="text-sm text-muted-foreground">
            {progress.done} of {progress.total} skills · <span className="font-semibold text-foreground">{progress.percent}%</span>
          </span>
        </div>
        <ProgressBar value={progress.percent} label="Learning progress" />
      </GlassCard>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <SkillList title="Current Skills" ids={student.skills} empty="No skills added during setup." />
        <SkillList title="Completed Skills" ids={student.completed} empty="Mark a skill complete to see it here." highlight />
      </div>
    </PageShell>
  )
}

function Stat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <GlassCard className="text-center">
      <Icon className="mx-auto size-6 text-brand-cyan" aria-hidden="true" />
      <p className="mt-3 font-heading text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </GlassCard>
  )
}

function SkillList({ title, ids, empty, highlight }: { title: string; ids: string[]; empty: string; highlight?: boolean }) {
  return (
    <GlassCard>
      <h2 className="mb-4 font-semibold">{title}</h2>
      {ids.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {ids.map((id) => (
            <Pill key={id} className={highlight ? 'border-success/40 bg-success/10 text-success' : undefined}>
              {highlight && <CheckCircle2 className="size-3.5" aria-hidden="true" />}
              {SKILLS[id]?.name ?? id}
            </Pill>
          ))}
        </div>
      )}
    </GlassCard>
  )
}
