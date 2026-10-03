/* The landing page: a composition notebook. Closed, it shows the marbled
   cover and its label. Tap it and the cover swings open onto page one
   (whose notebook this is, and how to reach them). Turn
   page one and the contents are written on pages two and three, picking
   a line opens that part of the archive. */
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { FigBranch } from "@/components/archive/fig"
import { Flower } from "@/components/archive/flower"
import { A, RESUME, fmtDay, inWing, isFile, wing } from "@/lib/archive"
import { reduced, useMotion, writeIn } from "@/lib/motion"

/* one ink per contact line, like the section tabs */
const CONTACT_INKS = ["var(--ink-rose)", "var(--ink-ochre)", "var(--ink-slate)", "var(--ink-plum)", "var(--ink-teal)"]

/* Black-and-white composition marble, made from noise. */
function Marble() {
  return (
    <svg className="marble" viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <filter id="comp-marble" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.019" numOctaves="4" seed="4" result="big" />
        <feColorMatrix in="big" type="saturate" values="0" result="bigGrey" />
        <feComponentTransfer in="bigGrey" result="veins">
          <feFuncR type="discrete" tableValues="0 0 1 0 0 1 1 0 0 0 1 0 0" />
          <feFuncG type="discrete" tableValues="0 0 1 0 0 1 1 0 0 0 1 0 0" />
          <feFuncB type="discrete" tableValues="0 0 1 0 0 1 1 0 0 0 1 0 0" />
          <feFuncA type="table" tableValues="1 1" />
        </feComponentTransfer>
        <feTurbulence type="fractalNoise" baseFrequency="0.085" numOctaves="2" seed="11" result="fine" />
        <feColorMatrix in="fine" type="saturate" values="0" result="fineGrey" />
        <feComponentTransfer in="fineGrey" result="specks">
          <feFuncR type="discrete" tableValues="0 0 0 0 0 0 1 0 0" />
          <feFuncG type="discrete" tableValues="0 0 0 0 0 0 1 0 0" />
          <feFuncB type="discrete" tableValues="0 0 0 0 0 0 1 0 0" />
          <feFuncA type="table" tableValues="1 1" />
        </feComponentTransfer>
        <feBlend in="veins" in2="specks" mode="lighten" result="bw" />
        {/* map black → ink, white → paper */}
        <feColorMatrix in="bw" type="matrix" values="0.82 0 0 0 0.118  0 0.8 0 0 0.118  0 0 0.77 0 0.11  0 0 0 0 1" />
      </filter>
      <rect width="400" height="520" filter="url(#comp-marble)" />
    </svg>
  )
}

