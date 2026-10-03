import { useEffect } from "react"
import { A, HOME_TITLE } from "@/lib/archive"

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title === HOME_TITLE ? title : `${title} · ${A.owner}`
  }, [title])
}
