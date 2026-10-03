'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { btnPrimary } from '@/lib/styles'
import { Logo } from './logo'

export const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/learn', label: 'Learn Next' },
  { href: '/resources', label: 'Resources' },
  { href: '/profile', label: 'Profile' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    active && 'bg-white/5 text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <Link href="/setup" className={cn(btnPrimary, 'px-4 py-2')}>
            Start My Journey
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/5 px-4 pb-4 md:hidden animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground',
                    pathname.startsWith(link.href) && 'bg-white/5 text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/setup" onClick={() => setOpen(false)} className={cn(btnPrimary, 'mt-3 w-full')}>
            Start My Journey
          </Link>
        </div>
      )}
    </header>
  )
}
