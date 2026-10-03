'use client'

import Link from 'next/link'
import { UserPlus, Wand2 } from 'lucide-react'
import { DEMO_STUDENT, useStudent } from '@/lib/student-store'
import { btnPrimary, btnSecondary } from '@/lib/styles'
import { GlassCard, PageShell } from './shared'

export function NoProfile({ title = 'Set up your profile first' }: { title?: string }) {
  const { saveProfile } = useStudent()

  return (
    <PageShell>
      <GlassCard className="mx-auto max-w-lg p-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-[0_0_30px_-6px_var(--brand-purple)]">
          <UserPlus className="size-6 text-white" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Tell SkillPath AI about your skills and career goal so we can build your personalized roadmap.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/setup" className={btnPrimary}>
            Start My Journey
          </Link>
          <button type="button" onClick={() => saveProfile(DEMO_STUDENT)} className={btnSecondary}>
            <Wand2 aria-hidden="true" />
            Try a demo student
          </button>
        </div>
      </GlassCard>
    </PageShell>
  )
}
