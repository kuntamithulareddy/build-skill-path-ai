export function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          {'© '}
          {new Date().getFullYear()} SkillPath AI. Learn smarter.
        </p>
        <p>Built for students, by students.</p>
      </div>
    </footer>
  )
}
