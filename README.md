# Hricha , an archive

A personal archive: a notebook of things built, learned, read, run, and written.
Built with Vite, React, TypeScript, Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com/).

```sh
npm install
npm run dev      # preview at http://localhost:5173
npm run build    # static site in dist/ , upload it anywhere
```

## Where things live

| What | Where |
| --- | --- |
| All the words (sections, projects, papers, books, runs, journal) | `src/content.ts` |
| Pages | `src/pages/` |
| The notebook landing page, top bar, page corners, shared page pieces | `src/components/archive/` |
| Reading order, page turning, lookups | `src/lib/` |
| shadcn components (Dialog, Command, Accordion, ToggleGroup, Badge…) | `src/components/ui/` |
| Palette + fonts for shadcn (ivory, ink, rust) | `src/index.css` |
| The archive's editorial styles (notebook, gallery wall, exhibits) | `src/styles/archive.css` |

Add more shadcn components with `npx shadcn@latest add <name>`; they pick up the
archive palette automatically.

URLs use hash routing (`/#/books`), so the built site works on any static host
without server configuration.
