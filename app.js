(function(){
  const $ = (s)=>document.querySelector(s);
  $('#year').textContent = new Date().getFullYear();
  const enBtn=$('#langEN'), esBtn=$('#langES');
  const t=$=>document.getElementById($);
  const map={
    en:{book:'Book now',see:'See portfolio',portfolio:'Portfolio',aftercare:'Aftercare'},
    es:{book:'Reservar ahora',see:'Ver portafolio',portfolio:'Portafolio',aftercare:'Aftercare'}
  };
  function getLang(){
    const p=new URLSearchParams(location.search);
    const x=(p.get('lang')||localStorage.getItem('lang')||'en').toLowerCase();
    return x.startsWith('es')?'es':'en';
  }
  function setLang(l){
    localStorage.setItem('lang',l);
    const p=new URLSearchParams(location.search); p.set('lang',l);
    history.replaceState(null,'','?'+p.toString());
  }
  function applyLang(l){
    enBtn.classList.toggle('on',l==='en'); esBtn.classList.toggle('on',l==='es');
    t('bookBtn').textContent=map[l].book;
    t('seePortfolio').textContent=map[l].see;
    t('portfolioHeading').textContent=map[l].portfolio;
    t('aftercareHeading').textContent=map[l].aftercare;
  }
  async function load(l){
    applyLang(l);
    try{
      const res=await fetch('/content/site.'+l+'.json?__='+Date.now());
      const data=await res.json();
      // text
      t('title').textContent=data.title||t('title').textContent;
      t('subtitle').textContent=data.subtitle||t('subtitle').textContent;
      // IG
      if(data.instagram){
        const user=(''+data.instagram).replace(/^@/,'');
        const ig=$('#igLink'); ig.textContent='@'+user; ig.href='https://instagram.com/'+user;
      }
      // WhatsApp + booking
      let waNumber=(data.whatsapp||'').toString().replace(/[^0-9]/g,'');
      let waMsg=(data.whatsapp_message||'').toString();
      const waURL= waNumber ? ('https://wa.me/'+waNumber+(waMsg?('?text='+encodeURIComponent(waMsg)):'') ) : '#';
      const wa=$('#waLink'); wa.href=waURL;
      const bookBtn=$('#bookBtn');
      if (data.booking_url){ bookBtn.href=data.booking_url; }
      else { bookBtn.href=waURL; }
      // gallery
      const grid=$('#portfolio'); grid.innerHTML='';
      (data.gallery||[]).forEach(item=>{
        const src = typeof item==='string' ? item : item.image;
        const alt = typeof item==='string' ? '' : (item.alt||'');
        if(!src) return;
        const card=document.createElement('article'); card.className='card';
        const img=document.createElement('img'); img.loading='lazy'; img.src=src; img.alt=alt;
        card.appendChild(img);
        if(alt){ const cap=document.createElement('div'); cap.className='caption'; cap.textContent=alt; card.appendChild(cap); }
        grid.appendChild(card);
      });
      // aftercare
      const ac=$('#aftercare'); ac.innerHTML='';
      (data.aftercare||[]).forEach((s,i)=>{
        const div=document.createElement('div'); div.className='step';
        div.textContent=(i+1)+'. '+s; ac.appendChild(div);
      });
    }catch(e){ console.error(e); }
  }
  enBtn.addEventListener('click',()=>{ setLang('en'); load('en'); });
  esBtn.addEventListener('click',()=>{ setLang('es'); load('es'); });
  load(getLang());
})();