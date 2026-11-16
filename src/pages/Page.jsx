import { Link, Navigate, useParams } from 'react-router-dom'
import { useLang } from '../lib/lang'
import { useReveal, useSeo } from '../lib/hooks'
import { SITE, PHONE, PHONE_TXT, WA_TXT, waLink } from '../lib/site'
import { Blocks } from '../components/Blocks'
import { Sections } from '../components/Sections'
import { SplitTitle } from '../components/Inline'
import { PinIcon } from '../components/Icon'
import { ContactButtons } from '../components/Contact'
import { EnquiryForm } from '../components/EnquiryForm'
import { AdmissionsBand, AgencySection, ApprovedWhy, ContinueBlock, Programmes, TaglineBand } from '../components/FlyerSections'

const EXTRA = {
  sslc: [AdmissionsBand, ContinueBlock],
  puc: [AdmissionsBand, ContinueBlock],
  degree: [Programmes],
  online: [Programmes],
  about: [AgencySection, ApprovedWhy],
  admissions: [ApprovedWhy],
}

function QuickCard() {
  const { lang, t } = useLang()
  return (
    <aside className="quick reveal"><div className="quick-art" /><div className="quick-in">
      <h3>{t.talk}</h3><p>{t.talk_sub}</p>
      <a className="qnum" href={`tel:${PHONE}`}>{PHONE_TXT}</a>
      <a className="qnum q2" href={waLink(lang)} target="_blank" rel="noopener noreferrer">WhatsApp · {WA_TXT}</a>
      <ContactButtons />
      <p className="qaddr"><PinIcon /><span>Hesaraghatta Main Road, Bengaluru – 560090</span></p>
    </div></aside>
  )
}

export default function Page() {
  const { pid } = useParams()
  const { lang, t } = useLang()
  const data = SITE.pages[pid]?.[lang]
  useSeo(data?.seo, data?.meta)
  useReveal([pid, lang])
  if (!data || pid === 'home') return <Navigate to="/" replace />

  const [hero, ...rest] = data.sections
  const isContact = pid === 'contact'

  const Hero = (
    <div className="hero sub-hero"><div className="wrap sub-grid">
      <div className="h-left reveal">
        <span className="pill"><Link to="/">{t.home}</Link><i>/</i>{t[pid]}</span>
        <h1><SplitTitle text={hero.title} /></h1>
        <div className="hero-body"><Blocks blocks={hero.blocks} pid={pid} /></div>
      </div>
      {isContact ? <div className="hero-art small"><div className="art" /></div> : <QuickCard />}
    </div></div>
  )

  if (isContact) {
    const formSec = rest.find((s) => s.blocks.some(([k]) => k === 'form'))
    const others = rest.filter((s) => s !== formSec)
    return (
      <>
        {Hero}
        <section className="sec"><div className="wrap contact-grid">
          <div className="cleft">{others.map((s) => <div className="cblock reveal" key={s.title}><h2>{s.title}</h2><Blocks blocks={s.blocks} pid={pid} /></div>)}</div>
          <div className="cform reveal"><h2>{formSec.title}</h2><EnquiryForm /></div>
        </div></section>
      </>
    )
  }

  return (
    <>
      {Hero}
      {(EXTRA[pid] || []).map((C, i) => <C key={i} />)}
      <Sections sections={rest} pid={pid} />
      <TaglineBand />
    </>
  )
}
