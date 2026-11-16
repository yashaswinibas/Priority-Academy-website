import { Fragment } from 'react'

/** Render **bold** and *italic* from the content file */
export function Inline({ text }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g)
  return parts.map((p, i) => {
    if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (/^\*[^*].*\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

/** Big headline: last sentence (or last two words) in gradient */
export function SplitTitle({ text }) {
  const t = text.trim()
  const parts = t.split(/(?<=[.?!])\s+/)
  let a, b
  if (parts.length >= 2) { a = parts.slice(0, -1).join(' '); b = parts[parts.length - 1] }
  else {
    const w = t.split(/\s+/)
    if (w.length >= 3) { a = w.slice(0, -2).join(' '); b = w.slice(-2).join(' ') } else { a = ''; b = t }
  }
  return <>{a && <>{a} </>}<span className="g">{b}</span></>
}
