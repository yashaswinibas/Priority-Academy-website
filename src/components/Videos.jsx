import { useRef, useState } from 'react'
import { useLang } from '../lib/lang'
import newsMp4 from '../assets/videos/big-news-24x7.mp4'
import newsPoster from '../assets/videos/news-poster.webp'
import reelMp4 from '../assets/videos/reel.mp4'
import reelPoster from '../assets/videos/reel-poster.webp'
import introMp4 from '../assets/videos/intro.mp4'
import introPoster from '../assets/videos/intro-poster.webp'

/*
  HOW TO ADD A VIDEO
  ------------------
  1. Put the .mp4 (and a poster image) in  src/assets/videos/
  2. Import it at the top and add one entry to VIDEOS below.
  Keep videos small: 720p, under ~30 MB (use HandBrake or ffmpeg to compress).
*/
export const VIDEOS = [
  {
    src: newsMp4, poster: newsPoster, shape: 'wide',
    tag: { en: 'In the news', kn: 'ಸುದ್ದಿಯಲ್ಲಿ' },
    title: { en: 'Priority Academy on Big News 24×7', kn: 'Big News 24×7 ನಲ್ಲಿ Priority Academy' },
    note: { en: 'Failed or stopped studying? A fresh start with Priority Academy.', kn: 'ಫೇಲ್ ಆದರೂ ಚಿಂತೆ ಬೇಡ, ಶಿಕ್ಷಣಕ್ಕೆ ಮತ್ತೊಂದು ಅವಕಾಶ.' },
  },
  {
    src: reelMp4, poster: reelPoster, shape: 'tall',
    tag: { en: 'Reel', kn: 'ರೀಲ್' },
    title: { en: 'SSLC & 2nd PUC — pass this year', kn: 'SSLC, 2nd PUC ಪಾಸ್ ಮಾಡ್ಕೋಬೇಕಾ?' },
    note: { en: 'Marks card & TC · DigiLocker certificate · Visit our office', kn: 'Marks Card & TC · DigiLocker ಪ್ರಮಾಣಪತ್ರ · ನಮ್ಮ ಕಚೇರಿಗೆ ಬನ್ನಿ' },
  },
  {
    src: introMp4, poster: introPoster, shape: 'tall',
    tag: { en: 'About us', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
    title: { en: 'Why students choose Priority Academy', kn: 'ವಿದ್ಯಾರ್ಥಿಗಳು Priority Academy ಯನ್ನೇ ಏಕೆ ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ' },
    note: { en: '10th & 2nd PUC · Government-approved board · Excellent coaching', kn: '10th ಮತ್ತು 2nd PUC · ಸರ್ಕಾರ ಅನುಮೋದಿತ Board · ಉತ್ತಮ ತರಬೇತಿ' },
  },
]

function VideoCard({ v }) {
  const { lang } = useLang()
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const play = () => { setPlaying(true); setTimeout(() => ref.current?.play().catch(() => {}), 30) }
  return (
    <figure className={`vcard ${v.shape} reveal`}>
      <div className="vframe">
        <video ref={ref} src={v.src} poster={v.poster} preload="none" playsInline controls={playing}
          onPlay={(e) => document.querySelectorAll('video').forEach((o) => o !== e.target && o.pause())} />
        {!playing && (
          <button className="vplay" onClick={play} aria-label={`Play: ${v.title[lang]}`}>
            <span><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
          </button>
        )}
        <span className="vtag">{v.tag[lang]}</span>
      </div>
      <figcaption><b>{v.title[lang]}</b><small>{v.note[lang]}</small></figcaption>
    </figure>
  )
}

export function VideoSection({ compact }) {
  const { lang } = useLang()
  const T = {
    en: { k: 'Watch', h: 'See Priority Academy', h2: 'in action.', p: 'As featured on Big News 24×7 — and a quick tour of our office on Hesaraghatta Main Road.' },
    kn: { k: 'ವೀಡಿಯೊ', h: 'Priority Academy ಯನ್ನು', h2: 'ನೋಡಿ.', p: 'Big News 24×7 ನಲ್ಲಿ ಪ್ರಸಾರವಾದ ಸುದ್ದಿ ಮತ್ತು Hesaraghatta Main Road ನಲ್ಲಿರುವ ನಮ್ಮ ಕಚೇರಿಯ ಒಂದು ನೋಟ.' },
  }[lang]
  return (
    <section className={`calm vsec${compact ? ' compact' : ''}`} id="videos"><div className="wrap">
      {!compact && <div className="c-head reveal"><p className="v-k">{T.k}</p><h2>{T.h} <span className="g">{T.h2}</span></h2><p>{T.p}</p></div>}
      <div className="vgrid">
        <div className="vwide">{VIDEOS.filter((v) => v.shape === 'wide').map((v) => <VideoCard key={v.poster} v={v} />)}</div>
        <div className="vtalls">{VIDEOS.filter((v) => v.shape === 'tall').map((v) => <VideoCard key={v.poster} v={v} />)}</div>
      </div>
    </div></section>
  )
}
