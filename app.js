// ============================================================
// РУЛЕТКА НАПИТКОВ v11 «Duo Edition» + SVG-иконки
// ============================================================
const LIGHT = 6;

// ============================================================
// SVG-ХЕЛПЕРЫ (используют Icons из icons.js)
// ============================================================
function svgIcon(name, size) {
  return (window.Icons && Icons.icon) ? Icons.icon(name, '', size || '1em') : '';
}
function emojiToSvg(e, size) {
  if (!e) return '';
  const id = window.Icons && Icons.EMOJI_MAP && Icons.EMOJI_MAP[e];
  if (id) return Icons.icon(id, '', size || '1em');
  return e;
}
function drinkEmoji(d, size) {
  if (!d) return '';
  return emojiToSvg(d.emoji, size) || '🍹';
}
function catEmoji(c, size) {
  if (!c) return '';
  return emojiToSvg(c.emoji, size);
}
function achEmoji(a, size) {
  if (!a) return '';
  return emojiToSvg(a.emoji, size);
}
function levelEmoji(lvl, size) {
  if (!lvl) return '';
  return emojiToSvg(lvl.emoji, size);
}

// CATS, DRINKS, THEMES из drinks.js

const ACHS = [
  {id:'first',name:'Первый спин',desc:'1 вращение',emoji:'🎉',c:{t:'spins',n:1}},
  {id:'first-shot',name:'Первый шот',desc:'Любой шот',emoji:'🥃',c:{t:'cat',id:'shots',n:1}},
  {id:'all-beer',name:'Пиво-мастер',desc:'Всё пиво',emoji:'🍺',c:{t:'allCat',id:'beer'}},
  {id:'all-cocktail',name:'Бармен',desc:'Все коктейли',emoji:'🍸',c:{t:'allCat',id:'cocktail'}},
  {id:'ten',name:'Десятка',desc:'10 вращений',emoji:'🔟',c:{t:'spins',n:10}},
  {id:'fifty',name:'Полтинник',desc:'50 вращений',emoji:'🏅',c:{t:'spins',n:50}},
  {id:'variety',name:'Разнообразие',desc:'10 разных',emoji:'🌈',c:{t:'uniq',n:10}},
  {id:'strong',name:'Крепкий орешек',desc:'3 крепче 35%',emoji:'💪',c:{t:'strong',n:3}},
  {id:'streak3',name:'Три дня',desc:'Стрик 3 дня',emoji:'🔥',c:{t:'streak',n:3}},
  {id:'streak7',name:'Неделя',desc:'Стрик 7 дней',emoji:'🗓',c:{t:'streak',n:7}},
  {id:'quest',name:'Квестер',desc:'Выполни квест дня',emoji:'🎯',c:{t:'quests',n:1}},
  {id:'guess',name:'Ясновидец',desc:'Угадай крепость',emoji:'🔮',c:{t:'guesses',n:1}},
];

const LEVELS = [
  {min:0,   title:'Новичок',      emoji:'🍼'},
  {min:10,  title:'Дегустатор',   emoji:'🍷'},
  {min:25,  title:'Знаток',       emoji:'🧐'},
  {min:50,  title:'Бармен',       emoji:'🍸'},
  {min:100, title:'Мастер',       emoji:'🏆'},
  {min:200, title:'Легенда',      emoji:'👑'},
];
function getLevel(spins){
  let idx=0;
  for(let i=0;i<LEVELS.length;i++){if(spins>=LEVELS[i].min)idx=i;}
  const cur=LEVELS[idx];
  const next=LEVELS[idx+1]||null;
  return {idx:idx+1,cur,next};
}

// ===== СТЕЙТ =====
const KEY='drink-roulette-v11';
const def=()=>({
  s:{
    onboarded:false, mode:'both', tick:true, res:true, vib:true,
    maxAbv:60, light:false, water:3, exCat:[],
    ambient:false, tilt:true, theme:'dark', viewMode:'reels',
  },
  bar:{avail:[], only:false, custom:[]},
  col:{opened:[], ach:{}, seenAch:{}},
  hist:[], log:{},
  theme:null, totals:{spins:0, quests:0, guesses:0},
  streak:{days:0, lastClaim:null, claimedToday:false},
  daily:{ date:null, questId:null, progress:0, done:false, claimed:false },
  rerolls:3, rerollsDate:null,
  v:11,
});
let S=def();

function load(){try{const r=localStorage.getItem(KEY);if(r){const p=JSON.parse(r);if(p&&typeof p==='object')S=merge(def(),p)}}catch(e){console.warn(e);S=def()}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function merge(b,p){if(Array.isArray(b))return Array.isArray(p)?p:b;if(typeof b!=='object'||b===null)return p!==undefined?p:b;const o={...b};for(const k in p||{})o[k]=merge(b[k],p[k]);return o}

// ===== УТИЛ =====
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function rnd(m){if(m<=0)return 0;try{const b=new Uint32Array(1);crypto.getRandomValues(b);return b[0]%m}catch{return Math.floor(Math.random()*m)}}
function all(){return DRINKS.concat(S.bar.custom||[])}
function cat(id){return CATS.find(c=>c.id===id)}
function drink(id){return all().find(d=>d.id===id)}
function beer(d){return((d.abv||0)*500)/(4.5*500)}
function today(){const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function daysBetween(a,b){const d1=new Date(a),d2=new Date(b);return Math.round((d2-d1)/(1000*60*60*24))}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function vib(p=15){if(S.s.vib&&navigator.vibrate)navigator.vibrate(p)}
function plural(n,a,b,c){const m=n%100;if(m>=11&&m<=14)return c;const k=n%10;if(k===1)return a;if(k>=2&&k<=4)return b;return c}

// ===== ЗВУК =====
let ac, ambientNode=null;
function audio(){try{if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac}catch{return null}}
function tick(){if(!S.s.tick)return;const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.frequency.value=900;g.gain.value=.03;o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.02)}
function fan(){if(!S.s.res)return;const a=audio();if(!a)return;[523,659,784].forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g).connect(a.destination);const t=a.currentTime+i*.08;o.start(t);o.stop(t+.12)})}
function pop(){const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.frequency.value=300;g.gain.value=.06;o.connect(g).connect(a.destination);o.start();o.frequency.exponentialRampToValueAtTime(600,a.currentTime+.08);o.stop(a.currentTime+.1)}
function click(){const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.frequency.value=1200;g.gain.value=.02;o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.03)}
function startAmbient(){
  const a=audio();if(!a||ambientNode)return;
  try{
    const bufSize=a.sampleRate*2;
    const buf=a.createBuffer(1,bufSize,a.sampleRate);
    const data=buf.getChannelData(0);
    for(let i=0;i<bufSize;i++)data[i]=(Math.random()*2-1)*0.02;
    const src=a.createBufferSource();src.buffer=buf;src.loop=true;
    const filt=a.createBiquadFilter();filt.type='lowpass';filt.frequency.value=400;
    const g=a.createGain();g.gain.value=.08;
    src.connect(filt).connect(g).connect(a.destination);
    src.start();
    ambientNode={src,g};
  }catch{}
}
function stopAmbient(){if(ambientNode){try{ambientNode.src.stop()}catch{};ambientNode=null}}

// ===== ПУЛ =====
function pool(){
  let p=all();
  if(S.s.mode==='non-alcohol')p=p.filter(d=>d.abv===0);
  if(S.s.mode==='alcohol')p=p.filter(d=>d.abv>0);
  if(S.bar.only){
    const av=new Set(S.bar.avail);
    const customs=new Set((S.bar.custom||[]).map(d=>d.id));
    if(av.size||customs.size)p=p.filter(d=>av.has(d.id)||customs.has(d.id));
  }
  if(S.s.light)p=p.filter(d=>d.abv<=LIGHT);
  if(S.s.maxAbv<60)p=p.filter(d=>d.abv<=S.s.maxAbv);
  const ex=S.s.exCat||[];if(ex.length)p=p.filter(d=>!ex.includes(d.cat));
  if(S.theme){const t=THEMES.find(x=>x.id===S.theme);if(t){const st=new Set(t.ids);p=p.filter(d=>st.has(d.id))}}
  return p;
}

function activeFilters(){
  const s=S.s;
  return !!(s.light||s.maxAbv<60||(s.exCat&&s.exCat.length)||S.theme||(S.bar.only&&(S.bar.avail.length||(S.bar.custom||[]).length)));
}
function refreshBadge(){const dot=$('#filters-dot');if(dot)dot.hidden=!activeFilters()}

// ============================================================
// СЛОТ-МАШИНА
// ============================================================
const REELS=[
  document.getElementById('reel-0'),
  document.getElementById('reel-1'),
  document.getElementById('reel-2'),
];
const CELL_H=94;
const CENTER_INDEX=2;

let secs=[];
let spinning=false;
let reelPos=[0,0,0];
const reelCells=[[],[],[]];
let reelN=0;
const lastBase=[NaN,NaN,NaN];

function buildReels(){
  reelN=secs.length;
  for(let r=0;r<3;r++){
    const el=REELS[r];if(!el)continue;
    el.innerHTML='';reelCells[r]=[];
    for(let k=0;k<5;k++){
      const cell=document.createElement('div');
      cell.className='reel-cell';
      cell.innerHTML='<div class="rc-emoji"></div><div class="rc-name"></div><div class="rc-abv"></div>';
      el.appendChild(cell);reelCells[r].push(cell);
    }
  }
  lastBase[0]=lastBase[1]=lastBase[2]=NaN;
  paintReels(true);
}

