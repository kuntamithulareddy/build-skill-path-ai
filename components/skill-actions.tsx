'use client'

import Link from 'next/link'
import { BookOpen, CheckCircle2, Dumbbell } from 'lucide-react'
import { useStudent } from '@/lib/student-store'
import { btnPrimary, btnSecondary, btnSuccess } from '@/lib/styles'

export function SkillActions({ skillId, practiceHref }: { skillId: string; practiceHref?: string }) {
  const { markComplete } = useStudent()

  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/resources?skill=${skillId}`} className={btnPrimary}>
        <BookOpen aria-hidden="true" />
        Learn Now
      </Link>
      <Link href={practiceHref ?? '/learn#practice'} className={btnSecondary}>
        <Dumbbell aria-hidden="true" />
        Practice
      </Link>
      <button type="button" onClick={() => markComplete(skillId)} className={btnSuccess}>
        <CheckCircle2 aria-hidden="true" />
        Mark Complete
      </button>
    </div>
  )
}
