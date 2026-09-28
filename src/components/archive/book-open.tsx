/* A book taken off the shelf: it flies from its spine to the middle of the
   screen, turns to face you, and the cover swings open. The left page (the
   inside of the cover) holds its details; the right page, its notes.
   "Put it back" reverses it all and returns the book to its gap. */
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react"
import { createTimeline } from "animejs"
import { Tags } from "@/components/archive/parts"
import { Flower } from "@/components/archive/flower"
import { A, fmtMonth } from "@/lib/archive"

export type Book = (typeof A.books.items)[number]
type Props = {
  book: Book
  index: number
  catalogue: string
  shelf: string
  colour: [string, boolean]
  from: DOMRect            // the spine it came from
  closing: boolean
  onClose: () => void      // ask to close (starts the reverse animation)
  onClosed: () => void     // the book is back on the shelf
}

/* passages marked while reading, with their page numbers */
const Highlights = ({ book }: { book: Book }) => (
  <>
    <p className="meta bk-hl-head">Passages I highlighted · {book.highlights!.length}</p>
    <ul className="bk-highlights" tabIndex={0} aria-label="Highlighted passages">
      {book.highlights!.map((h) => (
        <li key={h.text}><span className="bk-hl-text">“{h.text}”</span>{h.page && <span className="bk-hl-page"> p. {h.page}</span>}</li>
      ))}
    </ul>
  </>
)

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches
// on phones there's no spread: the book opens to a single page, so no slide
const spreadShift = (el: HTMLElement) => (matchMedia("(max-width: 640px)").matches ? 0 : el.offsetWidth / 2)

export function BookOpen({ book, index, catalogue, shelf, colour, from, closing, onClose, onClosed }: Props) {
  const stage = useRef<HTMLDivElement>(null)
  const seat = useRef<HTMLDivElement>(null)
  const book3d = useRef<HTMLDivElement>(null)
  const cover = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  // where the spine is, relative to the closed book's resting place (screen
  // centre). `shift` is how far the seat is currently slid to centre the spread.
  const offset = (shift = 0) => {
    const el = book3d.current!
    const r = el.getBoundingClientRect()
    return {
      x: from.left + from.width / 2 - (r.left - shift + r.width / 2),
      y: from.top + from.height / 2 - (r.top + r.height / 2),
      sx: from.width / r.width,
      sy: from.height / r.height,
    }
  }

  // open: off the shelf → face you → cover swings open, spread slides to centre
  useLayoutEffect(() => {
    const el = book3d.current!, cv = cover.current!, bg = stage.current!, st = seat.current!
    const half = spreadShift(el)
    if (reduced()) {
      cv.style.transform = "rotateY(-180deg)"
      st.style.transform = `translateX(${half}px)`
      closeBtn.current?.focus()
      return
    }
    const o = offset()
    const tl = createTimeline({ defaults: { ease: "inOut(3)" } })
      .add(bg, { opacity: [0, 1], duration: 400, ease: "out(2)" }, 0)
      .add(el, {
        x: [o.x, 0], y: [o.y, 0], scaleX: [o.sx, 1], scaleY: [o.sy, 1], rotateY: [-80, 0],
        duration: 900, ease: "out(4)",
      }, 0)
      .add(cv, { rotateY: [0, -180], duration: 950 }, 850)
      .add(st, { x: [0, half], duration: 950 }, 850)
    tl.then(() => closeBtn.current?.focus())
    return () => { tl.revert() }
    // runs once, when the book is taken off the shelf
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // close: cover shuts → back to its spine → gone
  useEffect(() => {
    if (!closing) return
    const el = book3d.current!, cv = cover.current!, bg = stage.current!, st = seat.current!
    if (reduced()) { onClosed(); return }
    const half = spreadShift(el)
    const o = offset(half)
    const tl = createTimeline({ defaults: { ease: "inOut(3)" } })
      .add(cv, { rotateY: [-180, 0], duration: 700 }, 0)
      .add(st, { x: [half, 0], duration: 700 }, 0)
      .add(el, { x: [0, o.x], y: [0, o.y], scaleX: [1, o.sx], scaleY: [1, o.sy], rotateY: [0, -80], duration: 750, ease: "in(3)" }, 650)
      .add(bg, { opacity: [1, 0], duration: 450 }, 950)
    tl.then(() => onClosed())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing])

  // keep the page still while the book is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  // Esc puts the book back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const [bg, light] = colour
  const details = ([
    ["Shelved under", book.category ?? book.topic ?? ""],
    ["Date read", book.read ? fmtMonth(book.read) : ""],
  ] as [string, string][]).filter(([, v]) => v)

  return (
    <div ref={stage} className="bk-stage" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={seat} className="bk-seat">
        <div ref={book3d} className="bk-book" role="dialog" aria-modal="true" aria-label={`${book.title} by ${book.author}`}
          style={{ "--cover": bg, "--cover-ink": light ? "var(--ink)" : "#FBF9F3" } as CSSProperties}>

          {/* the right-hand page */}
          <div className="bk-page bk-right">
            <div className="bk-mobile-details">
              <p className="meta">SHELF {shelf}{(book.category ?? book.topic) && ` · ${book.category ?? book.topic}`}</p>
              <h2 className="bk-title">{book.title}</h2>
              <p className="bk-author">{book.author}</p>
              {book.genres && <div className="bk-genres"><Tags items={book.genres} /></div>}
            </div>
            <div className="bk-notes">
              {book.key || book.stayed || book.note ? (
                <>
                  {book.key && <><p className="meta">The idea I kept thinking about</p><blockquote className="bk-quote">{book.key}</blockquote></>}
                  {book.stayed && <><p className="meta">What stayed with me</p><p className="bk-text">{book.stayed}</p></>}
                  {book.note && <p className="bk-text">{book.note}</p>}
                  {book.highlights && <div className="bk-hl-mobile"><Highlights book={book} /></div>}
                </>
              ) : (
                <>
                  <p className="bk-pending">notes on this one are still in the margins</p>
                  {book.highlights && <div className="bk-hl-mobile"><Highlights book={book} /></div>}
                </>
              )}
            </div>
            <div className="bk-actions">
              <a className="talk" href={`mailto:${A.email}?subject=${encodeURIComponent(`About “${book.title}”`)}`}>
                Talk to me about this book <span className="arrow">→</span>
              </a>
              <button ref={closeBtn} type="button" className="bk-close" onClick={onClose}>↩ put it back on the shelf</button>
            </div>
          </div>

          {/* the cover: outside faces you first, inside becomes the left page */}
          <div ref={cover} className="bk-cover">
            <div className="bk-face bk-front">
              <span className="bk-front-band" aria-hidden="true" />
              <p className="bk-front-title">{book.title}</p>
              <p className="bk-front-author">{book.author}</p>
              <Flower className="bk-front-flower" />
            </div>
            <div className="bk-face bk-back">
              <p className="meta">{catalogue}.{String(index + 1).padStart(2, "0")} · SHELF {shelf}</p>
              <h2 className="bk-title">{book.title}</h2>
              <p className="bk-author">{book.author}</p>
              {details.length > 0 && (
                <dl className="bk-details">
                  {details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              )}
              {book.genres && <div className="bk-genres"><Tags items={book.genres} /></div>}
              {book.highlights && <Highlights book={book} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
