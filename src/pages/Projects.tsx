/* PERSONAL PROJECTS , the exhibits, and each exhibit examined.
   Every section of an exhibit is optional: it only shows when content.ts
   has something for it (all of it from the résumé). */
import { Link, useParams } from "react-router"
import type { CSSProperties, ReactNode } from "react"
import { Crumbs, LabelTable, MarkedList, Page, PageHead, Plates, Sec, Tags } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { SPECIMENS } from "@/components/archive/specimens"
import { A, PROJECTS, exhibitNo, projectById, section } from "@/lib/archive"
import type { Project } from "@/content"
import NotFound from "./NotFound"

const LINK_NAMES = { repo: "GitHub repository", demo: "Live demo", video: "Video" } as const
type LinkKind = keyof typeof LINK_NAMES

/* "GitHub repository ↗ · Live demo ↗", for whichever links a project has */
function ProjectLinks({ links }: { links: NonNullable<Project["links"]> }) {
  const kinds = (Object.keys(LINK_NAMES) as LinkKind[]).filter((k) => links[k])
  return kinds.map((k, i) => (
    <span key={k}>
      {i > 0 && " · "}
      <a className="ink-link" href={links[k]} target="_blank" rel="noopener noreferrer">{LINK_NAMES[k]} ↗</a>
    </span>
  ))
}
const resultRow = (p: Project): [string, ReactNode][] => (p.highlight ? [["Result", p.highlight]] : [])
const linkRow = (p: Project): [string, ReactNode][] =>
  p.links && Object.values(p.links).some(Boolean) ? [["Links", <ProjectLinks key="links" links={p.links} />]] : []

export function Projects() {
  const s = section("projects")!
  useTitle(s.title)
  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title}
        title={<>Personal <em>Projects</em></>} lede={A.projects.lede} note="built at odd hours" />
      <div className="exhibits">
        {PROJECTS.map((p) => (
          <article className="exhibit-card reveal" key={p.id}>
            <Link className="specimen" to={`/projects/${p.id}`} aria-label={`Examine ${p.title}`}>
              <span className="contents" dangerouslySetInnerHTML={{ __html: SPECIMENS[p.id] ?? "" }} />
              <span className="corner tl">EXHIBIT {exhibitNo(p.id)}</span>
              <span className="corner bl">FIG. 1</span>
            </Link>
            <div>
              <p className="meta">EXHIBIT {exhibitNo(p.id)}</p>
              <h2>{p.title}</h2>
              <p className="sub">{p.subtitle}</p>
              <p className="summary">{p.summary}</p>
              <LabelTable rows={[["Materials", p.materials.join(" · ")], ...resultRow(p), ...linkRow(p)]} />
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
  const { dataset, model, results, plates, problem, training, decisions, challenges, next } = p
  let n = 0

  return (
    <Page>
      <Crumbs trail={[{ href: "/projects", label: s.title }, { label: p.title }]} />
      <div className="ex-head">
        <header className="page-head">
          <p className="catalogue">ARCHIVE <b>{s.catalogue}</b> · {p.title.toUpperCase()}</p>
          <p className="ex-exhibit">EXHIBIT {exhibitNo(p.id)}</p>
          <h1 className="page-title">{p.title}</h1>
          <p className="ex-sub">{p.subtitle}</p>
        </header>
        <aside className="ex-label" aria-label="Object label">
          <p className="meta">OBJECT LABEL</p>
          <LabelTable rows={[
            ["Object", p.summary],
            ["Materials", p.materials.join(" · ")],
            ...resultRow(p),
            ...linkRow(p),
            ["Note", p.note ?? A.projects.genericNote],
          ]} />
        </aside>
      </div>

      {problem && <Sec n={++n} label="The problem"><p className="question">{problem}</p></Sec>}
      {plates && <Sec n={++n} label="Selected artifacts"><Plates items={plates} /></Sec>}
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
      <Sec n={++n} label="Materials"><Tags items={p.materials} /></Sec>
    </Page>
  )
}