// ВАЖНО: во время анимации используем эмодзи (textContent) — innerHTML каждый кадр тормозит.
// SVG-иконка ставится только при статичной отрисовке (force=true), когда базовый индекс меняется.
function paintReels(force){
  if(!reelN)return;
  const win=document.querySelector('#reel-stage .reel-window');
  const H=win?win.clientHeight:0;
  for(let r=0;r<3;r++){
    const el=REELS[r];if(!el)continue;
    const center=reelPos[r];
    const base=Math.floor(center);
    if(force||base!==lastBase[r]){
      for(let k=0;k<5;k++){
        const idx=((base-CENTER_INDEX+k)%reelN+reelN)%reelN;
        const sec=secs[idx];
        const cell=reelCells[r][k];if(!cell)continue;
        const emojiEl=cell.querySelector('.rc-emoji');
        // эмодзи быстрее; SVG красивее — используем SVG, но только при статике.
        // Во время спина (spinning=true) — textContent.
        if(spinning){
          emojiEl.textContent=sec?(sec.emoji||'🍹'):'';
        }else{
          emojiEl.innerHTML=sec?(sec.data?drinkEmoji(sec.data,'28px'):emojiToSvg(sec.emoji,'28px')):'';
        }
        cell.querySelector('.rc-name').textContent=sec?sec.label:'';
        cell.querySelector('.rc-abv').textContent=(sec&&sec.data&&sec.data.abv!=null)?sec.data.abv+'%':'';
      }
      lastBase[r]=base;
    }
    const frac=center-base;
    const cellCenterY=CENTER_INDEX*CELL_H+42+frac*CELL_H;
    const offset=H/2-cellCenterY;
    el.style.transform=`translate3d(0,${offset}px,0)`;
  }
}

function catSecs(){
  const p=pool();
  const ids=[...new Set(p.map(d=>d.cat))];
  return ids.map(id=>{const c=cat(id);return{label:c.name,emoji:c.emoji,color:c.color,data:c}});
}
function drSecs(cid){
  return pool().filter(d=>d.cat===cid).map(d=>{const c=cat(d.cat);return{label:d.name,emoji:d.emoji,color:c.color,data:d}});
}
function setTitle(text){const el=$('#wt-text');if(el)el.textContent=text||'Крути и узнай'}

function spinReel(reelIdx,targetIndex,duration,onDone){
  const el=REELS[reelIdx];
  const n=secs.length;
  if(!n||!el){onDone&&onDone();return;}
  const from=reelPos[reelIdx];
  const target=targetIndex;
  const turns=3+rnd(2);
  const finalPos=target+Math.ceil((from+turns*n-target)/n)*n;
  const t0=performance.now();
  let lastTickIdx=Math.floor(from);
  function frame(t){
    const p=Math.min((t-t0)/duration,1);
    const e=1-Math.pow(1-p,3);
    reelPos[reelIdx]=from+(finalPos-from)*e;
    paintReels(false);
    const curIdx=Math.floor(reelPos[reelIdx]);
    if(curIdx!==lastTickIdx){tick();vib(4);lastTickIdx=curIdx;}
    if(p<1){requestAnimationFrame(frame);}
    else{
      reelPos[reelIdx]=target;
      paintReels(false);
      requestAnimationFrame(()=>{paintReels(false);onDone&&onDone();});
    }
  }
  requestAnimationFrame(frame);
}

function markReelCells(state){
  for(let r=0;r<3;r++){
    const cell=reelCells[r]&&reelCells[r][CENTER_INDEX];
    if(!cell)continue;
    cell.classList.remove('win','lose');
    if(state==='win')cell.classList.add('win');
    if(state==='lose')cell.classList.add('lose');
  }
}
function clearReelResult(){
  for(let r=0;r<3;r++)(reelCells[r]||[]).forEach(c=>c.classList.remove('win','lose'));
  const banner=$('#reel-banner');
  if(banner){banner.hidden=true;banner.textContent='';banner.className='reel-banner';}
}

function spinReelsAnim(done){
  if(!secs.length){toast('Пусто — ослабь фильтры');return;}
  spinning=true;
  const btn=document.getElementById('spin-btn');
  btn.disabled=true;
  clearReelResult();
  const n=secs.length;
  if(n===1){
    spinning=false;btn.disabled=false;
    done({win:true,sec:secs[0]});
    return;
  }
  const isWin=Math.random()<0.5;
  const winIdx=rnd(n);
  const idxs=[];
  if(isWin){idxs.push(winIdx,winIdx,winIdx);}
  else{
    const used=new Set();
    while(idxs.length<3){const v=rnd(n);if(used.has(v))continue;idxs.push(v);used.add(v);}
  }
  let doneCount=0;
  const durs=[2100,2600,2300];
  const delays=[0,180,90];
  for(let r=0;r<3;r++){
    setTimeout(()=>{
      spinReel(r,idxs[r],durs[r],()=>{
        doneCount++;
        if(doneCount===3){
          spinning=false;btn.disabled=false;
          const c0=idxs[0],c1=idxs[1],c2=idxs[2];
          const realWin=(c0===c1&&c1===c2);
          if(realWin){
            markReelCells('win');
            fan();vib([30,50,30]);confetti();
            showReelBanner('🎉 ВЫИГРАЛ!','win');
            const sec=secs[c1];
            setTimeout(()=>done({win:true,sec}),650);
          }else{
            markReelCells('lose');
            vib([15,30,15]);
            showReelBanner('Почти… крути ещё!','lose');
            setTimeout(()=>done({win:false,sec:null}),650);
          }
        }
      });
    },delays[r]);
  }
}

function showReelBanner(text,kind){
  const b=$('#reel-banner');if(!b)return;
  b.textContent=text;b.className='reel-banner '+kind;b.hidden=false;
}

// ============================================================
// КОЛЕСО ФОРТУНЫ
// ============================================================
let fortuneAngle=0;
let fortuneSpinning=false;
function drawFortune(){
  const cv=$('#fortune-canvas');
  if(!cv)return;
  const g=cv.getContext('2d');
  const W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-10;
  g.clearRect(0,0,W,H);
  if(!secs.length){
    g.fillStyle='#22222e';g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.fill();
    return;
  }
  const n=secs.length;
  const seg=Math.PI*2/n;
  const palette=['#58cc02','#1cb0f6','#ffc800','#ff9600','#ce82ff','#ff4b4b','#89e219','#49c0f8','#ffdb4d','#e91e63'];
  for(let i=0;i<n;i++){
    const a0=i*seg,a1=(i+1)*seg;
    g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,a0,a1);g.closePath();
    g.fillStyle=palette[i%palette.length];
    g.fill();
    g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=2;g.stroke();
    g.save();g.translate(cx,cy);g.rotate(a0+seg/2);
    g.textAlign='right';g.fillStyle='#fff';g.font='900 13px system-ui';
    const label=secs[i].label.length>12?secs[i].label.slice(0,11)+'…':secs[i].label;
    g.fillText(secs[i].emoji+' '+label,R-14,5);
    g.restore();
  }
}

function spinFortuneAnim(done){
  if(!secs.length){toast('Пусто — ослабь фильтры');return;}
  if(fortuneSpinning)return;
  fortuneSpinning=true;spinning=true;
  const btn=$('#spin-btn');btn.disabled=true;
  const n=secs.length;
  const targetIdx=rnd(n);
  const seg=360/n;
  const targetAngle=360*5+(360-(targetIdx*seg+seg/2));
  const cv=$('#fortune-canvas');
  const start=fortuneAngle;
  const t0=performance.now();
  const dur=4000;
  function frame(t){
    const p=Math.min((t-t0)/dur,1);
    const e=1-Math.pow(1-p,3);
    fortuneAngle=start+(targetAngle-start)*e;
    cv.style.transform=`rotate(${fortuneAngle}deg)`;
    if(p<1)requestAnimationFrame(frame);
    else{
      fortuneSpinning=false;spinning=false;btn.disabled=false;
      fortuneAngle=targetAngle%360;
      fan();vib([30,50,30]);confetti();
      done({win:true,sec:secs[targetIdx]});
    }
  }
  requestAnimationFrame(frame);
}

// ============================================================
// КАРУСЕЛЬ
// ============================================================
const CAROUSEL_H = 96;
const CAROUSEL_VISIBLE = 5;
const CAROUSEL_FADE = 2.6;

let carouselPos = 0;
let carouselSpinning = false;
let carouselItems = [];

