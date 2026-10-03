import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="SkillPath AI home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient shadow-[0_0_20px_-4px_var(--brand-purple)] transition-transform group-hover:rotate-6">
        <Sparkles className="size-4.5 text-white" aria-hidden="true" />
      </span>
      <span className="font-heading text-lg font-bold tracking-tight">
        SkillPath <span className="text-gradient">AI</span>
      </span>
    </Link>
  )
}
