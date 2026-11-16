// Runs after `vite build`. For every page it writes dist/<page>/index.html
// with its own <title>, description, canonical URL, Open Graph, Twitter tags
// and structured data — so Google, WhatsApp & Facebook previews see real text.
import fs from 'node:fs'
import path from 'node:path'

const DOMAIN = 'https://priorityacademy.in'
const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'))
const shell = fs.readFileSync('dist/index.html', 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const org = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': DOMAIN + '/#org',
  name: 'Priority Academy',

  slogan: 'Your Success Is Our Priority',
  url: DOMAIN + '/',
  logo: DOMAIN + '/logo.png',
  image: DOMAIN + '/logo.png',
  telephone: '+91-7760625912',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SV Arcade, No. 116, Gurunath Layout, Opp. Bus Stop, Huralichikkanahalli, Hesaraghatta Main Road',
    addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560090', addressCountry: 'IN',
  },
  areaServed: { '@type': 'State', name: 'Karnataka' },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+91-7760625912', contactType: 'admissions', availableLanguage: ['English', 'Kannada'] },
    { '@type': 'ContactPoint', telephone: '+91-6364013899', contactType: 'customer support', contactOption: 'WhatsApp', availableLanguage: ['English', 'Kannada'] },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Courses',
    itemListElement: ['SSLC / 10th', '2nd PUC (Science, Commerce, Arts)', 'BA', 'B.Com', 'BBA', 'BCA', 'B.Sc', 'MA', 'M.Com', 'MBA', 'MCA', 'M.Sc']
      .map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Course', name: n, provider: { '@id': DOMAIN + '/#org' } } })),
  },
}

const KEYWORDS = 'SSLC admission Bengaluru, 10th fail what next, PUC admission Karnataka, 2nd PUC private exam, distance degree Bengaluru, online degree Karnataka, BA B.Com BBA BCA B.Sc, MBA MCA M.Com, education gap students, Priority Academy, Hesaraghatta Road'

function page(id) {
  const d = site.pages[id]?.en || { seo: site.G.en.seo, meta: site.G.en.meta, sections: [{ title: site.G.en.title + ' ' + site.G.en.title2, blocks: [['p', site.G.en.sub]] }] }
  const url = id === 'home' ? DOMAIN + '/' : `${DOMAIN}/${id}/`
  const title = id === 'home' ? 'Failed or Discontinued SSLC / PUC? Admissions Open | Priority Academy Bengaluru' : d.seo
  const desc = id === 'home'
    ? 'Admissions open for SSLC / 10th, 2nd PUC (Science, Commerce, Arts), UG (BA, B.Com, BBA, BCA, B.Sc) and PG (MA, M.Com, MBA, MCA, M.Sc). Failed or discontinued? Continue your education with Priority Academy, Bengaluru.'
    : d.meta
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN + '/' }]
      .concat(id === 'home' ? [] : [{ '@type': 'ListItem', position: 2, name: site.T.en[id], item: url }]),
  }
  const head = `
  <link rel="canonical" href="${url}" />
  <meta name="keywords" content="${esc(KEYWORDS)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="geo.region" content="IN-KA" /><meta name="geo.placename" content="Bengaluru" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="Priority Academy" />
  <meta property="og:locale" content="en_IN" /><meta property="og:locale:alternate" content="kn_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${DOMAIN}/logo.png" />
  <script type="application/ld+json">${JSON.stringify(org)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>`
  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${DOMAIN}/logo.png"`)
    .replace('</head>', head)
  // readable text for crawlers that don't run JavaScript (hidden once React loads)
  const text = d.sections.slice(0, 3).map((s) => `<h2>${esc(s.title)}</h2>` +
    s.blocks.filter(([k]) => k === 'p' || k === 'list').map(([k, v]) => k === 'p' ? `<p>${esc(v)}</p>` : `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`).join('')).join('')
  html = html.replace('<div id="root"></div>', `<div id="root"><noscript><h1>${esc(title)}</h1>${text}</noscript></div>`)
  const out = id === 'home' ? 'dist/index.html' : `dist/${id}/index.html`
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log('  ✓', out)
}

site.ids.forEach(page)
console.log('SEO pages written.')
