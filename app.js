(async()=>{
 const res=await fetch('/content/site.json',{cache:'no-cache'});
 const d=await res.json();
 document.getElementById('heroTitle').textContent=d.hero_title;
 document.getElementById('heroSub').textContent=d.hero_sub;
 const ig=(d.instagram||'').replace(/^@/,'');
 const wa=d.whatsapp||'';
 const msg=encodeURIComponent('Hola! Quiero reservar un tatuaje. Fecha ideal: __ . Zona: __ .');
 document.getElementById('instaLink').href='https://instagram.com/'+ig;
 document.getElementById('instaLink').textContent='@'+ig;
 document.getElementById('waLink').href='https://wa.me/'+wa+'?text='+msg;
 document.getElementById('waCTA').href='https://wa.me/'+wa+'?text='+msg;
 const g=document.getElementById('gallery'); g.innerHTML='';
 (d.gallery||[]).forEach(src=>{const img=new Image(); img.src=src; img.loading='lazy'; g.appendChild(img);});
 document.getElementById('year').textContent=new Date().getFullYear();
})();