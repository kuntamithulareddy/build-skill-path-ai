import type { Metadata } from 'next'
import { RoadmapView } from '@/components/roadmap/roadmap-view'

export const metadata: Metadata = { title: 'Roadmap' }

export default function RoadmapPage() {
  return <RoadmapView />
}
