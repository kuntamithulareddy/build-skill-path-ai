import Link from 'next/link'
import { Clock, ExternalLink, PlayCircle, Search, Signal } from 'lucide-react'
import { getResources, RESOURCES, youtubeSearchUrl, type Resource } from '@/lib/resources'
import { SKILLS } from '@/lib/skillpath-data'
import { btnPrimary, btnSecondary } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { GlassCard, PageHeader, PageShell } from '../shared'

export function ResourcesView({ skillId }: { skillId: string }) {
  const skill = SKILLS[skillId]
  const resources = getResources(skillId)
  const curatedSkillIds = Object.keys(RESOURCES)
  const tabs = curatedSkillIds.includes(skillId) ? curatedSkillIds : [...curatedSkillIds, skillId]

  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources"
        title={<span className="text-gradient">{skill.name}</span>}
        description="Hand-picked, free full-length courses from trusted YouTube teachers."
      />

      <nav aria-label="Skills with resources" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((id) => (
          <Link
            key={id}
            href={`/resources?skill=${id}`}
            aria-current={id === skillId ? 'page' : undefined}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all',
              id === skillId
                ? 'border-brand-purple/70 bg-brand-purple/20 text-foreground'
                : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground',
            )}
          >
            {SKILLS[id].name}
          </Link>
        ))}
      </nav>

      {resources.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <ResourceCard key={resource.url} resource={resource} index={i} />
          ))}
        </ul>
      ) : (
        <GlassCard className="mx-auto max-w-xl p-10 text-center">
          <Search className="mx-auto size-8 text-brand-cyan" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">Curated courses coming soon</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {"We're still hand-picking the best courses for "}
            {skill.name}. In the meantime, explore top results on YouTube.
          </p>
          <a href={youtubeSearchUrl(skill.name)} target="_blank" rel="noopener noreferrer" className={cn(btnPrimary, 'mt-6')}>
            <PlayCircle aria-hidden="true" />
            Search YouTube
          </a>
        </GlassCard>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/learn" className={btnSecondary}>
          Back to Learn Next
        </Link>
        <Link href="/profile" className={btnSecondary}>
          View my profile
        </Link>
      </div>
    </PageShell>
  )
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  return (
    <li
      className="glass group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/40 hover:shadow-[0_0_40px_-14px_var(--brand-purple)] animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-brand-gradient">
          <PlayCircle className="size-6 text-brand-cyan transition-colors group-hover:text-white" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-pretty font-semibold leading-snug">{resource.title}</h2>
          <p className="mt-1 text-sm text-brand-cyan">{resource.channel}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {resource.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Signal className="size-3.5" aria-hidden="true" />
            {resource.level}
          </span>
        </div>
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={cn(btnPrimary, 'px-4 py-2')}>
          Watch
          <ExternalLink aria-hidden="true" />
          <span className="sr-only">(opens YouTube in a new tab)</span>
        </a>
      </div>
    </li>
  )
}
