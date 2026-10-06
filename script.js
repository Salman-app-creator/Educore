(()=>{'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* scroll progress + active link */
const bar=$('#bar');let t=0;
addEventListener('scroll',()=>{t||requestAnimationFrame(()=>{t=0;const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?scrollY/h:0})`});t=1},{passive:true});
const burger=$('#burger'),menu=$('#menu'),set=o=>{burger.setAttribute('aria-expanded',o);menu.classList.toggle('open',o)};
burger.onclick=()=>set(!menu.classList.contains('open'));menu.onclick=e=>e.target.closest('a')&&set(false);
const so=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&$$('#menu a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
/* counters */
const cnt=el=>{const n=+el.dataset.n,s=el.dataset.s||'',p=el.dataset.p||'',t0=performance.now(),fm=v=>p+v.toLocaleString('en-IN')+s;
if(rm){el.textContent=fm(n);return}
const f=x=>{const k=Math.min((x-t0)/1600,1);el.textContent=fm(Math.round(n*(1-Math.pow(1-k,3))));k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)};
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cnt(e.target);co.unobserve(e.target)}}));
$$('[data-n]').forEach(el=>co.observe(el));
/* hero word morph */
const sw=$('#sw'),words=['Fees','Attendance','Result Cards','ID Cards','Chat','Salary Slips'];let wi=0;
if(!rm)setInterval(()=>{if(document.hidden)return;sw.classList.add('out');setTimeout(()=>{wi=(wi+1)%words.length;sw.textContent=words[wi];sw.classList.remove('out')},360)},2500);
/* feature stage: morphing orb + autoplay */
const F=[
['💰','Fee Management','Vouchers banana aur recovery dekhna ab aasaan.',['Bulk vouchers','Family grouping','Recovery tracking'],'#9E3039','#e0586a'],
['📲','QR Attendance','Card scan karein, attendance foran lag jati hai.',['Mobile se scan','Class-wise reports','Foran record'],'#0f766e','#34c3a6'],
['📋','Report Cards','Weekly, monthly aur term-wise results, printable.',['Term-wise results','Printable report cards','Class-wise results'],'#6d28d9','#a78bfa'],
['🪪','ID Cards','Student aur staff ke cards seconds mein tayyar.',['PVC-ready design','Student + staff cards','QR code ke saath'],'#b45309','#F4B400'],
['💬','Chat & Broadcast','Principal se parent tak. Koi per-message charge nahi.',['Free messaging','Broadcast + read status','Role-based contacts'],'#1d4ed8','#60a5fa'],
['🏫','Multi-Branch','Har campus ka data alag, control ek login se.',['Alag data har campus ka','Ek login se control','Campus-wise comparison'],'#be185d','#f472b6'],
['👨‍🏫','Staff & Salary','Profiles, roles aur salary slips ek jagah.',['Profiles aur roles','Salary slips','Teacher assignments'],'#15803d','#4ade80'],
['🎒','Parent Portal','Parents khud dekhein: fees, results, attendance.',['Results','Fees','Attendance'],'#9E3039','#F4B400']];
const tabs=$('#tabs'),ob=$('#ob'),pn=$('.pn'),pg=$('#pg');let cur=0,auto=!rm,tm;
F.forEach((f,i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.innerHTML=f[0]+' '+f[1];b.onclick=()=>{auto=false;clearTimeout(tm);pg.className='pg';show(i)};tabs.append(b)});
const rnd=()=>{const r=()=>30+Math.random()*40|0;return`${r()}% ${r()}% ${r()}% ${r()}%/${r()}% ${r()}% ${r()}% ${r()}%`};
function show(i){cur=i;const f=F[i];$$('button',tabs).forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i)});
ob.style.setProperty('--c1',f[4]);ob.style.setProperty('--c2',f[5]);if(!rm){ob.style.borderRadius=rnd();ob.style.transform=`rotate(${(Math.random()*40-20)|0}deg) scale(1.05)`;setTimeout(()=>ob.style.transform='',500)}
$('#ic').textContent=f[0];$('#ft').textContent=f[1];$('#fd').textContent=f[2];$('#fl').innerHTML=f[3].map(x=>'<li>'+x+'</li>').join('');
pn.classList.remove('sw2');void pn.offsetWidth;pn.classList.add('sw2');
if(auto){pg.className='pg';void pg.offsetWidth;pg.className='pg run';clearTimeout(tm);tm=setTimeout(()=>auto&&show((cur+1)%F.length),4500)}}
show(0);
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){if(auto)show(0);o.disconnect()}}).observe(pn);
/* 3D tilt on demo window */
const bw=$('#bw');if(bw&&!rm&&matchMedia('(hover:hover)').matches){bw.onpointermove=e=>{const r=bw.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;bw.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*5}deg)`};bw.onpointerleave=()=>bw.style.transform=''}
/* form -> WhatsApp */
$('#f').onsubmit=e=>{e.preventDefault();let ok=1;['n','s','p'].forEach(id=>{const i=$('#'+id),b=!i.value.trim();i.classList.toggle('bad',b);if(b)ok=0});if(!ok)return;
open('https://wa.me/923136176616?text='+encodeURIComponent(`Assalam o Alaikum, mujhe EduCore ka demo chahiye.\nName: ${$('#n').value}\nSchool: ${$('#s').value}\nPhone: ${$('#p').value}\nStudents: ${$('#t').value||'-'}\n${$('#m').value.trim()}`),'_blank','noopener')};
})();
