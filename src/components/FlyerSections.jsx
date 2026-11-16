import { useLang } from '../lib/lang'
import { SITE, PHONE, PHONE_TXT, UG, PG, waLink } from '../lib/site'
import { Icon } from './Icon'

const Checks = ({ items, cls = '' }) => (
  <ul className={`fchk ${cls}`}>{items.map((x) => <li key={x}><span><Icon name="check" size={13} /></span>{x}</li>)}</ul>
)

export function AdmissionsBand() {
  const { lang, f } = useLang()
  return (
    <section className="fsec"><div className="wrap"><div className="adm reveal">
      <div className="adm-l">
        <span className="adm-tag"><Icon name="star" size={14} /> {f.open} <Icon name="star" size={14} /></span>
        <ul className="adm-list"><li><b>{f.c10}</b></li><li><b>{f.c12}</b> <small>({f.streams})</small></li></ul>
        <span className="adm-direct">{f.direct}</span>
        <div className="btns">
          <a className="btn btn-light" href={`tel:${PHONE}`}><span>{f.helpline}: {PHONE_TXT}</span></a>
          <a className="btn btn-wa" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><span>{f.enquire} · WhatsApp</span></a>
        </div>
      </div>
      <div className="badge100"><span className="laurel"><Icon name="star" size={16} /><Icon name="star" size={16} /><Icon name="star" size={16} /></span><b>{f.res1}</b><small>{f.res2}</small></div>
    </div></div></section>
  )
}

export function ContinueBlock() {
  const { f } = useLang()
  return (
    <section className="fsec"><div className="wrap fgrid2">
      <div className="fcard dontworry reveal"><span className="ficon big"><Icon name="rocket" size={34} /></span>
        <div><p className="fq">{f.fail_t}</p><h3>{f.fail_h}</h3><p>{f.fail_p}</p></div></div>
      <div className="fcard reveal"><h3 className="fh"><Icon name="target" size={22} /><span>{f.cont}</span></h3><Checks items={f.cont_l} /></div>
    </div></section>
  )
}

export function Programmes() {
  const { f } = useLang()
  const Tile = ([n, i]) => <div className="ptile" key={n}><span><Icon name={i} size={28} /></span><b>{n}</b></div>
  return (
    <section className="fsec"><div className="wrap"><div className="prog reveal">
      <h2 className="ph"><Icon name="cap" size={30} /><span>{f.prog}</span></h2>
      <div className="pcols">
        <div><h4>{f.ug}</h4><div className="ptiles">{UG.map(Tile)}</div></div>
        <div><h4>{f.pg}</h4><div className="ptiles">{PG.map(Tile)}</div></div>
      </div>
    </div></div></section>
  )
}

export function ApprovedWhy() {
  const { f } = useLang()
  return (
    <section className="fsec"><div className="wrap fgrid2 why2">
      <div className="fcard reveal"><h3 className="fh"><Icon name="bank" size={22} /><span>{f.appr}</span></h3><Checks items={f.appr_l} /></div>
      <div className="fcard reveal"><h3 className="fh"><Icon name="star" size={20} /><span>{f.why}</span></h3><p className="fsub">{f.why_s}</p><Checks items={f.why_l} cls="two" /></div>
    </div></section>
  )
}

export function TaglineBand() {
  const { lang, f } = useLang()
  return (
    <section className="fsec"><div className="wrap"><div className="never reveal">
      <div className="ltl"><Icon name="cap" size={22} /><span>{f.learn}</span><i>·</i><span>{f.lead}</span><Icon name="cap" size={22} /></div>
      <div className="never-in">
        <div><p className="n1">{f.never1}</p><p className="n2">{f.never2}</p></div>
        <div className="btns">
          <a className="btn btn-light" href={`tel:${PHONE}`}><span>{PHONE_TXT}</span></a>
          <a className="btn btn-wa" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span></a>
        </div>
      </div>
      <p className="tog">★ ★ ★ &nbsp;{f.together}&nbsp; ★ ★ ★</p>
    </div></div></section>
  )
}

export function AgencySection() {
  const { lang } = useLang()
  const a = SITE.AG[lang]
  return (
    <section className="fsec"><div className="wrap"><div className="agsec reveal">
      <div className="agsec-logo"><span className="aglogo" role="img" aria-label="Priority Ads Agency — Your Success Is Our Priority" /></div>
      <div><span className="eyebrow">{lang === 'en' ? a.by.toUpperCase() : a.by}</span><h2>{a.title}</h2><p>{a.body}</p><p className="agp">{a.promise}</p></div>
    </div></div></section>
  )
}
