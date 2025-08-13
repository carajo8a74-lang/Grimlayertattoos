GRIMLAYER — Publicar desde el teléfono

1) Netlify → Add new site → Deploy manually
2) Subir este ZIP completo.
3) Site settings → Identity → Enable
4) Identity → Services → Enable Git Gateway
5) Ir a /admin/ (iniciar sesión o invitar tu email)
6) /admin/health.html debe mostrar:
   - Fetch config.yml: 200
   - Identity endpoint: 200 o 204

El archivo _redirects ya está incluido:
/admin    /admin/index.html    200
/*        /index.html          200

Si luego quieres conectar grimlayertattoo.com a este sitio:
- Site settings → Domain management → Add domain → grimlayertattoo.com
- Sigue las instrucciones de DNS y activa HTTPS