/* page one: whose notebook this is, and how to reach them */
function ReturnTo({ disabled }: { disabled: boolean }) {
  return (
    <div className="return-to">
      <p className="found">if found, please return to</p>
      <h1 className="found-name">{A.owner}</h1>
      <span className="found-line" aria-hidden="true" />
      <p className="found-reward">reward: one very good book recommendation</p>

      {/* how to reach me , every line is a link */}
      <aside className="currently" aria-label="Contact">
        <p className="cur-head">find me ,</p>
        <ul>
          {A.links.map((l, i) => {
            const file = isFile(l.href)
            const external = !file && !l.href.startsWith("mailto:")
            return (
              <li key={l.label} style={{ "--rust": CONTACT_INKS[i % CONTACT_INKS.length] } as CSSProperties}>
                <a className="cur-row" href={l.href} tabIndex={disabled ? -1 : 0}
                  {...(file ? { download: "" } : external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="cur-verb">{l.label}</span>
                  <span className="cur-what">{l.handle}{file ? " ↓" : external ? " ↗" : ""}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}

/* The contents, written into the notebook: a small copy of the Index spread
   (pages/Contents.tsx) with exactly the same text. These pages show while
   page one turns, just before the notebook zooms into that spread, so
   they're drawn, not clickable. Keep the two in step. */
function PageToc({ wingId }: { wingId: string }) {
  const w = wing(wingId)!
  return (
    <>
      <p className="pg-wing" style={{ "--rust": w.color, "--petal": w.petal } as CSSProperties}>
        <span className="mono"><Flower className="pg-wing-flower" />{w.label} · {w.title}</span>
        <span className="pg-wing-note">{w.note}</span>
      </p>
      <ol className="pg-toc">
        {inWing(wingId).map((s) => (
          <li key={s.id} style={{ "--rust": s.color, "--petal": s.petal } as CSSProperties}>
            <div className="pg-row">
              <Flower className="toc-tab" />
              <span className="pg-row-t">{s.title}</span>
              <span className="toc-dots" aria-hidden="true" />
              <span className="pg-row-n">{s.catalogue}</span>
            </div>
            <p className="pg-desc">{s.desc}</p>
            {s.children?.map((c) => (
              <div key={c.id} className="pg-row sub">
                <span className="pg-row-t">{c.title}</span>
                <span className="toc-dots" aria-hidden="true" />
                <span className="pg-row-n">{c.catalogue}</span>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </>
  )
}

function PageTwo() {
  return (
    <>
      <p className="pg-top"><span className="mono">ARCHIVE {A.about.catalogue} · ABOUT ME</span></p>
      <p className="pg-index">Index</p>
      <p className="pg-tagline">{A.tagline}</p>
      <PageToc wingId={A.wings[0].id} />
      <span className="pg-num hand" aria-hidden="true">p. 2</span>
    </>
  )
}

function PageThree() {
  return (
    <>
      <p className="pg-top"><span className="pg-subtitle">{A.opening.subtitle}</span></p>
      <PageToc wingId={A.wings[1].id} />
      <div className="pg-about">
        <p className="mono pg-about-label">The short version</p>
        {A.about.short.map((p) => <p key={p}>{p}</p>)}
        <p className="pg-sign"><span className="hand">, Hri.</span><span className="mono">last written {fmtDay(A.lastUpdated)}</span></p>
        <p className="pg-links">{A.links.map((l) => <span key={l.label}>{l.label}{isFile(l.href) ? " ↓" : l.href.startsWith("mailto:") ? "" : " ↗"}</span>)}</p>
      </div>
      <FigBranch className="pg-figbranch" />
      <span className="pg-num hand" aria-hidden="true">p. 3</span>
    </>
  )
}

export function Opening({ onEnter, startAt = 0 }: { onEnter: (to?: string) => void; startAt?: 0 | 1 }) {
  // 0 closed · 1 cover open (inside cover + page one) · 2 page turned (contents)
  const [stage, setStage] = useState<number>(startAt)
  const [leaving, setLeaving] = useState(false)

  // the label on the cover is filled in by hand; your name on page one is
  // written in once the cover opens
  const root = useRef<HTMLElement>(null)
  useMotion(root, () => writeIn(".lbl-field b", 700))
  useMotion(root, () => { if (stage === 1) writeIn(".found-name", 1100) }, [stage])
  const open = stage >= 1
  const turned = stage === 2

  // turn pages with the arrow keys, too
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setStage((s) => Math.min(2, s + 1))
      if (e.key === "ArrowLeft") setStage((s) => Math.max(0, s - 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // once the page is turned, lean in: the notebook zooms towards you and
  // becomes the full-size contents spread
  const [zooming, setZooming] = useState(false)
  useEffect(() => {
    if (stage !== 2) return
    const quick = reduced()
    const z = setTimeout(() => setZooming(true), quick ? 0 : 900)
    const go = setTimeout(() => {
      setLeaving(true)
      onEnter("/about")
    }, quick ? 0 : 1250)
    return () => { clearTimeout(z); clearTimeout(go) }
  }, [stage, onEnter])

  const hint = ["tap the cover to open", "turn the page →", ""][stage]

  return (
    <section ref={root} className={`opening ${leaving ? "leaving" : ""}`} aria-label="Opening">
      <div className={`comp ${open ? "is-open" : ""} ${turned ? "is-turned" : ""} ${zooming ? "is-zooming" : ""}`}>
        {/* page three , under page one until it's turned */}
        <div className="comp-page ruled comp-third" aria-hidden="true">
          <PageThree />
        </div>

        {/* page one, a leaf that turns: its back is page two */}
        <div className="comp-leaf">
          <div className="comp-page comp-first" aria-hidden={turned}>
            <ReturnTo disabled={leaving || stage !== 1} />
            <span className="pg-num hand" aria-hidden="true">p. 1</span>
            {/* on phones the inside cover swings away, so closing lives here too */}
            <button type="button" className="pg-corner pg-corner-back close-on-page" onClick={() => setStage(0)} disabled={leaving || stage !== 1}>
              <span className="pg-corner-fold" aria-hidden="true" /><span className="pg-corner-text">← close</span>
            </button>
            <button type="button" className="pg-corner" onClick={() => setStage(2)} disabled={leaving || stage !== 1} tabIndex={stage === 1 ? 0 : -1}>
              <span className="pg-corner-text">turn the page</span><span className="pg-corner-fold" aria-hidden="true" />
            </button>
          </div>
          <div className="comp-page ruled leaf-back" aria-hidden="true">
            <PageTwo />
          </div>
        </div>

        {/* the cover: marble outside, plain board inside */}
        <div className="comp-cover">
          <button type="button" className="comp-front" onClick={() => setStage(1)} disabled={open} aria-label={`Open ${A.owner}’s notebook`}>
            <Marble />
            <span className="comp-spine" aria-hidden="true" />
            <span className="comp-label" aria-hidden="true">
              <span className="lbl-title">COMPOSITION</span>
              <span className="lbl-sub">BOOK</span>
              <span className="lbl-field"><i>NAME</i><b>{A.owner}</b></span>
              <span className="lbl-field"><i>SUBJECT</i><b>{A.opening.subtitle}</b></span>
              <span className="lbl-field"><i>VOL.</i><b>I &nbsp;, {A.lastUpdated.slice(0, 4)}</b></span>
            </span>
            <span className="comp-sheets mono" aria-hidden="true">I APPRECIATE YOUR ATTENTION TO DETAIL</span>
          </button>
          {/* inside of the cover: plain board */}
          <div className="comp-back" aria-hidden={!open}>
            <button type="button" className="pg-corner pg-corner-back" onClick={() => setStage(0)} disabled={leaving || stage !== 1}>
              <span className="pg-corner-fold" aria-hidden="true" /><span className="pg-corner-text">← close the notebook</span>
            </button>
          </div>
        </div>
      </div>

      <p className="comp-hint" aria-live="polite">{hint}</p>
      {/* for anyone in a hurry: who this is, and a way straight in */}
      {stage === 0 && !leaving && (
        <p className="comp-skip">
          <span>{A.opening.headline}</span>
          <button type="button" className="ink-link" onClick={() => { setLeaving(true); onEnter("/about") }}>skip to the contents →</button>
          {RESUME && <a className="ink-link" href={RESUME.href} download>résumé ↓</a>}
        </p>
      )}
    </section>
  )
}
