(() => {
  const $ = sel => document.querySelector(sel);
  const setText = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };
  const setAttr = (sel, attr, val) => { const el = $(sel); if (el) el.setAttribute(attr, val); };

  const state = { lang: localStorage.getItem('lang') || 'en', en: null, es: null };

  $('#year').textContent = String(new Date().getFullYear());

  async function load() {
    const [en, es] = await Promise.all([
      fetch('/content/site.en.json', { cache: 'no-store' }).then(r=>r.json()),
      fetch('/content/site.es.json', { cache: 'no-store' }).then(r=>r.json())
    ]);
    state.en = en; state.es = es;
    render();
  }

  function render() {
    const t = state[state.lang] || state.en;

    setText('#title', t.title);
    setText('#subtitle', t.subtitle);
    $('#langEN').classList.toggle('on', state.lang==='en');
    $('#langES').classList.toggle('on', state.lang==='es');

    setAttr('#igLink','href', t.instagram);
    setText('#igLink', '@grimlayertattoo');
    setAttr('#waLink','href', t.whatsapp);
    setText('#waLink', 'WhatsApp');
    setText('#seePortfolio', state.lang==='es' ? 'Ver portafolio' : 'See portfolio');
    setText('#aftercareHeading', state.lang==='es' ? 'Cuidados' : 'Aftercare');
    setText('#portfolioHeading', state.lang==='es' ? 'Portafolio' : 'Portfolio');
    setText('#bookBtn', state.lang==='es' ? 'Reservar ahora' : 'Book now');

    const list = $('#portfolio');
    list.innerHTML = '';
    (t.gallery || []).forEach(item => {
      const div = document.createElement('div'); div.className = 'card';
      const img = document.createElement('img'); img.src = item.image; img.alt = item.alt || 'Tattoo';
      const cap = document.createElement('div'); cap.className = 'cap'; cap.textContent = item.alt || '';
      div.appendChild(img); div.appendChild(cap); list.appendChild(div);
    });

    $('#aftercare').innerHTML = marked.parse(t.aftercare_md || '');
  }

  $('#langEN').addEventListener('click', () => { state.lang='en'; localStorage.setItem('lang','en'); render(); });
  $('#langES').addEventListener('click', () => { state.lang='es'; localStorage.setItem('lang','es'); render(); });

  load();
})();