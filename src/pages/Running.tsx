/* RUNNING , a documented experiment in consistency. */
import { Crumbs, Page, Sec } from "@/components/archive/parts"
import { useTitle } from "@/lib/use-title"
import { A, MONTHS, fmtMonth, section } from "@/lib/archive"

function RunChart() {
  const r = A.running
  const data = r.monthly
  const [sy, sm] = r.monthlyStart.split("-").map(Number)
  const W = 800, H = 230, L = 34, B = 26, T = 18
  const max = Math.ceil(Math.max(...data) / 20) * 20
  const step = (W - L) / data.length
  const bw = Math.max(4, step * 0.42)
  const y = (v: number) => T + (H - T - B) * (1 - v / max)
  const peak = Math.max(...data)
  const ticks = Array.from({ length: max / 20 + 1 }, (_, i) => i * 20)

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Monthly running distance in kilometres since ${fmtMonth(r.monthlyStart)}`}>
      {ticks.map((v) => (
        <g key={v}>
          <line className={v ? "grid" : "axis"} x1={L} x2={W} y1={y(v)} y2={y(v)} />
          <text x={L - 8} y={y(v) + 3} textAnchor="end">{v}</text>
        </g>
      ))}
      {data.map((v, i) => {
        const mi = (sm - 1 + i) % 12
        const yr = sy + Math.floor((sm - 1 + i) / 12)
        const x = L + i * step + (step - bw) / 2
        return (
          <g key={i}>
            {mi === 0 && (
              <>
                <text x={x + bw / 2} y={H - 8} textAnchor="middle">{yr}</text>
                <line className="grid" x1={x - (step - bw) / 2} x2={x - (step - bw) / 2} y1={T} y2={H - B} />
              </>
            )}
            <g className="b">
              <rect className={`bar grow ${v === peak ? "max" : ""}`} x={x} y={y(v)} width={bw} height={y(0) - y(v)} style={{ transitionDelay: `${i * 22}ms` }} />
              <rect x={L + i * step} y={T} width={step} height={H - T - B} fill="transparent" />
              <text className="tip" x={x + bw / 2} y={y(v) - 6} textAnchor="middle">{MONTHS[mi].slice(0, 3)} · {v}</text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

export default function Running() {
  const s = section("running")!
  const r = A.running
  useTitle(s.title)
  let n = 0
  return (
    <Page className="run-page">
      <Crumbs trail={[{ label: s.title }]} />
      <header className="page-head">
        <p className="catalogue">ARCHIVE <b>{s.catalogue}</b> · RUNNING</p>
        <p className="ex-exhibit">EXHIBIT {s.catalogue}</p>
        <h1 className="page-title">Running</h1>
        <p className="ex-years">SINCE {r.since}</p>
        <p className="run-quote">An ongoing experiment in consistency.</p>
        <span className="margin-note" aria-hidden="true">slow is still running</span>
      </header>

      <div className="stats reveal">
        {r.stats.map((st) => (
          <div className="stat" key={st.label}>
            <p className="meta">{st.label}</p>
            <div className="v">{st.value}{st.unit && <span className="u">{st.unit}</span>}</div>
            {st.note && <div className="n">{st.note}</div>}
          </div>
        ))}
      </div>

      <Sec n={++n} label="The hypothesis" hint="Framed like an experiment, because that’s how I got myself to start.">
        <dl className="spec">
          <dt>Hypothesis</dt><dd>Consistency beats intensity.</dd>
          <dt>Method</dt><dd>Three runs a week. Any pace. No skipping because it’s slow.</dd>
          <dt>Controls</dt><dd>None, really. Life happens. That’s part of the experiment.</dd>
          <dt>Status</dt><dd>Still running.</dd>
        </dl>
      </Sec>
      <Sec n={++n} label="Monthly distance">
        <RunChart />
        <div className="chart-cap"><span>Kilometres per month · hover a bar</span><span className="hand text-lg">the dips are monsoons and exams</span></div>
      </Sec>
      <Sec n={++n} label="The log" hint="Moments worth writing down.">
        <ol className="runlog">
          {r.timeline.map((e) => (
            <li key={e.date}><span className="d">{fmtMonth(e.date)}</span><span className="m" aria-hidden="true" /><span className="t">{e.text}</span></li>
          ))}
        </ol>
      </Sec>
      <Sec n={++n} label="Live data">
        <div className="strava">
          <p><span className="meta mb-1.5 block">STRAVA FEED · NOT CONNECTED</span>Recent runs will appear here once I connect Strava.</p>
          <span className="hand">coming, eventually</span>
        </div>
      </Sec>
    </Page>
  )
}
