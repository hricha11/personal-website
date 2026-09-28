/* Helpers shared by every page: lookups, reading order, date formatting. */
import { ARCHIVE } from "@/content"

export const A = ARCHIVE
export type Section = (typeof A.sections)[number]
export type Wing = (typeof A.wings)[number]

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv"]

export const pad = (n: number) => String(n).padStart(2, "0")
export const month = (ym: string) => {
  const [y, m] = ym.split("-")
  return { y, m: MONTHS[+m - 1] }
}
export const fmtMonth = (ym: string) => {
  const { y, m } = month(ym)
  return `${m.slice(0, 3)} ${y}`.toUpperCase()
}
export const fmtDay = (d: string) => {
  const [y, m, dd] = d.split("-")
  return `${dd} ${MONTHS[+m - 1].slice(0, 3)} ${y}`.toUpperCase()
}

export const section = (id?: string) => A.sections.find((s) => s.id === id)
export const wing = (id?: string) => A.wings.find((w) => w.id === id)
export const inWing = (id: string) => A.sections.filter((s) => s.wing === id)
export const projectById = (id?: string) => A.projects.items.find((p) => p.id === id)
export const workById = (id?: string) => A.professional.items.find((p) => p.id === id)
export const paperById = (id?: string) => A.papers.items.find((p) => p.id === id)
export const childHref = (parent: string, id: string) => `/${parent}/${id}`

/* The archive in reading order , drives previous/next links. */
export type OrderEntry = { href: string; title: string; catalogue: string; wing?: string }
export const ORDER: OrderEntry[] = [{ href: "/about", title: "About Me", catalogue: A.about.catalogue }]
A.sections.forEach((s) => {
  ORDER.push({ href: `/${s.id}`, title: s.title, catalogue: s.catalogue, wing: s.wing })
  ;(s.children || []).forEach((c) =>
    ORDER.push({ href: childHref(s.id, c.id), title: c.title, catalogue: c.catalogue, wing: s.wing }),
  )
})

export const HOME_TITLE = `${A.owner} , an archive`
