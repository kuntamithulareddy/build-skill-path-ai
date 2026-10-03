import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Features } from '@/components/home/features'
import { CallToAction } from '@/components/home/call-to-action'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <CallToAction />
    </main>
  )
}
