/* Shared editorial pieces used across the archive's pages. */
import { useRef, type ReactNode } from "react"
import { Link, useLocation } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Flower } from "@/components/archive/flower"
import { PageCorners } from "@/components/archive/page-corners"
import { A, ROMAN, fmtDay, pad, pageOf, section, wing } from "@/lib/archive"
import { bloomOnScroll, useMotion, writeIn } from "@/lib/motion"

type Trail = { href?: string; label: string }[]

export function Crumbs({ trail }: { trail: Trail }) {
  const { pathname } = useLocation()
  const w = wing(section(pathname.split("/")[1])?.wing)
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link className="meta ink-link" to="/about">Contents</Link>
      {w && (
        <>
          <span className="sep">/</span>
          <span className="meta wing-crumb">{w.title} wing</span>
        </>
      )}
      {trail.map((t) => (
        <span key={t.label} className="contents">
          <span className="sep">/</span>
          {t.href ? <Link className="meta ink-link" to={t.href}>{t.label}</Link> : <span className="meta">{t.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function PageHead({ trail = [], catalogue, name, title, lede, note, children }: {
  trail?: Trail
  catalogue: string
  name: string
  title: ReactNode
  lede?: string
  note?: string
  children?: ReactNode
}) {
  return (
    <>
      <Crumbs trail={trail} />
      <header className="page-head">
        <p className="catalogue">ARCHIVE <b>{catalogue}</b> · {name.toUpperCase()}</p>
        <h1 className="page-title">{title}</h1>
        {lede && <p className="page-lede">{lede}</p>}
        {children}
        {note && <span className="margin-note" aria-hidden="true">{note}</span>}
      </header>
    </>
  )
}

export function Sec({ n, label, hint, children }: { n: number; label: string; hint?: string; children: ReactNode }) {
  return (
    <section className="sec reveal">
      <div className="sec-label">
        <span className="n">{pad(n)}</span>
        <h2>{label}</h2>
        {hint && <p>{hint}</p>}
      </div>
      <div className="sec-body">{children}</div>
    </section>
  )
}

/* A sheet of notebook paper: every section page is one. It ends with a quiet
   colophon and the folded corners you turn the page by (they must be direct
   children of the sheet so they can ride its bottom edge). */
export function Page({ className = "", children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const page = pageOf(useLocation().pathname)
  useMotion(root, () => {
    writeIn(".page-title", 250)
    bloomOnScroll(".flower")
  })
  return (
    <div ref={root} className={`page ${className}`}>
      {children}
      <footer>
        <Flower className="colophon-flower" />
        <p className="colophon">MAINTAINED BY {A.owner.toUpperCase()} · LAST UPDATED {fmtDay(A.lastUpdated)}</p>
        {page && <p className="page-folio">p. {page}</p>}
      </footer>
      <PageCorners />
    </div>
  )
}

export const MarkedList = ({ items, x }: { items: readonly string[]; x?: boolean }) => (
  <ul className={`list-marked ${x ? "x" : ""}`}>
    {items.map((t) => <li key={t}>{t}</li>)}
  </ul>
)

export const Tags = ({ items }: { items: readonly string[] }) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((t) => (
      <li key={t}>
        <Badge variant="outline" className="tag rounded-sm font-mono text-[12px] font-normal">{t}</Badge>
      </li>
    ))}
  </ul>
)

export const LabelTable = ({ rows }: { rows: [string, ReactNode][] }) => (
  <table className="label-table">
    <tbody>
      {rows.map(([k, v]) => (
        <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
      ))}
    </tbody>
  </table>
)

export function Plates({ items }: { items: readonly { caption: string; src: string }[] }) {
  return (
    <div className="plates">
      {items.map((p, i) => (
        <figure className="plate" key={p.caption}>
          <div className="plate-frame">
            {p.src
              ? <a href={p.src} target="_blank" rel="noreferrer" aria-label={`Open full size: ${p.caption}`}><img src={p.src} alt="" loading="lazy" /></a>
              : <span className="pending">image to be added</span>}
          </div>
          <figcaption><span className="mono">PLATE {ROMAN[i].toUpperCase()}</span><span>{p.caption}</span></figcaption>
        </figure>
      ))}
    </div>
  )
}

const KEYWORDS = /\b(from|import|def|return|lambda|and|or|in|for|if|else)\b/g
function highlight(line: string, key: number) {
  const hash = line.indexOf("#")
  const codePart = hash >= 0 ? line.slice(0, hash) : line
  const parts: ReactNode[] = []
  let last = 0
  for (const m of codePart.matchAll(KEYWORDS)) {
    parts.push(codePart.slice(last, m.index), <span className="k" key={m.index}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  parts.push(codePart.slice(last))
  if (hash >= 0) parts.push(<span className="c" key="c">{line.slice(hash)}</span>)
  return <span key={key}>{parts}{"\n"}</span>
}

export const CodeBlock = ({ caption, lang, text }: { caption: string; lang: string; text: string }) => (
  <figure className="code">
    <figcaption className="code-head"><span>{caption}</span><span>{lang}</span></figcaption>
    <pre><code>{text.split("\n").map(highlight)}</code></pre>
  </figure>
)
