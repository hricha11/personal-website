/* A tiny painted flower , five buttercream petals and a butter-yellow
   heart, in the pastel (--petal) and ink (--rust) of wherever it sits. */
export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg className={`flower ${className}`} viewBox="-10 -10 20 20" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-4.4" rx="3.3" ry="4.9" transform={`rotate(${a})`} />
      ))}
      <circle r="2.3" className="flower-heart" />
    </svg>
  )
}
