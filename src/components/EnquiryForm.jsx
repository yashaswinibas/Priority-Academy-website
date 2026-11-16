import { useState } from 'react'
import { useLang } from '../lib/lang'
import { WA_NUMBER } from '../lib/site'
import { WaIcon } from './Icon'

/** Builds a WhatsApp message from the form. Nothing is stored on the website. */
export function EnquiryForm() {
  const { lang, t } = useLang()
  const [v, setV] = useState({ name: '', phone: '', city: '', qual: '', course: '', q: '', ok: false })
  const [err, setErr] = useState(false)
  const [url, setUrl] = useState('')
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const ok = v.name.trim() && v.phone.trim() && v.qual && v.course && v.ok
    setErr(!ok)
    if (!ok) return
    const L = lang === 'kn'
      ? ['ನಮಸ್ಕಾರ Priority Academy,', 'ಹೆಸರು', 'ಮೊಬೈಲ್', 'ಊರು / ಜಿಲ್ಲೆ', 'ಕೊನೆಯ Qualification', 'ಆಸಕ್ತಿ ಇರುವ Course', 'ಪ್ರಶ್ನೆ']
      : ['Hello Priority Academy,', 'Name', 'Mobile', 'City / district', 'Last qualification', 'Interested course', 'Question']
    const m = `${L[0]}\n\n${L[1]}: ${v.name.trim()}\n${L[2]}: ${v.phone.trim()}` +
      (v.city.trim() ? `\n${L[3]}: ${v.city.trim()}` : '') +
      `\n${L[4]}: ${v.qual}\n${L[5]}: ${v.course}` + (v.q.trim() ? `\n${L[6]}: ${v.q.trim()}` : '')
    setUrl(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`)
  }

  return (
    <form className="enq" onSubmit={submit} noValidate>
      <div className="row">
        <label>{t.fname} *<input value={v.name} onChange={set('name')} autoComplete="name" /></label>
        <label>{t.fphone} *<input value={v.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" /></label>
      </div>
      <div className="row">
        <label>{t.fcity}<input value={v.city} onChange={set('city')} /></label>
        <label>{t.fqual} *
          <select value={v.qual} onChange={set('qual')}><option value="">{t.choose}</option>{t.quals.map((o) => <option key={o}>{o}</option>)}</select>
        </label>
      </div>
      <label>{t.fcourse} *
        <select value={v.course} onChange={set('course')}><option value="">{t.choose}</option>{t.courses_opts.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label>{t.fq}<textarea rows="3" value={v.q} onChange={set('q')} /></label>
      <label className="agree"><input type="checkbox" checked={v.ok} onChange={set('ok')} /> <span>{t.consent}</span></label>
      <p className="err" style={{ display: err ? 'block' : 'none' }}>{t.err}</p>
      <button className="btn btn-wa wide" type="submit"><WaIcon /><span>{t.submit}</span></button>
      {url && (
        <div className="wa-out" style={{ display: 'block' }}>
          <p>{t.ready}</p>
          <a className="btn btn-wa" href={url} target="_blank" rel="noopener noreferrer"><WaIcon /><span>{t.open_wa}</span></a>
        </div>
      )}
      <p className="fine">{t.note}</p>
    </form>
  )
}
