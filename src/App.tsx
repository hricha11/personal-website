import { useEffect, useState, type CSSProperties } from "react"
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router"
import { section } from "@/lib/archive"
import { ArchiveIndex, PageKeys, Topbar } from "@/components/archive/shell"
import { BookContext } from "@/lib/book"
import { Opening } from "@/components/archive/opening"
import Contents from "@/pages/Contents"
import Certifications from "@/pages/Certifications"
import DidRight from "@/pages/DidRight"
import { Exhibit, Projects } from "@/pages/Projects"
import { Professional, Work } from "@/pages/Professional"
// HIDDEN for now , see HIDDEN_SECTIONS.md
// import Papers from "@/pages/Papers"
import Books from "@/pages/Books"
// HIDDEN for now, see HIDDEN_SECTIONS.md
// import Running from "@/pages/Running"
// HIDDEN for now , see HIDDEN_SECTIONS.md
// import Journaling from "@/pages/Journaling"
import NotFound from "@/pages/NotFound"

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches

/* Fade .reveal blocks in as they scroll into view, on every page. */
function useReveal(key: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("#view .reveal")
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("shown"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("shown")
          io.unobserve(en.target)
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [key])
}

function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [indexOpen, setIndexOpen] = useState(false)
  // The notebook (the landing page) opens on its cover when someone arrives at
  // the root; turning back from the contents re-opens it at page one.
  // false = closed away · 0 = on the cover · 1 = open at page one
  const [opening, setOpening] = useState<false | 0 | 1>(() => (location.pathname === "/" ? 0 : false))
  const inNotebook = opening !== false
  const current = section(location.pathname.split("/")[1])

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [location.pathname])
  useReveal(location.pathname)
  useEffect(() => { document.body.classList.toggle("is-opening", inNotebook) }, [inNotebook])

  const enter = (to = "/about") => {
    navigate(to)
    document.body.classList.remove("is-opening")
    setTimeout(() => setOpening(false), reduced() ? 0 : 1100)
  }

  return (
    <BookContext.Provider value={{ reopen: () => setOpening(1) }}>
      <a className="skip" href="#view">Skip to content</a>
      {!inNotebook && <PageKeys />}
      {inNotebook && <Opening startAt={opening} onEnter={enter} />}
      <Topbar onIndex={() => setIndexOpen(true)} />
      <ArchiveIndex open={indexOpen} setOpen={setIndexOpen} />
      {!(inNotebook && location.pathname === "/") && (
        <main id="view" className="view in" key={location.pathname} tabIndex={-1}
          style={{ "--rust": current?.color ?? "var(--ink-rust)", "--petal": current?.petal ?? "var(--petal-pink)" } as CSSProperties}>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<Contents />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/did-right" element={<DidRight />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Exhibit />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/professional/:id" element={<Work />} />
            {/* HIDDEN for now , see HIDDEN_SECTIONS.md
            <Route path="/papers" element={<Papers />} />
            <Route path="/papers/:id" element={<Papers />} /> */}
            <Route path="/books" element={<Books />} />
            {/* HIDDEN for now, see HIDDEN_SECTIONS.md
            <Route path="/running" element={<Running />} /> */}
            {/* HIDDEN for now , see HIDDEN_SECTIONS.md
            <Route path="/journaling" element={<Journaling />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      )}
    </BookContext.Provider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
