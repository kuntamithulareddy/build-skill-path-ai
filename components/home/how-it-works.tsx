import { Compass, GraduationCap, Map, Rocket, ScanSearch } from 'lucide-react'

const STEPS = [
  { icon: GraduationCap, title: 'Your Skills', text: 'Tell us what you already know.' },
  { icon: Compass, title: 'Career Goal', text: 'Pick the role you are aiming for.' },
  { icon: ScanSearch, title: 'Skill Gap', text: 'We find what is missing.' },
  { icon: Map, title: 'Roadmap', text: 'Get a clear step-by-step path.' },
  { icon: Rocket, title: 'Next Skill', text: 'Know exactly what to learn now.' },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="how-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">How it works</p>
        <h2 id="how-heading" className="mt-3 text-balance text-3xl font-bold sm:text-4xl">
          From where you are to where you want to be
        </h2>
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="glass group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/40"
          >
            <span className="font-heading text-xs font-bold text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
            <span className="mt-3 flex size-11 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-brand-gradient">
              <step.icon className="size-5 text-brand-cyan transition-colors group-hover:text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
