import { Link } from 'react-router-dom'
import { useLang } from '../lib/lang'
import { SITE, PHONE, PHONE_TXT, WA_TXT, MAPS, waLink, route } from '../lib/site'
import { Inline } from './Inline'
import { Arrow, CheckIcon, PhoneIcon, PinIcon, WaIcon } from './Icon'
import { ContactButtons } from './Contact'
import { EnquiryForm } from './EnquiryForm'

const COURSE_LINK = { SSLC: 'sslc', PUC: 'puc', Degree: 'degree', Online: 'online' }

function linkFor(text, lang) {
  const t = text.toLowerCase()
  if (t.includes('whatsapp')) return { href: waLink(lang), ext: true }
  if (t.startsWith('call') || text.includes('ಕರೆ')) return { href: `tel:${PHONE}` }
  if (['explore courses', 'ಕೋರ್ಸ್‌ಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ', 'get to know your options', 'ನಿಮ್ಮ ಆಯ್ಕೆಗಳನ್ನು ತಿಳಿಯಿರಿ'].some((k) => t.includes(k)))
    return { to: '/#courses' }
  return { to: '/contact' }
}

export function SmartLink({ href, to, ext, className, children, ...rest }) {
  if (to) return <Link className={className} to={to} {...rest}>{children}</Link>
  return <a className={className} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>
}

function Btn({ text, cls = 'btn-dark' }) {
  const { lang } = useLang()
  const l = linkFor(text, lang)
  const isWa = text.toLowerCase().includes('whatsapp')
  const isTel = l.href?.startsWith('tel')
  return (
    <SmartLink {...l} className={`btn ${cls}`}>
      {isWa ? <WaIcon /> : isTel ? <PhoneIcon /> : null}
      <span><Inline text={text} /></span>
      {!isWa && !isTel && <Arrow />}
    </SmartLink>
  )
}

export function Blocks({ blocks, pid }) {
  const { lang, t } = useLang()
  const out = []
  let i = 0
  while (i < blocks.length) {
    const [kind, v] = blocks[i]
    if (kind === 'card') {
      const group = []
      while (i < blocks.length && blocks[i][0] === 'card') { group.push(blocks[i][1]); i++ }
      const cols = group.length === 4 ? 'c4' : group.length === 3 ? 'c3' : 'c2'
      out.push(
        <div className={`cards ${cols}`} key={`c${i}`}>
          {group.map(([lab, txt], n) => {
            const target = pid === 'home' ? Object.entries(COURSE_LINK).find(([k]) => lab.startsWith(k))?.[1] : null
            const inner = (<>
              <span className="ci"><svg width="26" height="26" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: SITE.cardIcons[n % 5] }} /></span>
              <h3><Inline text={lab} /></h3><p><Inline text={txt} /></p>
              {target && <span className="more">{t.more} →</span>}
            </>)
            return target
              ? <Link key={n} className="card reveal" to={`/${target}`}>{inner}</Link>
              : <div key={n} className="card reveal">{inner}</div>
          })}
        </div>
      )
      continue
    }
    const k = `b${i}`
    switch (kind) {
      case 'buttons':
        out.push(<div className="btns" key={k}>{v.map((x, n) => <Btn key={n} text={x.trim()} cls={n === 0 ? 'btn-dark' : 'btn-ghost'} />)}</div>); break
      case 'button':
        out.push(<div className="btns" key={k}><Btn text={v} /></div>); break
      case 'phone': {
        const rest = v.replace(/(Call|WhatsApp|·|:|\s|\+91\s?\d{5}\s?\d{5})+/g, ' ').trim().replace(/^[ :.]+|[ :.]+$/g, '')
        out.push(rest
          ? <div className="phone-cta" key={k}><p><Inline text={v} /></p><ContactButtons /></div>
          : <div key={k}>
              <a className="bignum" href={`tel:${PHONE}`}>{PHONE_TXT}</a><br />
              <a className="bignum" style={{ fontSize: 'clamp(20px,2.4vw,28px)', marginTop: 6 }} href={waLink(lang)} target="_blank" rel="noopener noreferrer">WhatsApp · {WA_TXT}</a>
            </div>)
        break
      }
      case 'pill': out.push(<span className="pill" key={k}><Inline text={v} /></span>); break
      case 'statement': out.push(<p className="statement" key={k}><Inline text={v} /></p>); break
      case 'list':
        out.push(<ul className="checks" key={k}>{v.map((x, n) => <li className="reveal" key={n}><span><CheckIcon /></span><Inline text={x} /></li>)}</ul>); break
      case 'profile': {
        const [name, role = ''] = v
        const ini = name.split(' ').filter((_, n) => n === 0 || n === 2).map((w) => w[0]).join('')
        out.push(<div className="profile reveal" key={k}><div className="avatar">{ini}</div><div><small>{t.founder_role}</small><h3>{name}</h3><p>{role}</p></div></div>)
        break
      }
      case 'address':
        out.push(
          <div className="address reveal" key={k}>
            <span className="pin"><PinIcon /></span>
            <address>{v.map((x, n) => <span key={n}>{x}{n < v.length - 1 && <br />}</span>)}</address>
            <a className="dir" href={MAPS} target="_blank" rel="noopener noreferrer">{t.directions} →</a>
          </div>)
        break
      case 'script': out.push(<p className="script-line" key={k}><Inline text={v} /></p>); break
      case 'form': out.push(<EnquiryForm key={k} />); break
      default: out.push(<p key={k}><Inline text={v} /></p>)
    }
    i++
  }
  return <>{out}</>
}

export { route }
