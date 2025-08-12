
const $ = (s)=>document.querySelector(s);
$("#year").textContent = new Date().getFullYear();

let lang = localStorage.getItem("lang") || "en";
function setLang(l){
  lang = l; localStorage.setItem("lang", l);
  $("#langEN").classList.toggle("on", l==="en");
  $("#langES").classList.toggle("on", l==="es");
  render();
}
$("#langEN").onclick = ()=>setLang("en");
$("#langES").onclick = ()=>setLang("es");

let data=null;
fetch("/content/site.json?ts="+Date.now()).then(r=>r.json()).then(j=>{ data=j; render(); });

function render(){
  if(!data) return;
  const d = data[lang];
  if(!d) return;
  const set = (id, val)=>{ const el = document.getElementById(id); if(el) el.textContent = val; };
  set("title", d.title);
  set("subtitle", d.subtitle);
  const bk = document.getElementById("bookBtn"); if(bk) bk.textContent = d.book_text;
  set("seePortfolio", d.see_portfolio);
  set("portfolioHeading", d.portfolio_heading);
  set("aftercareHeading", d.aftercare_heading);
  const ig = document.getElementById("igLink");
  if (ig){ ig.textContent = d.instagram; ig.href = "https://instagram.com/" + d.instagram.replace(/^@/,""); }
  const wa = document.getElementById("waLink");
  if (wa){ wa.textContent = d.whatsapp_text; wa.href = d.whatsapp_url; }

  const g = document.getElementById("portfolio"); if (g) { g.innerHTML="";
    (d.gallery||[]).forEach(item=>{
      const div=document.createElement("div"); div.className="card";
      div.innerHTML = `<img loading="lazy" src="${item.image}" alt="${item.alt||""}"><div class="cap">${item.alt||""}</div>`;
      g.appendChild(div);
    });
  }

  const ac = document.getElementById("aftercare"); if (ac) { ac.innerHTML="";
    (d.aftercare||[]).forEach(t=>{
      const el=document.createElement("div"); el.className="step"; el.textContent=t; ac.appendChild(el);
    });
  }
}
