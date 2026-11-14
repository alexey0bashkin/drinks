// ===== ДАННЫЕ =====
const LIGHT=6;

// CATS, DRINKS, THEMES приходят из drinks.js (подключён раньше app.js)

const ACHS=[
  {id:'first',name:'Первый спин',desc:'1 вращение',emoji:'🎉',c:{t:'spins',n:1}},
  {id:'first-shot',name:'Первый шот',desc:'Любой шот',emoji:'🥃',c:{t:'cat',id:'shots',n:1}},
  {id:'all-beer',name:'Пиво-мастер',desc:'Всё пиво',emoji:'🍺',c:{t:'allCat',id:'beer'}},
  {id:'all-cocktail',name:'Бармен',desc:'Все коктейли',emoji:'🍸',c:{t:'allCat',id:'cocktail'}},
  {id:'ten',name:'Десятка',desc:'10 вращений',emoji:'🔟',c:{t:'spins',n:10}},
  {id:'fifty',name:'Полтинник',desc:'50 вращений',emoji:'🏅',c:{t:'spins',n:50}},
  {id:'variety',name:'Разнообразие',desc:'10 разных',emoji:'🌈',c:{t:'uniq',n:10}},
  {id:'strong',name:'Крепкий орешек',desc:'3 крепче 35%',emoji:'💪',c:{t:'strong',n:3}},
];

// ===== УРОВНИ =====
const LEVELS=[
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
const KEY='drink-roulette-v8';
const def=()=>({
  s:{onboarded:false,mode:'both',tick:true,res:true,vib:true,maxAbv:60,light:false,water:3,exCat:[]},
  bar:{avail:[],only:false,custom:[]},
  col:{opened:[],ach:{}},
  hist:[],log:{},
  theme:null,totals:{spins:0},v:8,
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
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function vib(p=15){if(S.s.vib&&navigator.vibrate)navigator.vibrate(p)}

// ===== ЗВУК =====
let ac;
function audio(){try{if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac}catch{return null}}
function tick(){if(!S.s.tick)return;const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.frequency.value=900;g.gain.value=.03;o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.02)}
function fan(){if(!S.s.res)return;const a=audio();if(!a)return;[523,659,784].forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g).connect(a.destination);const t=a.currentTime+i*.08;o.start(t);o.stop(t+.12)})}

// ===== ПУЛ =====
function pool(){
  let p=all();
  if(S.s.mode==='non-alcohol')p=p.filter(d=>d.abv===0);
  if(S.s.mode==='alcohol')p=p.filter(d=>d.abv>0);
  if(S.bar.only&&S.bar.avail.length){const st=new Set(S.bar.avail);p=p.filter(d=>st.has(d.id))}
  if(S.s.light)p=p.filter(d=>d.abv<=LIGHT);
  if(S.s.maxAbv<60)p=p.filter(d=>d.abv<=S.s.maxAbv);
  const ex=S.s.exCat||[];if(ex.length)p=p.filter(d=>!ex.includes(d.cat));
  if(S.theme){const t=THEMES.find(x=>x.id===S.theme);if(t){const st=new Set(t.ids);p=p.filter(d=>st.has(d.id))}}
  return p;
}

// ===== ИНДИКАТОР АКТИВНЫХ ФИЛЬТРОВ =====
function activeFilters(){
  const s=S.s;
  return !!(s.light || s.maxAbv<60 || (s.exCat&&s.exCat.length) || S.theme || (S.bar.only&&S.bar.avail.length));
}
function refreshBadge(){
  const dot=$('#filters-dot');
  if(dot) dot.hidden = !activeFilters();
}

// ============================================================
// СЛОТ-МАШИНА (ПОЛНОСТЬЮ ПЕРЕПИСАНА)
// ------------------------------------------------------------
// Модель: reelPos[r] — ИНДЕКС СЕКТОРА, который стоит в ЦЕНТРЕ окна.
// Окно показывает 5 ячеек: pos-2, pos-1, pos, pos+1, pos+2.
// Мы рендерим ячейки абсолютно и смещаем весь трек так, чтобы
// центральная ячейка (2-я из 5) попала ровно в центр окна.
// Анимация плавно ведёт reelPos[r] от текущего значения к целевому
// целому числу. На финальном кадре — reelPos[r] строго целый,
// поэтому центральная ячейка ровно в центре.
// ============================================================

