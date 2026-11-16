import { Link } from 'react-router-dom'
import { useLang } from '../lib/lang'
import { useReveal, useSeo } from '../lib/hooks'
import { SITE, PHONE, PHONE_TXT, UG, PG, waLink, route } from '../lib/site'
import { WaIcon } from '../components/Icon'
import { VideoSection } from '../components/Videos'

export default function Home() {
  const { lang, f, h } = useLang()
  const page = SITE.pages.home[lang]
  useSeo(page.seo, page.meta)
  useReveal([lang])
  const OF = SITE.OF[lang]
  const [ltl1, ltl2] = h.ltl.split('. ')

  const Cta = ({ center }) => (
    <div className={`ch-cta${center ? ' center' : ''}`}>
      <a className="btn btn-dark btn-lg" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><WaIcon /><span>{h.wa}</span></a>
      <a className="ch-call" href={`tel:${PHONE}`}>{h.call} <b>{PHONE_TXT}</b></a>
    </div>
  )

  return (
    <>
      {/* Hero */}
      <div className="calm-hero"><div className="wrap ch-grid">
        <div className="ch-l">
          <h1 className="ask" dangerouslySetInnerHTML={{ __html: SITE.ASK[lang] }} />
          <p className="ans"><span className="ans-dw">{f.fail_h}</span> <span className="g">{f.fail_p}</span></p>
          <div className="nbook reveal" aria-label="Your educational journey doesn't have to end there. You can start again.">
            <span className="clip" aria-hidden="true" />
            <p className="nb4" lang="kn">ನಿಮ್ಮ ಶಿಕ್ಷಣವನ್ನು ಈಗ ಮತ್ತೆ ಆರಂಭಿಸಿ</p>
            <p className="nb1">Your educational journey doesn’t have to end there,</p>
            <p className="nb2">you can start again.
              <svg viewBox="0 0 300 14" aria-hidden="true"><path d="M3 9c60-6 140-7 294-2" fill="none" stroke="url(#lg)" strokeWidth="3.2" strokeLinecap="round" /></svg>
            </p>
          </div>
          <Cta />
        </div>
        <div className="ch-r">
          <div className="art" role="img" aria-label="Student studying on a laptop, sitting on a stack of books" />
          <p className="ch-note">{h.note}</p>
        </div>
      </div></div>

      {/* Courses we offer */}
      <section className="calm offer" id="courses"><div className="wrap">
        <div className="of-head reveal"><p className="of-k"><span className="dot" />{OF.started}</p><h2>{OF.title}</h2></div>
        <div className="of-grid">
          <Link className="of-c reveal" to="/sslc"><span className="of-n">10<sup>th</sup></span><b>{f.c10}</b><ul><li>{f.direct}</li></ul><i>→</i></Link>
          <Link className="of-c reveal" to="/puc"><span className="of-n">PUC</span><b>{f.c12}</b><ul>{f.streams.split('·').map((x) => <li key={x}>{x.trim()}</li>)}</ul><i>→</i></Link>
          <Link className="of-c reveal" to="/degree"><span className="of-n">UG</span><b>{f.ug}</b><ul>{UG.map(([n]) => <li key={n}>{n}</li>)}</ul><i>→</i></Link>
          <Link className="of-c reveal" to="/degree"><span className="of-n">PG</span><b>{f.pg}</b><ul>{PG.map(([n]) => <li key={n}>{n}</li>)}</ul><i>→</i></Link>
        </div>
      </div></section>

      <VideoSection />

      {/* Where are you right now? */}
      <section className="calm"><div className="wrap narrow">
        <div className="c-head reveal"><h2>{h.where}</h2><p>{h.where_s}</p></div>
        <div className="wrows">
          {h.rows.map(([t, d, href], i) => (
            <Link className="wr reveal" to={route(href)} key={t}>
              <span className="wn">{String(i + 1).padStart(2, '0')}</span>
              <span className="wt"><b>{t}</b><small>{d}</small></span><span className="wa">→</span>
            </Link>
          ))}
        </div>
      </div></section>

      {/* Why choose Priority */}
      <section className="calm"><div className="wrap">
        <div className="c-head reveal"><h2>{h.why}</h2><p>{h.why_s}</p></div>
        <div className="wys">{h.whys.map(([a, b]) => <div className="wy reveal" key={a}><b>{a}</b><p>{b}</p></div>)}</div>
        <div className="trust reveal">
          <div className="t100"><b>100%</b><small>{h.res}</small></div>
          <div><small className="tl">{h.trust}</small>
            <p>{f.appr_l.map((x, i) => <span key={x}>{i > 0 && <i> · </i>}{x}</span>)}</p></div>
        </div>
      </div></section>

      {/* Ending */}
      <section className="calm end"><div className="wrap narrow reveal">
        <h2>{ltl1}.<br /><span className="g">{ltl2}</span></h2>
        <Cta center />
        <p className="end-a"><b>{h.visit}</b> · {h.addr}</p>
      </div></section>
    </>
  )
}
