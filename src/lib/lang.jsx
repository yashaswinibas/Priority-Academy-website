import { createContext, useContext, useEffect, useState } from 'react'
import { SITE } from './site'

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('pa-lang') || 'en' } catch { return 'en' }
  })
  useEffect(() => {
    document.body.classList.toggle('kn-on', lang === 'kn')
    document.documentElement.lang = lang
    try { localStorage.setItem('pa-lang', lang) } catch {}
  }, [lang])
  const toggle = () => setLang((l) => (l === 'en' ? 'kn' : 'en'))
  return (
    <LangCtx.Provider value={{ lang, toggle, t: SITE.T[lang], f: SITE.F[lang], h: SITE.H[lang] }}>
      {children}
    </LangCtx.Provider>
  )
}

export const useLang = () => useContext(LangCtx)
