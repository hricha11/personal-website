/* PROFESSIONAL LIFE , a chronological archive, and each file opened.
   Everything comes from the résumé; empty fields simply don't show. */
import { Link, useParams } from "react-router"
import { Crumbs, LabelTable, MarkedList, Page, PageHead, Sec, Tags } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { A, pad, section, workById } from "@/lib/archive"
import NotFound from "./NotFound"

type Work = (typeof A.professional.items)[number]
const subprojectsOf = (w: Work) => ("subprojects" in w ? w.subprojects : undefined)

export function Professional() {
  const s = section("professional")!
  useTitle(s.title)
  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title}
        title={<>Professional <em>Life</em></>} lede={A.professional.lede} note="what I built, and where" />
      <ol className="chrono">
        {A.professional.items.map((w) => (
          <li className="chrono-item reveal" key={w.id}>
            <div className="chrono-when">{w.period}</div>
            <Link className="chrono-body" to={`/professional/${w.id}`}>
              <p className="meta">FILE {w.catalogue} · {w.org}</p>
              <h2>{w.title}</h2>
              {w.role && <p className="role">{w.role}</p>}
              {w.what && <p className="what">{w.what}</p>}
              {subprojectsOf(w) && <p className="what">{subprojectsOf(w)!.map((sp) => sp.title).join(" · ")}</p>}
              {w.systems.length > 0 && <div className="mb-5"><Tags items={w.systems} /></div>}
              <span className="examine">Open the file <span className="arrow">→</span></span>
            </Link>
          </li>
        ))}
      </ol>
    </Page>
  )
}

export function Work() {
  const { id } = useParams()
  const w = workById(id)
  useTitle(w?.title ?? "Not in the archive")
  if (!w) return <NotFound />
  const s = section("professional")!
  const subprojects = subprojectsOf(w)
  const details = ([["Role", w.role], ["Period", w.period], ["Systems", w.systems.join(" · ")]] as [string, string][]).filter(([, v]) => v)
  let n = 0

  return (
    <Page>
      <Crumbs trail={[{ href: "/professional", label: s.title }, { label: w.title }]} />
      <div className="ex-head">
        <header className="page-head">
          <p className="catalogue">ARCHIVE <b>{w.catalogue}</b> , {w.title.toUpperCase()}</p>
          <h1 className="page-title">{w.title}</h1>
          {w.org !== w.title && <p className="ex-sub">{w.org}</p>}
          {w.period && <p className="ex-years">{w.period}</p>}
        </header>
        {details.length > 0 && (
          <aside className="ex-label" aria-label="File details">
            <p className="meta">FILE DETAILS</p>
            <LabelTable rows={details} />
          </aside>
        )}
      </div>

      {w.what && <Sec n={++n} label="What it was"><p className="prose-lg">{w.what}</p></Sec>}
      {w.built.length > 0 && <Sec n={++n} label="What I built"><MarkedList items={w.built} /></Sec>}
      {subprojects && (
        <Sec n={++n} label="In this folder" hint="Several projects, filed together.">
          <div className="folder">
            {subprojects.map((sp, i) => (
              <div className="file" key={sp.title}>
                <p className="meta">{w.catalogue}.{pad(i + 1)}</p>
                <h3>{sp.title}</h3>
                <MarkedList items={sp.points} />
              </div>
            ))}
          </div>
        </Sec>
      )}
      {w.systems.length > 0 && <Sec n={++n} label="Systems"><Tags items={w.systems} /></Sec>}
    </Page>
  )
}
