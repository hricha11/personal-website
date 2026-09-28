/* The folded corners on the edge of every page: turn back (bottom left)
   and turn the page (bottom right). They ride along the page's bottom edge
   while you read, and settle into its real corners at the end. */
import { usePageTurn } from "@/lib/book"

export function PageCorners() {
  const { back, backLabel, forward, nextLabel } = usePageTurn()
  return (
    <div className="page-corners">
      <button type="button" className="corner corner-back" onClick={back} aria-label={`Turn back to ${backLabel}`}>
        <span className="corner-fold" aria-hidden="true" />
        <span className="corner-text">← turn back <span className="corner-to">to {backLabel}</span></span>
      </button>
      {forward && (
        <button type="button" className="corner corner-next" onClick={forward} aria-label={`Turn the page to ${nextLabel}`}>
          <span className="corner-text"><span className="corner-to">{nextLabel} · </span>turn the page →</span>
          <span className="corner-fold" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
