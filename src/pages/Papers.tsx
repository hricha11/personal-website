/* RESEARCH PAPERS READ , annotated notes, filterable by topic. */
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Page, PageHead } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { pad, projectById, section } from "@/lib/archive"
import { HIDDEN } from "@/content-hidden"

export default function Papers() {
  const s = section("papers")!
  useTitle(s.title)
  const { id: focus } = useParams()
  const [topic, setTopic] = useState("all")
  const items = HIDDEN.papers.items
  const topics = [...new Set(items.map((p) => p.topic))]

  // arriving from an exhibit's "related research": scroll to that paper
  useEffect(() => {
    if (!focus) return
    const t = setTimeout(() => {
      const el = document.getElementById(`paper-${focus}`)
      el?.classList.add("shown")
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 350)
    return () => clearTimeout(t)
  }, [focus])

  const chip = "h-7 rounded-full border border-border px-3 font-mono text-[11.5px] font-normal text-ink/80 hover:bg-accent data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-paper"

  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title}
        title={<>Research <em>Papers</em> Read</>} lede={HIDDEN.papers.lede} note="read with a pencil" />

      <ToggleGroup type="single" value={topic} onValueChange={(v) => setTopic(v || "all")} aria-label="Filter by topic"
        className="-mt-8 mb-12 flex-wrap justify-start gap-2">
        <ToggleGroupItem value="all" className={chip}>All <span className="text-[#A8A397]">{items.length}</span></ToggleGroupItem>
        {topics.map((t) => (
          <ToggleGroupItem key={t} value={t} className={chip}>
            {t} <span className="text-[#A8A397]">{items.filter((p) => p.topic === t).length}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="papers">
        {items.map((p, i) => {
          const rel = p.related.map(projectById).filter((x) => x !== undefined)
          return (
            <article className="paper reveal" id={`paper-${p.id}`} key={p.id} hidden={topic !== "all" && p.topic !== topic}>
              <div className="paper-meta">
                <span className="yr">{p.year}</span>
                {p.topic}<br />{p.venue}
                <span className="ref">REF. {s.catalogue}.{pad(i + 1)}</span>
              </div>
              <div>
                <h2>{p.title}</h2>
                <p className="authors">{p.authors}</p>
                <dl className="annot">
                  <dt>Why I read it</dt><dd>{p.why}</dd>
                  <dt>Core idea</dt><dd>{p.core}</dd>
                </dl>
                <Accordion type="single" collapsible defaultValue={p.id === focus ? "notes" : undefined}>
                  <AccordionItem value="notes" className="border-0">
                    <AccordionTrigger className="annot-trigger">my annotations</AccordionTrigger>
                    <AccordionContent>
                      <dl className="annot mt-3">
                        <dt>Interesting insight</dt><dd>{p.insight}</dd>
                        <dt>What changed for me</dt><dd>{p.changed}</dd>
                        <dt>Questions it left</dt><dd><em>{p.questions}</em></dd>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {rel.length > 0 && (
                  <p className="rel">
                    Filed alongside {rel.map((r, j) => (
                      <span key={r.id}>{j > 0 && ", "}<Link className="ink-link" to={`/projects/${r.id}`}>{r.title}</Link></span>
                    ))}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Page>
  )
}
