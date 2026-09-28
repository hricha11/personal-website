/* Turning pages through the archive, in reading order. */
import { createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router"
import { ORDER } from "@/lib/archive"

/* lets any page re-open the notebook at page one (turning back from the contents) */
export const BookContext = createContext<{ reopen: () => void }>({ reopen: () => {} })

export function usePageTurn() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { reopen } = useContext(BookContext)
  // deep links (e.g. one paper) count as their section's page
  const exact = ORDER.findIndex((o) => o.href === pathname)
  const i = exact >= 0 ? exact : ORDER.findIndex((o) => o.href === `/${pathname.split("/")[1]}`)
  const prev = i > 0 ? ORDER[i - 1] : undefined
  const next = i >= 0 ? ORDER[i + 1] : undefined
  return {
    back: () => (i === 0 ? reopen() : navigate(prev?.href ?? "/about")),
    backLabel: i === 0 ? "page one" : prev?.title ?? "the contents",
    forward: next ? () => navigate(next.href) : undefined,
    nextLabel: next?.title,
  }
}
