
(async function(){
  const $ = (s)=>document.querySelector(s);
  const t = await fetch('/content/site.json', {cache:'no-cache'}).then(r=>r.json()).catch(()=>null);
  if(!t){ console.warn('site.json missing'); return; }
  $('#year').textContent = new Date().getFullYear();

  let lang = (localStorage.getItem('lang')||'en');
  const setLang = (l)=>{
    lang = l; localStorage.setItem('lang', l);
    $('#langEN').classList.toggle('on', l==='en');
    $('#langES').classList.toggle('on', l==='es');
    const d = t[l];
    $('#title').textContent = d.title;
    $('#subtitle').textContent = d.subtitle;
    $('#bookBtn').textContent = d.book_text;
    $('#bookBtn').href = d.booking_url;
    $('#seePortfolio').textContent = d.see_portfolio;
    $('#portfolioHeading').textContent = d.portfolio_heading;
    $('#aftercareHeading').textContent = d.aftercare_heading;
    const ig = d.instagram || '@grimlayertattoo';
    $('#igLink').textContent = ig;
    $('#igLink').href = 'https://instagram.com/' + ig.replace('@','');
    $('#waLink').textContent = d.whatsapp_text || 'WhatsApp';
    $('#waLink').href = d.whatsapp_url || '#';
    // gallery
    const g = $('#portfolio'); g.innerHTML='';
    (d.gallery||[]).forEach(item=>{
      const el = document.createElement('div');
      el.className='card';
      el.innerHTML = `<img src="${item.image}" alt="${item.alt||''}"/><div class="cap">${item.alt||''}</div>`;
      g.appendChild(el);
    });
    // aftercare
    const ac = $('#aftercare'); ac.innerHTML='';
    (d.aftercare||[]).forEach(step=>{
      const s = document.createElement('div');
      s.className='step'; s.textContent = step;
      ac.appendChild(s);
    });
  };

  $('#langEN').addEventListener('click', e=>{ e.preventDefault(); setLang('en'); });
  $('#langES').addEventListener('click', e=>{ e.preventDefault(); setLang('es'); });

  setLang(lang);
})();