const REELS = [
  document.getElementById('reel-0'),
  document.getElementById('reel-1'),
  document.getElementById('reel-2'),
];

const CELL_H = 94;        // высота ячейки + отступ (84 + 10)
const CENTER_INDEX = 2;   // в окне из 5 ячеек центральная — 2-я (0..4)

let secs = [];            // текущий набор секторов
let spinning = false;
let reelPos = [0, 0, 0];  // ТЕКУЩИЙ индекс сектора в центре каждой полосы

// Рендер: строим 5 ячеек вокруг reelPos[r] и ставим центральную в центр окна.
function renderReels() {
  if (!secs.length) {
    REELS.forEach(el => { if (el) el.innerHTML = ''; });
    return;
  }
  const n = secs.length;
  const win = document.querySelector('.reel-window');
  const H = win ? win.clientHeight : 0;

  for (let r = 0; r < 3; r++) {
    const el = REELS[r];
    if (!el) continue;
    const center = reelPos[r];
    let html = '';
    for (let k = 0; k < 5; k++) {
      const idx = ((Math.floor(center) - CENTER_INDEX + k) % n + n) % n;
      html += cellHTML(secs[idx]);
    }
    el.innerHTML = html;

    const frac = center - Math.floor(center);
    // центр ячейки CENTER_INDEX в пикселях от верха трека:
    const cellCenterY = CENTER_INDEX * CELL_H + 42 + frac * CELL_H;
    const offset = H / 2 - cellCenterY;
    el.style.transform = `translateY(${offset}px)`;
  }
}

function cellHTML(s) {
  if (!s) return '<div class="reel-cell"></div>';
  const abv = s.data && s.data.abv != null ? s.data.abv + '%' : '';
  return `<div class="reel-cell">
    <div class="rc-emoji">${s.emoji || '🍹'}</div>
    <div class="rc-name">${esc(s.label)}</div>
    <div class="rc-abv">${abv}</div>
  </div>`;
}

// Установить набор секторов и сбросить позиции.
function setWheel(arr, titleText) {
  secs = (arr || []).slice();
  setTitle(titleText);
  const n = secs.length;
  // Начальные позиции — равномерно по кругу, чтобы полосы не были одинаковыми.
  reelPos = n ? [0, Math.floor(n / 3), Math.floor((2 * n) / 3)] : [0, 0, 0];
  renderReels();
  clearReelResult();
}

function catSecs(){
  const p = pool();
  const ids = [...new Set(p.map(d => d.cat))];
  return ids.map(id => { const c = cat(id); return {label: c.name, emoji: c.emoji, color: c.color, data: c}; });
}
function drSecs(cid){
  return pool().filter(d => d.cat === cid).map(d => { const c = cat(d.cat); return {label: d.name, emoji: d.emoji, color: c.color, data: d}; });
}

function setTitle(text){ $('#wt-text').textContent = text || 'Крути и узнай'; }

// Анимация одной полосы: от текущей позиции к targetIndex (целому).
// Гарантирует, что на финальном кадре reelPos[r] === targetIndex (целое).
function spinReel(reelIdx, targetIndex, duration, onDone) {
  const el = REELS[reelIdx];
  const n = secs.length;
  if (!n || !el) { onDone && onDone(); return; }

  const from = reelPos[reelIdx];             // текущая позиция (может быть дробной)
  const target = targetIndex;                // целое
  // Делаем несколько оборотов: едем от `from` до `target`, добавив 3-4 полных круга.
  const turns = 3 + rnd(2);
  // Конечная позиция: ближайшая к (from + turns*n + target) точка, дающая ровно target.
  // Проще: final = target + Math.ceil((from + turns*n - target) / n) * n
  const finalPos = target + Math.ceil((from + turns * n - target) / n) * n;

  const t0 = performance.now();
  let lastTickIdx = Math.floor(from);

  function frame(t) {
    const p = Math.min((t - t0) / duration, 1);
    // easeOutCubic — плавное замедление в конце, без «доезда»
    const e = 1 - Math.pow(1 - p, 3);
    const pos = from + (finalPos - from) * e;
    reelPos[reelIdx] = pos;
    renderReels();

    // Тик при смене индекса (когда позиция перешла на новое целое)
    const curIdx = Math.floor(pos);
    if (curIdx !== lastTickIdx) {
      tick(); vib(4);
      lastTickIdx = curIdx;
    }

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      // Финальный кадр — строго целое число, ровно target.
      reelPos[reelIdx] = target;
      renderReels();
      // Доп. рендер на следующем кадре, чтобы гарантировать применение стиля.
      requestAnimationFrame(() => {
        renderReels();
        onDone && onDone();
      });
    }
  }
  requestAnimationFrame(frame);
}

