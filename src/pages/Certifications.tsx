/* CERTIFICATIONS , a small, quiet gallery on the notebook paper. Each
   certificate hangs in a slim frame; click it to turn the frame over and read
   what's written on the back. */
import { useState } from "react"
import { Page, PageHead } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { A, fmtMonth, pad, section } from "@/lib/archive"

type Cert = (typeof A.certifications.items)[number]

function CertArt({ c }: { c: Cert }) {
  if (c.image) return <img src={c.image} alt={`${c.title} certificate`} loading="lazy" />
  // a typeset stand-in until the real certificate image is added
  return (
    <div className="cert-stand">
      <span className="cs-kicker">Certificate of completion</span>
      <span className="cs-rule" />
      <span className="cs-title">{c.title}</span>
      <span className="cs-issuer">{c.issuer}</span>
      {c.date && <span className="cs-date">{fmtMonth(c.date)}</span>}
    </div>
  )
}

function Exhibit({ c, no }: { c: Cert; no: string }) {
  const [turned, setTurned] = useState(false)
  return (
    <figure className="exhibit">
      <span className="picture-light" aria-hidden="true" />
      <button type="button" className={`flip ${turned ? "is-turned" : ""}`} onClick={() => setTurned((t) => !t)}
        aria-pressed={turned} aria-label={turned ? `Turn ${c.title} back round` : `Turn ${c.title} over to read the back`}>
        <span className="flip-inner">
          {/* front: the certificate in a slim frame */}
          <span className="flip-face flip-front">
            <span className="frame-slim"><span className="frame-mat"><span className="frame-art"><CertArt c={c} /></span></span></span>
          </span>
          {/* back: the backing board, with a note written on it */}
          <span className="flip-face flip-back" aria-hidden={!turned}>
            <span className="back-wire" aria-hidden="true" />
            <span className="back-label mono">{no} · {c.issuer}</span>
            {c.note
              ? <span className="back-note">{c.note}</span>
              : <span className="back-note back-empty">nothing written on the back of this one yet</span>}
            <span className="back-turn">turn it back ↺</span>
          </span>
        </span>
      </button>
      <figcaption className="paper-label">
        <span className="pl-no">{no}</span>
        <span className="pl-title">{c.title}</span>
        <span className="pl-issuer">{c.issuer}{c.date && ` · ${fmtMonth(c.date)}`}</span>
        {c.link && <a className="pl-cred" href={c.link} target="_blank" rel="noopener">view credential ↗</a>}
      </figcaption>
    </figure>
  )
}

export default function Certifications() {
  const s = section("certifications")!
  useTitle(s.title)
  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title} title="Certifications" lede={A.certifications.lede} note="turn one over" />
      <section className="museum reveal" aria-label="Gallery">
        <div className="museum-wall">
          <span className="picture-rail" aria-hidden="true" />
          <div className="museum-hang">
            {A.certifications.items.map((c, i) => <Exhibit key={c.title} c={c} no={`${s.catalogue}.${pad(i + 1)}`} />)}
          </div>
        </div>
        <p className="museum-hint">click a frame to turn it over</p>
      </section>
    </Page>
  )
}
