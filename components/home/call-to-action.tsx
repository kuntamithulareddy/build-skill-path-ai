import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { btnPrimary } from '@/lib/styles'
import { cn } from '@/lib/utils'

export function CallToAction() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
        <div aria-hidden="true" className="absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-brand-gradient opacity-30 blur-3xl" />
        <h2 className="relative text-balance text-3xl font-bold sm:text-4xl">Stop guessing. Start progressing.</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          It takes less than a minute to build your personalized roadmap.
        </p>
        <Link href="/setup" className={cn(btnPrimary, 'relative mt-8 px-6 py-3 text-base')}>
          Generate My Roadmap
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
