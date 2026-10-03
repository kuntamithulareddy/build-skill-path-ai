'use client'

import Link from 'next/link'
import { ArrowRight, Flame, GraduationCap, Lightbulb, PartyPopper, Target, Trophy } from 'lucide-react'
import { explainRecommendation, getCareer, getNextSkill, getProgress, getRoadmap } from '@/lib/recommendation'
import { SKILLS } from '@/lib/skillpath-data'
import { useStudent } from '@/lib/student-store'
import { cn } from '@/lib/utils'
import { NoProfile } from '../no-profile'
import { GlassCard, LoadingState, PageHeader, PageShell, Pill, ProgressBar } from '../shared'
import { SkillActions } from '../skill-actions'

export function DashboardView() {
  const { student, hydrated } = useStudent()
  if (!hydrated) return <LoadingState />
  if (!student) return <NoProfile />

  const career = getCareer(student.careerGoal)
  const progress = getProgress(student)
  const next = getNextSkill(student)
  const steps = getRoadmap(student.careerGoal, student)

  return (
    <PageShell>
      <PageHeader
        eyebrow="Dashboard"
        title={
          <>
            Welcome, <span className="text-gradient">{student.name}</span>{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </>
        }
        description="Here is where you are on your journey and what to focus on next."
        action={
          <Link href="/setup" className="text-sm font-medium text-brand-cyan hover:underline">
            Edit profile
          </Link>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Target} label="Career Goal" value={career.name} />
        <StatCard icon={GraduationCap} label="Current Level" value={student.level} />
        <StatCard icon={Trophy} label="Skills Known" value={`${new Set([...student.skills, ...student.completed]).size}`} />
        <StatCard icon={Flame} label="Learning streak" value={`${student.streak} day${student.streak === 1 ? '' : 's'}`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {next ? (
          <GlassCard className="relative overflow-hidden border-brand-purple/30 p-7 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-brand-purple/30 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">Recommended Next Skill</p>
            <h2 className="relative mt-3 text-3xl font-bold">{next.name}</h2>
            <div className="relative mt-5 flex gap-3 rounded-xl bg-white/5 p-4">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Why?</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{explainRecommendation(student, next)}</p>
              </div>
            </div>
            <div className="relative mt-6">
              <SkillActions skillId={next.id} />
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="flex flex-col items-start justify-center p-7">
            <PartyPopper className="size-8 text-brand-cyan" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Roadmap complete!</h2>
            <p className="mt-2 text-muted-foreground">
              You have finished every skill on the {career.name} path. Try a new career goal to keep growing.
            </p>
            <Link href="/setup" className="mt-5 text-sm font-semibold text-brand-cyan hover:underline">
              Choose a new goal
            </Link>
          </GlassCard>
        )}

        <GlassCard className="flex flex-col gap-6">
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-semibold">Learning Progress</h2>
              <span className="font-heading text-2xl font-bold text-gradient">{progress.percent}%</span>
            </div>
            <ProgressBar value={progress.percent} label="Roadmap progress" />
            <p className="mt-2 text-sm text-muted-foreground">
              {progress.done} / {progress.total} skills completed
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-semibold">Current Skills</h2>
            {student.skills.length + student.completed.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills yet. That is a great place to start!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {[...new Set([...student.skills, ...student.completed])].map((id) => (
                  <Pill key={id}>{SKILLS[id]?.shortName ?? id}</Pill>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold">Current Roadmap</h2>
          <Link href="/roadmap" className="inline-flex items-center gap-1 text-sm font-medium text-brand-cyan hover:underline">
            View full roadmap <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ol className="flex gap-3 overflow-x-auto pb-2">
          {steps.map((step) => (
            <li
              key={step.skill.id}
              className={cn(
                'min-w-40 flex-1 rounded-xl border p-4 transition-colors',
                step.status === 'done' && 'border-success/30 bg-success/10',
                step.status === 'current' && 'border-brand-purple/60 bg-brand-purple/15',
                step.status === 'upcoming' && 'border-white/10 bg-white/[0.03]',
              )}
            >
              <span className="font-heading text-xs font-bold text-muted-foreground">{String(step.index + 1).padStart(2, '0')}</span>
              <p className="mt-1 text-sm font-semibold">{step.skill.name}</p>
              <p
                className={cn(
                  'mt-2 text-xs font-medium capitalize',
                  step.status === 'done' && 'text-success',
                  step.status === 'current' && 'text-brand-cyan',
                  step.status === 'upcoming' && 'text-muted-foreground',
                )}
              >
                {step.status === 'current' ? 'Up next' : step.status}
              </p>
            </li>
          ))}
        </ol>
      </GlassCard>
    </PageShell>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <GlassCard className="flex items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient">
        <Icon className="size-5 text-white" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate font-heading text-lg font-semibold">{value}</p>
      </div>
    </GlassCard>
  )
}
