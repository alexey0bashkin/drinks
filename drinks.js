// ============================================================
// БАЗА ДАННЫХ НАПИТКОВ v12 «ENCYCLOPEDIA»
// Нейтральная, без брендов. Глобальные: CATS, DRINKS, THEMES
// Формат: { id, cat, name, emoji, abv, cal?, snack?, ing?, recipe? }
// ============================================================

// ===== КАТЕГОРИИ =====
const CATS = [
  { id: 'beer',      name: 'Пиво',           emoji: '🍺', color: '#F5A623' },
  { id: 'wine',      name: 'Вино',           emoji: '🍷', color: '#C0392B' },
  { id: 'cocktail',  name: 'Коктейли',       emoji: '🍸', color: '#9B59B6' },
  { id: 'strong',    name: 'Крепкое',        emoji: '🥃', color: '#E67E22' },
  { id: 'liqueur',   name: 'Ликёры',         emoji: '🍯', color: '#E91E63' },
  { id: 'aperitif',  name: 'Аперитивы',      emoji: '🍹', color: '#FF5722' },
  { id: 'cider',     name: 'Сидры и меды',   emoji: '🍎', color: '#8BC34A' },
  { id: 'shots',     name: 'Шоты',           emoji: '🥂', color: '#1ABC9C' },
  { id: 'soft',      name: 'Безалкогольное', emoji: '🥤', color: '#3498DB' },
];

