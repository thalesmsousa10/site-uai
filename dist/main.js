/** U.AI — progressive enhancement. Contact destination must be configured before launch. */
const UAI_CONTACT = { whatsapp: '5531999999999' };
document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    if (!reduced.matches) document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  }
  const menu = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  function closeMenu() { links.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); }
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width: 801px)').addEventListener('change',closeMenu);

  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');
  filters.forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
    btn.addEventListener('click', () => {
      filters.forEach(other => { other.classList.toggle('active',other===btn); other.setAttribute('aria-pressed',String(other===btn)); });
      cards.forEach(card => { card.hidden = btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter; });
    });
  });
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach((item,index) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    content.id = `faq-answer-${index}`;
    content.hidden = true;
    trigger.setAttribute('aria-controls',content.id);
    trigger.setAttribute('aria-expanded','false');
    trigger.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      faqs.forEach(other => {
        const expanded = other===item && open;
        other.classList.toggle('open', expanded);
        other.querySelector('.faq-trigger').setAttribute('aria-expanded',String(expanded));
        other.querySelector('.faq-content').hidden = !expanded;
      });
    });
  });
  const interest = document.getElementById('projectInterest');
  function updateInterest() {
    const showSavings = interest.value !== 'web';
    document.querySelectorAll('.savings-field,.calc-result-box,.calc-disclaimer').forEach(el => {el.hidden = !showSavings;});
  }
  interest.addEventListener('change',updateInterest); updateInterest();
  document.querySelectorAll('.hero-service-links a,.entry-paths>a').forEach(link => link.addEventListener('click', () => {
    interest.value = link.hash === '#web-solutions' ? 'web' : 'ai'; updateInterest();
  }));
  const team = document.getElementById('calcTeamSize');
  const bottleneck = document.getElementById('calcBottleneck');
  function calculate() {
    document.getElementById('calcResultVal').textContent = `R$ ${Math.round(84000 * Number(team.value) * Number(bottleneck.value)).toLocaleString('pt-BR')}/ano`;
  }
  team.addEventListener('change',calculate); bottleneck.addEventListener('change',calculate); calculate();
  document.getElementById('leadCalcForm').addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    if (!/^\d{10,15}$/.test(UAI_CONTACT.whatsapp)) {
      status.textContent = 'O contato para agendamento ainda não foi configurado nesta prévia. Nenhum dado foi enviado.';
      return;
    }
    const name = document.getElementById('calcName').value.trim();
    const company = document.getElementById('calcCompany').value.trim();
    const subject = interest.options[interest.selectedIndex].text;
    const message = `Olá, sou ${name} da empresa ${company}. Meu interesse: ${subject}. Gostaria de conversar sobre meu projeto com a U.AI.`;
    window.open(`https://wa.me/${UAI_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    status.textContent = 'Continue no WhatsApp para enviar sua mensagem. Nenhum diagnóstico foi agendado automaticamente.';
  });
  document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    if (UAI_CONTACT.whatsapp) link.href = `https://wa.me/${UAI_CONTACT.whatsapp}`;
    else { link.href = '#calculadora'; link.removeAttribute('target'); link.title = 'Ir para o diagnóstico'; }
    link.rel = 'noopener noreferrer';
  });

  // Abstract diagrams describe project categories; they are not customer screenshots.
  const diagrams = [
    '<path d="M40 100H110M170 100H230M290 100H360"/><circle cx="140" cy="100" r="30"/><circle cx="260" cy="100" r="30"/><rect x="10" y="73" width="30" height="54" rx="4"/><rect x="360" y="73" width="30" height="54" rx="4"/><path d="m130 100 7 7 14-16m99 9 7 7 14-16"/>',
    '<path d="M35 45H120V100H195M35 155H120V100M245 100H310V45H375M310 100V155H375"/><rect x="195" y="75" width="50" height="50" rx="6"/><circle cx="35" cy="45" r="12"/><circle cx="35" cy="155" r="12"/><circle cx="375" cy="45" r="12"/><circle cx="375" cy="155" r="12"/><path d="m207 99 10 11 15-22"/>',
    '<rect x="50" y="25" width="280" height="150" rx="6"/><path d="M50 48H330M75 73H175M75 88H146M75 119H145M75 135H125"/><rect x="208" y="72" width="92" height="76" rx="3"/><circle cx="68" cy="37" r="2"/><circle cx="78" cy="37" r="2"/><rect x="295" y="93" width="60" height="95" rx="6"/><path d="M307 112H344M307 124H337M307 156H344"/>',
    '<path d="M70 50H260V117H120L90 139V117H70ZM145 132H333V170H310V189L282 170H145"/><path d="M95 75H228M95 92H187M168 150H280"/><circle cx="325" cy="63" r="27"/><path d="m314 63 8 8 14-16"/>'
  ];
  cards.forEach((card,index) => {
    const art = document.createElement('div'); art.className = 'case-art'; art.setAttribute('aria-hidden','true');
    art.innerHTML = `<svg viewBox="0 0 410 210" fill="none" stroke="${['#00c2ff','#b6a0ff','#10b981','#00c2ff'][index]}" stroke-width="1.5">${diagrams[index]}</svg><span class="case-art-label">DIAGRAMA CONCEITUAL</span>`;
    card.prepend(art);
  });
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 801px)', () => {
      gsap.to('.hero-art', {y:100,rotation:7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.from('.manifesto-outline', {x:65,opacity:.45,scrollTrigger:{trigger:'.manifesto-section',start:'top 85%',end:'center 50%',scrub:1}});
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  
  // Spotlight Cursor Tracking
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  // Karaoke Word-by-Word Scroll Reveal
  const manifesto = document.getElementById('manifesto');
  const words = document.querySelectorAll('.karaoke-word');
  if (manifesto && words.length > 0) {
    window.addEventListener('scroll', () => {
      const rect = manifesto.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH * 0.8 && rect.bottom > 0) {
        const progress = Math.min(Math.max((winH * 0.8 - rect.top) / rect.height, 0), 1);
        const activeIdx = Math.floor(progress * words.length);
        words.forEach((w, i) => w.classList.toggle('active', i <= activeIdx));
      }
    }, { passive: true });
  }

  initConnections(reduced);
});

