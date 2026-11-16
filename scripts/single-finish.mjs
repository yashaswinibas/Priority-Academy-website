// Adds favicon + SEO tags into single/index.html and also saves a copy as priority-academy.html
import fs from 'node:fs'
const f = 'single/index.html'
let html = fs.readFileSync(f, 'utf8')
const ico = 'data:image/x-icon;base64,' + fs.readFileSync('public/favicon.ico').toString('base64')
const D = 'https://priorityacademy.in'
const title = 'Failed or Discontinued SSLC / PUC? Admissions Open | Priority Academy Bengaluru'
const desc = 'Admissions open for SSLC / 10th, 2nd PUC (Science, Commerce, Arts), UG (BA, B.Com, BBA, BCA, B.Sc) and PG (MA, M.Com, MBA, MCA, M.Sc). Failed or discontinued? Continue your education with Priority Academy, Bengaluru.'
const org = { '@context': 'https://schema.org', '@type': ['EducationalOrganization', 'LocalBusiness'], name: 'Priority Academy', slogan: 'Your Success Is Our Priority', url: D + '/', logo: D + '/logo.png', telephone: '+91-7760625912',
  address: { '@type': 'PostalAddress', streetAddress: 'SV Arcade, No. 116, Gurunath Layout, Opp. Bus Stop, Huralichikkanahalli, Hesaraghatta Main Road', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560090', addressCountry: 'IN' } }
html = html
  .replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${ico}" />`)
  .replace(/<link rel="apple-touch-icon"[^>]*>/, '')
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${desc}" />`)
  .replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${D}/logo.png"`)
  .replace('</head>', `<meta name="robots" content="index, follow" />\n<script type="application/ld+json">${JSON.stringify(org)}</script>\n</head>`)
fs.writeFileSync(f, html)
fs.copyFileSync(f, 'priority-academy.html')
console.log('Single file ready: priority-academy.html (' + (fs.statSync(f).size / 1048576).toFixed(1) + ' MB)')
