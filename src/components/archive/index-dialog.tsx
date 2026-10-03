/* The archive's index (Ctrl K / ⌘K): every section, exhibit and book,
   searchable. Loaded on first use, so the search libraries stay out of the
   first page load (see ArchiveIndex in shell.tsx). */
import type { CSSProperties } from "react"
import { useNavigate } from "react-router"
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"
import { A, childHref, inWing, pageOf } from "@/lib/archive"

type RowProps = { num?: number; title: string; desc?: string; to: string; sub?: boolean; color?: string; go: (to: string) => void }
const Row = ({ num, title, desc, to, sub, color, go }: RowProps) => (
  <CommandItem value={`${title} ${desc ?? ""}`} onSelect={() => go(to)} className={`index-item ${sub ? "pl-8" : ""}`}
    style={color ? ({ "--rust": color } as CSSProperties) : undefined}>
    <span className="index-num">{num}</span>
    <span className={sub ? "index-sub-title" : "index-title"}>{title}</span>
    {desc && <span className="index-desc">{desc}</span>}
  </CommandItem>
)

export default function IndexDialog({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const navigate = useNavigate()
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
          <Row go={go} num={pageOf("/about")} title="About Me" desc="the contents" to="/about" />
        </CommandGroup>
        {A.wings.map((w) => (
          <CommandGroup key={w.id} heading={`${w.label} · ${w.title}`}>
            {inWing(w.id).flatMap((s) => [
              <Row go={go} key={s.id} num={pageOf(`/${s.id}`)} title={s.title} desc={s.desc} to={`/${s.id}`} color={s.color} />,
              ...(s.children ?? []).map((c) => <Row go={go} key={c.id} num={pageOf(childHref(s.id, c.id))} title={c.title} to={childHref(s.id, c.id)} color={s.color} sub />),
            ])}
          </CommandGroup>
        ))}
        <CommandSeparator />
        {/* HIDDEN for now , see HIDDEN_SECTIONS.md (needs: import { HIDDEN } from "@/content-hidden")
        <CommandGroup heading="Papers">
          {HIDDEN.papers.items.map((p) => <Row go={go} key={p.id} num={String(p.year)} title={p.title} to={`/papers/${p.id}`} />)}
        </CommandGroup> */}
        <CommandGroup heading="Books">
          {A.books.items.map((b) => <Row go={go} key={b.title} num={pageOf("/books")} title={b.title} desc={b.author} to="/books" />)}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
