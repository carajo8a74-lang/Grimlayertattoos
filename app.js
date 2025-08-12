(function(){
  const YEAR = document.getElementById('year'); YEAR.textContent = new Date().getFullYear();
  const langEN = document.getElementById('langEN');
  const langES = document.getElementById('langES');
  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const igLink = document.getElementById('igLink');
  const waLink = document.getElementById('waLink');
  const bookBtn = document.getElementById('bookBtn');
  const seePortfolio = document.getElementById('seePortfolio');
  const portfolioHeading = document.getElementById('portfolioHeading');
  const aftercareHeading = document.getElementById('aftercareHeading');
  const gallery = document.getElementById('portfolio');
  const aftercare = document.getElementById('aftercare');

  const labels = {
    en: { book:'Book now', see:'See portfolio', portfolio:'Portfolio', aftercare:'Aftercare' },
    es: { book:'Reservar ahora', see:'Ver portafolio', portfolio:'Portafolio', aftercare:'Aftercare' },
  };

  function getLang(){
    const q = new URLSearchParams(location.search);
    return (q.get('lang')||localStorage.getItem('lang')||'en').toLowerCase().startsWith('es')?'es':'en';
  }
  function setLang(l){
    localStorage.setItem('lang', l);
    const q = new URLSearchParams(location.search); q.set('lang',l);
    history.replaceState(null,'','?'+q.toString());
  }

  function applyLang(l){
    langEN.classList.toggle('on', l==='en');
    langES.classList.toggle('on', l==='es');
    bookBtn.textContent = labels[l].book;
    seePortfolio.textContent = labels[l].see;
    portfolioHeading.textContent = labels[l].portfolio;
    aftercareHeading.textContent = labels[l].aftercare;
  }

  function render(data){
    title.textContent = data.title || title.textContent;
    subtitle.textContent = data.subtitle || subtitle.textContent;
    if(data.instagram){
      const user = data.instagram.replace(/^@/,'');
      igLink.textContent='@'+user;
      igLink.href='https://instagram.com/'+user;
    }
    if(data.whatsapp){
      const num = (''+data.whatsapp).replace(/[^0-9]/g,'');
      const msg = encodeURIComponent(data.whatsapp_message || 'Hi! I want to book a tattoo. Date: [MM/DD], Size/placement: [details].');
      const url = 'https://wa.me/'+num+'?text='+msg;
      waLink.href=url;
      bookBtn.href=url;
    }
    // Gallery
    gallery.innerHTML='';
    (data.gallery||[]).forEach(item=>{
      const src = typeof item==='string'? item : item.image;
      const alt = typeof item==='string'? '' : (item.alt||'');
      if(!src) return;
      const card=document.createElement('article'); card.className='card';
      const img=document.createElement('img'); img.loading='lazy'; img.src=src; img.alt=alt;
      card.appendChild(img); if(alt){const c=document.createElement('div'); c.className='caption'; c.textContent=alt; card.appendChild(c);}
      gallery.appendChild(card);
    });
    // Aftercare
    aftercare.innerHTML='';
    const list = document.createElement('ul');
    (data.aftercare||[]).forEach(step=>{
      const li=document.createElement('li'); li.textContent = step; list.appendChild(li);
    });
    aftercare.appendChild(list);
  }

  async function load(l){
    applyLang(l);
    try{
      const res = await fetch('/content/site.'+l+'.json?nocache='+Date.now());
      const data = await res.json();
      render(data);
    }catch(e){ console.error(e); }
  }

  langEN.addEventListener('click',()=>{ setLang('en'); load('en'); });
  langES.addEventListener('click',()=>{ setLang('es'); load('es'); });

  const lang = getLang(); applyLang(lang); load(lang);
})();