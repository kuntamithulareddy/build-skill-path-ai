import type { Metadata } from 'next'
import { ResourcesView } from '@/components/resources/resources-view'
import { SKILLS } from '@/lib/skillpath-data'

export const metadata: Metadata = { title: 'Resources' }

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ skill?: string }> }) {
  const { skill } = await searchParams
  const skillId = skill && SKILLS[skill] ? skill : 'html'
  return <ResourcesView skillId={skillId} />
}
