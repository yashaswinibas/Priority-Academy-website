import data from '../data/site.json'

export const SITE = data
export const { ids: PAGE_IDS, phone: PHONE, phoneTxt: PHONE_TXT, waTxt: WA_TXT, maps: MAPS, UG, PG } = data

/** WhatsApp link with a pre-filled message */
export const waLink = (lang, msg) =>
  data.waBase + encodeURIComponent(msg || data.waMsg[lang])

export const WA_NUMBER = data.waBase.match(/wa\.me\/(\d+)/)[1]

/** '#sslc' -> '/sslc', '#home' -> '/', '#courses' -> '/#courses' */
export const route = (href) => {
  if (!href || !href.startsWith('#')) return href
  const id = href.slice(1)
  if (id === 'home' || id === '') return '/'
  if (id === 'courses') return '/#courses'
  return '/' + id
}
