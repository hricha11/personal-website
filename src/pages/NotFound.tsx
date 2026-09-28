import { Link } from "react-router"
import { Page, PageHead } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"

export default function NotFound() {
  useTitle("Not in the archive")
  return (
    <Page>
      <PageHead catalogue="000" name="Missing" title={<>Not in the <em>archive</em>.</>}
        lede="This one fell before anyone could pick it , or it hasn’t grown yet. Both are common here." />
      <Link className="examine ink-link" to="/about">Back to the contents <span className="arrow">→</span></Link>
    </Page>
  )
}
