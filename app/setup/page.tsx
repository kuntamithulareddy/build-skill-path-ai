import type { Metadata } from 'next'
import { SetupForm } from '@/components/setup/setup-form'
import { PageHeader, PageShell } from '@/components/shared'

export const metadata: Metadata = { title: 'Student Setup' }

export default function SetupPage() {
  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Step 1 of 1"
        title="Tell us about yourself"
        description="We use your current skills and career goal to find your skill gap and build a personalized roadmap."
      />
      <SetupForm />
    </PageShell>
  )
}
