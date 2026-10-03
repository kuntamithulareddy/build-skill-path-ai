import Link from 'next/link'
import { ArrowRight, CheckCircle2, Map, Sparkles, Target } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { ProgressBar } from '../shared'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-brand-cyan" aria-hidden="true" />
          Personalized learning paths for students
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          Learn Smarter. <span className="text-gradient">Know What to Learn Next.</span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          SkillPath AI creates a personalized learning path based on your skills and career goal.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/setup" className={cn(btnPrimary, 'px-6 py-3 text-base')}>
            Start My Journey
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/roadmap" className={cn(btnSecondary, 'px-6 py-3 text-base')}>
            <Map aria-hidden="true" />
            Explore Roadmap
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {['Free to use', '5 career paths', 'No sign-up needed'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-brand-cyan" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <HeroPreview />
    </section>
  )
}

function HeroPreview() {
  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-1000" aria-hidden="true">
      <div className="absolute -inset-4 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
      <div className="glass relative rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Career Goal</p>
            <p className="font-heading font-semibold">Frontend Developer</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/5">
            <Target className="size-5 text-brand-cyan" />
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Roadmap progress</span>
            <span className="text-foreground">29%</span>
          </div>
          <ProgressBar value={29} label="Sample progress" />
        </div>

        <div className="mt-6 rounded-2xl border border-brand-purple/30 bg-brand-purple/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">Recommended next skill</p>
          <p className="mt-2 font-heading text-xl font-bold">JavaScript Essentials</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You already know HTML and CSS. JavaScript is the next important skill for your frontend career.
          </p>
        </div>

        <ol className="mt-6 flex flex-col gap-2.5">
          {[
            { name: 'HTML Fundamentals', state: 'done' },
            { name: 'CSS Fundamentals', state: 'done' },
            { name: 'JavaScript Essentials', state: 'current' },
            { name: 'Git & GitHub', state: 'upcoming' },
          ].map((step, i) => (
            <li key={step.name} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  'flex size-7 items-center justify-center rounded-lg text-xs font-bold',
                  step.state === 'done' && 'bg-success/15 text-success',
                  step.state === 'current' && 'bg-brand-gradient text-white',
                  step.state === 'upcoming' && 'bg-white/5 text-muted-foreground',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={step.state === 'upcoming' ? 'text-muted-foreground' : ''}>{step.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
