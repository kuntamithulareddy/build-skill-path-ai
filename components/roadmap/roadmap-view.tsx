'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Clock, Lock, Play } from 'lucide-react'
import { estimateHours, getCareer, getRoadmap, type RoadmapStep } from '@/lib/recommendation'
import { CAREER_GOALS } from '@/lib/skillpath-data'
import { useStudent } from '@/lib/student-store'
import { btnPrimary } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { LoadingState, PageHeader, PageShell } from '../shared'

export function RoadmapView() {
  const { student, hydrated } = useStudent()
  if (!hydrated) return <LoadingState />
  return <RoadmapContent key={student?.careerGoal ?? 'guest'} />
}

function RoadmapContent() {
  const { student } = useStudent()
  const [selected, setSelected] = useState(student?.careerGoal ?? 'frontend')
  const career = getCareer(selected)
  const isOwnPath = student?.careerGoal === selected
  const steps = getRoadmap(selected, isOwnPath ? student : null)

  return (
    <PageShell>
      <PageHeader
        eyebrow="Roadmap"
        title={
          <>
            <span className="text-gradient">{career.name}</span> Roadmap
          </>
        }
        description={
          isOwnPath
            ? 'Your personalized step-by-step path. Completed skills are checked off automatically.'
            : `${career.description} Explore the path below, or set up your profile to track progress.`
        }
        action={
          !student && (
            <Link href="/setup" className={btnPrimary}>
              Personalize it
            </Link>
          )
        }
      />

      <div role="group" aria-label="Choose a career path" className="mb-10 flex gap-2 overflow-x-auto pb-1">
        {CAREER_GOALS.map((goal) => (
          <button
            key={goal.id}
            type="button"
            aria-pressed={selected === goal.id}
            onClick={() => setSelected(goal.id)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all',
              selected === goal.id
                ? 'border-brand-purple/70 bg-brand-purple/20 text-foreground'
                : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground',
            )}
          >
            {goal.name}
            {student?.careerGoal === goal.id && <span className="ml-1.5 text-brand-cyan">{'•'}</span>}
          </button>
        ))}
      </div>

      <ol className="relative mx-auto max-w-3xl">
        {steps.map((step, i) => (
          <TimelineItem
            key={step.skill.id}
            step={step}
            isLast={i === steps.length - 1}
            hours={estimateHours(step.skill, student?.level ?? 'Beginner')}
          />
        ))}
      </ol>
    </PageShell>
  )
}

function TimelineItem({ step, isLast, hours }: { step: RoadmapStep; isLast: boolean; hours: number }) {
  const { status, skill } = step
  const number = String(step.index + 1).padStart(2, '0')

  return (
    <li
      className="relative flex gap-4 pb-6 animate-in fade-in slide-in-from-bottom-3 fill-mode-both sm:gap-6"
      style={{ animationDelay: `${step.index * 70}ms` }}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl font-heading text-sm font-bold',
            status === 'done' && 'bg-success/15 text-success ring-1 ring-success/40',
            status === 'current' && 'bg-brand-gradient text-white shadow-[0_0_28px_-4px_var(--brand-purple)]',
            status === 'upcoming' && 'glass text-muted-foreground',
          )}
        >
          {status === 'done' ? <Check className="size-5" aria-label="Completed" /> : number}
        </span>
        {!isLast && (
          <span
            aria-hidden="true"
            className={cn('mt-2 w-px flex-1', status === 'done' ? 'bg-success/40' : 'bg-gradient-to-b from-white/20 to-white/5')}
          />
        )}
      </div>

      <div
        className={cn(
          'glass flex-1 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5',
          status === 'current' && 'border-brand-purple/50 shadow-[0_0_40px_-16px_var(--brand-purple)]',
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-heading text-xs font-bold text-muted-foreground">STEP {number}</p>
            <h2 className="mt-1 text-lg font-semibold">{skill.name}</h2>
          </div>
          <StatusBadge status={status} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{skill.reason}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />~{hours} hours
            </span>
            <span>{skill.difficulty}</span>
          </div>
          {status === 'current' ? (
            <Link href="/learn" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan hover:underline">
              Start learning <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href={`/resources?skill=${skill.id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View resources
            </Link>
          )}
        </div>
      </div>
    </li>
  )
}

function StatusBadge({ status }: { status: RoadmapStep['status'] }) {
  const config = {
    done: { label: 'Completed', icon: Check, className: 'border-success/40 bg-success/10 text-success' },
    current: { label: 'Up next', icon: Play, className: 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan' },
    upcoming: { label: 'Locked', icon: Lock, className: 'border-white/10 bg-white/5 text-muted-foreground' },
  }[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium', config.className)}>
      <config.icon className="size-3" aria-hidden="true" />
      {config.label}
    </span>
  )
}
