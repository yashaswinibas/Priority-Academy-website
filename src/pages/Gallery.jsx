import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/lang'
import { useReveal, useSeo } from '../lib/hooks'
import { SITE, waLink } from '../lib/site'
import { WaIcon } from '../components/Icon'
import { VideoSection } from '../components/Videos'

/*
  HOW TO ADD PHOTOS
  -----------------
  Put .jpg / .jpeg / .png / .webp files in  src/assets/gallery/
  • Sub-folders become filter tabs:  src/assets/gallery/Office/…, src/assets/gallery/Events/…
  • The file name becomes the caption:  "02-counselling-session.jpg" → "Counselling session"
    (numbers at the start only set the order and are hidden)
  Then run  npm run build
*/
const files = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' })

const caption = (name) => {
  const s = name.replace(/\.[^.]+$/, '').replace(/^[\d\s._-]+/, '').replace(/[-_]+/g, ' ').trim()
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

const PHOTOS = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const rel = path.split('/assets/gallery/')[1]
    const parts = rel.split('/')
    return { src, cat: parts.length > 1 ? parts[0] : '', caption: caption(parts[parts.length - 1]) }
  })
const CATS = [...new Set(PHOTOS.map((p) => p.cat).filter(Boolean))]

export default function Gallery() {
  const { lang, t } = useLang()
  const g = SITE.G[lang]
  const [cat, setCat] = useState('')
  const [open, setOpen] = useState(-1)
  const list = useMemo(() => (cat ? PHOTOS.filter((p) => p.cat === cat) : PHOTOS), [cat])
  useSeo(g.seo, g.meta)
  useReveal([lang, cat])

  const go = useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length])
  useEffect(() => {
    if (open < 0) return
    const key = (e) => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [open, go])

  const touch = useRef(0)
  const photo = list[open]

  return (
    <>
      <div className="hero sub-hero gal-hero"><div className="wrap">
        <div className="h-left reveal">
          <span className="pill"><Link to="/">{t.home}</Link><i>/</i>{t.gallery}</span>
          <h1>{g.title} <span className="g">{g.title2}</span></h1>
          <p className="gal-sub">{g.sub}</p>
        </div>
      </div></div>

      <VideoSection compact />

      <section className="sec gal-sec"><div className="wrap">
        {PHOTOS.length === 0 ? (
          <div className="gal-empty reveal">
            <div className="gal-empty-ic" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></g></svg>
            </div>
            <h2>{g.empty_t}</h2>
            <p>{g.empty_p}</p>
            <a className="btn btn-wa" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><WaIcon /><span>WhatsApp</span></a>
          </div>
        ) : (
          <>
            <div className="gal-bar">
              {CATS.length > 1 && (
                <div className="gal-tabs" role="tablist">
                  <button className={!cat ? 'on' : ''} onClick={() => setCat('')}>{g.all}</button>
                  {CATS.map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
                </div>
              )}
              <span className="gal-count">{g.count.replace('{n}', list.length)}</span>
            </div>
            <div className="gal-grid">
              {list.map((p, i) => (
                <button key={p.src} className="gal-item reveal" onClick={() => setOpen(i)} aria-label={p.caption || `Photo ${i + 1}`}>
                  <img src={p.src} alt={p.caption || 'Priority Academy'} loading="lazy" decoding="async" />
                  {p.caption && <span className="gal-cap">{p.caption}</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div></section>

      {photo && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={photo.caption || 'Photo'} onClick={() => setOpen(-1)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}>
          <button className="lb-close" aria-label={g.close} onClick={() => setOpen(-1)}>×</button>
          {list.length > 1 && <button className="lb-nav prev" aria-label={g.prev} onClick={(e) => { e.stopPropagation(); go(-1) }}>‹</button>}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={photo.src} alt={photo.caption || 'Priority Academy'} />
            <figcaption><span>{photo.caption}</span><span className="lb-n">{open + 1} {g.of} {list.length}</span></figcaption>
          </figure>
          {list.length > 1 && <button className="lb-nav next" aria-label={g.next} onClick={(e) => { e.stopPropagation(); go(1) }}>›</button>}
        </div>
      )}
    </>
  )
}
