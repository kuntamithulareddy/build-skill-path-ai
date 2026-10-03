import { BrainCircuit, Flame, PlayCircle } from 'lucide-react'

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'Smart recommendations',
    text: 'SkillPath compares your skills with your goal and recommends the single most important skill to learn next, with a clear reason why.',
  },
  {
    icon: PlayCircle,
    title: 'Curated free courses',
    text: 'Every skill links to hand-picked full-length YouTube courses from trusted teachers, so you never waste time searching.',
  },
  {
    icon: Flame,
    title: 'Progress & streaks',
    text: 'Mark skills complete, watch your roadmap fill up and build a daily learning streak that keeps you motivated.',
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_var(--brand-purple)]"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gradient">
              <feature.icon className="size-5 text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
