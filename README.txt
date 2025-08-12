GRIMLAYER (FULL, BILINGUAL, ADMIN)
====================================

UPLOAD EVERYTHING IN THIS FOLDER TO THE ROOT OF YOUR SITE (Git repo or Netlify “Upload folder”).

Structure:
- index.html / styles.css / app.js
- admin/index.html + admin/config.yml  (Decap CMS + Netlify Identity, Git Gateway)
- content/site.en.json + content/site.es.json
- assets/portfolio/1.jpg 2.jpg 3.jpg

Netlify:
1) Identity → Enable
2) Identity → Settings & usage → Services → Enable Git Gateway
3) Identity → Invite users → your email → Confirmed
4) Go to https://YOUR-DOMAIN/admin/?nocache=1 → Login with Netlify Identity

Editing:
- English content → “Site (English)”
- Español → “Sitio (Español)”
- Gallery saves to /assets/portfolio

WhatsApp:
- Set “whatsapp” (digits only) and “whatsapp_message” in each language.
- If you set “booking_url”, the Book button uses that instead.

Aftercare:
- Edit the list of steps in each language. By default it uses your membrane method (Saniderm/Emalla, 7 days).