// Подсветка центральных ячеек (индекс CENTER_INDEX в окне из 5).
function markReelCells(state) {
  REELS.forEach(el => {
    if (!el) return;
    const cells = el.querySelectorAll('.reel-cell');
    const centerCell = cells[CENTER_INDEX];
    if (centerCell) {
      centerCell.classList.remove('win', 'lose');
      if (state === 'win') centerCell.classList.add('win');
      if (state === 'lose') centerCell.classList.add('lose');
    }
  });
}
function clearReelResult() {
  REELS.forEach(el => {
    if (!el) return;
    el.querySelectorAll('.reel-cell').forEach(c => c.classList.remove('win', 'lose'));
  });
  const banner = $('#reel-banner');
  if (banner) { banner.hidden = true; banner.textContent = ''; banner.className = 'reel-banner'; }
}

// Главный спин.
// Возвращает через done({win, sec}) — где sec — выигравший сектор.
// Модалка проигрыша НЕ показывается — только баннер на сцене.
function spinAnim(done) {
  if (!secs.length) { toast('Пусто — ослабь фильтры'); return; }
  spinning = true;
  const btn = document.getElementById('spin-btn');
  btn.disabled = true;
  clearReelResult();

  const n = secs.length;

  // Если один сектор — сразу победа, без анимации.
  if (n === 1) {
    spinning = false;
    btn.disabled = false;
    done({ win: true, sec: secs[0] });
    return;
  }

  // 50% шанс победы (3 одинаковых), иначе 3 разных.
  const isWin = Math.random() < 0.5;
  const winIdx = rnd(n);

  const idxs = [];
  if (isWin) {
    idxs.push(winIdx, winIdx, winIdx);
  } else {
    // Три РАЗНЫХ индекса (гарантированно не все равны).
    const used = new Set();
    while (idxs.length < 3) {
      const v = rnd(n);
      if (used.has(v)) continue;
      idxs.push(v); used.add(v);
    }
  }

  let doneCount = 0;
  const durs = [2100, 2600, 2300];
  const delays = [0, 180, 90];

  for (let r = 0; r < 3; r++) {
    setTimeout(() => {
      spinReel(r, idxs[r], durs[r], () => {
        doneCount++;
        if (doneCount === 3) {
          spinning = false;
          btn.disabled = false;

          // Проверяем именно центральные метки после анимации.
          const c0 = idxs[0], c1 = idxs[1], c2 = idxs[2];
          const realWin = (c0 === c1 && c1 === c2);

          if (realWin) {
            markReelCells('win');
            fan(); vib([30, 50, 30]); confetti();
            showBanner('🎉 ВЫИГРАЛ!', 'win');
            const sec = secs[c1];
            setTimeout(() => done({ win: true, sec }), 650);
          } else {
            markReelCells('lose');
            vib([15, 30, 15]);
            showBanner('Почти… крути ещё!', 'lose');
            // Модалку НЕ показываем. Просто возвращаем управление через паузу.
            setTimeout(() => done({ win: false, sec: null }), 650);
          }
        }
      });
    }, delays[r]);
  }
}

function showBanner(text, kind) {
  const b = $('#reel-banner');
  if (!b) return;
  b.textContent = text;
  b.className = 'reel-banner ' + kind;
  b.hidden = false;
}

