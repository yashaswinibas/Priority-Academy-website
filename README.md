# Priority Academy — Website (React + Vite)

Bilingual (English / ಕನ್ನಡ), mobile-first website for **Priority Academy**, Bengaluru.
Built with **React 18**, **React Router** and **Vite**.

- Calls: **+91 77606 25912**  ·  WhatsApp: **+91 63640 13899**
- SV Arcade, No. 116, Gurunath Layout, Opp. Bus Stop, Huralichikkanahalli, Hesaraghatta Main Road, Bengaluru – 560090

## Pages (clean URLs)

`/` Home · `/about` · `/sslc` · `/puc` · `/degree` · `/online` · `/students` · `/admissions` · `/locations` · `/contact`

## Run locally (VS Code)

Requires **Node.js 18+** (nodejs.org).

```bash
npm install        # first time only
npm run dev        # opens http://localhost:5173 with live reload
```

## Build for hosting

```bash
npm run build      # creates the dist/ folder
npm run preview    # check the built site at http://localhost:4173
```

## Deploy on Hostinger

1. Run `npm run build`.
2. hPanel → **Websites → Manage → File Manager → public_html**.
3. Delete the old files in `public_html` (keep nothing from the previous site).
4. Upload **everything inside `dist/`** (including the hidden `.htaccess` file) into `public_html`.
   Tip: zip the *contents* of `dist/`, upload the zip, then right-click → **Extract**.
5. Open your domain. Pages like `yourdomain.com/contact` work thanks to `.htaccess`.

> Hosting in a sub-folder (e.g. `yourdomain.com/academy/`)? Set `base: '/academy/'` in
> `vite.config.js` and change `RewriteBase /` to `RewriteBase /academy/` in `public/.htaccess`, then rebuild.

## Gallery — adding photos

1. Copy photos (`.jpg`, `.png`, `.webp`) into **`src/assets/gallery/`**
2. Want tabs? Make sub-folders: `src/assets/gallery/Office/`, `src/assets/gallery/Events/` …
3. The file name is the caption: `01-counselling-session.jpg` → "Counselling session" (leading numbers set the order).
4. Keep each photo under ~500 KB (resize phone photos to about 1600 px wide).
5. `npm run build` → upload `dist/`.

No photos yet? The page shows a friendly "Photos coming soon" message.

## Where to edit

| What | File |
|---|---|
| All page text (English + Kannada), flyer text, phone numbers | `src/data/site.json` |
| Home page layout | `src/pages/Home.jsx` |
| Inner pages (About, SSLC, …, Contact) | `src/pages/Page.jsx` |
| Header, mobile menu, footer, bottom Call/WhatsApp bar | `src/components/Layout.jsx` |
| Enquiry → WhatsApp form | `src/components/EnquiryForm.jsx` |
| Admissions / courses / approvals blocks | `src/components/FlyerSections.jsx` |
| Colours, fonts, spacing, phone layout | `src/styles.css` |
| Images & handwriting fonts | `src/assets/` |
| Favicon, logo, robots.txt, `.htaccess` | `public/` |

**Phone numbers** are in `src/data/site.json`: `"phone"`, `"phoneTxt"` (calls) and `"waBase"`, `"waTxt"` (WhatsApp).

## Project structure

```
├── index.html            ← page shell, fonts, SEO tags
├── public/               ← copied as-is into dist/ (.htaccess, favicon, logo)
├── src/
│   ├── main.jsx          ← app entry
│   ├── App.jsx           ← routes
│   ├── styles.css
│   ├── data/site.json    ← all content
│   ├── lib/              ← site constants, language switch, hooks
│   ├── components/       ← Layout, Blocks, Sections, EnquiryForm, Icons…
│   ├── pages/            ← Home.jsx, Page.jsx
│   └── assets/           ← images + fonts
├── vite.config.js
└── package.json
```

## Notes
- The enquiry form doesn't store anything; it opens WhatsApp with the details filled in.
- Language choice is remembered in the visitor's browser.
- "100% Results" and AIU / COBSE / Govt. approval claims come from the printed flyer — keep proof ready.
