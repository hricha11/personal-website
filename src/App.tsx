import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router"
import { section } from "@/lib/archive"
import { ArchiveIndex, PageKeys, Topbar } from "@/components/archive/shell"
import { BookContext } from "@/lib/book"
import { Opening } from "@/components/archive/opening"
import { reduced } from "@/lib/motion"
import Contents from "@/pages/Contents"
import Certifications from "@/pages/Certifications"
import DidRight from "@/pages/DidRight"
import { Exhibit, Projects } from "@/pages/Projects"
import { Professional, Work } from "@/pages/Professional"
// HIDDEN for now , see HIDDEN_SECTIONS.md
// import Papers from "@/pages/Papers"
import Books from "@/pages/Books"
import Running from "@/pages/Running"
// HIDDEN for now , see HIDDEN_SECTIONS.md
// import Journaling from "@/pages/Journaling"
import NotFound from "@/pages/NotFound"


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
  // The notebook (the landing page) belongs to the root, "/", only: it shows
  // there and nowhere else, however you arrive (a link, a typed hash,
  // back / forward). `startAt` is where it opens: 0 on the cover, 1 at page one
  // (turning back from the contents). `exiting` keeps it on screen for the
  // moment it zooms into the contents after you turn its page.
  const atRoot = location.pathname === "/"
  const [startAt, setStartAt] = useState<0 | 1>(0)
  const [exiting, setExiting] = useState(false)
  const inNotebook = atRoot || exiting
  const current = section(location.pathname.split("/")[1])

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [location.pathname])

  // After an in-app navigation, tell screen readers where they are (the page
  // sets document.title in its own effect, which runs before this one) and
  // put keyboard focus at the top of the new page. Not on the first load.
  const announcer = useRef<HTMLParagraphElement>(null)
  const firstPath = useRef(true)
  useEffect(() => {
    if (firstPath.current) { firstPath.current = false; return }
    if (location.pathname === "/") return
    if (announcer.current) announcer.current.textContent = document.title
    document.getElementById("view")?.focus({ preventScroll: true })
  }, [location.pathname])
  useReveal(location.pathname)
  useEffect(() => { document.body.classList.toggle("is-opening", inNotebook) }, [inNotebook])

  const enter = useCallback((to = "/about") => {
    setExiting(true)
    navigate(to)
    document.body.classList.remove("is-opening")
    setTimeout(() => { setExiting(false); setStartAt(0) }, reduced() ? 0 : 1100)
  }, [navigate])

  const reopen = useCallback(() => {
    setStartAt(1)
    navigate("/")
  }, [navigate])

  return (
    <BookContext.Provider value={{ reopen }}>
      <a className="skip" href="#view">Skip to content</a>
      <p ref={announcer} className="sr-only" aria-live="polite" aria-atomic="true" />
      {!inNotebook && <PageKeys />}
      {inNotebook && <Opening startAt={startAt} onEnter={enter} />}
      <Topbar />
      <ArchiveIndex open={indexOpen} setOpen={setIndexOpen} />
      {!atRoot && (
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
            <Route path="/running" element={<Running />} />
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
