'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { CAREER_GOALS, LEVELS, PREFERENCES, SELECTABLE_SKILLS, SKILLS, type Level, type Preference } from '@/lib/skillpath-data'
import { useStudent, type Student } from '@/lib/student-store'
import { btnPrimary } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { GlassCard } from '../shared'

export function SetupForm() {
  const { student, hydrated } = useStudent()
  if (!hydrated) return <GlassCard className="h-[36rem] animate-pulse" >{null}</GlassCard>
  return <SetupFormFields key={student?.createdAt ?? 'new'} initial={student} />
}

function SetupFormFields({ initial }: { initial: Student | null }) {
  const router = useRouter()
  const { saveProfile } = useStudent()
  const [name, setName] = useState(initial?.name ?? '')
  const [level, setLevel] = useState<Level>(initial?.level ?? 'Beginner')
  const [skills, setSkills] = useState<string[]>(initial?.skills ?? [])
  const [careerGoal, setCareerGoal] = useState(initial?.careerGoal ?? '')
  const [preference, setPreference] = useState<Preference>(initial?.preference ?? 'videos')
  const [error, setError] = useState<string | null>(null)

  const toggleSkill = (id: string) =>
    setSkills((current) => (current.includes(id) ? current.filter((s) => s !== id) : [...current, id]))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return setError('Please enter your name.')
    if (!careerGoal) return setError('Please choose a career goal.')
    saveProfile({ name: trimmed.slice(0, 60), level, skills, careerGoal, preference })
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <GlassCard className="flex flex-col gap-6">
        <div>
          <label htmlFor="student-name" className="mb-2 block text-sm font-semibold">
            Student Name
          </label>
          <input
            id="student-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            maxLength={60}
            autoComplete="name"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-foreground placeholder:text-muted-foreground/70 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
          />
        </div>

        <Fieldset legend="Current Level">
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <ChoiceButton key={l} selected={level === l} onClick={() => setLevel(l)}>
                {l}
              </ChoiceButton>
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Current Skills" hint="Select everything you are already comfortable with.">
          <div className="flex flex-wrap gap-2">
            {SELECTABLE_SKILLS.map((id) => {
              const selected = skills.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleSkill(id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                    selected
                      ? 'border-brand-cyan/60 bg-brand-cyan/15 text-foreground'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-foreground',
                  )}
                >
                  {selected && <Check className="size-3.5 text-brand-cyan" aria-hidden="true" />}
                  {SKILLS[id].shortName}
                </button>
              )
            })}
          </div>
        </Fieldset>
      </GlassCard>

      <GlassCard className="flex flex-col gap-6">
        <Fieldset legend="Career Goal">
          <div className="grid gap-2 sm:grid-cols-2">
            {CAREER_GOALS.map((goal) => (
              <button
                key={goal.id}
                type="button"
                aria-pressed={careerGoal === goal.id}
                onClick={() => setCareerGoal(goal.id)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  careerGoal === goal.id
                    ? 'border-brand-purple/70 bg-brand-purple/15 shadow-[0_0_24px_-10px_var(--brand-purple)]'
                    : 'border-white/10 bg-white/5 hover:border-white/25',
                )}
              >
                <span className="block font-semibold">{goal.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{goal.description}</span>
              </button>
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Learning Preference">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PREFERENCES.map((p) => (
              <ChoiceButton key={p.id} selected={preference === p.id} onClick={() => setPreference(p.id)}>
                {p.label}
              </ChoiceButton>
            ))}
          </div>
        </Fieldset>
      </GlassCard>

      {error && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <button type="submit" className={cn(btnPrimary, 'h-13 w-full text-base')}>
        <Sparkles aria-hidden="true" />
        Generate My Personalized Roadmap
      </button>
    </form>
  )
}

function Fieldset({ legend, hint, children }: { legend: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-semibold">{legend}</legend>
      {hint ? <p className="mb-3 text-sm text-muted-foreground">{hint}</p> : <div className="mb-2" />}
      {children}
    </fieldset>
  )
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'h-11 rounded-xl border text-sm font-medium transition-all',
        selected
          ? 'border-brand-purple/70 bg-brand-purple/20 text-foreground'
          : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
