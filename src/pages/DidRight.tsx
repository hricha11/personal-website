/* THINGS I THINK I DID RIGHT , decisions I'm glad I made. */
import { Flower } from "@/components/archive/flower"
import { Page, PageHead } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { A, ROMAN, section } from "@/lib/archive"

export default function DidRight() {
  const s = section("did-right")!
  const d = A.didRight
  useTitle(s.title)
  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title}
        title={<>Things I think I <em>did right</em></>} lede={d.lede} note="the honest list" />
      {d.items.length > 0 && <ol className="decisions">
        {d.items.map((it, i) => (
          <li className="decision reveal" key={it.title}>
            <span className="decision-num">{ROMAN[i]}.</span>
            <div>
              <h2>{it.title}</h2>
              <p className="when">{it.when}</p>
              <p className="body">{it.text}</p>
            </div>
            {it.note ? <span className="margin-note">{it.note}</span> : <span />}
          </li>
        ))}
      </ol>}

      {/* achievements: the parts that came with certificates */}
      <section className={`record reveal ${d.items.length ? "" : "record-alone"}`} aria-label="For the record">
        <p className="meta">For the record</p>
        <p className="record-note hand">the parts that came with certificates</p>
        <ul className="record-list">
          {d.record.map((r) => (
            <li key={r.what} className={`record-item ${r.kind}`}>
              {r.kind === "prize" ? <Flower className="record-rosette" /> : <span className="record-dot" aria-hidden="true" />}
              <span className="record-place">{r.place}</span>
              <span className="record-what">{r.what}{r.detail && <span className="record-detail"> · {r.detail}</span>}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="closing-note reveal">{d.closing}</p>
    </Page>
  )
}