function buildCarousel(){
  const track = $('#carousel-track');
  if(!track) return;
  track.innerHTML = '';
  carouselItems = [];
  if(!secs.length) return;

  const poolSize = Math.min(CAROUSEL_VISIBLE * 2 + 2, Math.max(secs.length, CAROUSEL_VISIBLE * 2 + 2));
  for(let i = 0; i < poolSize; i++){
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
      <div class="ci-emoji"></div>
      <div class="ci-body">
        <div class="ci-name"></div>
        <div class="ci-abv"></div>
      </div>`;
    track.appendChild(item);
    carouselItems.push(item);
  }
  carouselPos = 0;
  paintCarousel();
}

function paintCarousel(){
  if(!carouselItems.length || !secs.length) return;
  const track = $('#carousel-track');
  if(!track) return;
  const H = track.parentElement.clientHeight;
  const centerY = H / 2;
  const N = secs.length;
  const poolN = carouselItems.length;

  const base = Math.floor(carouselPos);

  for(let k = 0; k < poolN; k++){
    const half = Math.floor(poolN / 2);
    const virtualIdx = base + (k - half);
    const realIdx = ((virtualIdx % N) + N) % N;
    const sec = secs[realIdx];

    const dy = (virtualIdx - carouselPos) * CAROUSEL_H;
    const absDy = Math.abs(dy);

    if(absDy > CAROUSEL_H * CAROUSEL_FADE * 1.5){
      carouselItems[k].style.opacity = '0';
      carouselItems[k].style.pointerEvents = 'none';
      continue;
    }

    const fade = Math.max(0, 1 - absDy / (CAROUSEL_H * CAROUSEL_FADE));
    const opacity = Math.pow(fade, 1.4);
    const scale = 0.55 + 0.45 * fade;
    const rotateX = Math.max(-65, Math.min(65, (-dy / H) * 80));

    const el = carouselItems[k];
    el.style.transform = `translate(-50%, ${centerY + dy}px) translateY(-50%) scale(${scale}) rotateX(${rotateX}deg)`;
    el.style.opacity = String(opacity);
    el.style.zIndex = String(1000 - Math.round(absDy));
    el.style.pointerEvents = 'none';

    const emojiEl = el.querySelector('.ci-emoji');
    const nameEl = el.querySelector('.ci-name');
    const abvEl = el.querySelector('.ci-abv');
    // Во время спина — эмодзи; в статике — SVG
    if(carouselSpinning){
      const txt = sec.emoji || '🍹';
      if(emojiEl.dataset.state !== 'e' || emojiEl.textContent !== txt){
        emojiEl.textContent = txt;
        emojiEl.dataset.state = 'e';
      }
    } else {
      if(emojiEl.dataset.state !== 's'){
        emojiEl.innerHTML = sec.data ? drinkEmoji(sec.data,'32px') : emojiToSvg(sec.emoji,'32px');
        emojiEl.dataset.state = 's';
      }
    }
    if(nameEl.textContent !== sec.label) nameEl.textContent = sec.label;
    const abvText = (sec.data && sec.data.abv != null) ? sec.data.abv + '%' : '';
    if(abvEl.textContent !== abvText) abvEl.textContent = abvText;

    const isCenter = Math.abs(dy) < CAROUSEL_H / 2;
    el.classList.toggle('center', isCenter);
  }
}

function spinCarouselAnim(done){
  if(!secs.length){ toast('Пусто — ослабь фильтры'); return; }
  if(carouselSpinning) return;
  carouselSpinning = true;
  spinning = true;
  const btn = $('#spin-btn');
  btn.disabled = true;
  const banner = $('#carousel-banner');
  if(banner){ banner.hidden = true; banner.textContent = ''; }

  const N = secs.length;
  const targetIdx = rnd(N);

  const turns = 3 + rnd(2);
  let finalPos = targetIdx + turns * N;
  while(finalPos < carouselPos + 2 * N) finalPos += N;

  const start = carouselPos;
  const dist = finalPos - start;
  const dur = 2600 + Math.min(1400, dist * 60);
  const t0 = performance.now();
  let lastTick = Math.floor(start);

  function frame(t){
    const p = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    carouselPos = start + dist * e;
    paintCarousel();

    const curTick = Math.floor(carouselPos);
    if(curTick !== lastTick){ tick(); vib(3); lastTick = curTick; }

    if(p < 1){
      requestAnimationFrame(frame);
    } else {
      carouselPos = finalPos;
      carouselSpinning = false;
      spinning = false;
      // Перерисовать статично — теперь SVG
      for(const el of carouselItems){ el.querySelector('.ci-emoji').dataset.state = ''; }
      paintCarousel();
      btn.disabled = false;

      const sec = secs[targetIdx];
      fan(); vib([30,50,30]); confetti();
      if(banner){
        banner.innerHTML = '🎉 ' + esc(sec.label);
        banner.className = 'carousel-banner win';
        banner.hidden = false;
      }
      setTimeout(() => done({ win: true, sec }), 700);
    }
  }
  requestAnimationFrame(frame);
}

// ============================================================
// ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМОВ
// ============================================================
function showView(view){
  const panels={
    reels:$('#reel-stage'),
    wheel:$('#fortune-stage'),
    carousel:$('#carousel-stage'),
  };
  Object.entries(panels).forEach(([k,el])=>{
    if(el)el.hidden=(k!==view);
  });
  if(view==='wheel')setTimeout(drawFortune,50);
  if(view==='carousel')setTimeout(()=>{buildCarousel();paintCarousel();},50);
  if(view==='reels')setTimeout(()=>paintReels(true),50);
}

// ===== РЕЖИМ КОЛЕСА =====
let wMode='all';
let barQuery='';
$('#wheel-mode').addEventListener('click',e=>{
  const b=e.target.closest('.duo-seg-btn');if(!b||spinning)return;
  wMode=b.dataset.wm;
  $('#wheel-mode').querySelectorAll('.duo-seg-btn').forEach(x=>x.classList.toggle('active',x===b));
  reset();
});
$('#view-mode').addEventListener('click',e=>{
  const b=e.target.closest('.duo-seg-btn');if(!b||spinning)return;
  S.s.viewMode=b.dataset.vm;save();
  $('#view-mode').querySelectorAll('.duo-seg-btn').forEach(x=>x.classList.toggle('active',x===b));
  showView(S.s.viewMode);
  reset();
  click();
});

function setWheel(arr,titleText){
  secs=(arr||[]).slice();
  setTitle(titleText);
  const n=secs.length;
  reelPos=n?[0,Math.floor(n/3),Math.floor((2*n)/3)]:[0,0,0];
  buildReels();
  clearReelResult();
  if(S.s.viewMode==='wheel')drawFortune();
  if(S.s.viewMode==='carousel'){buildCarousel();paintCarousel();}
}

function reset(){
  if(wMode==='all'){
    setWheel(pool().map(d=>{const c=cat(d.cat);return{label:d.name,emoji:d.emoji,color:c.color,data:d}}),'Крути и узнай');
  }else{
    setWheel(catSecs(),'🎯 Выбери категорию');
  }
}

$('#spin-btn').addEventListener('click',()=>{
  if(spinning)return;
  if(!secs.length){toast('Ослабь фильтры');return}
  mugReaction('spin');

  const handleResult=(res)=>{
    if(wMode==='all'){
      if(res.win)finish(res.sec.data,null);
    }else{
      if(res.win){
        const c=res.sec.data;
        setTimeout(()=>{
          const dr=drSecs(c.id);
          if(!dr.length){toast('Пусто в категории');reset();return}
          setWheel(dr,`${c.name} — выбери напиток`);
          setTimeout(()=>{
            spinAgain(handleResult);
          },200);
        },300);
      }
    }
  };

  spinAgain(handleResult);
});

function spinAgain(cb){
  if(S.s.viewMode==='wheel')spinFortuneAnim(cb);
  else if(S.s.viewMode==='carousel')spinCarouselAnim(cb);
  else spinReelsAnim(cb);
}

// ===== РЕЗУЛЬТАТ =====
let pending=null;

function finish(d,c){
  pending={drink:d,cat:c};
  $('#result-emoji').innerHTML=drinkEmoji(d,'72px');
  $('#result-name').textContent=d.name;
  const cc=c||cat(d.cat);
  $('#result-info').textContent=`${cc.name} · ${d.abv}% · ≈${beer(d).toFixed(1)} пива`;
  const parts=[];
  if(d.snack)parts.push(`<b>Закуска:</b> ${esc(d.snack)}`);
  if(d.ing?.length)parts.push(`<b>Состав:</b> ${d.ing.map(esc).join(', ')}`);
  if(d.recipe)parts.push(`<b>Рецепт:</b> ${esc(d.recipe)}`);
  if(d.cal!=null)parts.push(`<b>Калории:</b> ≈${d.cal} ккал`);
  $('#result-extra').innerHTML=parts.join('<br>')||'<span class="muted">Нет деталей</span>';
  $('#result').hidden=false;
  $('#repeat-btn').hidden=false;
  mugReaction('glow');
  if(Math.random()<0.4)setTimeout(()=>openGuess(d),800);
}

$('#again-btn').onclick=()=>{$('#result').hidden=true;pending=null;if(wMode==='category')reset();setTimeout(()=>$('#spin-btn').click(),50)};
$('#accept-btn').onclick=()=>{if(pending)commit(pending);$('#result').hidden=true;pending=null;if(wMode==='category')reset()};
$('#share-btn').onclick=()=>pending&&shareImage(pending);

$('#repeat-btn').onclick=()=>{
  if(S.hist[0]){
    const d=drink(S.hist[0].did);
    if(d)finish(d,S.hist[0].cid?cat(S.hist[0].cid):null);
  }
};

function commit({drink:d,cat:c}){
  const e={id:'s_'+Date.now(),ts:Date.now(),wMode,cid:c?c.id:d.cat,did:d.id,dname:d.name};
  S.hist.unshift(e);if(S.hist.length>500)S.hist.length=500;
  S.totals.spins=(S.totals.spins||0)+1;
  if(!S.col.opened.includes(d.id))S.col.opened.push(d.id);
  const k=today();if(!S.log[k])S.log[k]={count:0,wr:false};S.log[k].count++;
  checkAch();
  updateQuest('drink',d);
  updateDailyStreak();
  if(S.s.water>0&&S.log[k].count>=S.s.water&&!S.log[k].wr){S.log[k].wr=true;toast('💧 Может, воды?')}
  save();refreshBadge();
  renderDuoHeader();
}

// ===== АЧИВКИ =====
function checkAch(){
  for(const a of ACHS){
    if(S.col.ach[a.id])continue;
    if(met(a)){
      S.col.ach[a.id]=Date.now();
      if(!S.col.seenAch[a.id]){
        toast(`🏆 ${a.name}`);
        confetti(0.4);
        pop();
      }
    }
  }
  save();
}
function met(a){
  const c=a.c;
  if(c.t==='spins')return(S.totals.spins||0)>=c.n;
  if(c.t==='uniq')return S.col.opened.length>=c.n;
  if(c.t==='cat'){const ids=all().filter(d=>d.cat===c.id).map(d=>d.id);return ids.filter(x=>S.col.opened.includes(x)).length>=c.n}
  if(c.t==='allCat'){const ids=all().filter(d=>d.cat===c.id).map(d=>d.id);return ids.length>0&&ids.every(x=>S.col.opened.includes(x))}
  if(c.t==='strong')return S.col.opened.map(drink).filter(Boolean).filter(d=>d.abv>=35).length>=c.n;
  if(c.t==='streak')return(S.streak.days||0)>=c.n;
  if(c.t==='quests')return(S.totals.quests||0)>=c.n;
  if(c.t==='guesses')return(S.totals.guesses||0)>=c.n;
  return false;
}

// ============================================================
// ШЕРИНГ КАРТИНКОЙ (canvas — эмодзи оставляем, SVG в canvas не рендерим)
// ============================================================
async function shareImage({drink:d,cat:c}){
  const cc=c||cat(d.cat);
  const cv=document.createElement('canvas');
  cv.width=900;cv.height=1200;
  const g=cv.getContext('2d');
  const bg=g.createLinearGradient(0,0,900,1200);
  bg.addColorStop(0,'#58cc02');bg.addColorStop(1,'#1cb0f6');
  g.fillStyle=bg;g.fillRect(0,0,900,1200);
  const glow=g.createRadialGradient(450,500,100,450,500,700);
  glow.addColorStop(0,'rgba(255,255,255,.3)');glow.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=glow;g.fillRect(0,0,900,1200);
  g.textAlign='center';
  g.font='260px system-ui, "Apple Color Emoji", "Segoe UI Emoji"';
  g.fillText(d.emoji||'🍹',450,480);
  g.fillStyle='#fff';g.font='900 72px system-ui, sans-serif';
  g.fillText(d.name,450,650);
  g.font='700 40px system-ui, sans-serif';
  g.fillText(`${cc.name} · ${d.abv}% · ≈${beer(d).toFixed(1)} пива`,450,720);
  g.font='900 36px system-ui, sans-serif';
  g.fillText('Рулетка напитков',450,1080);
  const blob=await new Promise(r=>cv.toBlob(r,'image/png'));
  if(navigator.share&&navigator.canShare){
    const file=new File([blob],'drink.png',{type:'image/png'});
    if(navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:d.name});return}catch{}
    }
  }
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`drink-${d.id}.png`;
  a.click();
  toast('Картинка сохранена 📸');
}

// ============================================================
// МОДАЛКИ
// ============================================================
function openModal(){$('#modal').hidden=false}
function closeModal(){$('#modal').hidden=true}
$('#modal-close').onclick=closeModal;
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal()});
['#settings','#result','#guess-modal'].forEach(sel=>{
  const el=$(sel);
  if(el)el.addEventListener('click',e=>{if(e.target===el)el.hidden=true;});
});

// ============================================================
// НАВИГАЦИЯ
// ============================================================
function showScreen(id){
  const screens=['onboard','main','bar-screen','collection-screen','profile-screen'];
  screens.forEach(s=>{const el=document.getElementById(s);if(el)el.hidden=(s!==id)});
  $$('#tabbar .tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===id));
  window.scrollTo(0,0);
  if(id==='main'){
    setTimeout(()=>{
      refreshBadge();
      showView(S.s.viewMode||'reels');
      reset();
      renderDaily();
      renderDuoHeader();
    },30);
  }
  if(id==='bar-screen')renderBar();
  if(id==='collection-screen'){renderCollection();renderAchBadges()}
  if(id==='profile-screen')renderProfile();
  click();
}
$('#tabbar').addEventListener('click',e=>{
  const b=e.target.closest('.tab');if(!b)return;
  e.preventDefault();
  mugReaction('spin');
  showScreen(b.dataset.tab);
});

// ============================================================
// DUOLINGO-ШАПКА
// ============================================================
function renderDuoHeader(){
  const spins=S.totals.spins||0;
  const lvl=getLevel(spins);
  const sub=$('#duo-subtitle');
  if(sub)sub.textContent=`Уровень ${lvl.idx} · ${lvl.cur.title}`;
  const st=$('#duo-streak');if(st)st.textContent=S.streak.days||0;
  const rr=$('#duo-rerolls');if(rr)rr.textContent=S.rerolls||0;
  const sp=$('#duo-spins');if(sp)sp.textContent=spins;
  const fill=$('#duo-xp-fill');
  if(fill){
    if(lvl.next){
      const range=lvl.next.min-lvl.cur.min;
      const done=spins-lvl.cur.min;
      fill.style.width=Math.min(100,Math.round(done/range*100))+'%';
    }else fill.style.width='100%';
  }
}

// ============================================================
// БАР
// ============================================================
$('#open-bar').onclick=()=>showScreen('bar-screen');
$('#bar-only-toggle').onchange=e=>{S.bar.only=e.target.checked;save();refreshBadge();reset()};
$('#bar-search').addEventListener('input',e=>{
  barQuery=e.target.value.trim().toLowerCase();
  $('#bar-search-clear').hidden=!barQuery;
  renderBar();
});
$('#bar-search-clear').addEventListener('click',()=>{
  barQuery='';$('#bar-search').value='';$('#bar-search-clear').hidden=true;renderBar();
});

(function(){
  const sel=$('#cc');
  if(sel)sel.innerHTML=CATS.map(c=>`<option value="${c.id}">${emojiToSvg(c.emoji,'16px')} ${c.name}</option>`).join('');
})();

$('#add-custom-btn').onclick=()=>{
  const n=$('#cn').value.trim();
  const e=$('#ce').value.trim()||'🍹';
  const c=$('#cc').value;
  const a=Number($('#ca').value)||0;
  if(!n){toast('Введи название');return}
  const d={id:'custom_'+Date.now(),cat:c,name:n,emoji:e,abv:a,src:'custom',ing:[],recipe:null,snack:null,cal:null};
  S.bar.custom.push(d);S.bar.avail.push(d.id);save();
  $('#cn').value='';$('#ce').value='';$('#ca').value='';
  renderBar();reset();toast('✅ Добавлено: '+n);vib([20,30,20]);
};

const openCats=new Set();

function renderBar(){
  const el=$('#bar-list');if(!el)return;
  const q=barQuery;
  const match=d=>!q||d.name.toLowerCase().includes(q)||(d.emoji&&d.emoji.includes(q));
  const by={};
  all().forEach(d=>{if(!match(d))return;(by[d.cat]=by[d.cat]||[]).push(d)});
  if(!Object.keys(by).length){
    el.innerHTML=q?`<div class="empty">Ничего не найдено по «${esc(q)}»</div>`:'<div class="empty">Бар пуст</div>';
    return;
  }
  const forceOpen=!!q;
  el.innerHTML=CATS.map(c=>{
    const l=by[c.id]||[];if(!l.length)return '';
    const isOpen=forceOpen||openCats.has(c.id);
    const items=l.map(d=>`<div class="bar-item">
      <input type="checkbox" data-id="${d.id}" ${S.bar.avail.includes(d.id)?'checked':''}>
      <div class="grow">
        <div class="title">${drinkEmoji(d,'20px')} ${esc(d.name)} ${d.src==='custom'?'<span class="sub" style="display:inline">свой</span>':''}</div>
        <div class="sub">${d.abv}%</div>
      </div>
      ${d.src==='custom'?`<button class="duo-icon-btn" data-del="${d.id}">${svgIcon('trash','16px')}</button>`:''}
    </div>`).join('');
    return `<div class="bar-group ${isOpen?'open':''}" data-cat="${c.id}">
      <div class="bar-group-head" data-toggle="${c.id}">
        <div class="bar-group-emoji">${catEmoji(c,'22px')}</div>
        <div class="bar-group-name">${c.name}</div>
        <div class="bar-group-count">${l.length}</div>
        <div class="bar-group-arrow">▼</div>
      </div>
      <div class="bar-group-body"><div class="bar-group-inner">${items}</div></div>
    </div>`;
  }).join('');
  if(q){
    el.querySelectorAll('.bar-item .title').forEach(t=>{
      const html=t.innerHTML;
      const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'ig');
      t.innerHTML=html.replace(re,'<mark style="background:rgba(28,176,246,.25);color:inherit;border-radius:3px;padding:0 2px">$1</mark>');
    });
  }
  el.querySelectorAll('[data-toggle]').forEach(h=>{
    h.onclick=()=>{
      const cid=h.dataset.toggle;
      const group=h.closest('.bar-group');
      if(group.classList.contains('open')){group.classList.remove('open');openCats.delete(cid)}
      else{group.classList.add('open');openCats.add(cid)}
      click();
    };
  });
  el.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.onchange=()=>{
    const id=cb.dataset.id;
    if(cb.checked){if(!S.bar.avail.includes(id))S.bar.avail.push(id)}
    else S.bar.avail=S.bar.avail.filter(x=>x!==id);
    save();refreshBadge();reset();
  });
  el.querySelectorAll('[data-del]').forEach(b=>b.onclick=e=>{
    e.preventDefault();e.stopPropagation();
    const id=b.dataset.del;
    S.bar.custom=S.bar.custom.filter(d=>d.id!==id);
    S.bar.avail=S.bar.avail.filter(x=>x!==id);
    save();renderBar();reset();
  });
}

// ============================================================
// ФИЛЬТРЫ
// ============================================================
$('#open-filters').onclick=()=>{
  const b=$('#modal-body');
  b.innerHTML=`<h3>Фильтры</h3>
    <label class="duo-switch-row"><span>Только лёгкое (≤6%)</span><input type="checkbox" id="fol" class="duo-switch" ${S.s.light?'checked':''}></label>
    <label class="duo-field">Макс. крепость: <input type="range" id="fma" min="0" max="60" value="${S.s.maxAbv}"><span id="fmav">${S.s.maxAbv}%</span></label>
    <div class="section-title" style="margin-top:12px">Исключить</div>
    <div class="list" style="max-width:none">${CATS.map(c=>`<label class="list-item"><input type="checkbox" data-fc="${c.id}" ${(S.s.exCat||[]).includes(c.id)?'checked':''}><div class="grow"><div class="title">${catEmoji(c,'18px')} ${c.name}</div></div></label>`).join('')}</div>
    <button id="fr" class="duo-btn full">Сбросить</button>`;
  openModal();
  $('#fol').onchange=e=>{S.s.light=e.target.checked;save();refreshBadge();reset()};
  $('#fma').oninput=e=>{S.s.maxAbv=Number(e.target.value);$('#fmav').textContent=e.target.value+'%';save();refreshBadge();reset()};
  b.querySelectorAll('[data-fc]').forEach(cb=>cb.onchange=()=>{if(!S.s.exCat)S.s.exCat=[];const id=cb.dataset.fc;
    if(cb.checked){if(!S.s.exCat.includes(id))S.s.exCat.push(id)}else S.s.exCat=S.s.exCat.filter(x=>x!==id);save();refreshBadge();reset()});
  $('#fr').onclick=()=>{S.s.light=false;S.s.maxAbv=60;S.s.exCat=[];save();refreshBadge();reset();closeModal()};
};

// ============================================================
// ИНФО
// ============================================================
function info(id){
  const d=drink(id);if(!d)return;const c=cat(d.cat);const p=[];
  if(d.snack)p.push(`<b>Закуска:</b> ${esc(d.snack)}`);
  if(d.ing?.length)p.push(`<b>Состав:</b> ${d.ing.map(esc).join(', ')}`);
  if(d.recipe)p.push(`<b>Рецепт:</b> ${esc(d.recipe)}`);
  if(d.cal!=null)p.push(`<b>Калории:</b> ≈${d.cal} ккал`);
  p.push(`<b>≈ в пиве:</b> ${beer(d).toFixed(1)}`);
  $('#modal-body').innerHTML=`<div class="big-emoji">${drinkEmoji(d,'64px')}</div><h3>${esc(d.name)}</h3><p class="muted">${c.name} · ${d.abv}%</p><div class="extra">${p.join('<br>')}</div>`;
  openModal();
}

// ============================================================
// ТЕМЫ
// ============================================================
$('#open-themes').onclick=()=>{
  const b=$('#modal-body');
  b.innerHTML=`<h3>Темы</h3><div class="theme-grid">
    <button class="theme-tile ${S.theme===null?'active':''}" data-t=""><div class="big">${emojiToSvg('🎲','36px')}</div><div>Все</div></button>
    ${THEMES.map(t=>`<button class="theme-tile ${S.theme===t.id?'active':''}" data-t="${t.id}"><div class="big">${emojiToSvg(t.emoji,'36px')}</div><div>${t.name}</div></button>`).join('')}
  </div>`;
  openModal();
  b.querySelectorAll('[data-t]').forEach(x=>x.onclick=()=>{S.theme=x.dataset.t||null;save();refreshBadge();reset();closeModal()});
};

// ============================================================
// КОЛЛЕКЦИЯ
// ============================================================
let colQuery='';
let colFilter='opened';
const colOpenCats=new Set();

$('#col-search').addEventListener('input',e=>{
  colQuery=e.target.value.trim().toLowerCase();
  $('#col-search-clear').hidden=!colQuery;
  renderCollection();
});
$('#col-search-clear').addEventListener('click',()=>{
  colQuery='';$('#col-search').value='';$('#col-search-clear').hidden=true;renderCollection();
});
$('#col-filter').addEventListener('click',e=>{
  const b=e.target.closest('.duo-seg-btn');if(!b)return;
  colFilter=b.dataset.cf;
  $('#col-filter').querySelectorAll('.duo-seg-btn').forEach(x=>x.classList.toggle('active',x===b));
  renderCollection();
});

function renderAchBadges(){
  Object.keys(S.col.ach).forEach(id=>{S.col.seenAch[id]=true});
  save();
}

function renderCollection(){
  const a=all(),tot=a.length,op=S.col.opened.length,pct=tot?op/tot:0;
  $('#ring-count').textContent=op;
  $('#ring-total').textContent=tot;
  $('#ring-fg').style.strokeDashoffset=327*(1-pct);
  $('#stats-grid').innerHTML=`
    <div class="stat-card"><div class="stat-num">${S.totals.spins||0}</div><div class="stat-label">спинов</div></div>
    <div class="stat-card"><div class="stat-num">${Object.keys(S.col.ach).length}</div><div class="stat-label">ачивок</div></div>
    <div class="stat-card"><div class="stat-num">${(S.log[today()]||{}).count||0}</div><div class="stat-label">сегодня</div></div>`;
  $('#ach-grid').innerHTML=ACHS.map(x=>{
    const u=!!S.col.ach[x.id];
    const isNew=u&&!S.col.seenAch[x.id];
    return `<div class="ach ${u?'unlocked':''}"><div class="big">${achEmoji(x,'32px')}</div><div class="name">${x.name}</div><div class="desc">${x.desc}</div>${isNew?'<div class="badge-new">NEW</div>':''}</div>`;
  }).join('');
  const titleEl=$('#opened-title');
  if(titleEl){
    titleEl.textContent=colFilter==='opened'?'Открытые напитки':colFilter==='locked'?'Закрытые напитки':'Все напитки';
  }
  let list=a;
  if(colFilter==='opened')list=list.filter(d=>S.col.opened.includes(d.id));
  if(colFilter==='locked')list=list.filter(d=>!S.col.opened.includes(d.id));
  if(colQuery)list=list.filter(d=>d.name.toLowerCase().includes(colQuery)||(d.emoji&&d.emoji.includes(colQuery)));
  const by={};list.forEach(d=>(by[d.cat]=by[d.cat]||[]).push(d));
  const el=$('#col-list');if(!el)return;
  if(!list.length){
    el.innerHTML=`<div class="empty">${colFilter==='locked'?'Всё открыто!':colFilter==='opened'?'Пока ничего не открыто':'Пусто'}</div>`;
    return;
  }
  const forceOpen=!!colQuery;
  el.innerHTML=CATS.map(c=>{
    const l=by[c.id]||[];if(!l.length)return '';
    const isOpen=forceOpen||colOpenCats.has(c.id);
    const items=l.map(d=>{
      const opened=S.col.opened.includes(d.id);
      const badge=opened?'':'<span class="sub" style="display:inline;margin-left:6px;opacity:.7">не открыт</span>';
      return `<div class="bar-item" data-d="${d.id}" style="cursor:pointer">
        <div style="font-size:22px;flex-shrink:0;${opened?'':'filter:grayscale(1);opacity:.5'}">${drinkEmoji(d,'22px')}</div>
        <div class="grow"><div class="title">${esc(d.name)}${badge}</div><div class="sub">${d.abv}%</div></div>
      </div>`;
    }).join('');
    return `<div class="bar-group ${isOpen?'open':''}" data-cat="${c.id}">
      <div class="bar-group-head" data-toggle="${c.id}">
        <div class="bar-group-emoji">${catEmoji(c,'22px')}</div>
        <div class="bar-group-name">${c.name}</div>
        <div class="bar-group-count">${l.length}</div>
        <div class="bar-group-arrow">▼</div>
      </div>
      <div class="bar-group-body"><div class="bar-group-inner">${items}</div></div>
    </div>`;
  }).join('');
  el.querySelectorAll('[data-toggle]').forEach(h=>{
    h.onclick=()=>{
      const cid=h.dataset.toggle;
      const group=h.closest('.bar-group');
      if(group.classList.contains('open')){group.classList.remove('open');colOpenCats.delete(cid)}
      else{group.classList.add('open');colOpenCats.add(cid)}
    };
  });
  el.querySelectorAll('[data-d]').forEach(row=>{row.onclick=()=>info(row.dataset.d)});
}

// ============================================================
// ПРОФИЛЬ
// ============================================================
let histQuery='';
$('#hist-search')?.addEventListener('input',e=>{
  histQuery=e.target.value.trim().toLowerCase();
  renderProfile();
});

function renderProfile(){
  const spins=S.totals.spins||0;
  const lvl=getLevel(spins);
  $('#hero-avatar').innerHTML=levelEmoji(lvl.cur,'40px');
  $('#hero-title').textContent=lvl.cur.title;
  $('#hero-level').textContent=lvl.idx;
  if(lvl.next){
    const range=lvl.next.min-lvl.cur.min;
    const done=spins-lvl.cur.min;
    const pct=Math.min(100,Math.round(done/range*100));
    $('#hero-sub').textContent=`До «${lvl.next.title}» ещё ${lvl.next.min-spins}`;
    $('#level-fill').style.width=pct+'%';
    $('#level-text').textContent=`${done} / ${range}`;
  }else{
    $('#hero-sub').textContent='Максимальный уровень!';
    $('#level-fill').style.width='100%';
    $('#level-text').textContent='MAX';
  }
  $('#p-total').textContent=spins;
  $('#p-today').textContent=(S.log[today()]||{}).count||0;
  $('#p-opened').textContent=S.col.opened.length;

  const sc=$('#streak-card');
  if(sc){
    if(S.streak.days>0){
      sc.hidden=false;
      $('#streak-sub').textContent=`${S.streak.days} ${plural(S.streak.days,'день','дня','дней')} подряд`;
      $('#streak-num').textContent=S.streak.days;
    }else sc.hidden=true;
  }

  const counts={};
  S.hist.forEach(e=>{if(e.cid)counts[e.cid]=(counts[e.cid]||0)+1});
  let topId=null,topN=0;
  for(const id in counts){if(counts[id]>topN){topN=counts[id];topId=id}}
  if(topId){
    const c=cat(topId);
    $('#top-cat').hidden=false;
    $('#top-cat-emoji').innerHTML=catEmoji(c,'32px');
    $('#top-cat-name').textContent=c.name;
    $('#top-cat-count').textContent=topN;
  }else $('#top-cat').hidden=true;

  $('#cat-progress').innerHTML=CATS.map(c=>{
    const total=all().filter(d=>d.cat===c.id).length;
    const opened=all().filter(d=>d.cat===c.id&&S.col.opened.includes(d.id)).length;
    const pct=total?Math.round(opened/total*100):0;
    return `<div class="cat-row">
      <div class="cat-row-emoji">${catEmoji(c,'20px')}</div>
      <div class="cat-row-name">${c.name}</div>
      <div class="cat-row-bar"><div class="cat-row-fill" style="width:${pct}%"></div></div>
      <div class="cat-row-count">${opened}/${total}</div>
    </div>`;
  }).join('');

  let l=S.hist.slice(0,100);
  if(histQuery)l=l.filter(e=>(e.dname||'').toLowerCase().includes(histQuery));
  $('#history-list').innerHTML=l.map(e=>{
    const d=new Date(e.ts);
    const t=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    const dt=`${d.getDate()}.${String(d.getMonth()+1).padStart(2,'0')}`;
    const c=e.cid?cat(e.cid):null;
    const emoji=c?catEmoji(c,'22px'):svgIcon('cocktail','22px');
    return `<div class="list-item">
      <div style="font-size:22px;flex-shrink:0">${emoji}</div>
      <div class="grow">
        <div class="title">${esc(e.dname||'—')}</div>
        <div class="sub">${dt} ${t}${c?` · ${c.name}`:''}</div>
      </div>
      <button class="duo-icon-btn" data-delhist="${e.id}" style="width:32px;height:32px;font-size:12px">${svgIcon('trash','14px')}</button>
    </div>`;
  }).join('')||'<div class="empty">Пока пусто</div>';

  document.querySelectorAll('[data-delhist]').forEach(b=>b.onclick=()=>{
    S.hist=S.hist.filter(x=>x.id!==b.dataset.delhist);
    save();renderProfile();toast('Удалено');
  });
}

// ============================================================
// НАСТРОЙКИ
// ============================================================
const stEl=$('#settings');
$('#open-settings').onclick=()=>{
  $('#set-tick').checked=S.s.tick;
  $('#set-result-sound').checked=S.s.res;
  $('#set-vibrate').checked=S.s.vib;
  $('#set-only-light').checked=S.s.light;
  $('#set-max-abv').value=S.s.maxAbv;
  $('#set-max-abv-val').textContent=S.s.maxAbv+'%';
  $('#set-water').value=S.s.water;
  $('#set-ambient').checked=S.s.ambient;
  $('#set-tilt').checked=S.s.tilt;
  stEl.hidden=false;
};
$('#settings-close').onclick=()=>stEl.hidden=true;
stEl.addEventListener('click',e=>{if(e.target===stEl)stEl.hidden=true});
$('#set-tick').onchange=e=>{S.s.tick=e.target.checked;save()};
$('#set-result-sound').onchange=e=>{S.s.res=e.target.checked;save()};
$('#set-vibrate').onchange=e=>{S.s.vib=e.target.checked;save()};
$('#set-only-light').onchange=e=>{S.s.light=e.target.checked;save();refreshBadge();reset()};
$('#set-max-abv').oninput=e=>{S.s.maxAbv=Number(e.target.value);$('#set-max-abv-val').textContent=e.target.value+'%';save();refreshBadge();reset()};
$('#set-water').onchange=e=>{S.s.water=Number(e.target.value)||0;save()};
$('#set-ambient').onchange=e=>{S.s.ambient=e.target.checked;save();if(S.s.ambient)startAmbient();else stopAmbient()};
$('#set-tilt').onchange=e=>{S.s.tilt=e.target.checked;save()};
$('#reset-data').onclick=()=>{if(!confirm('Удалить все данные?'))return;try{localStorage.removeItem(KEY)}catch{}S=def();save();location.reload()};

function reopenOnboard(){
  stEl.hidden=true;
  $('#tabbar').hidden=true;
  showScreen('onboard');
}
$('#settings-change-mode').onclick=reopenOnboard;

// ===== ТЕМА =====
function applyTheme(){
  document.documentElement.dataset.theme=S.s.theme;
  const btn=$('#theme-toggle');
  if(btn)btn.innerHTML=svgIcon(S.s.theme==='dark'?'moon':'sun','22px');
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=S.s.theme==='dark'?'#0a0a0f':'#f7f7fa';
}
$('#theme-toggle').onclick=()=>{
  S.s.theme=S.s.theme==='dark'?'light':'dark';
  save();applyTheme();click();
};

// ============================================================
// ТОСТ
// ============================================================
let tt;const te=$('#toast');
function toast(m){te.textContent=m;te.hidden=false;clearTimeout(tt);tt=setTimeout(()=>te.hidden=true,2500)}

// ============================================================
// КОНФЕТТИ
// ============================================================
function confetti(rarity=1){
  const el=$('#confetti');
  if(!el)return;
  el.hidden=false;el.innerHTML='';
  const colors=rarity>=1
    ?['#58cc02','#1cb0f6','#ffc800','#ff9600','#ce82ff','#ff4b4b','#89e219']
    :['#ffc800','#ffdb4d','#ff9600'];
  const n=rarity>=1?40:20;
  for(let i=0;i<n;i++){
    const p=document.createElement('div');
    p.className='confetti-piece'+(rarity>=1?'':' gold');
    p.style.left=Math.random()*100+'%';
    p.style.top='-10px';
    p.style.background=colors[rnd(colors.length)];
    p.style.animationDelay=Math.random()*0.3+'s';
    p.style.transform=`rotate(${rnd(360)}deg)`;
    el.appendChild(p);
  }
  setTimeout(()=>{el.hidden=true;el.innerHTML=''},2500);
}

// ============================================================
// ОНБОРДИНГ
// ============================================================
$$('#onboard .choice').forEach(b=>b.onclick=()=>{
  S.s.mode=b.dataset.mode;S.s.onboarded=true;save();
  $('#tabbar').hidden=false;
  showScreen('main');
});

// ============================================================
// СТРИК + БОНУС
// ============================================================
function updateDailyStreak(){
  const t=today();
  if(S.streak.lastClaim===t)return;
  if(S.streak.lastClaim){
    const d=daysBetween(S.streak.lastClaim,t);
    if(d===1)S.streak.days=(S.streak.days||0)+1;
    else if(d>1)S.streak.days=1;
  }else S.streak.days=1;
  S.streak.lastClaim=t;
  S.streak.claimedToday=false;
  if(S.rerollsDate!==t){S.rerolls=3;S.rerollsDate=t}
  save();
  checkAch();
}

function renderDaily(){
  const t=today();
  const banner=$('#daily-banner');
  if(!banner)return;
  if(S.rerollsDate!==t){S.rerolls=3;S.rerollsDate=t;save()}
  const rrCount=$('#reroll-count');if(rrCount)rrCount.textContent=S.rerolls;
  const claimed=S.streak.lastClaim===t&&S.streak.claimedToday;
  if(!claimed&&S.streak.lastClaim===t){
    banner.hidden=false;
    $('#daily-title').textContent=`🔥 Стрик: ${S.streak.days} ${plural(S.streak.days,'день','дня','дней')}`;
    const bonus=Math.min(5,1+Math.floor(S.streak.days/3));
    $('#daily-sub').textContent=`Забери бонус: +${bonus} реролл${plural(bonus,'','а','ов')}`;
    $('#daily-claim').hidden=false;
    $('#daily-claim').onclick=()=>{
      S.streak.claimedToday=true;
      S.rerolls+=bonus;
      save();renderDaily();renderDuoHeader();
      toast(`🔥 +${bonus} рероллов`);
      confetti();vib([30,50,30]);
    };
  }else{
    banner.hidden=!(S.streak.days>0);
    if(S.streak.days>0){
      $('#daily-title').textContent=`🔥 Стрик: ${S.streak.days} ${plural(S.streak.days,'день','дня','дней')}`;
      $('#daily-sub').textContent='Загляни завтра — стрик продолжится';
    }
    $('#daily-claim').hidden=true;
  }
  renderQuest();
}

// ============================================================
// КВЕСТ ДНЯ
// ============================================================
const QUESTS=[
  {id:'strong',title:'Крепыш',desc:'Выпей что-то крепче 30%',check:d=>d.abv>=30},
  {id:'newcat',title:'Исследователь',desc:'Открой напиток из новой категории',check:null},
  {id:'light',title:'Легковес',desc:'Выпей что-то ≤6%',check:d=>d.abv<=6},
  {id:'three',title:'Трижды',desc:'Сделай 3 спина за день',check:null},
  {id:'newdrink',title:'Новинка',desc:'Попробуй новый напиток',check:null},
  {id:'shot',title:'Шот-мастер',desc:'Выпей шот',check:d=>d.cat==='shots'},
];

function renderQuest(){
  const t=today();
  const banner=$('#quest-banner');
  if(!banner)return;
  if(!S.daily.date||S.daily.date!==t){
    S.daily={date:t,questId:QUESTS[rnd(QUESTS.length)].id,progress:0,done:false,claimed:false};
    save();
  }
  const q=QUESTS.find(x=>x.id===S.daily.questId);
  if(!q){banner.hidden=true;return}
  banner.hidden=false;
  $('#quest-title').textContent='🎯 '+q.title;
  $('#quest-sub').textContent=S.daily.done?'✅ Выполнено! +1 реролл':q.desc;
  $('#quest-progress').textContent=`${S.daily.progress}/1`;
}

function updateQuest(type,d){
  if(!S.daily.date||S.daily.date!==today())return;
  if(S.daily.done)return;
  const q=QUESTS.find(x=>x.id===S.daily.questId);
  if(!q)return;
  let ok=false;
  if(q.id==='three'){ok=(S.log[today()]||{}).count>=3}
  else if(q.id==='newcat'){
    const sameCatOpened=S.hist.slice(1).some(e=>{
      const x=drink(e.did);return x&&x.cat===d.cat;
    });
    ok=!sameCatOpened;
  }
  else if(q.id==='newdrink'){ok=!S.col.opened.slice(0,-1).includes(d.id)}
  else if(q.check){ok=q.check(d)}
  if(ok&&!S.daily.done){
    S.daily.done=true;S.daily.progress=1;
    S.totals.quests=(S.totals.quests||0)+1;
    S.rerolls+=1;
    save();
    toast('🎯 Квест выполнен! +1 реролл');
    confetti();vib([30,50,30]);
    checkAch();
    renderDuoHeader();
  }
  renderQuest();
}

// ============================================================
// РЕРОЛЛ
// ============================================================
$('#reroll-btn').onclick=()=>{
  if(spinning)return;
  if(S.rerolls<=0){toast('Рероллы закончились');return}
  S.rerolls--;save();
  const rc=$('#reroll-count');if(rc)rc.textContent=S.rerolls;
  renderDuoHeader();
  reset();
  toast('🎲 Реролл!');
  click();
};

// ============================================================
// МИНИ-ИГРА
// ============================================================
function openGuess(d){
  const m=$('#guess-modal');
  if(!m)return;
  $('#guess-emoji').innerHTML=drinkEmoji(d,'48px');
  $('#guess-name').textContent=d.name;
  const correct=d.abv;
  const opts=new Set([correct]);
  while(opts.size<4){
    const fake=Math.max(0,Math.min(80,correct+[-15,-10,-5,5,10,15,20][rnd(7)]));
    if(fake!==correct)opts.add(fake);
  }
  const arr=[...opts].sort(()=>Math.random()-0.5);
  $('#guess-options').innerHTML=arr.map(v=>`<button class="guess-opt" data-v="${v}">${v}%</button>`).join('');
  m.hidden=false;
  $('#guess-options').querySelectorAll('.guess-opt').forEach(b=>{
    b.onclick=()=>{
      const v=Number(b.dataset.v);
      $('#guess-options').querySelectorAll('.guess-opt').forEach(x=>x.disabled=true);
      if(v===correct){
        b.classList.add('correct');
        S.totals.guesses=(S.totals.guesses||0)+1;
        S.rerolls+=2;save();
        toast('🔮 Угадал! +2 реролла');
        confetti();vib([30,50,30]);
        checkAch();renderDuoHeader();
      }else{
        b.classList.add('wrong');
        $('#guess-options').querySelector(`[data-v="${correct}"]`)?.classList.add('correct');
        toast(`Не угадал. Правильно: ${correct}%`);
      }
      setTimeout(()=>{m.hidden=true},1600);
    };
  });
}
$('#guess-close').onclick=()=>{$('#guess-modal').hidden=true};

// ============================================================
// ЭКСПОРТ / ИМПОРТ
// ============================================================
$('#export-btn').onclick=()=>{
  const data=JSON.stringify(S,null,2);
  const blob=new Blob([data],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`drink-roulette-${today()}.json`;
  a.click();
  toast('📤 Экспортировано');
};
$('#import-btn').onclick=()=>$('#import-file').click();
$('#import-file').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    try{
      const p=JSON.parse(r.result);
      if(!p||typeof p!=='object')throw new Error('bad');
      S=merge(def(),p);save();location.reload();
    }catch{toast('❌ Ошибка импорта')}
  };
  r.readAsText(f);
};

// ============================================================
// АТМОСФЕРА: ЛЕТАЮЩИЙ СТАКАН v12 «LEGENDARY»
// ============================================================
const MUG = {
  el: null,
  state: 'idle',
  moodUntil: 0,
  x: 0, y: 0,
  vx: 0, vy: 0,
  targetX: 0, targetY: 0,
  rot: 0, rotV: 0,
  pointerX: 0, pointerY: 0,
  lastInteraction: 0,
  lastPointerMove: 0,
  size: 80,
  bounds: { w: 0, h: 0 },
  reduced: false,
  initialized: false,
  pupils: null,

  // ==== КЭШИ (добавлено) ====
  shadowEl: null,      // .mug-shadow — кэш querySelector
  _lastT: 0,           // для dt-нормализации
  _lastPx: null,       // последний transform зрачков (троттлинг)
  _lastPy: null,
  _lastBurst: 0,       // время последнего burst частиц
  _shadowLastScale: -1,// последний scale тени
  _shadowLastOpacity: -1,
};

function mugInit(){
  MUG.el = document.getElementById('flying-mug');
  if(!MUG.el) return;

  MUG.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  MUG.size = 80;
  MUG.bounds.w = window.innerWidth;
  MUG.bounds.h = window.innerHeight;
  MUG.x = MUG.bounds.w * 0.75;
  MUG.y = MUG.bounds.h * 0.7;
  MUG.targetX = MUG.x;
  MUG.targetY = MUG.y;
  MUG.pupils = MUG.el.querySelectorAll('.mug-pupil');

  // ==== КЭШ ТЕНИ (было querySelector каждый кадр) ====
  MUG.shadowEl = MUG.el.querySelector('.mug-shadow');

  MUG.el.classList.add('mug-hello');
  setTimeout(() => MUG.el.classList.remove('mug-hello'), 1500);

  window.addEventListener('resize', mugOnResize, { passive: true });
  window.addEventListener('mousemove', mugOnPointer, { passive: true });
  window.addEventListener('touchmove', mugOnPointer, { passive: true });
  window.addEventListener('touchstart', mugOnPointer, { passive: true });
  window.addEventListener('scroll', mugOnScroll, { passive: true });
  document.addEventListener('visibilitychange', mugOnVisibility);
  document.addEventListener('pointerdown', (e) => {
    if(e.target.closest('button, .choice, .tab, .bar-group-head, .duo-tile, .duo-seg-btn, .duo-btn, .chip, .guess-opt')){
      mugReaction('tap');
    }
  }, { passive: true });

  MUG.lastInteraction = performance.now();
  MUG.lastPointerMove = performance.now();
  MUG._lastT = performance.now();
  MUG.initialized = true;
  requestAnimationFrame(mugTick);
}

function mugOnResize(){
  MUG.bounds.w = window.innerWidth;
  MUG.bounds.h = window.innerHeight;
  MUG.x = Math.min(MUG.x, MUG.bounds.w - MUG.size);
  MUG.y = Math.min(MUG.y, MUG.bounds.h - MUG.size);
}

function mugOnPointer(e){
  const p = e.touches ? e.touches[0] : e;
  if(!p) return;
  MUG.pointerX = p.clientX;
  MUG.pointerY = p.clientY;
  MUG.lastPointerMove = performance.now();
  MUG.lastInteraction = performance.now();
  if(MUG.state === 'sleepy') mugSetState('idle');
}

function mugOnScroll(){
  MUG.lastInteraction = performance.now();
  if(MUG.state === 'sleepy') mugSetState('idle');
}

function mugOnVisibility(){
  if(document.hidden){
    mugSetState('sleepy');
  } else {
    MUG.lastInteraction = performance.now();
    mugSetState('idle');
  }
}

function mugSetState(s){
  if(MUG.state === s) return;
  MUG.state = s;
  if(!MUG.el) return;
  MUG.el.classList.remove('mug-state-idle', 'mug-state-curious', 'mug-state-excited', 'mug-state-sleepy', 'mug-state-celebrate');
  MUG.el.classList.add('mug-state-' + s);
}

function mugReaction(type){
  if(!MUG.el) return;
  MUG.lastInteraction = performance.now();
  if(type === 'spin'){
    MUG.el.classList.add('mug-spin');
    setTimeout(() => MUG.el.classList.remove('mug-spin'), 1100);
    mugSetState('excited');
    MUG.moodUntil = performance.now() + 3000;
    mugBurstParticles(6);
    mugSound('spin');
  } else if(type === 'glow' || type === 'celebrate'){
    mugSetState('celebrate');
    MUG.moodUntil = performance.now() + 3500;
    mugBurstParticles(20);
    mugSound('celebrate');
  } else if(type === 'tap'){
    MUG.vy -= 60;
    MUG.rotV += (Math.random() > 0.5 ? 1 : -1) * 4;
    if(MUG.state !== 'celebrate' && MUG.state !== 'excited'){
      mugSetState('excited');
      MUG.moodUntil = performance.now() + 800;
    }
    mugBurstParticles(3);
  }
}

function mugComputeTarget(t){
  const now = performance.now();
  const sinceInteraction = now - MUG.lastInteraction;
  const sincePointer = now - MUG.lastPointerMove;
  const margin = 10;
  const minX = MUG.size / 2 + margin;
  const maxX = MUG.bounds.w - MUG.size / 2 - margin;
  const minY = MUG.size / 2 + margin;
  const maxY = MUG.bounds.h - MUG.size / 2 - margin;
  const idleX = MUG.bounds.w * 0.78;
  const idleY = MUG.bounds.h * 0.72;
  let tx, ty;

  if(MUG.state === 'celebrate'){
    const cx = MUG.x, cy = MUG.y;
    const angle = t * 0.008;
    tx = cx + Math.cos(angle) * 15;
    ty = cy + Math.sin(angle) * 15;
    return clampTarget(tx, ty, minX, maxX, minY, maxY);
  }

  if(sincePointer < 2500 && sinceInteraction < 6000){
    if(MUG.state !== 'excited') mugSetState('curious');
    tx = MUG.pointerX + 60;
    ty = MUG.pointerY + 40;
    return clampTarget(tx, ty, minX, maxX, minY, maxY);
  }

  if(sinceInteraction > 25000 && MUG.state !== 'celebrate'){
    mugSetState('sleepy');
    tx = MUG.bounds.w * 0.85;
    ty = MUG.bounds.h * 0.85;
    return clampTarget(tx, ty, minX, maxX, minY, maxY);
  }

  if((MUG.state === 'excited') && now > MUG.moodUntil){
    mugSetState('idle');
  }

  const a = t * 0.0007;
  const ampX = Math.min(120, (maxX - idleX) * 0.9);
  const ampY = Math.min(80, (maxY - idleY) * 0.9);
  tx = idleX + Math.cos(a * 1.3) * ampX;
  ty = idleY + Math.sin(a * 0.9) * ampY;
  return clampTarget(tx, ty, minX, maxX, minY, maxY);
}

function clampTarget(x, y, minX, maxX, minY, maxY){
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y))
  };
}

function mugTick(t){
  if(!MUG.initialized) return;

  // ==== dt-нормализация к 60fps (было: фикс. шаг на кадр) ====
  const dtRaw = t - MUG._lastT;
  MUG._lastT = t;
  const dt = Math.min(32, dtRaw) / 16.667; // 1.0 при 60fps, 0.5 при 120fps, 2.0 при 30fps

  // ==== target ====
  const target = mugComputeTarget(t);
  MUG.targetX = target.x;
  MUG.targetY = target.y;

  // ==== физика (масштабируем через dt) ====
  const stiffness = MUG.state === 'excited' ? 0.14 : MUG.state === 'sleepy' ? 0.03 : 0.07;
  const damping   = MUG.state === 'excited' ? 0.80 : MUG.state === 'sleepy' ? 0.92 : 0.86;

  const ax = (MUG.targetX - MUG.x) * stiffness;
  const ay = (MUG.targetY - MUG.y) * stiffness;

  MUG.vx = (MUG.vx + ax) * Math.pow(damping, dt);
  MUG.vy = (MUG.vy + ay) * Math.pow(damping, dt);
  MUG.x += MUG.vx * dt;
  MUG.y += MUG.vy * dt;

  // ==== поворот ====
  const targetRot = Math.max(-25, Math.min(25, MUG.vx * 1.2 + MUG.vy * 0.4));
  MUG.rotV = (MUG.rotV + (targetRot - MUG.rot) * 0.1) * Math.pow(0.85, dt);
  MUG.rot += MUG.rotV * dt;

  // ==== скорость (без Math.hypot — он медленнее) ====
  const speed = Math.sqrt(MUG.vx * MUG.vx + MUG.vy * MUG.vy);

  // ==== тень: обновляем ТОЛЬКО если реально изменилось ====
  const shadowScale = 1 + Math.min(0.3, speed * 0.01);
  const shadowOpacity = 0.3 - Math.min(0.2, speed * 0.005);
  if(MUG.shadowEl &&
     (Math.abs(shadowScale - MUG._shadowLastScale) > 0.01 ||
      Math.abs(shadowOpacity - MUG._shadowLastOpacity) > 0.01)){
    MUG._shadowLastScale = shadowScale;
    MUG._shadowLastOpacity = shadowOpacity;
    MUG.shadowEl.style.transform = `scale(${shadowScale.toFixed(3)})`;
    MUG.shadowEl.style.opacity = shadowOpacity.toFixed(3);
  }

  // ==== «дыхание» только в excited, иначе 1 ====
  const breathe = MUG.state === 'excited'
    ? 1 + Math.sin(t * 0.02) * 0.05
    : 1;

  // ==== главный transform ====
  MUG.el.style.transform =
    `translate3d(${MUG.x - MUG.size / 2}px, ${MUG.y - MUG.size / 2}px, 0) ` +
    `rotate(${MUG.rot.toFixed(2)}deg) scale(${breathe.toFixed(3)})`;

  // ==== зрачки: троттлинг (обновляем только при сдвиге > 0.3px) ====
  if(MUG.pupils && MUG.pupils.length){
    const dx = MUG.pointerX - MUG.x;
    const dy = MUG.pointerY - MUG.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const maxOffset = 1.8;
    const px = (dx / dist) * Math.min(maxOffset, dist * 0.02);
    const py = (dy / dist) * Math.min(maxOffset, dist * 0.02);

    // округляем до 0.1, чтобы не дёргать DOM лишний раз
    const pxR = Math.round(px * 10) / 10;
    const pyR = Math.round(py * 10) / 10;
    if(pxR !== MUG._lastPx || pyR !== MUG._lastPy){
      MUG._lastPx = pxR;
      MUG._lastPy = pyR;
      const tf = `translate(${pxR}px, ${pyR}px)`;
      for(let i = 0; i < MUG.pupils.length; i++){
        MUG.pupils[i].style.transform = tf;
      }
    }
  }

  // ==== частицы: троттлинг до ~5 раз/сек (было ~9 в сек) ====
  if((MUG.state === 'excited' || MUG.state === 'celebrate') &&
     t - MUG._lastBurst > 200){
    MUG._lastBurst = t;
    mugBurstParticles(1);
  }

  requestAnimationFrame(mugTick);
}

function mugBurstParticles(count){
  if(!MUG.el || MUG.reduced) return;
  const trail = document.getElementById('mug-trail');
  if(!trail) return;

  // ==== лимит: не более 12 живых частиц одновременно ====
  const alive = trail.children.length;
  if(alive >= 12) return;
  const room = Math.min(count, 12 - alive);

  for(let i = 0; i < room; i++){
    const p = document.createElement('div');
    p.className = 'mug-particle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 10 + Math.random() * 25;
    p.style.left = (40 + Math.cos(angle) * dist) + 'px';
    p.style.top  = (40 + Math.sin(angle) * dist) + 'px';
    p.style.animationDelay = (Math.random() * 0.2) + 's';
    trail.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }
}

function mugSound(kind){
  if(MUG.reduced || !S.s.res) return;
  const a = audio();
  if(!a) return;
  if(kind === 'tap'){
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sine';
    o.frequency.value = 800;
    o.frequency.exponentialRampToValueAtTime(1200, a.currentTime + 0.08);
    g.gain.value = 0.04;
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.15);
    o.connect(g).connect(a.destination);
    o.start(); o.stop(a.currentTime + 0.15);
  } else if(kind === 'spin'){
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(200, a.currentTime);
    o.frequency.exponentialRampToValueAtTime(600, a.currentTime + 0.4);
    g.gain.value = 0.03;
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.5);
    o.connect(g).connect(a.destination);
    o.start(); o.stop(a.currentTime + 0.5);
  } else if(kind === 'celebrate'){
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type = 'triangle';
      o.frequency.value = f;
      g.gain.value = 0.03;
      g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.6 + i * 0.08);
      o.connect(g).connect(a.destination);
      const t = a.currentTime + i * 0.08;
      o.start(t); o.stop(t + 0.6);
    });
  }
}

// ============================================================
// ПУЗЫРЬКИ НА ФОНЕ
// ============================================================
(function initBubbles(){
  const canvas = document.getElementById('bubble-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let bubbleRAF = 0;
  let paused = false;

  function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const N = window.innerWidth < 500 ? 18 : 32;
  const bubbles = [];
  for(let i = 0; i < N; i++){
    bubbles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 5,
      speed: .3 + Math.random() * .9,
      drift: (Math.random() - .5) * .4,
      phase: Math.random() * Math.PI * 2,
      hue: 80 + Math.random() * 60,
      alpha: .15 + Math.random() * .35,
    });
  }

  // ==== КЭШ: один градиент-«блик» на все пузырьки нельзя (разные x,y),
  // но можно убрать createRadialGradient из кадра.
  // Рисуем: заливка rgba + маленький белый блик (2 arc вместо градиента). ====
  function draw(t){
    if(paused) return;
    ctx.clearRect(0, 0, W, H);
    for(let i = 0; i < bubbles.length; i++){
      const b = bubbles[i];
      b.y -= b.speed;
      b.x += b.drift + Math.sin(t * .001 + b.phase) * .3;
      if(b.y < -10){ b.y = H + 10; b.x = Math.random() * W; }
      if(b.x < -10) b.x = W + 10;
      if(b.x > W + 10) b.x = -10;

      // основной круг — без градиента
      ctx.fillStyle = `hsla(${b.hue},100%,60%,${b.alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      // блик
      ctx.fillStyle = `hsla(0,0%,100%,${b.alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(b.x - b.r * .3, b.y - b.r * .3, b.r * .25, 0, Math.PI * 2);
      ctx.fill();
    }
    bubbleRAF = requestAnimationFrame(draw);
  }
  bubbleRAF = requestAnimationFrame(draw);

  // ==== пауза на скрытой вкладке ====
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){
      paused = true;
      cancelAnimationFrame(bubbleRAF);
    } else {
      paused = false;
      bubbleRAF = requestAnimationFrame(draw);
    }
  });
})();

// ============================================================
// PWA
// ============================================================
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

// ============================================================
// СТАРТ
// ============================================================
try{
  load();
  applyTheme();
  if(S.s.onboarded){
    $('#tabbar').hidden=false;
    showScreen('main');
    if(S.s.ambient)startAmbient();
  }else{
    showScreen('onboard');
  }
  $('#view-mode').querySelectorAll('.duo-seg-btn').forEach(x=>x.classList.toggle('active',x.dataset.vm===S.s.viewMode));
  showView(S.s.viewMode||'reels');

  // SVG: первый прогон + старт стакана
  const boot = () => {
    if(window.Icons && Icons.applyAll) Icons.applyAll(document);
    mugInit();
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}catch(err){
  console.error('init',err);
  alert('Ошибка: '+err.message);
}