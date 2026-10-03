'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Clock, Gauge, Lightbulb, PartyPopper, Sparkles } from 'lucide-react'
import { estimateHours, explainRecommendation, getCareer, getNextSkill, preferenceTip } from '@/lib/recommendation'
import { useStudent } from '@/lib/student-store'
import { PREFERENCES } from '@/lib/skillpath-data'
import { cn } from '@/lib/utils'
import { NoProfile } from '../no-profile'
import { GlassCard, LoadingState, PageHeader, PageShell } from '../shared'
import { SkillActions } from '../skill-actions'

export function LearnView() {
  const { student, hydrated } = useStudent()
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  if (!hydrated) return <LoadingState />
  if (!student) return <NoProfile />

  const skill = getNextSkill(student)
  const career = getCareer(student.careerGoal)

  if (!skill) {
    return (
      <PageShell>
        <GlassCard className="mx-auto max-w-lg p-10 text-center">
          <PartyPopper className="mx-auto size-10 text-brand-cyan" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold">{"You've completed your roadmap!"}</h1>
          <p className="mt-2 text-muted-foreground">Amazing work on the {career.name} path. Pick a new goal to keep going.</p>
          <Link href="/setup" className="mt-6 inline-block font-semibold text-brand-cyan hover:underline">
            Choose a new goal
          </Link>
        </GlassCard>
      </PageShell>
    )
  }

  const preferenceLabel = PREFERENCES.find((p) => p.id === student.preference)?.label

  return (
    <PageShell>
      <PageHeader eyebrow="Learn Next" title="What Should I Learn Next?" description={`Based on your skills and your goal of becoming a ${career.name}.`} />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <GlassCard key={skill.id} className="relative overflow-hidden p-8 animate-in fade-in zoom-in-95 duration-500">
          <div aria-hidden="true" className="absolute -left-20 -top-20 size-56 rounded-full bg-brand-purple/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -right-16 size-56 rounded-full bg-brand-cyan/15 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Recommended for you
            </span>
            <h2 className="mt-5 text-4xl font-bold">{skill.name}</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Meta icon={Clock} label="Estimated time" value={`~${estimateHours(skill, student.level)} hours`} />
              <Meta icon={Gauge} label="Difficulty" value={skill.difficulty} />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="size-4 text-brand-cyan" aria-hidden="true" />
                Why this skill is recommended
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{explainRecommendation(student, skill)}</p>
            </div>

            <div className="mt-7">
              <SkillActions skillId={skill.id} practiceHref="#practice" />
            </div>
          </div>
        </GlassCard>

        <div className="flex flex-col gap-5">
          <GlassCard>
            <h2 className="text-sm font-semibold">Your learning style</h2>
            <p className="mt-1 font-heading text-xl font-semibold text-gradient">{preferenceLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{preferenceTip(student.preference)}</p>
          </GlassCard>

          <GlassCard>
            <h2 id="practice" className="scroll-mt-24 font-semibold">
              Practice tasks
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {skill.practice.map((task) => {
                const key = `${skill.id}:${task}`
                const done = !!checked[key]
                return (
                  <li key={task}>
                    <button
                      type="button"
                      aria-pressed={done}
                      onClick={() => setChecked((c) => ({ ...c, [key]: !c[key] }))}
                      className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left text-sm transition-colors hover:bg-white/5"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                          done ? 'border-brand-cyan bg-brand-cyan text-accent-foreground' : 'border-white/20',
                        )}
                      >
                        {done && <Check className="size-3.5" aria-hidden="true" />}
                      </span>
                      <span className={cn('leading-relaxed', done && 'text-muted-foreground line-through')}>{task}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}

function Meta({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
      <Icon className="size-5 text-brand-cyan" aria-hidden="true" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}
