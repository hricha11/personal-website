/* Motion, with anime.js , small and calm: ink that writes itself in,
   flowers that bloom, a branch that draws itself. Nothing runs for people
   who ask for reduced motion (everything is already visible without it). */
import { useEffect, type RefObject } from "react"
import { animate, createDrawable, createScope, onScroll, splitText, stagger, utils } from "animejs"

export const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches

/* Run animations scoped to a component's root element; selectors resolve
   inside it, and everything is reverted on unmount (or when `deps` change ,
   by default it runs once per mount, and pages remount on every route). */
export function useMotion(root: RefObject<HTMLElement | null>, setup: () => void | (() => void), deps: unknown[] = []) {
  useEffect(() => {
    if (!root.current || reduced()) return
    const scope = createScope({ root: root.current }).add(setup)
    return () => scope.revert()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

/* Handwriting appearing letter by letter, as if the pen were moving. */
export function writeIn(target: string, delay = 0) {
  const els = utils.$(target)
  if (!els.length) return
  const { chars } = splitText(els as HTMLElement[], { chars: true })
  animate(chars, {
    opacity: [0, 1],
    y: ["0.3em", "0em"],
    rotate: [-8, 0],
    duration: 520,
    delay: stagger(32, { start: delay }),
    ease: "out(3)",
  })
}

/* Flowers opening: a quarter-turn and a soft spring. */
export function bloom(target: string, delay = 0) {
  animate(target, {
    scale: [0, 1],
    rotate: ["-100deg", "0deg"],
    duration: 1100,
    delay: stagger(80, { start: delay }),
    ease: "outElastic(1, 0.55)",
  })
}

/* The same, each flower on its own as it scrolls into view. */
export function bloomOnScroll(target: string) {
  utils.$(target).forEach((el) =>
    animate(el, {
      scale: [0, 1],
      rotate: ["-100deg", "0deg"],
      duration: 1100,
      ease: "outElastic(1, 0.55)",
      autoplay: onScroll({ target: el as HTMLElement }),
    }),
  )
}

/* Line drawings drawing themselves, stroke by stroke. */
export function drawIn(target: string, delay = 0) {
  animate(createDrawable(target), {
    draw: ["0 0", "0 1"],
    duration: 1400,
    delay: stagger(140, { start: delay }),
    ease: "inOut(2)",
  })
}