// ===== РЕЖИМ КОЛЕСА =====
let wMode='all';
let barQuery='';
$('#wheel-mode').addEventListener('click',e=>{
  const b=e.target.closest('.seg-btn');
  if(!b||spinning)return;
  wMode=b.dataset.wm;
  $('#wheel-mode').querySelectorAll('.seg-btn').forEach(x=>x.classList.toggle('active',x===b));
  reset();
});

function reset(){
  if(wMode==='all'){
    setWheel(
      pool().map(d=>{const c=cat(d.cat);return{label:d.name,emoji:d.emoji,color:c.color,data:d}}),
      'Крути и узнай'
    );
  } else {
    setWheel(catSecs(),'🎯 Выбери категорию');
  }
}

$('#spin-btn').addEventListener('click',()=>{
  if(spinning)return;
  if(!secs.length){toast('Ослабь фильтры');return}
  spinAnim(res=>{
    if(wMode==='all'){
      if(res.win){
        finish(res.sec.data,null);
      }
      // проигрыш — ничего, баннер уже показан, кнопка снова активна
    } else {
      if(res.win){
        const c=res.sec.data;
        setTimeout(()=>{
          const dr=drSecs(c.id);
          if(!dr.length){toast('Пусто в категории');reset();return}
          setWheel(dr,`${c.emoji} ${c.name} — выбери напиток`);
          setTimeout(()=>{
            spinAnim(r2=>{
              if(r2.win) finish(r2.sec.data,c);
              // проигрыш — молча
            });
          },200);
        },300);
      }
    }
  });
});

// ===== РЕЗУЛЬТАТ =====
let pending=null;

function finish(d,c){
  pending={drink:d,cat:c};
  $('#result-emoji').textContent=d.emoji;
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
}

$('#again-btn').onclick=()=>{
  $('#result').hidden=true;pending=null;
  if(wMode==='category')reset();
  setTimeout(()=>$('#spin-btn').click(),50);
};
$('#accept-btn').onclick=()=>{
  if(pending)commit(pending);
  $('#result').hidden=true;pending=null;
  if(wMode==='category')reset();
};
$('#share-btn').onclick=()=>pending&&share(pending);

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
  if(S.s.water>0&&S.log[k].count>=S.s.water&&!S.log[k].wr){S.log[k].wr=true;toast('💧 Может, воды?')}
  save();refreshBadge();
}

// ===== АЧИВКИ =====
function checkAch(){for(const a of ACHS){if(S.col.ach[a.id])continue;if(met(a)){S.col.ach[a.id]=Date.now();toast(`🏆 ${a.name}`)}}}
function met(a){const c=a.c;
  if(c.t==='spins')return(S.totals.spins||0)>=c.n;
  if(c.t==='uniq')return S.col.opened.length>=c.n;
  if(c.t==='cat'){const ids=all().filter(d=>d.cat===c.id).map(d=>d.id);return ids.filter(x=>S.col.opened.includes(x)).length>=c.n}
  if(c.t==='allCat'){const ids=all().filter(d=>d.cat===c.id).map(d=>d.id);return ids.length>0&&ids.every(x=>S.col.opened.includes(x))}
  if(c.t==='strong')return S.col.opened.map(drink).filter(Boolean).filter(d=>d.abv>=35).length>=c.n;
  return false;
}

// ===== ШЕРИНГ =====
async function share({drink:d,cat:c}){
  const cc=c||cat(d.cat);
  const text=`${d.emoji} ${d.name} (${cc.name}, ${d.abv}%) · Рулетка напитков`;
  if(navigator.share){try{await navigator.share({title:'Рулетка напитков',text})}catch{}}
  else{try{await navigator.clipboard.writeText(text);toast('Скопировано')}catch{toast(text)}}
}

// ===== МОДАЛКИ =====
function openModal(){$('#modal').hidden=false}
function closeModal(){$('#modal').hidden=true}
$('#modal-close').onclick=closeModal;
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal()});

// закрытие модалок по фону
['#settings','#result'].forEach(sel=>{
  const el=$(sel);
  if(el) el.addEventListener('click',e=>{ if(e.target===el) el.hidden=true; });
});

