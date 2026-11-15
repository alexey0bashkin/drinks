/* icons.js — SVG-спрайт иконок v14 — видимые в обеих темах */
(function () {
  'use strict';

  const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe082"/><stop offset="55%" stop-color="#ffb300"/><stop offset="100%" stop-color="#e65100"/>
    </linearGradient>
    <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a6e34d"/><stop offset="100%" stop-color="#58cc02"/>
    </linearGradient>
    <linearGradient id="g-fire" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#ff3d00"/><stop offset="60%" stop-color="#ff9100"/><stop offset="100%" stop-color="#ffea00"/>
    </linearGradient>
    <linearGradient id="g-purple" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b388ff"/><stop offset="100%" stop-color="#651fff"/>
    </linearGradient>
    <linearGradient id="g-blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#80d8ff"/><stop offset="100%" stop-color="#0091ea"/>
    </linearGradient>
    <linearGradient id="g-pink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff80ab"/><stop offset="100%" stop-color="#f50057"/>
    </linearGradient>
    <linearGradient id="g-teal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#84ffff"/><stop offset="100%" stop-color="#00bfa5"/>
    </linearGradient>
  </defs>

  <!-- ===== КОКТЕЙЛЬ ===== -->
  <symbol id="icon-cocktail" viewBox="0 0 64 64">
    <path d="M10 10 L54 10 L32 34 Z" fill="url(#g-pink)" stroke="#7f0000" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M32 34 L32 52" stroke="#7f0000" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M20 52 L44 52" stroke="#7f0000" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="32" cy="12" rx="14" ry="3" fill="rgba(255,255,255,.55)"/>
    <circle cx="40" cy="16" r="3.5" fill="#ffeb3b" stroke="#7f5f00" stroke-width=".9"/>
    <circle cx="40" cy="16" r="1.4" fill="#fff9c4"/>
    <path d="M46 6 L50 2" stroke="#5d4037" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="44" cy="10" r="2" fill="#e53935" stroke="#7f0000" stroke-width=".6"/>
    <path d="M14 12 L18 8" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="20" cy="14" rx="3" ry="2" fill="#66bb6a" stroke="#2e7d32" stroke-width=".6" transform="rotate(-30 20 14)"/>
  </symbol>

  <!-- ===== ПИВО ===== -->
  <symbol id="icon-beer" viewBox="0 0 64 64">
    <path d="M14 20 L14 52 Q14 56 18 56 L42 56 Q46 56 46 52 L46 20 Z" fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8"/>
    <path d="M46 26 Q54 26 54 34 Q54 42 46 42" fill="none" stroke="#7f3300" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M14 20 L46 20 L46 26 L14 26 Z" fill="#fff3c4" stroke="#7f5f00" stroke-width="1"/>
    <circle cx="20" cy="18" r="3" fill="#fff" stroke="#7f5f00" stroke-width=".6"/>
    <circle cx="26" cy="15" r="4" fill="#fff" stroke="#7f5f00" stroke-width=".6"/>
    <circle cx="34" cy="16" r="3.5" fill="#fff" stroke="#7f5f00" stroke-width=".6"/>
    <circle cx="40" cy="18" r="3" fill="#fff" stroke="#7f5f00" stroke-width=".6"/>
    <circle cx="18" cy="30" r="1.2" fill="rgba(255,255,255,.9)"/>
    <circle cx="24" cy="40" r="1" fill="rgba(255,255,255,.9)"/>
    <circle cx="30" cy="48" r="1.3" fill="rgba(255,255,255,.9)"/>
    <circle cx="36" cy="36" r="1" fill="rgba(255,255,255,.9)"/>
    <circle cx="40" cy="46" r="1.1" fill="rgba(255,255,255,.9)"/>
  </symbol>

  <!-- ===== СОДА ===== -->
  <symbol id="icon-soda" viewBox="0 0 64 64">
    <path d="M16 18 L48 18 L44 54 Q44 56 42 56 L22 56 Q20 56 20 54 Z" fill="url(#g-blue)" stroke="#013a63" stroke-width="1.8"/>
    <path d="M16 18 L48 18 L47 24 L17 24 Z" fill="rgba(255,255,255,.6)" stroke="#013a63" stroke-width=".8"/>
    <path d="M40 10 L34 30" stroke="#c62828" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M38 8 L44 8" stroke="#c62828" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="28" cy="34" r="2" fill="rgba(255,255,255,.9)"/>
    <circle cx="36" cy="40" r="1.5" fill="rgba(255,255,255,.9)"/>
    <circle cx="30" cy="46" r="1.8" fill="rgba(255,255,255,.9)"/>
  </symbol>

  <!-- ===== КУБИК ===== -->
  <symbol id="icon-dice" viewBox="0 0 64 64">
    <rect x="12" y="12" width="40" height="40" rx="8" fill="url(#g-purple)" stroke="#311b92" stroke-width="2"/>
    <circle cx="22" cy="22" r="3.5" fill="#fff"/>
    <circle cx="42" cy="22" r="3.5" fill="#fff"/>
    <circle cx="32" cy="32" r="3.5" fill="#fff"/>
    <circle cx="22" cy="42" r="3.5" fill="#fff"/>
    <circle cx="42" cy="42" r="3.5" fill="#fff"/>
  </symbol>

  <!-- ===== ОГОНЬ ===== -->
  <symbol id="icon-fire" viewBox="0 0 64 64">
    <path d="M32 6 C28 16 18 22 18 36 C18 48 24 56 32 58 C40 56 46 48 46 36 C46 26 40 22 36 14 C35 20 32 22 30 26 C28 20 30 14 32 6 Z" fill="url(#g-fire)" stroke="#7f1d00" stroke-width="1.6"/>
    <path d="M32 34 C30 40 26 42 26 48 C26 52 28 54 32 54 C36 54 38 52 38 48 C38 42 34 40 32 34 Z" fill="#ffea00"/>
  </symbol>

  <!-- ===== МОЛНИЯ ===== -->
  <symbol id="icon-bolt" viewBox="0 0 64 64">
    <path d="M36 4 L14 36 L28 36 L24 60 L50 26 L34 26 Z" fill="url(#g-gold)" stroke="#7f3300" stroke-width="2" stroke-linejoin="round"/>
  </symbol>

  <!-- ===== ЦЕЛЬ ===== -->
  <symbol id="icon-target" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="rgba(255,255,255,.15)" stroke="#b71c1c" stroke-width="3"/>
    <circle cx="32" cy="32" r="17" fill="#fff" stroke="#b71c1c" stroke-width="2"/>
    <circle cx="32" cy="32" r="9" fill="#e53935"/>
    <circle cx="32" cy="32" r="3.5" fill="#fff"/>
    <path d="M32 32 L50 14" stroke="#1a1a22" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M46 10 L54 14 L50 22" fill="#1a1a22"/>
  </symbol>

  <!-- ===== ПОДАРОК ===== -->
  <symbol id="icon-gift" viewBox="0 0 64 64">
    <rect x="10" y="24" width="44" height="30" rx="3" fill="url(#g-pink)" stroke="#7f0000" stroke-width="1.8"/>
    <rect x="8" y="18" width="48" height="10" rx="2" fill="url(#g-pink)" stroke="#7f0000" stroke-width="1.8"/>
    <rect x="28" y="18" width="8" height="36" fill="#fff59d" stroke="#7f5f00" stroke-width=".8"/>
    <path d="M32 18 C26 6 14 10 16 18 Z" fill="#fff59d" stroke="#7f5f00" stroke-width=".8"/>
    <path d="M32 18 C38 6 50 10 48 18 Z" fill="#fff59d" stroke="#7f5f00" stroke-width=".8"/>
    <circle cx="32" cy="18" r="3" fill="#ff8a65" stroke="#7f3300" stroke-width=".8"/>
  </symbol>

  <!-- ===== НАСТРОЙКИ ===== -->
  <symbol id="icon-settings" viewBox="0 0 64 64">
    <path d="M32 6 L36 6 L38 14 L42 16 L50 12 L54 18 L48 24 L48 28 L54 34 L50 40 L42 36 L38 38 L36 46 L32 46 L30 38 L26 36 L18 40 L14 34 L20 28 L20 24 L14 18 L18 12 L26 16 L30 14 Z"
          fill="#607d8b" stroke="#0d1b24" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="32" cy="26" r="7" fill="#fff" stroke="#0d1b24" stroke-width="1.6"/>
    <circle cx="32" cy="26" r="3" fill="#37474f"/>
  </symbol>

  <!-- ===== ЛУНА ===== -->
  <symbol id="icon-moon" viewBox="0 0 64 64">
    <path d="M42 8 C26 8 14 20 14 36 C14 48 22 56 34 56 C46 56 56 46 56 34 C50 40 42 42 34 40 C26 38 22 30 24 22 C25 18 28 14 32 12 C35 11 38 10 42 8 Z"
          fill="url(#g-blue)" stroke="#013a63" stroke-width="1.8"/>
    <circle cx="24" cy="20" r="1.5" fill="#fff"/>
    <circle cx="18" cy="30" r="1" fill="#fff"/>
  </symbol>

  <!-- ===== СОЛНЦЕ ===== -->
  <symbol id="icon-sun" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="12" fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8"/>
    <g stroke="#7f3300" stroke-width="3.2" stroke-linecap="round">
      <line x1="32" y1="6" x2="32" y2="14"/>
      <line x1="32" y1="50" x2="32" y2="58"/>
      <line x1="6" y1="32" x2="14" y2="32"/>
      <line x1="50" y1="32" x2="58" y2="32"/>
      <line x1="14" y1="14" x2="19" y2="19"/>
      <line x1="45" y1="45" x2="50" y2="50"/>
      <line x1="50" y1="14" x2="45" y2="19"/>
      <line x1="19" y1="45" x2="14" y2="50"/>
    </g>
  </symbol>

  <!-- ===== СЛОТЫ ===== -->
  <symbol id="icon-slots" viewBox="0 0 64 64">
    <rect x="8" y="16" width="48" height="34" rx="5" fill="url(#g-purple)" stroke="#311b92" stroke-width="2"/>
    <rect x="14" y="22" width="36" height="20" rx="3" fill="#fff" stroke="#311b92" stroke-width="1.2"/>
    <circle cx="22" cy="32" r="4" fill="#e53935"/>
    <circle cx="32" cy="32" r="4" fill="#43a047"/>
    <circle cx="42" cy="32" r="4" fill="#1e88e5"/>
    <rect x="26" y="10" width="12" height="8" rx="2" fill="#ffb300" stroke="#7f3300" stroke-width="1"/>
    <circle cx="50" cy="12" r="3" fill="#ffeb3b" stroke="#7f3300" stroke-width=".8"/>
  </symbol>

  <!-- ===== КОЛЕСО ===== -->
  <symbol id="icon-wheel" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="url(#g-teal)" stroke="#00332e" stroke-width="2"/>
    <g stroke="#fff" stroke-width="2">
      <line x1="32" y1="6" x2="32" y2="58"/>
      <line x1="6" y1="32" x2="58" y2="32"/>
      <line x1="13" y1="13" x2="51" y2="51"/>
      <line x1="51" y1="13" x2="13" y2="51"/>
    </g>
    <circle cx="32" cy="32" r="6" fill="#fff59d" stroke="#7f3300" stroke-width="1.6"/>
    <circle cx="32" cy="8" r="3" fill="#e53935" stroke="#7f0000" stroke-width=".8"/>
  </symbol>

  <!-- ===== КАРУСЕЛЬ ===== -->
  <symbol id="icon-carousel" viewBox="0 0 64 64">
    <ellipse cx="32" cy="52" rx="22" ry="4" fill="#90a4ae" stroke="#263238" stroke-width="1.2"/>
    <path d="M14 52 Q14 20 32 20 Q50 20 50 52" fill="none" stroke="#263238" stroke-width="3"/>
    <path d="M18 30 L46 30" stroke="#ffb300" stroke-width="4" stroke-linecap="round"/>
    <path d="M18 30 L18 26" stroke="#7f3300" stroke-width="3"/>
    <path d="M46 30 L46 26" stroke="#7f3300" stroke-width="3"/>
    <circle cx="32" cy="20" r="6" fill="url(#g-pink)" stroke="#7f0000" stroke-width="1.6"/>
    <circle cx="18" cy="22" r="4" fill="#4fc3f7" stroke="#013a63" stroke-width="1"/>
    <circle cx="46" cy="22" r="4" fill="#81c784" stroke="#1b5e20" stroke-width="1"/>
    <path d="M24 44 L24 52 M40 44 L40 52" stroke="#3e2723" stroke-width="2"/>
    <path d="M20 40 L44 40" stroke="#3e2723" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <!-- ===== ФИЛЬТРЫ — двухцветные, видны на любом фоне ===== -->
  <symbol id="icon-filters" viewBox="0 0 64 64">
    <rect x="6" y="6" width="52" height="52" rx="12" fill="rgba(127,127,127,.12)" stroke="#8a8a8a" stroke-width="1.6"/>
    <g stroke="#e8eaf0" stroke-width="3" stroke-linecap="round">
      <line x1="14" y1="20" x2="50" y2="20"/>
      <line x1="14" y1="32" x2="50" y2="32"/>
      <line x1="14" y1="44" x2="50" y2="44"/>
    </g>
    <g stroke="#1a1a22" stroke-width="1.6" stroke-linecap="round" opacity=".55">
      <line x1="14" y1="21.5" x2="50" y2="21.5"/>
      <line x1="14" y1="33.5" x2="50" y2="33.5"/>
      <line x1="14" y1="45.5" x2="50" y2="45.5"/>
    </g>
    <circle cx="24" cy="20" r="5.5" fill="url(#g-green)" stroke="#1a1a22" stroke-width="1.6"/>
    <circle cx="40" cy="32" r="5.5" fill="url(#g-gold)" stroke="#1a1a22" stroke-width="1.6"/>
    <circle cx="28" cy="44" r="5.5" fill="url(#g-pink)" stroke="#1a1a22" stroke-width="1.6"/>
  </symbol>

  <!-- ===== ЁЛКА ===== -->
  <symbol id="icon-tree" viewBox="0 0 64 64">
    <rect x="28" y="48" width="8" height="8" fill="#5d4037" stroke="#3e2723" stroke-width="1"/>
    <path d="M32 6 L18 24 L26 24 L12 42 L52 42 L38 24 L46 24 Z" fill="url(#g-green)" stroke="#1b5e20" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="32" cy="10" r="3" fill="#ffd54f" stroke="#7f3300" stroke-width=".8"/>
    <circle cx="22" cy="28" r="2.5" fill="#e53935" stroke="#7f0000" stroke-width=".5"/>
    <circle cx="42" cy="28" r="2.5" fill="#e53935" stroke="#7f0000" stroke-width=".5"/>
    <circle cx="28" cy="38" r="2.5" fill="#42a5f5" stroke="#013a63" stroke-width=".5"/>
    <circle cx="38" cy="38" r="2.5" fill="#42a5f5" stroke="#013a63" stroke-width=".5"/>
    <circle cx="32" cy="20" r="2.5" fill="#ffd54f" stroke="#7f3300" stroke-width=".5"/>
  </symbol>

  <!-- ===== БАР ===== -->
  <symbol id="icon-bar" viewBox="0 0 64 64">
    <path d="M26 6 L26 20 L22 26 L22 54 Q22 58 26 58 L38 58 Q42 58 42 54 L42 26 L38 20 L38 6 Z"
          fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8" stroke-linejoin="round"/>
    <rect x="28" y="2" width="8" height="6" rx="1" fill="#5d4037" stroke="#3e2723" stroke-width=".8"/>
    <rect x="24" y="30" width="16" height="14" rx="1" fill="#fff8e1" stroke="#7f3300" stroke-width="1"/>
    <path d="M26 44 L26 46 L38 46 L38 44 Z" fill="#7f3300"/>
    <circle cx="32" cy="37" r="3" fill="#e65100"/>
  </symbol>

  <!-- ===== ТРОФЕЙ ===== -->
  <symbol id="icon-trophy" viewBox="0 0 64 64">
    <path d="M18 10 L46 10 L46 22 Q46 34 32 34 Q18 34 18 22 Z" fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8"/>
    <path d="M18 14 L10 14 Q10 26 20 28" fill="none" stroke="#7f3300" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M46 14 L54 14 Q54 26 44 28" fill="none" stroke="#7f3300" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="28" y="34" width="8" height="12" fill="#ffb300" stroke="#7f3300" stroke-width="1"/>
    <rect x="20" y="46" width="24" height="6" rx="2" fill="#5d4037" stroke="#3e2723" stroke-width="1"/>
    <path d="M26 18 L30 26 L34 18" fill="none" stroke="#fff8e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>

  <!-- ===== ПРОФИЛЬ ===== -->
  <symbol id="icon-profile" viewBox="0 0 64 64">
    <circle cx="32" cy="22" r="12" fill="url(#g-blue)" stroke="#013a63" stroke-width="1.8"/>
    <path d="M10 56 Q10 38 32 38 Q54 38 54 56 Z" fill="url(#g-blue)" stroke="#013a63" stroke-width="1.8"/>
  </symbol>

  <!-- ===== РУЛЕТКА ===== -->
  <symbol id="icon-roulette" viewBox="0 0 64 64">
    <circle cx="32" cy="34" r="24" fill="url(#g-pink)" stroke="#7f0000" stroke-width="2"/>
    <g stroke="#fff" stroke-width="2">
      <line x1="32" y1="10" x2="32" y2="58"/>
      <line x1="8" y1="34" x2="56" y2="34"/>
      <line x1="15" y1="17" x2="49" y2="51"/>
      <line x1="49" y1="17" x2="15" y2="51"/>
    </g>
    <circle cx="32" cy="34" r="5" fill="#fff59d" stroke="#7f0000" stroke-width="1.6"/>
    <path d="M32 4 L36 12 L28 12 Z" fill="#1a1a22"/>
  </symbol>

  <!-- ===== ПОВТОР (двухцветный) ===== -->
  <symbol id="icon-repeat" viewBox="0 0 64 64">
    <g fill="none" stroke-linecap="round">
      <path d="M14 32 Q14 16 32 16 Q46 16 50 26" stroke="#1a1a22" stroke-width="6" opacity=".55"/>
      <path d="M50 32 Q50 48 32 48 Q18 48 14 38" stroke="#1a1a22" stroke-width="6" opacity=".55"/>
      <path d="M14 32 Q14 16 32 16 Q46 16 50 26" stroke="#e8eaf0" stroke-width="3.5"/>
      <path d="M50 32 Q50 48 32 48 Q18 48 14 38" stroke="#e8eaf0" stroke-width="3.5"/>
    </g>
    <path d="M44 18 L52 26 L44 30 Z" fill="#e8eaf0" stroke="#1a1a22" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M20 46 L12 38 L20 34 Z" fill="#e8eaf0" stroke="#1a1a22" stroke-width="1.2" stroke-linejoin="round"/>
  </symbol>

  <!-- ===== ПОДЕЛИТЬСЯ ===== -->
  <symbol id="icon-share" viewBox="0 0 64 64">
    <rect x="8" y="18" width="48" height="36" rx="6" fill="url(#g-purple)" stroke="#311b92" stroke-width="1.8"/>
    <circle cx="32" cy="38" r="11" fill="#fff" stroke="#311b92" stroke-width="1.2"/>
    <circle cx="32" cy="38" r="7" fill="#1a1a22"/>
    <circle cx="28" cy="34" r="2" fill="#fff"/>
    <rect x="24" y="10" width="16" height="8" rx="2" fill="#311b92"/>
    <circle cx="50" cy="26" r="2" fill="#fff59d"/>
  </symbol>

  <!-- ===== КРЕСТИК (двухцветный: тёмная подложка + светлый штрих) ===== -->
  <symbol id="icon-close" viewBox="0 0 64 64">
    <g stroke-linecap="round">
      <line x1="18" y1="18" x2="46" y2="46" stroke="#1a1a22" stroke-width="8"/>
      <line x1="46" y1="18" x2="18" y2="46" stroke="#1a1a22" stroke-width="8"/>
      <line x1="18" y1="18" x2="46" y2="46" stroke="#e8eaf0" stroke-width="5"/>
      <line x1="46" y1="18" x2="18" y2="46" stroke="#e8eaf0" stroke-width="5"/>
    </g>
  </symbol>

  <!-- ===== ПОИСК (двухцветный) ===== -->
  <symbol id="icon-search" viewBox="0 0 64 64">
    <g fill="none" stroke-linecap="round">
      <circle cx="28" cy="28" r="16" stroke="#1a1a22" stroke-width="7" opacity=".55"/>
      <line x1="40" y1="40" x2="54" y2="54" stroke="#1a1a22" stroke-width="8"/>
      <circle cx="28" cy="28" r="16" stroke="#e8eaf0" stroke-width="4"/>
      <line x1="40" y1="40" x2="54" y2="54" stroke="#e8eaf0" stroke-width="5"/>
    </g>
  </symbol>

  <!-- ===== ЭКСПОРТ (двухцветный) ===== -->
  <symbol id="icon-export" viewBox="0 0 64 64">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <g stroke="#1a1a22" stroke-width="7" opacity=".55">
        <path d="M32 8 L32 40"/><path d="M20 18 L32 8 L44 18"/>
        <path d="M12 40 L12 52 Q12 56 16 56 L48 56 Q52 56 52 52 L52 40"/>
      </g>
      <g stroke="#e8eaf0" stroke-width="4">
        <path d="M32 8 L32 40"/><path d="M20 18 L32 8 L44 18"/>
        <path d="M12 40 L12 52 Q12 56 16 56 L48 56 Q52 56 52 52 L52 40"/>
      </g>
    </g>
  </symbol>

  <!-- ===== ИМПОРТ (двухцветный) ===== -->
  <symbol id="icon-import" viewBox="0 0 64 64">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <g stroke="#1a1a22" stroke-width="7" opacity=".55">
        <path d="M32 40 L32 8"/><path d="M20 30 L32 40 L44 30"/>
        <path d="M12 40 L12 52 Q12 56 16 56 L48 56 Q52 56 52 52 L52 40"/>
      </g>
      <g stroke="#e8eaf0" stroke-width="4">
        <path d="M32 40 L32 8"/><path d="M20 30 L32 40 L44 30"/>
        <path d="M12 40 L12 52 Q12 56 16 56 L48 56 Q52 56 52 52 L52 40"/>
      </g>
    </g>
  </symbol>

  <!-- ===== КОРЗИНА (двухцветная) ===== -->
  <symbol id="icon-trash" viewBox="0 0 64 64">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <g stroke="#1a1a22" stroke-width="7" opacity=".55">
        <path d="M20 18 L44 18 L42 54 Q42 56 40 56 L24 56 Q22 56 22 54 Z"/>
        <line x1="14" y1="18" x2="50" y2="18"/>
        <line x1="26" y1="10" x2="38" y2="10"/>
      </g>
      <g stroke="#e8eaf0" stroke-width="3.5">
        <path d="M20 18 L44 18 L42 54 Q42 56 40 56 L24 56 Q22 56 22 54 Z"/>
        <line x1="14" y1="18" x2="50" y2="18"/>
        <line x1="26" y1="10" x2="38" y2="10"/>
        <line x1="28" y1="26" x2="28" y2="48" stroke-width="2.5"/>
        <line x1="36" y1="26" x2="36" y2="48" stroke-width="2.5"/>
      </g>
    </g>
  </symbol>

  <!-- ===== КАТЕГОРИИ ===== -->
  <symbol id="icon-cat-beer" viewBox="0 0 64 64"><use href="#icon-beer"/></symbol>
  <symbol id="icon-cat-cocktail" viewBox="0 0 64 64"><use href="#icon-cocktail"/></symbol>
  <symbol id="icon-cat-soft" viewBox="0 0 64 64"><use href="#icon-soda"/></symbol>

  <symbol id="icon-cat-wine" viewBox="0 0 64 64">
    <path d="M24 8 L40 8 L40 20 Q40 30 32 32 Q24 30 24 20 Z" fill="url(#g-pink)" stroke="#7f0000" stroke-width="1.8"/>
    <path d="M32 32 L32 52" stroke="#7f0000" stroke-width="3" stroke-linecap="round"/>
    <path d="M22 52 L42 52" stroke="#7f0000" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="32" cy="10" rx="8" ry="2" fill="rgba(255,255,255,.6)"/>
  </symbol>

  <symbol id="icon-cat-shot" viewBox="0 0 64 64">
    <path d="M20 20 L44 20 L40 52 L24 52 Z" fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8"/>
    <path d="M20 20 L44 20 L43 26 L21 26 Z" fill="rgba(255,255,255,.6)" stroke="#7f3300" stroke-width=".8"/>
    <circle cx="32" cy="34" r="2" fill="rgba(255,255,255,.85)"/>
  </symbol>

  <symbol id="icon-cat-coffee" viewBox="0 0 64 64">
    <path d="M14 24 L46 24 L44 48 Q44 54 38 54 L22 54 Q16 54 16 48 Z" fill="#8d6e63" stroke="#3e2723" stroke-width="1.8"/>
    <path d="M46 28 Q56 28 56 36 Q56 44 46 44" fill="none" stroke="#3e2723" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M24 14 Q26 18 24 22" stroke="#5d4037" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 12 Q34 18 32 22" stroke="#5d4037" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M40 14 Q42 18 40 22" stroke="#5d4037" stroke-width="2" fill="none" stroke-linecap="round"/>
  </symbol>

  <symbol id="icon-cat-tea" viewBox="0 0 64 64">
    <path d="M16 26 L44 26 L42 50 Q42 54 38 54 L22 54 Q18 54 18 50 Z" fill="url(#g-teal)" stroke="#00332e" stroke-width="1.8"/>
    <ellipse cx="30" cy="26" rx="14" ry="3" fill="rgba(255,255,255,.6)"/>
    <path d="M44 30 Q54 30 54 38 Q54 46 44 46" fill="none" stroke="#00332e" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M26 14 L30 20 M34 14 L38 20" stroke="#00695c" stroke-width="2" stroke-linecap="round"/>
  </symbol>

  <symbol id="icon-cat-energy" viewBox="0 0 64 64">
    <rect x="18" y="10" width="28" height="46" rx="6" fill="url(#g-green)" stroke="#1b5e20" stroke-width="1.8"/>
    <path d="M34 18 L26 34 L32 34 L30 46 L38 30 L32 30 Z" fill="#fff59d" stroke="#1b5e20" stroke-width=".8"/>
    <rect x="24" y="6" width="16" height="6" rx="2" fill="#9e9e9e" stroke="#424242" stroke-width=".8"/>
  </symbol>

  <symbol id="icon-cat-cider" viewBox="0 0 64 64">
    <path d="M20 16 L44 16 L42 52 Q42 56 38 56 L26 56 Q22 56 22 52 Z" fill="url(#g-gold)" stroke="#7f3300" stroke-width="1.8"/>
    <path d="M20 16 L44 16 L43 22 L21 22 Z" fill="rgba(255,255,255,.55)" stroke="#7f3300" stroke-width=".8"/>
    <ellipse cx="32" cy="16" rx="12" ry="2.5" fill="#a5d6a7" stroke="#1b5e20" stroke-width=".8"/>
    <circle cx="30" cy="34" r="1.5" fill="rgba(255,255,255,.9)"/>
    <circle cx="36" cy="42" r="1.3" fill="rgba(255,255,255,.9)"/>
  </symbol>
</svg>`;

  const STYLES = `
    .svg-icon { display:inline-block; vertical-align:-0.15em; flex-shrink:0;
                filter: drop-shadow(0 1px 1px rgba(0,0,0,.25)); }
    .svg-emoji { display:inline-flex; align-items:center; vertical-align:-0.15em; line-height:1; }
    .svg-emoji .svg-icon { display:block; }
    [data-theme="light"] .svg-icon { filter: drop-shadow(0 1px 1px rgba(0,0,0,.18)); }
  `;

  function injectSprite() {
    if (!document.getElementById('svg-sprite')) {
      const wrap = document.createElement('div');
      wrap.id = 'svg-sprite';
      wrap.innerHTML = SPRITE;
      document.body.insertBefore(wrap, document.body.firstChild);
    }
    if (!document.getElementById('svg-icon-styles')) {
      const st = document.createElement('style');
      st.id = 'svg-icon-styles';
      st.textContent = STYLES;
      document.head.appendChild(st);
    }
  }

  function icon(name, cls, size) {
    const s = size || '1em';
    const c = cls || '';
    return `<svg class="svg-icon ${c}" width="${s}" height="${s}" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`;
  }

  function hydrateIcons(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-icon]').forEach(el => {
      if (el.dataset.iconDone === '1') return;
      const name = el.dataset.icon;
      const size = el.dataset.iconSize || '1em';
      el.innerHTML = icon(name, '', size);
      el.dataset.iconDone = '1';
    });
  }

  const EMOJI_MAP = {
    '🍹':'cocktail','🍺':'beer','🥤':'soda','🎲':'dice','🔥':'fire',
    '⚡':'bolt','⚡️':'bolt','🎯':'target','🎁':'gift',
    '⚙️':'settings','⚙':'settings','🌙':'moon','☀️':'sun','☀':'sun',
    '🎰':'slots','🎡':'wheel','🎠':'carousel','🎚':'filters','🎚️':'filters',
    '🎄':'tree','🍾':'bar','🏆':'trophy','👤':'profile',
    '↻':'repeat','📸':'share','✕':'close','📤':'export','📥':'import',
    '🗑':'trash','🗑️':'trash',
    '🍷':'cat-wine','🍸':'cat-cocktail','🥃':'cat-shot','🧃':'cat-soft',
    '☕':'cat-coffee','☕️':'cat-coffee','🍵':'cat-tea','🍏':'cat-cider',
  };

  function replaceEmojiNodes(root) {
    const scope = root || document;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const t = node.nodeValue.trim();
        if (!t) return NodeFilter.FILTER_REJECT;
        if (t.length > 3) return NodeFilter.FILTER_REJECT;
        return EMOJI_MAP[t] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(node => {
      const t = node.nodeValue.trim();
      const id = EMOJI_MAP[t];
      if (!id) return;
      const p = node.parentElement;
      if (!p) return;
      const tag = p.tagName.toLowerCase();
      if (tag === 'svg' || tag === 'use' || tag === 'script' || tag === 'style') return;

      const span = document.createElement('span');
      span.className = 'svg-emoji';
      span.innerHTML = icon(id, '', '1em');
      const before = node.nodeValue.match(/^\s*/)[0];
      const after = node.nodeValue.match(/\s*$/)[0];
      if (before) span.insertAdjacentText('beforebegin', before);
      if (after) span.insertAdjacentText('afterend', after);
      node.parentNode.replaceChild(span, node);
    });
  }

  window.Icons = {
    icon, injectSprite, hydrateIcons, replaceEmojiNodes, EMOJI_MAP,
    applyAll(root) { hydrateIcons(root); replaceEmojiNodes(root); }
  };

  injectSprite();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      hydrateIcons();
      replaceEmojiNodes();
      const observer = new MutationObserver(muts => {
        muts.forEach(m => {
          m.addedNodes.forEach(n => {
            if (n.nodeType === 1) { hydrateIcons(n); replaceEmojiNodes(n); }
            else if (n.nodeType === 3 && n.parentElement) replaceEmojiNodes(n.parentElement);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    hydrateIcons();
    replaceEmojiNodes();
  }
})();