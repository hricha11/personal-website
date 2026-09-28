# Hidden sections

Two sections are switched off for now. Nothing was deleted: their pages and
all their writing are still in the project, just commented out so the site
doesn't show them.

| Section | Archive no. | Wing | Page file | Its writing |
| --- | --- | --- | --- | --- |
| Research Papers Read | 027 | Professional | `src/pages/Papers.tsx` | `papers:` in `src/content.ts` |
| My Love for Journaling | 048 | Personal | `src/pages/Journaling.tsx` | `journaling:` in `src/content.ts` |

While hidden, they don't appear in the contents (the notebook's pages and the
Index spread), the Ctrl K search, or the page-turning order. Visiting `#/papers` or `#/journaling` shows the "Not in the
archive" page.

## How to bring one back

Every place is marked with a comment starting `HIDDEN for now`. Search the
project for **`HIDDEN`** to find them all. Uncomment the lines for the section
you want:

### Research Papers Read

1. **`src/content.ts`**: in `sections`, uncomment the `id: "papers"` block
   (between Professional Life and Things I Think I Did Right).
2. **`src/App.tsx`**: uncomment `import Papers from "@/pages/Papers"` and the
   two routes, `/papers` and `/papers/:id`.
3. **`src/components/archive/shell.tsx`**: uncomment the `Papers` group in the
   Ctrl K search (and add "papers" back to its description if you like).
4. The papers' notes are still the original drafts, not from the résumé, and
   their `related` links point at old project ids. Rewrite them before
   bringing the section back.

### My Love for Journaling

1. **`src/content.ts`**: in `sections`, uncomment the `id: "journaling"` block
   (the last one, after Running).
2. **`src/App.tsx`**: uncomment `import Journaling from "@/pages/Journaling"`
   and the `/journaling` route.

Then run `npm run build` to check everything still compiles.

## Worth knowing

- **The fig tree entry lives in the journal:** the 19 Nov 2025 entry about the
  fig tree is part of the hidden journal. The fig branch drawing on the
  contents page is unaffected.
- **Running is now the last page:** its "turn the page →" corner no longer
  appears, because nothing comes after it in the book.
