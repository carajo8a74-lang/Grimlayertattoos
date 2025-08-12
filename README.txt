GRIMLAYER — FULL SITE + CMS (EN default, ES optional)

Structure (upload to the ROOT of your repo / Netlify deploy):
/
├─ index.html
├─ styles.css
├─ app.js
├─ netlify.toml
├─ assets/
│  └─ portfolio/ (images)
├─ content/
│  ├─ site.en.json
│  └─ site.es.json
└─ admin/
   ├─ index.html
   └─ config.yml

Netlify setup:
1) Identity → Enable.
2) Identity → Settings & usage → Services → Enable Git Gateway.
3) Identity → Invite users → your email → accept → status must be Confirmed.

Login:
- Open https://grimlayertattoo.com/admin/?nocache=1
- If mobile cookies block, this build forces Identity to your domain via APIUrl.

Edit content:
- English at “Site (English)” → content/site.en.json
- Español en “Sitio (Español)” → content/site.es.json
- Gallery images go under /assets/portfolio (the CMS saves there).

Language switch:
- UI default is EN. Use the EN/ES chips (top right) or add ?lang=es to the URL.
