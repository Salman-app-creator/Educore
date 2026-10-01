(()=>{'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const nav=$('#nav'),burger=$('#burger'),links=$('#links'),bar=$('#progress');
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* scroll: navbar + progress (one rAF-throttled handler) */
let tick=false;
const onScroll=()=>{tick=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
nav.classList.toggle('sc',y>40);bar.style.transform=`scaleX(${h>0?y/h:0})`};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
/* mobile menu */
const setMenu=o=>{burger.setAttribute('aria-expanded',o);links.classList.toggle('open',o);nav.classList.toggle('open',o)};
burger.addEventListener('click',()=>setMenu(!links.classList.contains('open')));
links.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
/* reveal with stagger */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
const sib=$$('.rv',e.target.parentElement);e.target.style.setProperty('--d',Math.min(sib.indexOf(e.target),5)*.07+'s');
e.target.classList.add('v');io.unobserve(e.target)}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('.rv').forEach(el=>io.observe(el));
/* counters */
const count=el=>{const n=+el.dataset.n,s=el.dataset.s||'',p=el.dataset.p||'',t0=performance.now();
const f=t=>{const k=Math.min((t-t0)/1500,1),e=1-Math.pow(1-k,3);el.textContent=p+Math.round(n*e)+(k===1?s:'');k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)};
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){reduce?e.target.textContent=(e.target.dataset.p||'')+e.target.dataset.n+(e.target.dataset.s||''):count(e.target);co.unobserve(e.target)}}));
$$('[data-n]').forEach(el=>co.observe(el));
/* morphing headline word */
if(!reduce){const w=$('#swap'),list=['Fees','Attendance','Results','Staff','Messaging','Branches'];let i=0;
setInterval(()=>{if(document.hidden)return;w.classList.add('out');setTimeout(()=>{i=(i+1)%list.length;w.textContent=list[i];w.classList.remove('out')},380)},2600)}
/* active nav link */
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
/* contact form -> WhatsApp (no backend needed) */
const form=$('#form');
form.addEventListener('submit',e=>{e.preventDefault();let ok=true;
['name','school','phone'].forEach(id=>{const f=$('#'+id),bad=!f.value.trim();f.classList.toggle('bad',bad);if(bad)ok=false});
if(!ok)return;
const v=id=>$('#'+id).value.trim();
const msg=`Assalam o Alaikum, mujhe EduCore ka demo chahiye.\nName: ${v('name')}\nSchool: ${v('school')}\nPhone: ${v('phone')}\nStudents: ${v('students')||'-'}\n${v('message')}`;
$('#ok').hidden=false;
open('https://wa.me/923136176616?text='+encodeURIComponent(msg),'_blank','noopener')});
})();