function initConnections(reduced) {
  const canvas = document.getElementById('connectionCanvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let w=0,h=0,raf=0,time=0,last=0,visible=true,pointerX=0,pointerY=0;
  function resize() {
    const rect=canvas.getBoundingClientRect(); w=rect.width; h=rect.height;
    const dpr=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    if (reduced.matches) draw();
  }
  // A woven toroidal field: projected geometry, no image or video downloads.
  function draw() {
    ctx.clearRect(0,0,w,h);
    const scale=Math.min(w,h)*.33;
    const centerX=w*.51+pointerX*8, centerY=h*.49+pointerY*8;
    const rotation=time*.1;
    for(let ring=0;ring<65;ring++) {
      const phase=ring/65*Math.PI*2;
      ctx.beginPath();
      for(let step=0;step<=120;step++) {
        const a=step/120*Math.PI*2;
        const tube=.29+.035*Math.sin(a*3+time*.35);
        const radius=1+tube*Math.cos(phase+a*2);
        let x=radius*Math.cos(a), y=radius*Math.sin(a), z=tube*Math.sin(phase+a*2);
        const xr=x*Math.cos(rotation)-z*Math.sin(rotation);
        const zr=x*Math.sin(rotation)+z*Math.cos(rotation);
        const yr=y*.62-zr*.78;
        const depth=y*.78+zr*.62;
        const perspective=2.9/(2.9-depth*.28);
        const px=centerX+(xr*.91-yr*.39)*scale*perspective;
        const py=centerY+(xr*.39+yr*.91)*scale*perspective;
        if(step===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
      }
      const intensity=(Math.sin(phase+time*.25)+1)/2;
      ctx.strokeStyle=`rgba(${Math.round(50+intensity*90)},${Math.round(158+intensity*80)},245,${.1+intensity*.34})`;
      if(ring%13===0)ctx.strokeStyle='rgba(130,242,255,.8)';
      ctx.lineWidth=ring%13===0?1.3:.65;ctx.stroke();
    }
    // Discrete travelling signals keep the motion readable at low density.
    for(let i=0;i<13;i++) {
      const angle=i*2.399+time*.11;
      const radius=scale*(1.25+(i%3)*.12);
      const x=centerX+Math.cos(angle)*radius, y=centerY+Math.sin(angle)*radius*.7;
      ctx.fillStyle=i%3===0?'#c6faff':'#4ca9c9';ctx.beginPath();ctx.arc(x,y,i%3===0?2:1,0,Math.PI*2);ctx.fill();
    }
  }
  function frame(stamp) {
    raf=0;
    if(!visible||document.hidden||reduced.matches)return;
    if(stamp-last>32){time+=Math.min((stamp-last)/1000,.06);last=stamp;draw();}
    raf=requestAnimationFrame(frame);
  }
  function sync(){cancelAnimationFrame(raf);raf=0;if(reduced.matches)draw();else if(visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  document.querySelector('.hero').addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){const r=canvas.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;}},{passive:true});
  resize();draw();sync();
}
