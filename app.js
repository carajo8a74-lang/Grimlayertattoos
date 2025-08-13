
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
  $("#title").textContent = d.title;
  $("#subtitle").textContent = d.subtitle;
  document.getElementById("bookBtn").textContent = d.book_text;
  document.getElementById("portfolioHeading").textContent = d.portfolio_heading;
  document.getElementById("aftercareHeading").textContent = d.aftercare_heading;
  $("#igLink").textContent = d.instagram;
  $("#igLink").href = "https://instagram.com/" + d.instagram.replace(/^@/,"");
  $("#waLink").textContent = d.whatsapp_text;
  $("#waLink").href = d.whatsapp_url;

  const g = $("#portfolio"); g.innerHTML="";
  (d.gallery||[]).forEach(item=>{
    const div=document.createElement("div"); div.className="card";
    div.innerHTML = `<img loading="lazy" src="${item.image}" alt="${item.alt||""}"><div class="cap">${item.alt||""}</div>`;
    g.appendChild(div);
  });

  const ac = $("#aftercare"); ac.innerHTML="";
  (d.aftercare||[]).forEach(t=>{
    const el=document.createElement("div"); el.className="step"; el.textContent=t; ac.appendChild(el);
  });
}
