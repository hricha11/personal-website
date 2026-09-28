/* BOOKS , a library inside the museum: shelves of spines, in reading order.
   Click a book and it comes off the shelf and opens (book-open.tsx). Each
   spine takes its book's real cover colour (`cover` in content.ts). */
import { useCallback, useRef, useState, type KeyboardEvent } from "react"
import { Page, PageHead } from "@/components/archive/parts"
import { BookOpen } from "@/components/archive/book-open"
import { useTitle } from "@/lib/use-title"
import { A, section } from "@/lib/archive"

// fallback shades for any book without a `cover` colour in content.ts
const SPINE_COLOURS = ["#8A4B3C", "#353532", "#5B6452", "#3E4A5A", "#6E5A4E", "#744866", "#2B6560"]
// light covers get dark ink, dark covers cream , so every title reads clearly
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}
const PER_SHELF = 20 // most books on one shelf
// True proportions: 1 mm of real book = PX_PER_MM px on screen. Thickness is
// ~0.075 mm per page plus the cover; very thin books keep a readable minimum.
const PX_PER_MM = 1.45
const MIN_SPINE = 30
const spineSize = (bk: { pages?: number; height?: number }) => ({
  w: Math.max(MIN_SPINE, Math.round(((bk.pages ?? 300) * 0.075 + 2) * PX_PER_MM)),
  h: Math.round((bk.height ?? 198) * PX_PER_MM),
})
const hash = (str: string) => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
const colourOf = (bk: { author: string; cover?: string }): [string, boolean] => {
  const c = bk.cover ?? SPINE_COLOURS[hash(bk.author) % SPINE_COLOURS.length]
  return [c, isLight(c)]
}
// series books show just their own title on the spine
const spineTitle = (t: string) => t.split(": ").slice(-1)[0].replace(/’/g, "'")
const surname = (author: string) => author.split("&")[0].trim().split(" ").slice(-1)[0].toUpperCase()

type Shelf = { key: string; label: string; start: number; end: number; name?: string }
// Main shelves (A, B, C…) in reading order, then any named shelves after them.
const all = A.books.items
const main = all.filter((b) => !b.shelf)
const childhood = all.filter((b) => b.shelf === "childhood")
const BOOKS = [...main, ...childhood]
// spread the main books evenly, so no shelf is left nearly empty
const SHELF_COUNT = Math.ceil(main.length / PER_SHELF)
const PER_MAIN = Math.ceil(main.length / SHELF_COUNT)
const SHELVES: Shelf[] = [
  ...Array.from({ length: SHELF_COUNT }, (_, k) => {
    const letter = String.fromCharCode(65 + k)
    return { key: letter, label: letter, start: k * PER_MAIN, end: Math.min(main.length, (k + 1) * PER_MAIN) }
  }),
  ...(childhood.length ? [{ key: "childhood", label: "Childhood", name: "Childhood books I remember reading", start: main.length, end: BOOKS.length }] : []),
]
const shelfOf = (i: number) => SHELVES.find((sh) => i >= sh.start && i < sh.end)!.label

export default function Books() {
  const s = section("books")!
  useTitle(s.title)
  const books = BOOKS
  const spines = useRef<(HTMLButtonElement | null)[]>([])
  const [focusIdx, setFocusIdx] = useState(0)
  const [open, setOpen] = useState<{ i: number; from: DOMRect } | null>(null)
  const [closing, setClosing] = useState(false)

  const take = (i: number) => {
    const el = spines.current[i]
    if (!el || open) return
    setFocusIdx(i)
    setClosing(false)
    setOpen({ i, from: el.getBoundingClientRect() })
  }
  const close = useCallback(() => setClosing(true), [])
  const closed = useCallback(() => {
    const i = open?.i
    setOpen(null)
    setClosing(false)
    // the spine is visible again after this render , focus it then
    if (i !== undefined) requestAnimationFrame(() => spines.current[i]?.focus())
  }, [open])

  const onKey = (e: KeyboardEvent, i: number) => {
    const move = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (!move) return
    e.preventDefault()
    const n = (i + move + books.length) % books.length
    setFocusIdx(n)
    spines.current[n]?.focus()
  }

  return (
    <Page>
      <PageHead trail={[{ label: s.title }]} catalogue={s.catalogue} name={s.title} title="Books" lede={A.books.lede} note="pick one off the shelf" />

      <div className="shelves" data-own-arrows aria-label="Bookshelf">
        {SHELVES.map((sh, k) => {
          const start = sh.start
          const row = books.slice(sh.start, sh.end)
          return (
            <div key={sh.key} className={`shelf-row ${sh.name ? "named-shelf" : ""}`}>
              {sh.name && <p className="shelf-name"><span className="meta">A SHELF OF ITS OWN</span>{sh.name}</p>}
              <div className="shelf-wrap">
                <div className="shelf">
                  {row.map((bk, j) => {
                    const i = start + j
                    const [bg, light] = colourOf(bk)
                    const { w, h } = spineSize(bk)
                    const off = open?.i === i
                    return (
                      <button key={bk.title} ref={(el) => { spines.current[i] = el }}
                        className={`spine ${light ? "light" : ""} ${w < 40 ? "thin" : ""} ${off ? "off-shelf" : ""}`} type="button"
                        tabIndex={i === focusIdx ? 0 : -1} aria-haspopup="dialog"
                        style={{ background: bg, width: w, height: h }} aria-label={`${bk.title} by ${bk.author}`}
                        onClick={() => take(i)} onKeyDown={(e) => onKey(e, i)}>
                        <span className="st" aria-hidden="true">{spineTitle(bk.title)}</span>
                        <span className="sa" aria-hidden="true">{surname(bk.author)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="shelf-label">
                <span>{sh.name ? sh.name.toUpperCase() : `SHELF ${sh.label}`} · {row.length} VOLUMES</span>
                {k === 0 && <span>click a book to take it down</span>}
              </div>
            </div>
          )
        })}
      </div>

      {open && (
        <BookOpen key={open.i} book={books[open.i]} index={open.i} catalogue={s.catalogue} shelf={shelfOf(open.i)}
          colour={colourOf(books[open.i])} from={open.from} closing={closing} onClose={close} onClosed={closed} />
      )}
    </Page>
  )
}
