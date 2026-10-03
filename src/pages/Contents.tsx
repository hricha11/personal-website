/* ABOUT ME , an open notebook: professional on the left page, personal on the right. */
import { useRef, type CSSProperties } from "react"
import { Link } from "react-router"
import { FigBranch } from "@/components/archive/fig"
import { Flower } from "@/components/archive/flower"
import { PageCorners } from "@/components/archive/page-corners"
import { bloom, drawIn, useMotion, writeIn } from "@/lib/motion"
import { useTitle } from "@/lib/use-title"
import { A, HOME_TITLE, childHref, fmtDay, inWing, type Section, type Wing } from "@/lib/archive"

function TocEntry({ s, i }: { s: Section; i: number }) {
  return (
    <li className="toc-item" style={{ animationDelay: `${0.3 + i * 0.07}s`, "--rust": s.color, "--petal": s.petal } as CSSProperties}>
      <Link className="toc-row" to={`/${s.id}`}>
        <Flower className="toc-tab" />
        <span className="toc-t">{s.title}</span>
        <span className="toc-dots" aria-hidden="true" />
        <span className="toc-n">{s.catalogue}</span>
      </Link>
      <p className="toc-d">{s.desc}</p>
      <span className="toc-note" aria-hidden="true">{s.note}</span>
      {s.children && (
        <ol className="toc-sub">
          {s.children.map((c) => (
            <li key={c.id}>
              <Link className="toc-row sub" to={childHref(s.id, c.id)}>
                <span className="toc-t">{c.title}</span>
                <span className="toc-dots" aria-hidden="true" />
                <span className="toc-n">{c.catalogue}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </li>
  )
}

const WingHead = ({ w }: { w: Wing }) => (
  <div className="nb-wing" style={{ "--rust": w.color, "--petal": w.petal } as CSSProperties}>
    <p className="meta"><Flower className="wing-flower" />{w.label} · {w.title}</p>
    <p className="wing-note">{w.note}</p>
  </div>
)

export default function Contents() {
  useTitle(HOME_TITLE)
  const [work, life] = A.wings
  const workSections = inWing(work.id)
  const root = useRef<HTMLDivElement>(null)
  useMotion(root, () => {
    writeIn(".nb-name", 200)
    bloom(".wing-flower", 350)
    bloom(".toc-tab", 550)
    drawIn(".fig-branch > path:not(.fig-fallen)", 1200)
    bloom(".fig-hang", 2300)
  })

  return (
    <div ref={root} className="spread-wrap">
      <div className="spread">
        <section className="sheet sheet-l" aria-label={`${work.title} wing`}>
          <header className="sheet-head"><span>ARCHIVE {A.about.catalogue} · ABOUT ME</span></header>
          <h1 className="nb-name">Index</h1>
          <p className="nb-tag">{A.tagline}</p>
          <WingHead w={work} />
          <ol className="toc">{workSections.map((s, i) => <TocEntry key={s.id} s={s} i={i} />)}</ol>
          <footer className="sheet-foot hand">p. 2</footer>
        </section>

        <section className="sheet sheet-r" aria-label={`${life.title} wing`}>
          <header className="sheet-head"><span>{A.opening.subtitle}</span></header>
          <WingHead w={life} />
          <ol className="toc">{inWing(life.id).map((s, i) => <TocEntry key={s.id} s={s} i={workSections.length + i} />)}</ol>
          <div className="nb-about">
            <p className="meta">The short version</p>
            {A.about.short.map((p) => <p key={p}>{p}</p>)}
            <p className="nb-sign"><span className="hand">-Hri.</span><span className="mono">last written {fmtDay(A.lastUpdated)}</span></p>
          </div>
          <p className="nb-links">
            {A.links.map((l) =>
              l.href.startsWith("mailto:") ? (
                <a key={l.label} className="ink-link" href={l.href}>{l.label}</a>
              ) : (
                <a key={l.label} className="ink-link" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
              ),
            )}
          </p>
          <figure className="nb-fig">
            <FigBranch />
            <figcaption className="hand">couldn’t choose one. kept them all.</figcaption>
          </figure>
          <footer className="sheet-foot hand">p. 3</footer>
        </section>
        <PageCorners />
      </div>
      <p className="spread-hint" aria-hidden="true">pick any line to turn to that page, or press <kbd className="font-mono text-[0.8em] not-italic">Ctrl K</kbd> to search</p>
    </div>
  )
}