// ===== НАПИТКИ =====
const DRINKS = [
  // ============================================================
  // ПИВО (Beer)
  // ============================================================
  // --- Лагеры (низовое брожение) ---
  { id: 'lager', cat: 'beer', name: 'Лагер', emoji: '🍺', abv: 4.5, cal: 210, snack: 'Орешки, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'light-lager', cat: 'beer', name: 'Светлый лагер', emoji: '🍺', abv: 4.2, cal: 195, snack: 'Чипсы, сухарики', ing: ['солод', 'хмель', 'вода'] },
  { id: 'pilsner', cat: 'beer', name: 'Пильзнер', emoji: '🍺', abv: 4.8, cal: 215, snack: 'Рыба, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'dark-lager', cat: 'beer', name: 'Тёмный лагер', emoji: '🍺', abv: 5.0, cal: 230, snack: 'Мясо, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'strong-lager', cat: 'beer', name: 'Крепкий лагер', emoji: '🍺', abv: 8.0, cal: 320, snack: 'Мясо, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'non-alc-lager', cat: 'beer', name: 'Безалкогольный лагер', emoji: '🍺', abv: 0, cal: 80, snack: 'Орешки', ing: ['солод', 'хмель', 'вода'] },
  { id: 'vienna-lager', cat: 'beer', name: 'Венский лагер', emoji: '🍺', abv: 5.0, cal: 220, snack: 'Сосиски', ing: ['солод', 'хмель'] },
  { id: 'munich-dunkel', cat: 'beer', name: 'Мюнхенский дункель', emoji: '🍺', abv: 5.0, cal: 240, snack: 'Мясо', ing: ['солод', 'хмель'] },
  { id: 'bock', cat: 'beer', name: 'Бок', emoji: '🍺', abv: 6.5, cal: 280, snack: 'Сыр, мясо', ing: ['солод', 'хмель'] },
  { id: 'doppelbock', cat: 'beer', name: 'Доппельбок', emoji: '🍺', abv: 7.5, cal: 320, snack: 'Мясо', ing: ['солод', 'хмель'] },
  { id: 'eisbock', cat: 'beer', name: 'Айсбок', emoji: '🍺', abv: 9.0, cal: 350, snack: 'Мясо, сыр', ing: ['солод', 'хмель'] },
  // --- Эли (верховое брожение) ---
  { id: 'pale-ale', cat: 'beer', name: 'Пэйл эль', emoji: '🍺', abv: 5.0, cal: 220, snack: 'Бургер', ing: ['солод', 'хмель'] },
  { id: 'ipa', cat: 'beer', name: 'IPA', emoji: '🍺', abv: 6.5, cal: 230, snack: 'Бургер, карри', ing: ['солод', 'хмель', 'вода'] },
  { id: 'neipa', cat: 'beer', name: 'NEIPA', emoji: '🍺', abv: 6.5, cal: 240, snack: 'Бургер', ing: ['солод', 'хмель'] },
  { id: 'apa', cat: 'beer', name: 'APA', emoji: '🍺', abv: 5.5, cal: 225, snack: 'Сыр', ing: ['солод', 'хмель'] },
  { id: 'amber-ale', cat: 'beer', name: 'Эмбер эль', emoji: '🍺', abv: 5.5, cal: 230, snack: 'Мясо', ing: ['солод', 'хмель'] },
  { id: 'brown-ale', cat: 'beer', name: 'Браун эль', emoji: '🍺', abv: 5.5, cal: 235, snack: 'Орехи', ing: ['солод', 'хмель'] },
  { id: 'porter', cat: 'beer', name: 'Портер', emoji: '🍺', abv: 6.5, cal: 260, snack: 'Шоколад', ing: ['солод', 'хмель', 'вода'] },
  { id: 'stout', cat: 'beer', name: 'Стаут', emoji: '🍺', abv: 6.0, cal: 250, snack: 'Шоколад, бекон', ing: ['жареный солод', 'хмель', 'вода'] },
  { id: 'imperial-stout', cat: 'beer', name: 'Имперский стаут', emoji: '🍺', abv: 9.0, cal: 320, snack: 'Шоколад', ing: ['солод', 'хмель'] },
  { id: 'milk-stout', cat: 'beer', name: 'Милк стаут', emoji: '🍺', abv: 5.0, cal: 260, snack: 'Десерт', ing: ['солод', 'лактоза'] },
  { id: 'oatmeal-stout', cat: 'beer', name: 'Овсяный стаут', emoji: '🍺', abv: 5.5, cal: 255, snack: 'Овсянка', ing: ['солод', 'овёс'] },
  { id: 'weissbier', cat: 'beer', name: 'Пшеничное пиво', emoji: '🍺', abv: 5.4, cal: 230, snack: 'Банан, сосиски', ing: ['пшеничный солод', 'хмель'] },
  { id: 'witbier', cat: 'beer', name: 'Витбир', emoji: '🍺', abv: 4.8, cal: 215, snack: 'Апельсин', ing: ['пшеница', 'кориандр'] },
  { id: 'hefeweizen', cat: 'beer', name: 'Хефевайцен', emoji: '🍺', abv: 5.4, cal: 230, snack: 'Сосиски', ing: ['пшеница', 'дрожжи'] },
  { id: 'saison', cat: 'beer', name: 'Сезон', emoji: '🍺', abv: 6.0, cal: 230, snack: 'Сыр', ing: ['солод', 'специи'] },
  { id: 'lambic', cat: 'beer', name: 'Ламбик', emoji: '🍺', abv: 5.0, cal: 200, snack: 'Фрукты', ing: ['солод', 'дикие дрожжи'] },
  { id: 'gueuze', cat: 'beer', name: 'Гёз', emoji: '🍺', abv: 5.5, cal: 210, snack: 'Сыр', ing: ['ламбик'] },
  { id: 'fruit-lambic', cat: 'beer', name: 'Фруктовый ламбик', emoji: '🍺', abv: 4.5, cal: 190, snack: 'Фрукты', ing: ['ламбик', 'фрукты'] },
  // --- Крафт ---
  { id: 'craft-beer', cat: 'beer', name: 'Крафтовое пиво', emoji: '🍺', abv: 6.0, cal: 230, snack: 'Сыр, мясо', ing: ['солод', 'хмель', 'дрожжи'] },
  { id: 'sour-beer', cat: 'beer', name: 'Кислое пиво', emoji: '🍺', abv: 4.5, cal: 180, snack: 'Фрукты', ing: ['солод', 'бактерии'] },
  { id: 'smoked-beer', cat: 'beer', name: 'Копчёное пиво', emoji: '🍺', abv: 5.5, cal: 230, snack: 'Копчёности', ing: ['копчёный солод'] },
  // --- Сидры в пивной категории (для совместимости) ---
  { id: 'cider-beer', cat: 'beer', name: 'Сидр', emoji: '🍎', abv: 4.5, cal: 190, snack: 'Фрукты, сыр', ing: ['яблочный сок', 'дрожжи'] },

  // ============================================================
  // ВИНО (Wine) — по классификации ТР ЕАЭС
  // ============================================================
  // --- Тихие виноградные вина ---
  { id: 'red-wine', cat: 'wine', name: 'Красное вино', emoji: '🍷', abv: 12, cal: 125, snack: 'Сыр, мясо', ing: ['виноград'] },
  { id: 'dry-red', cat: 'wine', name: 'Красное сухое', emoji: '🍷', abv: 12, cal: 120, snack: 'Мясо, сыр', ing: ['виноград'] },
  { id: 'semi-dry-red', cat: 'wine', name: 'Красное полусухое', emoji: '🍷', abv: 12, cal: 125, snack: 'Мясо', ing: ['виноград'] },
  { id: 'semi-sweet-red', cat: 'wine', name: 'Красное полусладкое', emoji: '🍷', abv: 11, cal: 130, snack: 'Шоколад, фрукты', ing: ['виноград'] },
  { id: 'sweet-red', cat: 'wine', name: 'Красное сладкое', emoji: '🍷', abv: 11, cal: 140, snack: 'Десерт', ing: ['виноград'] },
  { id: 'white-wine', cat: 'wine', name: 'Белое вино', emoji: '🍷', abv: 11, cal: 120, snack: 'Рыба, фрукты', ing: ['виноград'] },
  { id: 'dry-white', cat: 'wine', name: 'Белое сухое', emoji: '🍷', abv: 11, cal: 115, snack: 'Рыба, морепродукты', ing: ['виноград'] },
  { id: 'semi-dry-white', cat: 'wine', name: 'Белое полусухое', emoji: '🍷', abv: 11, cal: 120, snack: 'Рыба', ing: ['виноград'] },
  { id: 'semi-sweet-white', cat: 'wine', name: 'Белое полусладкое', emoji: '🍷', abv: 11, cal: 125, snack: 'Фрукты', ing: ['виноград'] },
  { id: 'sweet-white', cat: 'wine', name: 'Белое сладкое', emoji: '🍷', abv: 11, cal: 135, snack: 'Десерт', ing: ['виноград'] },
  { id: 'rose-wine', cat: 'wine', name: 'Розовое вино', emoji: '🍷', abv: 11, cal: 120, snack: 'Фрукты, сыр', ing: ['виноград'] },
  { id: 'orange-wine', cat: 'wine', name: 'Оранжевое вино', emoji: '🍷', abv: 12, cal: 125, snack: 'Сыр', ing: ['виноград', 'кожица'] },
  { id: 'yellow-wine', cat: 'wine', name: 'Жёлтое вино', emoji: '🍷', abv: 13, cal: 130, snack: 'Орехи', ing: ['виноград'] },
  // --- Игристые ---
  { id: 'sparkling', cat: 'wine', name: 'Игристое вино', emoji: '🥂', abv: 12, cal: 130, snack: 'Икра, фрукты', ing: ['виноград'] },
  { id: 'champagne', cat: 'wine', name: 'Шампанское', emoji: '🥂', abv: 12, cal: 130, snack: 'Икра, фрукты', ing: ['виноград'] },
  { id: 'prosecco', cat: 'wine', name: 'Просекко', emoji: '🥂', abv: 11, cal: 120, snack: 'Фрукты', ing: ['виноград'] },
  { id: 'cava', cat: 'wine', name: 'Кава', emoji: '🥂', abv: 11, cal: 120, snack: 'Тапас', ing: ['виноград'] },
  { id: 'sekt', cat: 'wine', name: 'Зект', emoji: '🥂', abv: 11, cal: 120, snack: 'Фрукты', ing: ['виноград'] },
  { id: 'pet-nat', cat: 'wine', name: 'Пет-нат', emoji: '🥂', abv: 11, cal: 115, snack: 'Сыр', ing: ['виноград'] },
  { id: 'lambrusco', cat: 'wine', name: 'Ламбруско', emoji: '🥂', abv: 8, cal: 110, snack: 'Пицца', ing: ['виноград'] },
  // --- Креплёные (fortified) ---
  { id: 'port', cat: 'wine', name: 'Портвейн', emoji: '🍷', abv: 18, cal: 160, snack: 'Шоколад, орехи', ing: ['виноград', 'спирт'] },
  { id: 'madeira', cat: 'wine', name: 'Мадера', emoji: '🍷', abv: 18, cal: 160, snack: 'Орехи', ing: ['виноград', 'спирт'] },
  { id: 'sherry-dry', cat: 'wine', name: 'Херес сухой', emoji: '🍷', abv: 15, cal: 130, snack: 'Оливки', ing: ['виноград', 'спирт'] },
  { id: 'sherry-sweet', cat: 'wine', name: 'Херес сладкий', emoji: '🍷', abv: 17, cal: 150, snack: 'Десерт', ing: ['виноград', 'спирт'] },
  { id: 'marsala', cat: 'wine', name: 'Марсала', emoji: '🍷', abv: 17, cal: 150, snack: 'Десерт', ing: ['виноград', 'спирт'] },
  { id: 'muscat', cat: 'wine', name: 'Мускат', emoji: '🍷', abv: 16, cal: 150, snack: 'Фрукты', ing: ['виноград', 'спирт'] },
  { id: 'cahors', cat: 'wine', name: 'Кагор', emoji: '🍷', abv: 16, cal: 150, snack: 'Шоколад', ing: ['виноград', 'спирт'] },
  { id: 'banyuls', cat: 'wine', name: 'Баньюльс', emoji: '🍷', abv: 16, cal: 150, snack: 'Шоколад', ing: ['виноград', 'спирт'] },
  // --- Ароматизированные ---
  { id: 'vermouth-wine', cat: 'wine', name: 'Вермут', emoji: '🍷', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'sangria-wine', cat: 'wine', name: 'Сангрия', emoji: '🍷', abv: 10, cal: 140, snack: 'Фрукты', ing: ['вино', 'фрукты', 'содовая'] },
  // --- Плодовые (fruit wine) ---
  { id: 'apple-wine', cat: 'wine', name: 'Яблочное вино', emoji: '🍎', abv: 8, cal: 110, snack: 'Сыр', ing: ['яблоки'] },
  { id: 'pear-wine', cat: 'wine', name: 'Грушевое вино', emoji: '🍐', abv: 8, cal: 110, snack: 'Сыр', ing: ['груши'] },
  { id: 'berry-wine', cat: 'wine', name: 'Ягодное вино', emoji: '🍓', abv: 10, cal: 120, snack: 'Десерт', ing: ['ягоды'] },
  { id: 'pomegranate-wine', cat: 'wine', name: 'Гранатовое вино', emoji: '🍷', abv: 12, cal: 125, snack: 'Мясо', ing: ['гранат'] },
  // --- Ликёрные вина (по ТР) ---
  { id: 'liqueur-wine', cat: 'wine', name: 'Ликёрное вино', emoji: '🍷', abv: 16, cal: 160, snack: 'Десерт', ing: ['виноград', 'сахар'] },
  { id: 'ice-wine', cat: 'wine', name: 'Ледяное вино', emoji: '🍷', abv: 10, cal: 150, snack: 'Десерт', ing: ['виноград', 'мороз'] },
  { id: 'straw-wine', cat: 'wine', name: 'Соломенное вино', emoji: '🍷', abv: 14, cal: 160, snack: 'Десерт', ing: ['виноград', 'сушка'] },

  // ============================================================
  // КОКТЕЙЛИ (Cocktails) — классика и современность
  // ============================================================
  // --- Лонг-дринки ---
  { id: 'mojito', cat: 'cocktail', name: 'Мохито', emoji: '🍸', abv: 10, cal: 170, snack: 'Лайм', ing: ['ром', 'лайм', 'мята', 'сахар', 'сода'], recipe: 'Мята+лайм+сахар, лёд, ром, сода.' },
  { id: 'gin-tonic', cat: 'cocktail', name: 'Джин-тоник', emoji: '🍸', abv: 10, cal: 140, snack: 'Лайм', ing: ['джин', 'тоник', 'лайм'], recipe: '1:3, лёд, лайм.' },
  { id: 'rum-cola', cat: 'cocktail', name: 'Ром-кола', emoji: '🍸', abv: 10, cal: 150, snack: 'Лайм', ing: ['ром', 'кола', 'лайм'], recipe: '1:3, лёд.' },
  { id: 'screwdriver', cat: 'cocktail', name: 'Отвёртка', emoji: '🍸', abv: 10, cal: 140, snack: 'Апельсин', ing: ['водка', 'апельсиновый сок'], recipe: '1:2, лёд.' },
  { id: 'moscow-mule', cat: 'cocktail', name: 'Московский мул', emoji: '🍸', abv: 12, cal: 160, snack: 'Лайм', ing: ['водка', 'имбирь', 'лайм', 'сода'], recipe: 'Водка+имбирный эль+лайм.' },
  { id: 'tequila-sunrise', cat: 'cocktail', name: 'Текила Санрайз', emoji: '🍸', abv: 12, cal: 160, snack: 'Апельсин', ing: ['текила', 'апельсин', 'гренадин'], recipe: 'Текила+сок+гренадин.' },
  { id: 'paloma', cat: 'cocktail', name: 'Палома', emoji: '🍸', abv: 10, cal: 140, snack: 'Грейпфрут', ing: ['текила', 'грейпфрут', 'сода'], recipe: 'Текила+сок+сода.' },
  { id: 'dark-n-stormy', cat: 'cocktail', name: 'Дарк энд Шторми', emoji: '🍸', abv: 12, cal: 160, snack: 'Лайм', ing: ['ром', 'имбирь', 'лайм'], recipe: 'Ром+имбирный эль+лайм.' },
  { id: 'long-island', cat: 'cocktail', name: 'Лонг-Айленд', emoji: '🍸', abv: 22, cal: 220, snack: 'Лимон', ing: ['водка', 'джин', 'ром', 'текила', 'кола'], recipe: 'Все по 15 мл, кола, лёд.' },
  { id: 'aperol-spritz', cat: 'cocktail', name: 'Апероль шприц', emoji: '🍸', abv: 11, cal: 180, snack: 'Брускетта', ing: ['апероль', 'просекко', 'сода'], recipe: '3:2:1, лёд, апельсин.' },
  { id: 'bloody-mary', cat: 'cocktail', name: 'Кровавая Мэри', emoji: '🍸', abv: 10, cal: 120, snack: 'Сельдерей', ing: ['водка', 'томат', 'специи'], recipe: 'Водка+томатный сок+специи.' },
  { id: 'pina-colada', cat: 'cocktail', name: 'Пина Колада', emoji: '🍸', abv: 12, cal: 250, snack: 'Ананас', ing: ['ром', 'кокос', 'ананас'], recipe: 'Ром+кокосовое молоко+ананасовый сок, лёд.' },
  { id: 'mai-tai', cat: 'cocktail', name: 'Май Тай', emoji: '🍸', abv: 18, cal: 200, snack: 'Ананас', ing: ['ром', 'апельсин', 'миндаль'], recipe: 'Ром+соки+сироп.' },
  { id: 'singapore-sling', cat: 'cocktail', name: 'Сингапурский слинг', emoji: '🍸', abv: 15, cal: 190, snack: 'Ананас', ing: ['джин', 'черри', 'апельсин'], recipe: 'Джин+ликёры+соки.' },
  // --- Шорты (short drinks) ---
  { id: 'negroni', cat: 'cocktail', name: 'Негрони', emoji: '🍸', abv: 24, cal: 200, snack: 'Оливки', ing: ['джин', 'кампари', 'вермут'], recipe: '1:1:1, лёд, апельсин.' },
  { id: 'manhattan', cat: 'cocktail', name: 'Манхэттен', emoji: '🍸', abv: 28, cal: 190, snack: 'Вишня', ing: ['виски', 'вермут', 'биттер'], recipe: '2:1:1, лёд, вишня.' },
  { id: 'margarita', cat: 'cocktail', name: 'Маргарита', emoji: '🍸', abv: 20, cal: 180, snack: 'Лайм, соль', ing: ['текила', 'лайм', 'трипл-сек'], recipe: '2:1:1, соль на бокале.' },
  { id: 'daiquiri', cat: 'cocktail', name: 'Дайкири', emoji: '🍸', abv: 18, cal: 150, snack: 'Лайм', ing: ['ром', 'лайм', 'сахар'], recipe: '2:1:0.5, лёд.' },
  { id: 'cosmopolitan', cat: 'cocktail', name: 'Космополитен', emoji: '🍸', abv: 15, cal: 160, snack: 'Апельсин', ing: ['водка', 'трипл-сек', 'клюква', 'лайм'], recipe: '1.5:0.5:1:0.5.' },
  { id: 'whiskey-sour', cat: 'cocktail', name: 'Виски Сауэр', emoji: '🍸', abv: 18, cal: 170, snack: 'Вишня', ing: ['виски', 'лимон', 'сахар'], recipe: '2:1:0.5, лёд.' },
  { id: 'old-fashioned', cat: 'cocktail', name: 'Олд Фэшн', emoji: '🍸', abv: 30, cal: 180, snack: 'Апельсин', ing: ['виски', 'сахар', 'биттер'], recipe: 'Виски+сахар+биттер.' },
  { id: 'sazerac', cat: 'cocktail', name: 'Сазерак', emoji: '🍸', abv: 28, cal: 180, snack: 'Лимон', ing: ['коньяк', 'абсент', 'биттер'], recipe: 'Коньяк+абсент+биттер.' },
  { id: 'gimlet', cat: 'cocktail', name: 'Гимлет', emoji: '🍸', abv: 18, cal: 150, snack: 'Лайм', ing: ['джин', 'лайм', 'сахар'], recipe: '2:1:0.5.' },
  { id: 'sidecar', cat: 'cocktail', name: 'Сайдкар', emoji: '🍸', abv: 22, cal: 180, snack: 'Лимон', ing: ['коньяк', 'трипл-сек', 'лимон'], recipe: '2:1:1.' },
  { id: 'white-russian', cat: 'cocktail', name: 'Белый русский', emoji: '🍸', abv: 15, cal: 200, snack: 'Кофе', ing: ['водка', 'кофейный ликёр', 'сливки'], recipe: 'Водка+ликёр+сливки.' },
  { id: 'black-russian', cat: 'cocktail', name: 'Чёрный русский', emoji: '🍸', abv: 18, cal: 180, snack: 'Кофе', ing: ['водка', 'кофейный ликёр'], recipe: 'Водка+ликёр.' },
  { id: 'espresso-martini', cat: 'cocktail', name: 'Эспрессо мартини', emoji: '🍸', abv: 15, cal: 150, snack: 'Кофе', ing: ['водка', 'кофейный ликёр', 'эспрессо'], recipe: 'Водка+ликёр+кофе.' },
  { id: 'godfather', cat: 'cocktail', name: 'Крёстный отец', emoji: '🍸', abv: 25, cal: 190, snack: 'Миндаль', ing: ['виски', 'амаретто'], recipe: '2:1.' },
  { id: 'amaretto-sour', cat: 'cocktail', name: 'Амаретто сауэр', emoji: '🍸', abv: 12, cal: 180, snack: 'Миндаль', ing: ['амаретто', 'лимон', 'сахар'], recipe: '2:1:0.5.' },
  { id: 'blue-lagoon', cat: 'cocktail', name: 'Голубая лагуна', emoji: '🍸', abv: 14, cal: 170, snack: 'Лимон', ing: ['водка', 'блю кюрасао', 'лимон'], recipe: 'Водка+ликёр+лимонный сок.' },
  { id: 'b-52-cocktail', cat: 'cocktail', name: 'Б-52', emoji: '🍸', abv: 20, cal: 150, snack: '—', ing: ['кофейный ликёр', 'сливочный ликёр', 'трипл-сек'], recipe: 'Слоями.' },
  // --- Игристые коктейли ---
  { id: 'bellini', cat: 'cocktail', name: 'Беллини', emoji: '🍸', abv: 8, cal: 130, snack: 'Персик', ing: ['просекко', 'персик'], recipe: 'Просекко+персиковое пюре.' },
  { id: 'mimosa', cat: 'cocktail', name: 'Мимоза', emoji: '🍸', abv: 8, cal: 130, snack: 'Апельсин', ing: ['шампанское', 'апельсин'], recipe: '1:1.' },
  { id: 'kir-royale', cat: 'cocktail', name: 'Кир Рояль', emoji: '🍸', abv: 10, cal: 140, snack: 'Смородина', ing: ['шампанское', 'смородиновый ликёр'], recipe: 'Шампанское+ликёр.' },
  { id: 'french-75', cat: 'cocktail', name: 'Френч 75', emoji: '🍸', abv: 12, cal: 150, snack: 'Лимон', ing: ['джин', 'шампанское', 'лимон'], recipe: 'Джин+лимон+сахар+шампанское.' },
  // --- Горячие ---
  { id: 'mulled-wine', cat: 'cocktail', name: 'Глинтвейн', emoji: '🍷', abv: 10, cal: 150, snack: 'Апельсин, корица', ing: ['вино', 'специи', 'мёд'], recipe: 'Вино+специи+мёд, подогреть.' },
  { id: 'grog', cat: 'cocktail', name: 'Грог', emoji: '🍸', abv: 15, cal: 160, snack: 'Лимон', ing: ['ром', 'чай', 'лимон', 'мёд'], recipe: 'Ром+чай+мёд.' },
  { id: 'hot-toddy', cat: 'cocktail', name: 'Хот Тодди', emoji: '🍸', abv: 12, cal: 150, snack: 'Лимон', ing: ['виски', 'мёд', 'лимон', 'вода'], recipe: 'Виски+мёд+лимон+горячая вода.' },
  { id: 'irish-coffee', cat: 'cocktail', name: 'Ирландский кофе', emoji: '☕', abv: 10, cal: 160, snack: 'Десерт', ing: ['виски', 'кофе', 'сливки', 'сахар'], recipe: 'Виски+кофе+сахар+сливки.' },
  { id: 'hot-buttered-rum', cat: 'cocktail', name: 'Горячий ром с маслом', emoji: '🍸', abv: 14, cal: 180, snack: 'Специи', ing: ['ром', 'масло', 'специи'], recipe: 'Ром+масло+специи+вода.' },
  // --- Тропические ---
  { id: 'hurricane', cat: 'cocktail', name: 'Харрикейн', emoji: '🍸', abv: 16, cal: 200, snack: 'Ананас', ing: ['ром', 'лимон', 'гренадин'], recipe: 'Ром+соки+сироп.' },
  { id: 'zombie', cat: 'cocktail', name: 'Зомби', emoji: '🍸', abv: 18, cal: 210, snack: 'Ананас', ing: ['ром', 'фрукты', 'специи'], recipe: 'Ром+соки+сироп.' },
  { id: 'painkiller', cat: 'cocktail', name: 'Пейнкиллер', emoji: '🍸', abv: 12, cal: 220, snack: 'Мускат', ing: ['ром', 'ананас', 'кокос', 'апельсин'], recipe: 'Ром+соки.' },
  { id: 'jungle-bird', cat: 'cocktail', name: 'Джангл Бёрд', emoji: '🍸', abv: 14, cal: 190, snack: 'Лайм', ing: ['ром', 'лайм', 'кампари'], recipe: 'Ром+лайм+сироп+кампари.' },
  // --- Современная классика ---
  { id: 'pornstar-martini', cat: 'cocktail', name: 'Порнстар мартини', emoji: '🍸', abv: 14, cal: 170, snack: 'Маракуйя', ing: ['водка', 'ваниль', 'маракуйя'], recipe: 'Водка+ликёр+пюре.' },
  { id: 'espresso-tonic', cat: 'cocktail', name: 'Эспрессо-тоник', emoji: '☕', abv: 0, cal: 90, snack: '—', ing: ['кофе', 'тоник'], recipe: 'Кофе+тоник+лёд.' },
  // --- Пунши и боулы ---
  { id: 'planter-punch', cat: 'cocktail', name: 'Плантерс пунш', emoji: '🍸', abv: 15, cal: 180, snack: 'Апельсин', ing: ['ром', 'апельсин', 'лимон'], recipe: 'Ром+соки+специи.' },
  { id: 'fish-house-punch', cat: 'cocktail', name: 'Фиш-хаус пунш', emoji: '🍸', abv: 12, cal: 170, snack: 'Лимон', ing: ['ром', 'коньяк', 'лимон'], recipe: 'Ром+коньяк+лимон+сахар.' },

  // ============================================================
  // КРЕПКОЕ (Strong) — дистилляты по классификации
  // ============================================================
  // --- Водка (зерновая/картофельная) ---
  { id: 'vodka', cat: 'strong', name: 'Водка', emoji: '🥃', abv: 40, cal: 230, snack: 'Солёное, огурцы', ing: ['спирт', 'вода'] },
  { id: 'vodka-premium', cat: 'strong', name: 'Водка премиум', emoji: '🥃', abv: 40, cal: 230, snack: 'Икра, солёное', ing: ['спирт', 'вода'] },
  { id: 'flavored-vodka', cat: 'strong', name: 'Ароматизированная водка', emoji: '🥃', abv: 35, cal: 220, snack: 'Фрукты', ing: ['спирт', 'ароматизаторы'] },
  // --- Виски (зерновой дистиллят) ---
  { id: 'whisky', cat: 'strong', name: 'Виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад, сыр', ing: ['зерно', 'вода'] },
  { id: 'bourbon', cat: 'strong', name: 'Бурбон', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад, мясо', ing: ['кукуруза', 'вода'] },
  { id: 'scotch', cat: 'strong', name: 'Шотландский виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Сыр, копчёности', ing: ['солод', 'вода'] },
  { id: 'irish-whiskey', cat: 'strong', name: 'Ирландский виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад', ing: ['зерно', 'вода'] },
  { id: 'rye-whiskey', cat: 'strong', name: 'Ржаной виски', emoji: '🥃', abv: 40, cal: 245, snack: 'Мясо', ing: ['рожь', 'вода'] },
  { id: 'japanese-whisky', cat: 'strong', name: 'Японский виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Суши', ing: ['солод', 'вода'] },
  { id: 'canadian-whisky', cat: 'strong', name: 'Канадский виски', emoji: '🥃', abv: 40, cal: 245, snack: 'Мясо', ing: ['зерно', 'вода'] },
  // --- Бренди (виноградный дистиллят) ---
  { id: 'cognac', cat: 'strong', name: 'Коньяк', emoji: '🥃', abv: 40, cal: 240, snack: 'Шоколад, кофе', ing: ['виноград', 'вода'] },
  { id: 'armagnac', cat: 'strong', name: 'Арманьяк', emoji: '🥃', abv: 40, cal: 240, snack: 'Кофе, шоколад', ing: ['виноград', 'вода'] },
  { id: 'brandy', cat: 'strong', name: 'Бренди', emoji: '🥃', abv: 40, cal: 240, snack: 'Шоколад', ing: ['виноград', 'вода'] },
  { id: 'pisco', cat: 'strong', name: 'Писко', emoji: '🥃', abv: 40, cal: 235, snack: 'Лайм', ing: ['виноград'] },
  { id: 'grappa', cat: 'strong', name: 'Граппа', emoji: '🥃', abv: 40, cal: 235, snack: 'Кофе', ing: ['виноградный жмых'] },
  { id: 'orujo', cat: 'strong', name: 'Орухо', emoji: '🥃', abv: 40, cal: 235, snack: 'Оливки', ing: ['виноградный жмых'] },
  { id: 'calvados', cat: 'strong', name: 'Кальвадос', emoji: '🍎', abv: 40, cal: 235, snack: 'Сыр', ing: ['яблоки'] },
  { id: 'apple-brandy', cat: 'strong', name: 'Яблочный бренди', emoji: '🍎', abv: 40, cal: 235, snack: 'Десерт', ing: ['яблоки'] },
  { id: 'pear-brandy', cat: 'strong', name: 'Грушевый бренди', emoji: '🍐', abv: 40, cal: 235, snack: 'Сыр', ing: ['груши'] },
  // --- Ром (из сахарного тростника) ---
  { id: 'rum', cat: 'strong', name: 'Ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Шоколад', ing: ['сахарный тростник'] },
  { id: 'white-rum', cat: 'strong', name: 'Белый ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм, кола', ing: ['сахарный тростник'] },
  { id: 'gold-rum', cat: 'strong', name: 'Золотой ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Шоколад', ing: ['сахарный тростник'] },
  { id: 'dark-rum', cat: 'strong', name: 'Тёмный ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Шоколад', ing: ['сахарный тростник'] },
  { id: 'aged-rum', cat: 'strong', name: 'Выдержанный ром', emoji: '🥃', abv: 40, cal: 235, snack: 'Сигара', ing: ['сахарный тростник'] },
  { id: 'cachaca', cat: 'strong', name: 'Кашаса', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм', ing: ['сахарный тростник'] },
  // --- Джин (можжевельник) ---
  { id: 'gin', cat: 'strong', name: 'Джин', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм, тоник', ing: ['можжевельник', 'спирт'] },
  { id: 'london-dry-gin', cat: 'strong', name: 'Лондонский сухой джин', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм', ing: ['можжевельник', 'спирт'] },
  { id: 'plymouth-gin', cat: 'strong', name: 'Плимутский джин', emoji: '🥃', abv: 40, cal: 230, snack: 'Лимон', ing: ['можжевельник', 'спирт'] },
  { id: 'old-tom-gin', cat: 'strong', name: 'Олд Том джин', emoji: '🥃', abv: 40, cal: 235, snack: 'Лимон', ing: ['можжевельник', 'сахар'] },
  // --- Текила и мескаль (агава) ---
  { id: 'tequila', cat: 'strong', name: 'Текила', emoji: '🥂', abv: 38, cal: 100, snack: 'Соль, лайм', ing: ['агава', 'вода'] },
  { id: 'tequila-silver', cat: 'strong', name: 'Текила серебряная', emoji: '🥂', abv: 38, cal: 100, snack: 'Соль, лайм', ing: ['агава', 'вода'] },
  { id: 'tequila-reposado', cat: 'strong', name: 'Текила репосадо', emoji: '🥂', abv: 38, cal: 105, snack: 'Лайм', ing: ['агава', 'дуб'] },
  { id: 'tequila-anejo', cat: 'strong', name: 'Текила аньехо', emoji: '🥂', abv: 38, cal: 110, snack: 'Шоколад', ing: ['агава', 'дуб'] },
  { id: 'mezcal', cat: 'strong', name: 'Мескаль', emoji: '🥂', abv: 40, cal: 110, snack: 'Апельсин', ing: ['агава', 'дым'] },
  // --- Анисовые (Средиземноморье) ---
  { id: 'absinthe', cat: 'strong', name: 'Абсент', emoji: '🥃', abv: 70, cal: 280, snack: '—', ing: ['полынь', 'спирт'] },
  { id: 'ouzo', cat: 'strong', name: 'Узо', emoji: '🥃', abv: 40, cal: 230, snack: 'Морепродукты', ing: ['анис', 'спирт'] },
  { id: 'pastis', cat: 'strong', name: 'Пастис', emoji: '🥃', abv: 45, cal: 240, snack: 'Оливки', ing: ['анис', 'спирт'] },
  { id: 'raki', cat: 'strong', name: 'Ракы', emoji: '🥃', abv: 45, cal: 240, snack: 'Мясо', ing: ['анис', 'спирт'] },
  { id: 'arak', cat: 'strong', name: 'Арак', emoji: '🥃', abv: 50, cal: 250, snack: 'Мясо', ing: ['анис', 'спирт'] },
  // --- Аквавит (Скандинавия) ---
  { id: 'akvavit', cat: 'strong', name: 'Аквавит', emoji: '🥃', abv: 40, cal: 230, snack: 'Рыба', ing: ['картофель', 'тмин'] },
  // --- Шнапс (Германия) ---
  { id: 'schnapps', cat: 'strong', name: 'Шнапс', emoji: '🥃', abv: 40, cal: 230, snack: 'Мясо', ing: ['зерно', 'фрукты'] },
  // --- Сакэ (Япония) ---
  { id: 'sake', cat: 'strong', name: 'Сакэ', emoji: '🍶', abv: 15, cal: 130, snack: 'Суши', ing: ['рис', 'вода'] },
  { id: 'shochu', cat: 'strong', name: 'Сётю', emoji: '🍶', abv: 25, cal: 150, snack: 'Суши', ing: ['рис', 'батат'] },
  // --- Байцзю (Китай) ---
  { id: 'baijiu', cat: 'strong', name: 'Байцзю', emoji: '🥃', abv: 50, cal: 260, snack: 'Мясо', ing: ['сорго'] },
  // --- Прочее ---
  { id: 'soju', cat: 'strong', name: 'Соджу', emoji: '🍶', abv: 20, cal: 120, snack: 'Корейская еда', ing: ['рис', 'картофель'] },
  { id: 'palin', cat: 'strong', name: 'Палин', emoji: '🥃', abv: 40, cal: 230, snack: 'Мясо', ing: ['рис'] },

  // ============================================================
  // ЛИКЁРЫ (Liqueurs) — по ГОСТ 32071-2013 и ТР ЕАЭС
  // ============================================================
  // --- Крепкие (35-45%, сахар 25-50 г/100см³) ---
  { id: 'herbal-liqueur', cat: 'liqueur', name: 'Травяной ликёр', emoji: '🍯', abv: 35, cal: 120, snack: 'Энергетик', ing: ['травы', 'спирт'] },
  { id: 'anise-liqueur', cat: 'liqueur', name: 'Анисовый ликёр', emoji: '🍯', abv: 38, cal: 110, snack: 'Кофе, оливка', ing: ['анис', 'спирт'] },
  { id: 'mint-liqueur', cat: 'liqueur', name: 'Мятный ликёр', emoji: '🍯', abv: 35, cal: 115, snack: 'Шоколад', ing: ['мята', 'спирт'] },
  { id: 'orange-liqueur', cat: 'liqueur', name: 'Апельсиновый ликёр', emoji: '🍯', abv: 30, cal: 140, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },
  { id: 'triple-sec', cat: 'liqueur', name: 'Трипл-сек', emoji: '🍯', abv: 30, cal: 135, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },
  { id: 'blue-curacao', cat: 'liqueur', name: 'Блю кюрасао', emoji: '🍯', abv: 25, cal: 130, snack: 'Апельсин', ing: ['апельсин', 'краситель'] },
  { id: 'grand-marnier', cat: 'liqueur', name: 'Апельсиновый ликёр с коньяком', emoji: '🍯', abv: 40, cal: 150, snack: 'Шоколад', ing: ['коньяк', 'апельсин'] },
  { id: 'coffee-liqueur', cat: 'liqueur', name: 'Кофейный ликёр', emoji: '🍯', abv: 20, cal: 160, snack: 'Кофе', ing: ['кофе', 'спирт'] },
  { id: 'nut-liqueur', cat: 'liqueur', name: 'Ореховый ликёр', emoji: '🍯', abv: 28, cal: 180, snack: 'Миндаль', ing: ['орехи', 'спирт'] },
  // --- Десертные (15-35%, сахар ≥10 г/100см³) ---
  { id: 'cream-liqueur', cat: 'liqueur', name: 'Сливочный ликёр', emoji: '🍯', abv: 17, cal: 200, snack: 'Кофе, десерт', ing: ['сливки', 'спирт'] },
  { id: 'coconut-liqueur', cat: 'liqueur', name: 'Кокосовый ликёр', emoji: '🍯', abv: 21, cal: 150, snack: 'Ананас', ing: ['кокос', 'спирт'] },
  { id: 'banana-liqueur', cat: 'liqueur', name: 'Банановый ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Банан', ing: ['банан', 'спирт'] },
  { id: 'peach-liqueur', cat: 'liqueur', name: 'Персиковый ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Персик', ing: ['персик', 'спирт'] },
  { id: 'cherry-liqueur', cat: 'liqueur', name: 'Вишнёвый ликёр', emoji: '🍯', abv: 25, cal: 160, snack: 'Вишня', ing: ['вишня', 'спирт'] },
  { id: 'lemon-liqueur', cat: 'liqueur', name: 'Лимонный ликёр', emoji: '🍯', abv: 25, cal: 140, snack: 'Лимон', ing: ['лимон', 'спирт'] },
  { id: 'bitter-liqueur', cat: 'liqueur', name: 'Горький ликёр', emoji: '🍯', abv: 25, cal: 130, snack: 'Апельсин', ing: ['травы', 'спирт'] },
  { id: 'amaretto', cat: 'liqueur', name: 'Амаретто', emoji: '🍯', abv: 28, cal: 180, snack: 'Миндаль', ing: ['абрикос', 'миндаль'] },
  { id: 'limoncello', cat: 'liqueur', name: 'Лимончелло', emoji: '🍯', abv: 30, cal: 140, snack: 'Лимон', ing: ['лимон', 'спирт'] },
  // --- Эмульсионные (15%+, сахар ≥15 г/100см³) ---
  { id: 'egg-liqueur', cat: 'liqueur', name: 'Яичный ликёр', emoji: '🍯', abv: 20, cal: 220, snack: 'Десерт', ing: ['яйца', 'спирт'] },
  { id: 'advocaat', cat: 'liqueur', name: 'Адвокат', emoji: '🍯', abv: 15, cal: 210, snack: 'Десерт', ing: ['яйца', 'спирт'] },
  // --- Кремы (15%+, сахар ≥25 г/100см³) ---
  { id: 'chocolate-cream', cat: 'liqueur', name: 'Шоколадный крем', emoji: '🍯', abv: 15, cal: 250, snack: 'Десерт', ing: ['шоколад', 'сливки'] },
  { id: 'cassis', cat: 'liqueur', name: 'Смородиновый ликёр', emoji: '🍯', abv: 15, cal: 160, snack: 'Десерт', ing: ['смородина', 'спирт'] },
  { id: 'raspberry-liqueur', cat: 'liqueur', name: 'Малиновый ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Десерт', ing: ['малина', 'спирт'] },
  { id: 'honey-liqueur', cat: 'liqueur', name: 'Медовый ликёр', emoji: '🍯', abv: 25, cal: 160, snack: 'Десерт', ing: ['мёд', 'спирт'] },
  { id: 'rose-liqueur', cat: 'liqueur', name: 'Розовый ликёр', emoji: '🍯', abv: 20, cal: 140, snack: 'Десерт', ing: ['лепестки роз', 'спирт'] },
  { id: 'violet-liqueur', cat: 'liqueur', name: 'Фиалковый ликёр', emoji: '🍯', abv: 20, cal: 140, snack: 'Десерт', ing: ['фиалка', 'спирт'] },
  { id: 'melon-liqueur', cat: 'liqueur', name: 'Дынный ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Дыня', ing: ['дыня', 'спирт'] },
  { id: 'watermelon-liqueur', cat: 'liqueur', name: 'Арбузный ликёр', emoji: '🍯', abv: 18, cal: 140, snack: 'Арбуз', ing: ['арбуз', 'спирт'] },
  { id: 'apple-liqueur', cat: 'liqueur', name: 'Яблочный ликёр', emoji: '🍯', abv: 20, cal: 140, snack: 'Яблоко', ing: ['яблоко', 'спирт'] },
  { id: 'pear-liqueur', cat: 'liqueur', name: 'Грушевый ликёр', emoji: '🍯', abv: 20, cal: 140, snack: 'Груша', ing: ['груша', 'спирт'] },
  { id: 'apricot-liqueur', cat: 'liqueur', name: 'Абрикосовый ликёр', emoji: '🍯', abv: 25, cal: 150, snack: 'Абрикос', ing: ['абрикос', 'спирт'] },
  { id: 'strawberry-liqueur', cat: 'liqueur', name: 'Земляничный ликёр', emoji: '🍯', abv: 18, cal: 140, snack: 'Земляника', ing: ['земляника', 'спирт'] },
  { id: 'blackberry-liqueur', cat: 'liqueur', name: 'Ежевичный ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Ежевика', ing: ['ежевика', 'спирт'] },
  { id: 'blueberry-liqueur', cat: 'liqueur', name: 'Черничный ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Черника', ing: ['черника', 'спирт'] },
  { id: 'pomegranate-liqueur', cat: 'liqueur', name: 'Гранатовый ликёр', emoji: '🍯', abv: 18, cal: 140, snack: 'Гранат', ing: ['гранат', 'спирт'] },
  // --- Бальзамы и биттеры ---
  { id: 'balm', cat: 'liqueur', name: 'Бальзам', emoji: '🍯', abv: 40, cal: 150, snack: 'Кофе', ing: ['травы', 'спирт'] },
  { id: 'bitters', cat: 'liqueur', name: 'Биттер', emoji: '🍯', abv: 25, cal: 120, snack: 'Апельсин', ing: ['травы', 'спирт'] },

  // ============================================================
  // АПЕРИТИВЫ (Aperitifs)
  // ============================================================
  // --- Вермуты ---
  { id: 'vermouth', cat: 'aperitif', name: 'Вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'bianco-vermouth', cat: 'aperitif', name: 'Белый вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'rosso-vermouth', cat: 'aperitif', name: 'Красный вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Сыр', ing: ['вино', 'травы'] },
  { id: 'dry-vermouth', cat: 'aperitif', name: 'Сухой вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  // --- Биттеры ---
  { id: 'bitter-aperitif', cat: 'aperitif', name: 'Горький аперитив', emoji: '🍹', abv: 25, cal: 130, snack: 'Апельсин', ing: ['травы', 'спирт'] },
  { id: 'orange-aperitif', cat: 'aperitif', name: 'Апельсиновый аперитив', emoji: '🍹', abv: 11, cal: 120, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },
  { id: 'campari-type', cat: 'aperitif', name: 'Кампари-тип', emoji: '🍹', abv: 25, cal: 130, snack: 'Апельсин', ing: ['травы', 'спирт'] },
  { id: 'aperol-type', cat: 'aperitif', name: 'Апероль-тип', emoji: '🍹', abv: 11, cal: 120, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },
  // --- Анисовые аперитивы ---
  { id: 'anis-aperitif', cat: 'aperitif', name: 'Анисовый аперитив', emoji: '🍹', abv: 40, cal: 230, snack: 'Оливки', ing: ['анис', 'спирт'] },
  // --- Хересы (аперитивные) ---
  { id: 'fino-sherry', cat: 'aperitif', name: 'Херес фино', emoji: '🍹', abv: 15, cal: 130, snack: 'Оливки', ing: ['вино', 'спирт'] },
  { id: 'manzanilla', cat: 'aperitif', name: 'Мансанилья', emoji: '🍹', abv: 15, cal: 130, snack: 'Морепродукты', ing: ['вино', 'спирт'] },
  { id: 'amontillado', cat: 'aperitif', name: 'Амонтильядо', emoji: '🍹', abv: 17, cal: 140, snack: 'Орехи', ing: ['вино', 'спирт'] },
  // --- Ароматизированные вина ---
  { id: 'aromatized-wine', cat: 'aperitif', name: 'Ароматизированное вино', emoji: '🍹', abv: 15, cal: 140, snack: 'Фрукты', ing: ['вино', 'специи'] },
  { id: 'lillet', cat: 'aperitif', name: 'Лилле', emoji: '🍹', abv: 17, cal: 140, snack: 'Апельсин', ing: ['вино', 'ликёр'] },

  // ============================================================
  // СИДРЫ И МЕДЫ (Cider & Mead)
  // ============================================================
  // --- Сидры (яблочные, по ТР ЕАЭС) ---
  { id: 'cider-apple', cat: 'cider', name: 'Яблочный сидр', emoji: '🍎', abv: 4.5, cal: 190, snack: 'Сыр, фрукты', ing: ['яблоки'] },
  { id: 'cider-dry', cat: 'cider', name: 'Сухой сидр', emoji: '🍎', abv: 5, cal: 180, snack: 'Сыр', ing: ['яблоки'] },
  { id: 'cider-sweet', cat: 'cider', name: 'Сладкий сидр', emoji: '🍎', abv: 4, cal: 200, snack: 'Десерт', ing: ['яблоки', 'сахар'] },
  { id: 'cider-pear', cat: 'cider', name: 'Грушевый сидр (Пуаре)', emoji: '🍐', abv: 4.5, cal: 190, snack: 'Сыр', ing: ['груши'] },
  { id: 'cider-berry', cat: 'cider', name: 'Ягодный сидр', emoji: '🍓', abv: 4.5, cal: 190, snack: 'Фрукты', ing: ['ягоды'] },
  { id: 'cider-fruit', cat: 'cider', name: 'Фруктовый сидр', emoji: '🍎', abv: 4.5, cal: 190, snack: 'Фрукты', ing: ['фрукты'] },
  // --- Меды (по ТР ЕАЭС: медовуха 1.5-6%) ---
  { id: 'medovukha', cat: 'cider', name: 'Медовуха', emoji: '🍯', abv: 5, cal: 180, snack: 'Мёд, орехи', ing: ['мёд', 'дрожжи'] },
  { id: 'sbiten', cat: 'cider', name: 'Сбитень', emoji: '🍯', abv: 5, cal: 170, snack: 'Пряники', ing: ['мёд', 'специи'] },
  { id: 'mead', cat: 'cider', name: 'Мёд (питьевой)', emoji: '🍯', abv: 12, cal: 200, snack: 'Мёд', ing: ['мёд', 'вода'] },
  { id: 'melomel', cat: 'cider', name: 'Медовуха фруктовая', emoji: '🍯', abv: 10, cal: 190, snack: 'Фрукты', ing: ['мёд', 'фрукты'] },

  // ============================================================
  // ШОТЫ (Shots)
  // ============================================================
  { id: 'tequila-shot', cat: 'shots', name: 'Текила', emoji: '🥂', abv: 38, cal: 100, snack: 'Соль, лайм', ing: ['агава', 'вода'] },
  { id: 'sambuca-shot', cat: 'shots', name: 'Самбука', emoji: '🥂', abv: 38, cal: 110, snack: 'Кофе, оливка', ing: ['анис', 'спирт'] },
  { id: 'jager-shot', cat: 'shots', name: 'Травяной шот', emoji: '🥂', abv: 35, cal: 120, snack: 'Энергетик', ing: ['травы', 'спирт'] },
  { id: 'vodka-shot', cat: 'shots', name: 'Водка', emoji: '🥂', abv: 40, cal: 100, snack: 'Огурец', ing: ['спирт', 'вода'] },
  { id: 'whisky-shot', cat: 'shots', name: 'Виски', emoji: '🥂', abv: 40, cal: 100, snack: '—', ing: ['зерно', 'вода'] },
  { id: 'rum-shot', cat: 'shots', name: 'Ром', emoji: '🥂', abv: 40, cal: 100, snack: 'Лайм', ing: ['тростник'] },
  { id: 'gin-shot', cat: 'shots', name: 'Джин', emoji: '🥂', abv: 40, cal: 100, snack: 'Лайм', ing: ['можжевельник'] },
  { id: 'absinthe-shot', cat: 'shots', name: 'Абсент', emoji: '🥂', abv: 70, cal: 120, snack: '—', ing: ['полынь'] },
  { id: 'b52', cat: 'shots', name: 'Б-52', emoji: '🥂', abv: 20, cal: 120, snack: '—', ing: ['кофейный ликёр', 'сливочный ликёр', 'трипл-сек'], recipe: 'Слоями.' },
  { id: 'kamikaze', cat: 'shots', name: 'Камикадзе', emoji: '🥂', abv: 20, cal: 110, snack: 'Лайм', ing: ['водка', 'трипл-сек', 'лайм'], recipe: '1:1:1.' },
  { id: 'lemon-drop', cat: 'shots', name: 'Лемон Дроп', emoji: '🥂', abv: 18, cal: 110, snack: 'Лимон', ing: ['водка', 'лимон', 'сахар'], recipe: 'Водка+лимон+сахар.' },
  { id: 'green-tea-shot', cat: 'shots', name: 'Зелёный чай', emoji: '🥂', abv: 15, cal: 120, snack: '—', ing: ['виски', 'ликёр', 'чай'], recipe: 'Виски+ликёр+чай.' },
  { id: 'buttery-nipple', cat: 'shots', name: 'Баттер Ниппл', emoji: '🥂', abv: 20, cal: 150, snack: '—', ing: ['сливочный ликёр', 'самбука'], recipe: '1:1.' },
  { id: 'slippery-nipple', cat: 'shots', name: 'Слиппери Ниппл', emoji: '🥂', abv: 20, cal: 140, snack: '—', ing: ['самбука', 'ликёр'] },
  { id: 'brain-hemorrhage', cat: 'shots', name: 'Кровоизлияние в мозг', emoji: '🥂', abv: 20, cal: 150, snack: '—', ing: ['сливочный ликёр', 'гренадин'] },
  { id: 'irish-car-bomb', cat: 'shots', name: 'Ирландская бомба', emoji: '🥂', abv: 15, cal: 160, snack: '—', ing: ['ирландский виски', 'сливочный ликёр', 'пиво'] },

  // ============================================================
  // БЕЗАЛКОГОЛЬНОЕ (Soft)
  // ============================================================
  // --- Вода ---
  { id: 'mineral-water', cat: 'soft', name: 'Минеральная вода', emoji: '💧', abv: 0, cal: 0, snack: '—', ing: ['вода'] },
  { id: 'soda', cat: 'soft', name: 'Содовая', emoji: '💧', abv: 0, cal: 0, snack: '—', ing: ['вода', 'газ'] },
  { id: 'spring-water', cat: 'soft', name: 'Родниковая вода', emoji: '💧', abv: 0, cal: 0, snack: '—', ing: ['вода'] },
  // --- Газировки ---
  { id: 'cola', cat: 'soft', name: 'Кола', emoji: '🥤', abv: 0, cal: 140, snack: 'Чипсы', ing: ['вода', 'сахар', 'карамель'] },
  { id: 'lemonade', cat: 'soft', name: 'Лимонад', emoji: '🥤', abv: 0, cal: 90, snack: 'Фрукты', ing: ['вода', 'лимон', 'сахар'] },
  { id: 'tonic', cat: 'soft', name: 'Тоник', emoji: '🥤', abv: 0, cal: 80, snack: 'Лайм', ing: ['вода', 'хинин', 'сахар'] },
  { id: 'ginger-ale', cat: 'soft', name: 'Имбирный эль', emoji: '🥤', abv: 0, cal: 90, snack: '—', ing: ['имбирь', 'вода', 'сахар'] },
  { id: 'sprite-type', cat: 'soft', name: 'Лайм-лимон газировка', emoji: '🥤', abv: 0, cal: 100, snack: '—', ing: ['вода', 'лайм', 'сахар'] },
  // --- Соки ---
  { id: 'orange-juice', cat: 'soft', name: 'Апельсиновый сок', emoji: '🍊', abv: 0, cal: 110, snack: '—', ing: ['апельсин'] },
  { id: 'apple-juice', cat: 'soft', name: 'Яблочный сок', emoji: '🍎', abv: 0, cal: 100, snack: '—', ing: ['яблоко'] },
  { id: 'tomato-juice', cat: 'soft', name: 'Томатный сок', emoji: '🍅', abv: 0, cal: 40, snack: 'Соль', ing: ['томат'] },
  { id: 'cranberry-juice', cat: 'soft', name: 'Клюквенный сок', emoji: '🍓', abv: 0, cal: 90, snack: '—', ing: ['клюква'] },
  { id: 'grapefruit-juice', cat: 'soft', name: 'Грейпфрутовый сок', emoji: '🍊', abv: 0, cal: 80, snack: '—', ing: ['грейпфрут'] },
  // --- Другие ---
  { id: 'smoothie', cat: 'soft', name: 'Смузи', emoji: '🥤', abv: 0, cal: 120, snack: '—', ing: ['фрукты', 'йогурт'] },
  { id: 'mocktail', cat: 'soft', name: 'Моктейл', emoji: '🍹', abv: 0, cal: 80, snack: 'Орешки', ing: ['сок', 'сода'], recipe: 'Сок+сода+лёд+сироп.' },
  { id: 'non-alc-beer', cat: 'soft', name: 'Безалкогольное пиво', emoji: '🍺', abv: 0, cal: 80, snack: 'Орешки', ing: ['солод', 'хмель'] },
  { id: 'non-alc-wine', cat: 'soft', name: 'Безалкогольное вино', emoji: '🍷', abv: 0, cal: 60, snack: 'Фрукты', ing: ['виноград'] },
  { id: 'non-alc-cocktail', cat: 'soft', name: 'Безалкогольный коктейль', emoji: '🍸', abv: 0, cal: 70, snack: 'Фрукты', ing: ['сок', 'сода'] },
  { id: 'kvass', cat: 'soft', name: 'Квас', emoji: '🥤', abv: 0, cal: 60, snack: 'Хлеб', ing: ['хлеб', 'дрожжи'] },
  { id: 'kombucha', cat: 'soft', name: 'Комбуча', emoji: '🥤', abv: 0, cal: 40, snack: '—', ing: ['чай', 'гриб'] },
  { id: 'iced-tea', cat: 'soft', name: 'Холодный чай', emoji: '🥤', abv: 0, cal: 70, snack: '—', ing: ['чай', 'сахар'] },
  { id: 'energy-drink', cat: 'soft', name: 'Энергетик', emoji: '⚡', abv: 0, cal: 110, snack: '—', ing: ['кофеин', 'сахар'] },
  { id: 'coffee', cat: 'soft', name: 'Кофе', emoji: '☕', abv: 0, cal: 5, snack: '—', ing: ['кофе'] },
  { id: 'tea', cat: 'soft', name: 'Чай', emoji: '🍵', abv: 0, cal: 2, snack: '—', ing: ['чай'] },
  { id: 'hot-chocolate', cat: 'soft', name: 'Горячий шоколад', emoji: '🍫', abv: 0, cal: 190, snack: '—', ing: ['шоколад', 'молоко'] },
];

// ===== ТЕМАТИЧЕСКИЕ КОЛЁСА =====
const THEMES = [
  { id: 'ny', name: 'Новый год', emoji: '🎄', ids: ['sparkling', 'champagne', 'prosecco', 'red-wine', 'white-wine', 'vodka', 'whisky', 'mojito', 'mimosa'] },
  { id: 'oktober', name: 'Октоберфест', emoji: '🍻', ids: ['lager', 'stout', 'porter', 'ipa', 'weissbier', 'dark-lager', 'strong-lager', 'pilsner', 'bock', 'doppelbock'] },
  { id: 'summer', name: 'Лето', emoji: '🌞', ids: ['mojito', 'aperol-spritz', 'lemonade', 'white-wine', 'smoothie', 'mocktail', 'cider-apple', 'cider-pear', 'gin-tonic', 'paloma', 'sangria', 'pina-colada', 'daiquiri', 'margarita', 'hurricane'] },
  { id: 'russian', name: 'Русская классика', emoji: '🪆', ids: ['vodka', 'vodka-premium', 'cognac', 'brandy', 'sparkling', 'champagne', 'red-wine', 'lager', 'medovukha', 'sbiten', 'kvass'] },
  { id: 'beer', name: 'Пивная', emoji: '🍺', ids: ['lager', 'light-lager', 'pilsner', 'dark-lager', 'strong-lager', 'non-alc-lager', 'stout', 'porter', 'ipa', 'craft-beer', 'weissbier', 'witbier', 'hefeweizen', 'bock', 'doppelbock', 'pale-ale', 'amber-ale', 'brown-ale', 'imperial-stout', 'sour-beer'] },
  { id: 'wine', name: 'Винная', emoji: '🍷', ids: ['red-wine', 'dry-red', 'semi-sweet-red', 'white-wine', 'dry-white', 'semi-sweet-white', 'rose-wine', 'sparkling', 'champagne', 'prosecco', 'port', 'madeira', 'muscat', 'cahors', 'orange-wine', 'pet-nat', 'ice-wine'] },
  { id: 'strong', name: 'Крепкая', emoji: '🥃', ids: ['vodka', 'vodka-premium', 'whisky', 'bourbon', 'scotch', 'irish-whiskey', 'rye-whiskey', 'cognac', 'armagnac', 'brandy', 'rum', 'white-rum', 'dark-rum', 'gin', 'london-dry-gin', 'tequila', 'tequila-silver', 'mezcal', 'absinthe', 'ouzo', 'sake'] },
  { id: 'liqueur', name: 'Ликёрная', emoji: '🍯', ids: ['herbal-liqueur', 'anise-liqueur', 'cream-liqueur', 'nut-liqueur', 'orange-liqueur', 'coffee-liqueur', 'coconut-liqueur', 'bitter-liqueur', 'lemon-liqueur', 'cherry-liqueur', 'peach-liqueur', 'banana-liqueur', 'amaretto', 'limoncello', 'cassis', 'mint-liqueur'] },
  { id: 'cocktail', name: 'Коктейльная', emoji: '🍸', ids: ['mojito', 'negroni', 'aperol-spritz', 'manhattan', 'margarita', 'pina-colada', 'daiquiri', 'cosmopolitan', 'long-island', 'whiskey-sour', 'moscow-mule', 'bloody-mary', 'gin-tonic', 'rum-cola', 'screwdriver', 'tequila-sunrise', 'blue-lagoon', 'mai-tai', 'sidecar', 'bellini', 'mimosa', 'kir-royale', 'espresso-martini', 'old-fashioned', 'sazerac', 'gimlet', 'paloma', 'dark-n-stormy', 'white-russian', 'black-russian', 'amaretto-sour', 'godfather', 'b-52-cocktail', 'sangria', 'mulled-wine', 'grog', 'hot-toddy', 'irish-coffee', 'hurricane', 'zombie', 'painkiller', 'pornstar-martini'] },
  { id: 'shots', name: 'Шоты', emoji: '🥂', ids: ['tequila-shot', 'sambuca-shot', 'jager-shot', 'vodka-shot', 'whisky-shot', 'rum-shot', 'gin-shot', 'absinthe-shot', 'b52', 'kamikaze', 'lemon-drop', 'green-tea-shot', 'buttery-nipple', 'slippery-nipple', 'irish-car-bomb'] },
  { id: 'soft', name: 'Безалкогольная', emoji: '🥤', ids: ['cola', 'lemonade', 'smoothie', 'mocktail', 'non-alc-beer', 'non-alc-wine', 'non-alc-cocktail', 'kvass', 'kombucha', 'iced-tea', 'mineral-water', 'energy-drink', 'tonic', 'ginger-ale', 'soda', 'orange-juice', 'apple-juice', 'coffee', 'tea'] },
  { id: 'mexican', name: 'Мексиканская вечеринка', emoji: '🌮', ids: ['tequila', 'tequila-silver', 'tequila-reposado', 'tequila-anejo', 'mezcal', 'margarita', 'paloma', 'tequila-sunrise', 'tequila-shot'] },
  { id: 'italian', name: 'Итальянский вечер', emoji: '🇮🇹', ids: ['prosecco', 'aperol-spritz', 'negroni', 'limoncello', 'amaretto', 'sambuca-shot', 'campari-type', 'aperol-type', 'vermouth', 'rosso-vermouth'] },
  { id: 'asian', name: 'Азиатский микс', emoji: '🥢', ids: ['sake', 'shochu', 'soju', 'baijiu', 'japanese-whisky', 'sake', 'plum-wine'] },
  { id: 'caribbean', name: 'Карибский пляж', emoji: '🏝', ids: ['rum', 'white-rum', 'dark-rum', 'mojito', 'pina-colada', 'daiquiri', 'mai-tai', 'hurricane', 'zombie', 'painkiller', 'planter-punch'] },
];