// ===== НАВИГАЦИЯ =====
function showScreen(id){
  const screens=['onboard','main','bar-screen','collection-screen','profile-screen'];
  screens.forEach(s=>{const el=document.getElementById(s);if(el)el.hidden=(s!==id)});
  $$('#tabbar .tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===id));
  window.scrollTo(0,0);
  if(id==='main'){setTimeout(()=>{refreshBadge();reset()},30)}
  if(id==='bar-screen')renderBar();
  if(id==='collection-screen')renderCollection();
  if(id==='profile-screen')renderProfile();
}
$('#tabbar').addEventListener('click',e=>{
  const b=e.target.closest('.tab');
  if(!b)return;
  e.preventDefault();
  showScreen(b.dataset.tab);
});

// ===== БАР =====
$('#open-bar').onclick=()=>showScreen('bar-screen');
$('#bar-only-toggle').onchange=e=>{S.bar.only=e.target.checked;save();refreshBadge();reset()};
$('#bar-search').addEventListener('input',e=>{
  barQuery=e.target.value.trim().toLowerCase();
  $('#bar-search-clear').hidden=!barQuery;
  renderBar();
});
$('#bar-search-clear').addEventListener('click',()=>{
  barQuery='';
  $('#bar-search').value='';
  $('#bar-search-clear').hidden=true;
  renderBar();
});

(function(){
  const sel=$('#cc');
  if(sel)sel.innerHTML=CATS.map(c=>`<option value="${c.id}">${c.emoji} ${c.name}</option>`).join('');
})();

$('#add-custom-btn').onclick=()=>{
  const n=$('#cn').value.trim();
  const e=$('#ce').value.trim()||'🍹';
  const c=$('#cc').value;
  const a=Number($('#ca').value)||0;
  if(!n){toast('Введи название');return}
  const d={id:'custom_'+Date.now(),cat:c,name:n,emoji:e,abv:a,src:'custom',ing:[],recipe:null,snack:null,cal:null};
  S.bar.custom.push(d);
  S.bar.avail.push(d.id);
  save();
  $('#cn').value='';$('#ce').value='';$('#ca').value='';
  renderBar();
  reset();
  toast('✅ Добавлено: '+n);
  vib([20,30,20]);
};

// ===== БАР: АККОРДЕОН =====
const openCats = new Set();

function renderBar(){
  const el=$('#bar-list');if(!el)return;
  const q=barQuery;
  const match=d=>!q||d.name.toLowerCase().includes(q)||(d.emoji&&d.emoji.includes(q));

  const by={};
  all().forEach(d=>{
    if(!match(d))return;
    (by[d.cat]=by[d.cat]||[]).push(d);
  });

  const hasAny=Object.keys(by).length>0;

  if(!hasAny){
    el.innerHTML=q
      ? `<div class="empty">Ничего не найдено по «${esc(q)}»</div>`
      : '<div class="empty">Бар пуст</div>';
    return;
  }

  const forceOpen = !!q;

  el.innerHTML=CATS.map(c=>{
    const l=by[c.id]||[];
    if(!l.length)return '';
    const isOpen = forceOpen || openCats.has(c.id);
    const items=l.map(d=>`<div class="bar-item">
      <input type="checkbox" data-id="${d.id}" ${S.bar.avail.includes(d.id)?'checked':''}>
      <div class="grow">
        <div class="title">${d.emoji} ${esc(d.name)} ${d.src==='custom'?'<span class="sub" style="display:inline">свой</span>':''}</div>
        <div class="sub">${d.abv}%</div>
      </div>
      ${d.src==='custom'?`<button class="icon-btn" data-del="${d.id}">🗑</button>`:''}
    </div>`).join('');
    return `<div class="bar-group ${isOpen?'open':''}" data-cat="${c.id}">
      <div class="bar-group-head" data-toggle="${c.id}">
        <div class="bar-group-emoji">${c.emoji}</div>
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
      t.innerHTML=html.replace(re,'<mark style="background:rgba(240,196,25,.35);color:#fff;border-radius:3px;padding:0 2px">$1</mark>');
    });
  }

  el.querySelectorAll('[data-toggle]').forEach(h=>{
    h.onclick=()=>{
      const cid=h.dataset.toggle;
      const group=h.closest('.bar-group');
      if(group.classList.contains('open')){
        group.classList.remove('open');
        openCats.delete(cid);
      } else {
        group.classList.add('open');
        openCats.add(cid);
      }
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

// ===== ФИЛЬТРЫ =====
$('#open-filters').onclick=()=>{
  const b=$('#modal-body');
  b.innerHTML=`<h3>Фильтры</h3>
    <label class="switch-row"><span>Только лёгкое (≤6%)</span><input type="checkbox" id="fol" class="switch" ${S.s.light?'checked':''}></label>
    <label class="field">Макс. крепость: <input type="range" id="fma" min="0" max="60" value="${S.s.maxAbv}"><span id="fmav">${S.s.maxAbv}%</span></label>
    <div class="cat-title">Исключить</div>
    <div class="list" style="max-width:none">${CATS.map(c=>`<label class="list-item"><input type="checkbox" data-fc="${c.id}" ${(S.s.exCat||[]).includes(c.id)?'checked':''}><div class="grow"><div class="title">${c.emoji} ${c.name}</div></div></label>`).join('')}</div>
    <button id="fr" class="btn full">Сбросить</button>`;
  openModal();
  $('#fol').onchange=e=>{S.s.light=e.target.checked;save();refreshBadge();reset()};
  $('#fma').oninput=e=>{S.s.maxAbv=Number(e.target.value);$('#fmav').textContent=e.target.value+'%';save();refreshBadge();reset()};
  b.querySelectorAll('[data-fc]').forEach(cb=>cb.onchange=()=>{if(!S.s.exCat)S.s.exCat=[];const id=cb.dataset.fc;
    if(cb.checked){if(!S.s.exCat.includes(id))S.s.exCat.push(id)}else S.s.exCat=S.s.exCat.filter(x=>x!==id);save();refreshBadge();reset()});
  $('#fr').onclick=()=>{S.s.light=false;S.s.maxAbv=60;S.s.exCat=[];save();refreshBadge();reset();closeModal()};
};

// ===== ПОИСК =====
$('#open-search').onclick=()=>{
  const b=$('#modal-body');
  b.innerHTML=`<h3>Поиск</h3><input id="si" class="search-input" placeholder="Название…"><div id="sr" class="list" style="margin-top:10px;max-width:none"></div>`;
  openModal();
  const inp=$('#si'),res=$('#sr');
  const r=()=>{const q=inp.value.trim().toLowerCase();
    const l=q?all().filter(d=>d.name.toLowerCase().includes(q)):[];
    res.innerHTML=l.length?l.map(d=>{const c=cat(d.cat);return`<div class="list-item" data-d="${d.id}"><div class="grow"><div class="title">${d.emoji} ${esc(d.name)}</div><div class="sub">${c.name} · ${d.abv}%</div></div></div>`}).join(''):(q?'<div class="empty">Ничего</div>':'<div class="empty">Введи название</div>');
    res.querySelectorAll('[data-d]').forEach(x=>x.onclick=()=>info(x.dataset.d))};
  inp.oninput=r;r();inp.focus();
};
function info(id){const d=drink(id);if(!d)return;const c=cat(d.cat);const p=[];
  if(d.snack)p.push(`<b>Закуска:</b> ${esc(d.snack)}`);
  if(d.ing?.length)p.push(`<b>Состав:</b> ${d.ing.map(esc).join(', ')}`);
  if(d.recipe)p.push(`<b>Рецепт:</b> ${esc(d.recipe)}`);
  if(d.cal!=null)p.push(`<b>Калории:</b> ≈${d.cal} ккал`);
  p.push(`<b>≈ в пиве:</b> ${beer(d).toFixed(1)}`);
  $('#modal-body').innerHTML=`<div class="big-emoji">${d.emoji}</div><h3>${esc(d.name)}</h3><p class="muted">${c.name} · ${d.abv}%</p><div class="extra">${p.join('<br>')}</div>`;
}

// ===== ТЕМЫ =====
$('#open-themes').onclick=()=>{
  const b=$('#modal-body');
  b.innerHTML=`<h3>Темы</h3><div class="theme-grid">
    <button class="theme-tile ${S.theme===null?'active':''}" data-t=""><div class="big">🎲</div><div>Все</div></button>
    ${THEMES.map(t=>`<button class="theme-tile ${S.theme===t.id?'active':''}" data-t="${t.id}"><div class="big">${t.emoji}</div><div>${t.name}</div></button>`).join('')}
  </div>`;
  openModal();
  b.querySelectorAll('[data-t]').forEach(x=>x.onclick=()=>{S.theme=x.dataset.t||null;save();refreshBadge();reset();closeModal()});
};

// ===== КОЛЛЕКЦИЯ =====
function renderCollection(){
  const a=all(),tot=a.length,op=S.col.opened.length,pct=tot?op/tot:0;
  $('#ring-count').textContent=op;
  $('#ring-total').textContent=tot;
  $('#ring-fg').style.strokeDashoffset=327*(1-pct);
  $('#stats-grid').innerHTML=`
    <div class="stat-card"><div class="stat-num">${S.totals.spins||0}</div><div class="stat-label">спинов</div></div>
    <div class="stat-card"><div class="stat-num">${Object.keys(S.col.ach).length}</div><div class="stat-label">ачивок</div></div>
    <div class="stat-card"><div class="stat-num">${(S.log[today()]||{}).count||0}</div><div class="stat-label">сегодня</div></div>`;
  $('#ach-grid').innerHTML=ACHS.map(x=>{const u=!!S.col.ach[x.id];return`<div class="ach ${u?'unlocked':''}"><div class="big">${x.emoji}</div><div class="name">${x.name}</div><div class="desc">${x.desc}</div></div>`}).join('');
  $('#opened-list').innerHTML=a.filter(d=>S.col.opened.includes(d.id)).map(d=>{const c=cat(d.cat);return`<div class="list-item"><div class="grow"><div class="title">${d.emoji} ${esc(d.name)}</div><div class="sub">${c.name}</div></div></div>`}).join('')||'<div class="empty">Пока пусто</div>';
}

// ===== ПРОФИЛЬ =====
function renderProfile(){
  const spins=S.totals.spins||0;
  const lvl=getLevel(spins);

  $('#hero-avatar').textContent=lvl.cur.emoji;
  $('#hero-title').textContent=lvl.cur.title;
  $('#hero-level').textContent=lvl.idx;
  if(lvl.next){
    const range=lvl.next.min-lvl.cur.min;
    const done=spins-lvl.cur.min;
    const pct=Math.min(100,Math.round(done/range*100));
    $('#hero-sub').textContent=`До «${lvl.next.title}» ещё ${lvl.next.min-spins}`;
    $('#level-fill').style.width=pct+'%';
    $('#level-text').textContent=`${done} / ${range}`;
  } else {
    $('#hero-sub').textContent='Максимальный уровень!';
    $('#level-fill').style.width='100%';
    $('#level-text').textContent='MAX';
  }

  $('#p-total').textContent=spins;
  $('#p-today').textContent=(S.log[today()]||{}).count||0;
  $('#p-opened').textContent=S.col.opened.length;

  const counts={};
  S.hist.forEach(e=>{if(e.cid)counts[e.cid]=(counts[e.cid]||0)+1});
  let topId=null,topN=0;
  for(const id in counts){if(counts[id]>topN){topN=counts[id];topId=id}}
  if(topId){
    const c=cat(topId);
    $('#top-cat').hidden=false;
    $('#top-cat-emoji').textContent=c.emoji;
    $('#top-cat-name').textContent=c.name;
    $('#top-cat-count').textContent=topN;
  } else {
    $('#top-cat').hidden=true;
  }

  $('#cat-progress').innerHTML=CATS.map(c=>{
    const total=all().filter(d=>d.cat===c.id).length;
    const opened=all().filter(d=>d.cat===c.id&&S.col.opened.includes(d.id)).length;
    const pct=total?Math.round(opened/total*100):0;
    return `<div class="cat-row">
      <div class="cat-row-emoji">${c.emoji}</div>
      <div class="cat-row-name">${c.name}</div>
      <div class="cat-row-bar"><div class="cat-row-fill" style="width:${pct}%"></div></div>
      <div class="cat-row-count">${opened}/${total}</div>
    </div>`;
  }).join('');

  const l=S.hist.slice(0,50);
  $('#history-list').innerHTML=l.map(e=>{
    const d=new Date(e.ts);
    const t=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    const dt=`${d.getDate()}.${String(d.getMonth()+1).padStart(2,'0')}`;
    const c=e.cid?cat(e.cid):null;
    const emoji=c?c.emoji:'🍹';
    return `<div class="list-item">
      <div style="font-size:22px;flex-shrink:0">${emoji}</div>
      <div class="grow">
        <div class="title">${esc(e.dname||'—')}</div>
        <div class="sub">${dt} ${t}${c?` · ${c.name}`:''}</div>
      </div>
    </div>`;
  }).join('')||'<div class="empty">Пока пусто</div>';
}

// ===== НАСТРОЙКИ =====
const stEl=$('#settings');
$('#open-settings').onclick=()=>{
  $('#set-tick').checked=S.s.tick;$('#set-result-sound').checked=S.s.res;$('#set-vibrate').checked=S.s.vib;
  $('#set-only-light').checked=S.s.light;$('#set-max-abv').value=S.s.maxAbv;$('#set-max-abv-val').textContent=S.s.maxAbv+'%';
  $('#set-water').value=S.s.water;stEl.hidden=false;
};
$('#settings-close').onclick=()=>stEl.hidden=true;
stEl.addEventListener('click',e=>{if(e.target===stEl)stEl.hidden=true});
$('#set-tick').onchange=e=>{S.s.tick=e.target.checked;save()};
$('#set-result-sound').onchange=e=>{S.s.res=e.target.checked;save()};
$('#set-vibrate').onchange=e=>{S.s.vib=e.target.checked;save()};
$('#set-only-light').onchange=e=>{S.s.light=e.target.checked;save();refreshBadge();reset()};
$('#set-max-abv').oninput=e=>{S.s.maxAbv=Number(e.target.value);$('#set-max-abv-val').textContent=e.target.value+'%';save();refreshBadge();reset()};
$('#set-water').onchange=e=>{S.s.water=Number(e.target.value)||0;save()};
$('#reset-data').onclick=()=>{if(!confirm('Удалить все данные?'))return;try{localStorage.removeItem(KEY)}catch{}S=def();save();location.reload()};

// ===== СМЕНА РЕЖИМА =====
function reopenOnboard(){
  stEl.hidden=true;
  $('#tabbar').hidden=true;
  showScreen('onboard');
}
$('#settings-change-mode').onclick=reopenOnboard;

// ===== ТОСТ =====
let tt;const te=$('#toast');
function toast(m){te.textContent=m;te.hidden=false;clearTimeout(tt);tt=setTimeout(()=>te.hidden=true,2500)}

// ===== КОНФЕТТИ =====
function confetti(){
  const el=$('#confetti');el.hidden=false;el.innerHTML='';
  const colors=['#f0c419','#ff8a00','#e74c3c','#9b59b6','#3498db','#2ecc71'];
  for(let i=0;i<40;i++){
    const p=document.createElement('div');p.className='confetti-piece';
    p.style.left=Math.random()*100+'%';p.style.top='-10px';
    p.style.background=colors[rnd(colors.length)];
    p.style.animationDelay=Math.random()*0.3+'s';
    p.style.transform=`rotate(${rnd(360)}deg)`;
    el.appendChild(p);
  }
  setTimeout(()=>{el.hidden=true;el.innerHTML=''},2500);
}

// ===== ОНБОРДИНГ =====
$$('#onboard .choice').forEach(b=>b.onclick=()=>{
  S.s.mode=b.dataset.mode;S.s.onboarded=true;save();
  $('#tabbar').hidden=false;
  showScreen('main');
});

// ===== СТАРТ =====
try{
  load();
  if(S.s.onboarded){
    $('#tabbar').hidden=false;
    showScreen('main');
  } else {
    showScreen('onboard');
  }
}catch(err){
  console.error('init',err);
  alert('Ошибка: '+err.message);
}