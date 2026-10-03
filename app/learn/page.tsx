import type { Metadata } from 'next'
import { LearnView } from '@/components/learn/learn-view'

export const metadata: Metadata = { title: 'Learn Next' }

export default function LearnPage() {
  return <LearnView />
}
