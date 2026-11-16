import { useState } from 'react'
import { useLang } from '../lib/lang'
import { Blocks } from './Blocks'
import { SplitTitle } from './Inline'

const SIMPLE = ['p', 'statement', 'button', 'buttons', 'phone', 'script']
const onlySimple = (bl) => bl.every(([k]) => SIMPLE.includes(k))
const isStep = (title) => /^(Step|ಹಂತ)\s*\d/.test(title)

function Faq({ q, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`qa${open ? ' open' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}><span>{q}</span><i>+</i></button>
      <div className="ans"><div>{children}</div></div>
    </div>
  )
}

/** Turns the parsed content sections into page sections (steps, FAQs, cards, text) */
export function Sections({ sections, pid }) {
  const { t } = useLang()
  const out = []
  let i = 0, n = 0, alt = false
  while (i < sections.length) {
    const s = sections[i]
    if (isStep(s.title)) {
      const grp = []
      while (i < sections.length && isStep(sections[i].title)) grp.push(sections[i++])
      alt = !alt; n++
      out.push(
        <section className={`sec ${alt ? 'alt' : ''}`} key={`s${i}`}><div className="wrap">
          <div className="sec-head reveal"><span className="eyebrow">{String(n).padStart(2, '0')}</span><h2>{t.steps}</h2></div>
          <ol className="steps">{grp.map((g, k) => {
            const m = g.title.match(/^(?:Step|ಹಂತ)\s*(\d+):\s*(.+)$/)
            return <li className="reveal" key={k}><span className="sn">{m[1].padStart(2, '0')}</span><div><h3>{m[2]}</h3><Blocks blocks={g.blocks} pid={pid} /></div></li>
          })}</ol>
        </div></section>)
      continue
    }
    if (s.title.endsWith('?') && onlySimple(s.blocks)) {
      let j = i
      while (j < sections.length && sections[j].title.endsWith('?') && onlySimple(sections[j].blocks)) j++
      if (j - i >= 2) {
        const grp = sections.slice(i, j); i = j
        const trailing = grp.flatMap((g) => g.blocks.filter(([k]) => k !== 'p'))
        alt = !alt; n++
        out.push(
          <section className={`sec ${alt ? 'alt' : ''}`} key={`s${i}`}><div className="wrap split">
            <div className="sec-head reveal"><span className="eyebrow">{String(n).padStart(2, '0')}</span><h2>{t.faq}</h2></div>
            <div className="sec-body reveal">
              <div className="faq">{grp.map((g, k) => <Faq key={k} q={g.title}><Blocks blocks={g.blocks.filter(([k2]) => k2 === 'p')} pid={pid} /></Faq>)}</div>
              <Blocks blocks={trailing} pid={pid} />
            </div>
          </div></section>)
        continue
      }
    }
    i++; alt = !alt; n++
    const simple = onlySimple(s.blocks) || s.blocks.some(([k]) => ['profile', 'address', 'form'].includes(k))
    const layout = simple ? 'split' : 'stack'
    out.push(
      <section className={`sec ${alt ? 'alt' : ''}`} key={`s${i}`}><div className={`wrap ${layout}`}>
        <div className="sec-head reveal"><span className="eyebrow">{String(n).padStart(2, '0')}</span>
          <h2>{layout === 'stack' ? <SplitTitle text={s.title} /> : s.title}</h2></div>
        <div className="sec-body reveal"><Blocks blocks={s.blocks} pid={pid} /></div>
      </div></section>)
  }
  return <>{out}</>
}
