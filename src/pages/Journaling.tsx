/* MY LOVE FOR JOURNALING , the quiet room. */
import { Flower } from "@/components/archive/flower"
import { Crumbs, Page } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { fmtDay, section } from "@/lib/archive"
import { HIDDEN } from "@/content-hidden"

const KINDS: Record<string, string> = { excerpt: "excerpt", question: "a question", changed: "changed my mind", observation: "observation", reflection: "reflection" }

export default function Journaling() {
  const s = section("journaling")!
  const j = HIDDEN.journaling
  useTitle(s.title)
  return (
    <Page className="journal-page">
      <Crumbs trail={[{ label: s.title }]} />
      <header className="page-head">
        <p className="catalogue">ARCHIVE <b>{s.catalogue}</b> · A PERSONAL ARCHIVE</p>
        <h1 className="page-title">My Love for <em>Journaling</em></h1>
        <p className="journal-intro">{j.intro.map((l) => <span key={l}>{l}</span>)}</p>
      </header>
      <ol className="entries">
        {j.entries.map((e, i) => (
          <li className={`entry reveal kind-${e.kind}`} key={e.date}>
            {i > 0 && <Flower className="entry-flower" />}
            <div className="entry-head"><time dateTime={e.date}>{fmtDay(e.date)}</time><span className="kind">{KINDS[e.kind] ?? e.kind}</span></div>
            {e.kind === "changed" ? (
              <div className="changed">
                <p className="was"><span className="lbl">I used to think</span>{e.before}</p>
                <p className="now"><span className="lbl">Now I think</span>{e.after}</p>
              </div>
            ) : (
              <p className="entry-text">{e.text}</p>
            )}
          </li>
        ))}
      </ol>
      <p className="journal-end">, the rest stays in the notebook.</p>
    </Page>
  )
}
