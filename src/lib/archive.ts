/* Helpers shared by every page: lookups, reading order, date formatting. */
import { ARCHIVE } from "@/content"

export const A = ARCHIVE
export type Wing = (typeof A.wings)[number]
export type Child = { id: string; title: string; catalogue: string }
export type Section = Omit<(typeof A.sections)[number], "children"> & { children?: Child[] }

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

/* Projects: only published ones are shown, and their exhibit numbers come
   from their order here, so adding, removing or hiding one renumbers the rest. */
export const PROJECTS = A.projects.items.filter((p) => !p.hidden)
export const exhibitNo = (id: string) => pad(PROJECTS.findIndex((p) => p.id === id) + 1)

/* Sections, with Personal Projects' pages listed from the published projects. */
export const SECTIONS: Section[] = A.sections.map((s) =>
  s.id === "projects" ? { ...s, children: PROJECTS.map((p) => ({ id: p.id, title: p.title, catalogue: `EX. ${exhibitNo(p.id)}` })) } : s,
)

export const section = (id?: string) => SECTIONS.find((s) => s.id === id)
export const wing = (id?: string) => A.wings.find((w) => w.id === id)
export const inWing = (id: string) => SECTIONS.filter((s) => s.wing === id)
export const projectById = (id?: string) => PROJECTS.find((p) => p.id === id)
export const workById = (id?: string) => A.professional.items.find((p) => p.id === id)
export const childHref = (parent: string, id: string) => `/${parent}/${id}`
/* a link to a file on this site (the résumé), downloaded rather than visited */
export const isFile = (href: string) => href.startsWith("/") && href.endsWith(".pdf")
export const RESUME = A.links.find((l) => isFile(l.href))

/* The archive in reading order , drives previous/next links and page numbers.
   The notebook is pp. 1–3 (cover, then the contents spread), so the first
   section starts on p. 4 and every page after it follows in this order. */
export type OrderEntry = { href: string; title: string; catalogue: string; wing?: string; page: number }
export const ORDER: OrderEntry[] = [{ href: "/about", title: "About Me", catalogue: A.about.catalogue, page: 2 }]
SECTIONS.forEach((s) => {
  ORDER.push({ href: `/${s.id}`, title: s.title, catalogue: s.catalogue, wing: s.wing, page: ORDER.length + 3 })
  ;(s.children || []).forEach((c) =>
    ORDER.push({ href: childHref(s.id, c.id), title: c.title, catalogue: c.catalogue, wing: s.wing, page: ORDER.length + 3 }),
  )
})
export const pageOf = (href: string) => ORDER.find((e) => e.href === href)?.page

export const HOME_TITLE = `${A.owner} · an archive`
