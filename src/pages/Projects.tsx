/* PERSONAL PROJECTS , the exhibits, and each exhibit examined.
   Every section of an exhibit is optional: it only shows when content.ts
   has something for it (all of it from the résumé). */
import { Link, useParams } from "react-router"
import type { CSSProperties } from "react"
import { Crumbs, LabelTable, MarkedList, Page, PageHead, Plates, Sec, Tags } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { SPECIMENS } from "@/components/archive/specimens"
import { A, projectById, section } from "@/lib/archive"
import NotFound from "./NotFound"

type Maybe = {
  dataset?: readonly (readonly [string, string])[] | string[][]
  model?: string
  results?: { note: string; rows: { label: string; value: number }[] }
  plates?: { caption: string; src: string }[]
  problem?: string
  training?: readonly (readonly [string, string])[] | string[][]
  decisions?: { decision: string; why: string }[]
  challenges?: string[]
  next?: string[]
}

export function Projects() {
  const s = section("projects")!
  useTitle(s.title)
  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title}
        title={<>Personal <em>Projects</em></>} lede={A.projects.lede} note="built at odd hours" />
      <div className="exhibits">
        {A.projects.items.map((p) => (
          <article className="exhibit-card reveal" key={p.id}>
            <Link className="specimen" to={`/projects/${p.id}`} aria-label={`Examine ${p.title}`}>
              <span className="contents" dangerouslySetInnerHTML={{ __html: SPECIMENS[p.id] ?? "" }} />
              <span className="corner tl">EXHIBIT {p.exhibit}</span>
              <span className="corner tr">{p.catalogue}</span>
              <span className="corner bl">FIG. 1</span>
            </Link>
            <div>
              <p className="meta">EXHIBIT {p.exhibit} · ARCHIVE {p.catalogue}</p>
              <h2>{p.title}</h2>
              <p className="sub">{p.subtitle}</p>
              <p className="summary">{p.summary}</p>
              <LabelTable rows={[["Materials", p.materials.join(" · ")]]} />
              <Link className="examine ink-link" to={`/projects/${p.id}`}>Examine the exhibit <span className="arrow">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </Page>
  )
}

export function Exhibit() {
  const { id } = useParams()
  const p = projectById(id)
  useTitle(p?.title ?? "Not in the archive")
  if (!p) return <NotFound />
  const s = section("projects")!
  const { dataset, model, results, plates, problem, training, decisions, challenges, next } = p as Maybe
  let n = 0

  return (
    <Page>
      <Crumbs trail={[{ href: "/projects", label: s.title }, { label: p.title }]} />
      <div className="ex-head">
        <header className="page-head">
          <p className="catalogue">ARCHIVE <b>{p.catalogue}</b> · {p.title.toUpperCase()}</p>
          <p className="ex-exhibit">EXHIBIT {p.exhibit}</p>
          <h1 className="page-title">{p.title}</h1>
          <p className="ex-sub">{p.subtitle}</p>
        </header>
        <aside className="ex-label" aria-label="Object label">
          <p className="meta">OBJECT LABEL</p>
          <LabelTable rows={[["Object", p.summary], ["Materials", p.materials.join(" · ")]]} />
        </aside>
      </div>

      {problem && <Sec n={++n} label="The problem"><p className="question">{problem}</p></Sec>}
      <Sec n={++n} label="What I built"><MarkedList items={p.built} /></Sec>
      <Sec n={++n} label="Architecture">
        <div className="arch-wrap">
          <div className="arch">
            {p.architecture.map((a, i) => (
              <span key={a.label} className="contents">
                {i > 0 && <span className="arch-arrow" aria-hidden="true">→</span>}
                <div className="arch-node"><b>{a.label}</b><span>{a.note}</span></div>
              </span>
            ))}
          </div>
          <p className="arch-cap">FIG. {n} · {p.title}, end to end</p>
        </div>
      </Sec>
      {dataset && (
        <Sec n={++n} label="Dataset">
          <dl className="spec">{dataset.map(([k, v]) => <span key={k} className="contents"><dt>{k}</dt><dd>{v}</dd></span>)}</dl>
        </Sec>
      )}
      {model && <Sec n={++n} label="The model"><p className="prose">{model}</p></Sec>}
      {training && (
        <Sec n={++n} label="Training setup">
          <dl className="spec">{training.map(([k, v]) => <span key={k} className="contents"><dt>{k}</dt><dd>{v}</dd></span>)}</dl>
        </Sec>
      )}
      {results && (
        <Sec n={++n} label="Results">
          <ul className="results">
            {results.rows.map((r) => (
              <li key={r.label} className="result">
                <span className="l">{r.label}</span>
                <span className="v">{r.value.toFixed(1)}%</span>
                <span className="bar"><i style={{ "--w": `${r.value}%` } as CSSProperties} /></span>
              </li>
            ))}
          </ul>
          <p className="results-note">{results.note}</p>
        </Sec>
      )}
      {decisions && (
        <Sec n={++n} label="Key decisions" hint="Why this, and not that.">
          <div className="problems">
            {decisions.map((d) => <div className="problem" key={d.decision}><span className="p">{d.decision}</span><span className="a">{d.why}</span></div>)}
          </div>
        </Sec>
      )}
      {challenges && <Sec n={++n} label="The hard parts"><MarkedList items={challenges} /></Sec>}
      {next && <Sec n={++n} label="What I’d do next"><MarkedList items={next} /></Sec>}
      {plates && <Sec n={++n} label="Selected artifacts"><Plates items={plates} /></Sec>}
      <Sec n={++n} label="Materials"><Tags items={p.materials} /></Sec>
    </Page>
  )
}
