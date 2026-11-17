import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../lib/lang'
import { PAGE_IDS, PHONE, PHONE_TXT, WA_TXT, waLink } from '../lib/site'
import { Logo, PhoneIcon, WaIcon } from './Icon'
import { ContactButtons } from './Contact'

const COURSES = ['sslc', 'puc', 'degree', 'online']
const path = (p) => (p === 'home' ? '/' : `/${p}`)
const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/17tTWCeMwZ/' },
  { name: 'Instagram', href: 'https://www.instagram.com/priority_academy_?psln=Y3pvZm1jOW16c3Nv' },
]

const Brand = () => (
  <Link to="/" className="logo" aria-label="Priority Academy home">
    <Logo />
    <div className="logo-txt"><b>Priority<span>Academy</span></b><small>YOUR SUCCESS IS OUR PRIORITY</small></div>
  </Link>
)

const SocialIcon = ({ name }) => name === 'Facebook' ? (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4z" /></svg>
) : (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
)

const Globe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g></svg>
)

export function Header() {
  const { t, toggle } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const current = pathname.slice(1) || 'home'

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMenu(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [menu])

  const nl = (p) => ({ to: path(p), end: p === 'home', className: ({ isActive }) => (isActive ? 'on' : '') })

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <Brand />
          <nav className="links" aria-label="Main"><div>
            <NavLink {...nl('home')}>{t.home}</NavLink>
            <NavLink {...nl('about')}>{t.about}</NavLink>
            <div className="dd">
              <button type="button" className={`ddb${COURSES.includes(current) ? ' on' : ''}`}>{t.courses} <i>▾</i></button>
              <div className="ddm">{COURSES.map((p) => <NavLink key={p} {...nl(p)}>{t[p]}</NavLink>)}</div>
            </div>
            <NavLink {...nl('students')}>{t.students}</NavLink>
            <NavLink {...nl('gallery')}>{t.gallery}</NavLink>
            <NavLink {...nl('admissions')}>{t.admissions}</NavLink>
            <NavLink {...nl('locations')}>{t.locations}</NavLink>
          </div></nav>
          <div className="nav-r">
            <button className="lang" type="button" onClick={toggle}><Globe />{t.lang_btn}</button>
            <Link to="/contact" className="btn btn-dark"><span>{t.cta}</span><span className="arr">→</span></Link>
            <button className="burger" type="button" aria-label="Open menu" onClick={() => setMenu(true)}><span /></button>
          </div>
        </div>
      </header>

      <div className={`mmenu${menu ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mm-top"><Brand /><button className="mm-close" aria-label="Close menu" onClick={() => setMenu(false)}>×</button></div>
        <nav>{PAGE_IDS.map((p) => <NavLink key={p} {...nl(p)}><span>{t[p]}</span><i>→</i></NavLink>)}</nav>
        <div className="mm-actions">
          <button className="lang" type="button" onClick={toggle} style={{ justifyContent: 'center', padding: 15 }}><Globe />{t.lang_btn}</button>
          <a className="btn btn-dark" href={`tel:${PHONE}`}>{t.call} · {PHONE_TXT}</a>
        </div>
      </div>
    </>
  )
}

export function Footer() {
  const { lang, t, f } = useLang()
  return (
    <footer><div className="wrap">
      <div className="f-grid">
        <div>
          <Brand />
          <p className="ft">{t.foot_tag}</p><p className="fs">{f.tag}</p>
          <p className="fs">SSLC / 10th · PUC / 12th · Degree · Distance &amp; Online Education</p><p className="fs">{t.foot_line}</p>
        </div>
        <div>
          <h4>{t.reach}</h4>
          <a className="fnum" href={`tel:${PHONE}`}>{PHONE_TXT}</a>
          <a className="fnum fwa" href={waLink(lang)} target="_blank" rel="noopener noreferrer">WhatsApp · {WA_TXT}</a>
          <ContactButtons />
          <div className="footer-social">
            <h4>Follow us</h4>
            <div className="social-links">{SOCIAL_LINKS.map(({ name, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                <SocialIcon name={name} /><span>{name}</span>
              </a>
            ))}</div>
          </div>
          <address className="faddr">SV Arcade, No. 116, Gurunath Layout,<br />Opp. Bus Stop, Huralichikkanahalli,<br />Hesaraghatta Main Road, Bengaluru – 560090</address>
        </div>
      </div>
      <div className="f-bot"><span>{t.rights}</span><span className="fscript">Your Success Is Our Priority.</span></div>
    </div></footer>
  )
}

export function FloatingSocialButtons() {
  return (
    <div className="floating-social" aria-label="Follow Priority Academy">
      {SOCIAL_LINKS.map(({ name, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${name}`} title={name}>
          <SocialIcon name={name} />
        </a>
      ))}
    </div>
  )
}

/** Sticky Call / WhatsApp bar on phones */
export function MobileBar() {
  const { lang, t } = useLang()
  return (
    <div className="mbar" aria-label="Quick contact">
      <a className="btn btn-dark" href={`tel:${PHONE}`}><PhoneIcon size={17} />{t.call}</a>
      <a className="btn btn-wa" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />WhatsApp</a>
    </div>
  )
}
