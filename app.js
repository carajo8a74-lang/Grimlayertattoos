(function(){
  const YEAR = document.getElementById('year'); if(YEAR) YEAR.textContent = new Date().getFullYear();
  const EN = document.getElementById('langEN'), ES = document.getElementById('langES');
  const title = document.getElementById('title'), subtitle = document.getElementById('subtitle');
  const ig = document.getElementById('igLink'), wa = document.getElementById('waLink'), book = document.getElementById('bookBtn');
  const see = document.getElementById('seePortfolio'), portH = document.getElementById('portfolioHeading'), afterH = document.getElementById('aftercareHeading');
  const portfolio = document.getElementById('portfolio'), aftercare = document.getElementById('aftercare');

  const labels = { en:{book:'Book now',see:'See portfolio',port:'Portfolio',after:'Aftercare'},
                   es:{book:'Reservar ahora',see:'Ver portafolio',port:'Portafolio',after:'Aftercare'} };

  function getLang(){ const q=new URLSearchParams(location.search); const l=(q.get('lang')||localStorage.getItem('lang')||'en').toLowerCase(); return l.startsWith('es')?'es':'en'; }
  function setLang(l){ localStorage.setItem('lang',l); const q=new URLSearchParams(location.search); q.set('lang',l); history.replaceState(null,'','?'+q.toString()); }

  function applyLang(l){ EN.classList.toggle('on',l==='en'); ES.classList.toggle('on',l==='es');
    if(see) see.textContent = labels[l].see; if(portH) portH.textContent = labels[l].port; if(afterH) afterH.textContent = labels[l].after; }

  async function load(l){
    try{
      const res = await fetch('/content/site.'+l+'.json?nocache='+Date.now()); const data = await res.json();
      if(title && data.title) title.textContent=data.title; if(subtitle && data.subtitle) subtitle.textContent=data.subtitle;
      if(ig && data.instagram){ const u=data.instagram.replace(/^@/,''); ig.textContent='@'+u; ig.href='https://instagram.com/'+u; }
      if(wa && data.whatsapp){ const num=(''+data.whatsapp).replace(/\D/g,''); wa.href='https://wa.me/'+num+(data.whatsapp_message?('?text='+encodeURIComponent(data.whatsapp_message)):''); }
      if(book && data.whatsapp){ const num=(''+data.whatsapp).replace(/\D/g,''); book.href='https://wa.me/'+num+(data.whatsapp_message?('?text='+encodeURIComponent(data.whatsapp_message)):''); }
      if(portfolio){ portfolio.innerHTML=''; (data.gallery||[]).forEach(item=>{ const src=(typeof item==='string')?item:item.image; const alt=(typeof item==='string')?'':(item.alt||''); if(!src) return;
        const a=document.createElement('article'); a.className='card'; const img=document.createElement('img'); img.loading='lazy'; img.src=src; img.alt=alt; a.appendChild(img);
        if(alt){ const c=document.createElement('div'); c.className='caption'; c.textContent=alt; a.appendChild(c);} portfolio.appendChild(a); }); }
      if(aftercare){ aftercare.innerHTML=''; (data.aftercare||[]).forEach(step=>{ const div=document.createElement('div'); div.className='step'; div.textContent = (typeof step==='string')?step:(step.step||''); aftercare.appendChild(div); }); }
    }catch(e){ console.error('Content load failed', e); }
  }

  EN && EN.addEventListener('click',()=>{ setLang('en'); applyLang('en'); load('en'); });
  ES && ES.addEventListener('click',()=>{ setLang('es'); applyLang('es'); load('es'); });

  const lang = getLang(); applyLang(lang); load(lang);
})();