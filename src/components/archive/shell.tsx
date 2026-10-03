/* The frame around every page: top bar and searchable index.
   (The landing page lives in opening.tsx.) */
import { Suspense, lazy, useEffect, useState } from "react"
import { NavLink } from "react-router"
import { usePageTurn } from "@/lib/book"
import { Button } from "@/components/ui/button"
import { A, RESUME } from "@/lib/archive"

/* Arrow keys turn the pages (← back, → forward), anywhere in the book.
   The visible corners live on each page's edge, see page-corners.tsx. */
export function PageKeys() {
  const { back, forward } = usePageTurn()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, [contenteditable], [role=dialog], [role=tablist], [data-own-arrows]")) return
      if (e.key === "ArrowLeft") back()
      if (e.key === "ArrowRight") forward?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [back, forward])
  return null
}

export function Topbar() {
  const nav = "h-8 px-2.5 font-sans text-[13px] font-normal tracking-wide text-ink/80 hover:bg-accent hover:text-rust"
  return (
    <header className="topbar">
      <NavLink className="brand" to="/about" aria-label="Back to the contents">
        <span className="brand-name">{A.owner}</span>
        <span className="brand-sub mono">archive</span>
      </NavLink>
      <nav className="flex items-center gap-1" aria-label="Primary">
        <Button asChild variant="ghost" size="sm" className={`${nav} aria-[current=page]:text-rust`}>
          <NavLink to="/about" end>Contents</NavLink>
        </Button>
        {RESUME && (
          <Button asChild variant="ghost" size="sm" className={nav}>
            <a href={RESUME.href} download>Résumé</a>
          </Button>
        )}
      </nav>
    </header>
  )
}

const IndexDialog = lazy(() => import("@/components/archive/index-dialog"))

/* ⌘K / Ctrl K: the whole archive, searchable. The dialog itself loads the
   first time it's asked for, then stays mounted so it can animate closed. */
export function ArchiveIndex({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [wanted, setWanted] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setWanted(true)
        setOpen(!open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  if (!wanted && !open) return null
  return <Suspense fallback={null}><IndexDialog open={open} setOpen={setOpen} /></Suspense>
}
