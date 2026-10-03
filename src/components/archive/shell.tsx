/* The frame around every page: top bar and searchable index.
   (The landing page lives in opening.tsx.) */
import { useEffect, type CSSProperties } from "react"
import { NavLink, useNavigate } from "react-router"
import { usePageTurn } from "@/lib/book"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"
import { A, childHref, inWing } from "@/lib/archive"

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

export function Topbar({ onIndex }: { onIndex: () => void }) {
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
        <Button variant="ghost" size="sm" className={`${nav} gap-2`} onClick={onIndex} aria-haspopup="dialog">
          Search <Kbd className="hidden bg-transparent font-mono text-[10px] text-muted-foreground ring-1 ring-border sm:inline-flex">Ctrl K</Kbd>
        </Button>
      </nav>
    </header>
  )
}

type RowProps = { num: string; title: string; desc?: string; to: string; sub?: boolean; color?: string; go: (to: string) => void }
const Row = ({ num, title, desc, to, sub, color, go }: RowProps) => (
  <CommandItem value={`${num} ${title} ${desc ?? ""}`} onSelect={() => go(to)} className={`index-item ${sub ? "pl-8" : ""}`}
    style={color ? ({ "--rust": color } as CSSProperties) : undefined}>
    <span className="index-num">{num}</span>
    <span className={sub ? "index-sub-title" : "index-title"}>{title}</span>
    {desc && <span className="index-desc">{desc}</span>}
  </CommandItem>
)

/* ⌘K / Ctrl K: the whole archive, searchable , sections, exhibits, papers, books. */
export function ArchiveIndex({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const navigate = useNavigate()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Index of the archive" description="Search sections, exhibits and books"
      className="archive-index sm:max-w-xl">
      <CommandInput placeholder="Search the archive…" />
      <CommandList className="max-h-[min(60vh,520px)]">
        <CommandEmpty><span className="font-hand text-lg text-muted-foreground">nothing filed under that, yet</span></CommandEmpty>
        <CommandGroup heading="Start here">
          <Row go={go} num={A.about.catalogue} title="About Me" desc="the contents" to="/about" />
        </CommandGroup>
        {A.wings.map((w) => (
          <CommandGroup key={w.id} heading={`${w.label} · ${w.title}`}>
            {inWing(w.id).flatMap((s) => [
              <Row go={go} key={s.id} num={s.catalogue} title={s.title} desc={s.desc} to={`/${s.id}`} color={s.color} />,
              ...(s.children ?? []).map((c) => <Row go={go} key={c.id} num={c.catalogue} title={c.title} to={childHref(s.id, c.id)} color={s.color} sub />),
            ])}
          </CommandGroup>
        ))}
        <CommandSeparator />
        {/* HIDDEN for now , see HIDDEN_SECTIONS.md
        <CommandGroup heading="Papers">
          {A.papers.items.map((p) => <Row go={go} key={p.id} num={String(p.year)} title={p.title} to={`/papers/${p.id}`} />)}
        </CommandGroup> */}
        <CommandGroup heading="Books">
          {A.books.items.map((b) => <Row go={go} key={b.title} num="032" title={b.title} desc={b.author} to="/books" />)}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
