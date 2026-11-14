// ============================================================
// БАЗА ДАННЫХ НАПИТКОВ (НЕЙТРАЛЬНАЯ, БЕЗ БРЕНДОВ)
// Глобальные: CATS, DRINKS, THEMES
// Формат напитка: { id, cat, name, emoji, abv, cal?, snack?, ing?, recipe? }
// ============================================================

// ===== КАТЕГОРИИ =====
const CATS = [
  { id: 'beer', name: 'Пиво', emoji: '🍺', color: '#F5A623' },
  { id: 'wine', name: 'Вино', emoji: '🍷', color: '#C0392B' },
  { id: 'cocktail', name: 'Коктейли', emoji: '🍸', color: '#9B59B6' },
  { id: 'strong', name: 'Крепкое', emoji: '🥃', color: '#E67E22' },
  { id: 'liqueur', name: 'Ликёры', emoji: '🍯', color: '#E91E63' },
  { id: 'aperitif', name: 'Аперитивы', emoji: '🍹', color: '#FF5722' },
  { id: 'cider', name: 'Сидры и меды', emoji: '🍎', color: '#8BC34A' },
  { id: 'shots', name: 'Шоты', emoji: '🥂', color: '#1ABC9C' },
  { id: 'soft', name: 'Безалкогольное', emoji: '🥤', color: '#3498DB' },
];

// ===== НАПИТКИ =====
const DRINKS = [
  // ============================================================
  // ПИВО
  // ============================================================
  // --- Лагеры и светлое ---
  { id: 'lager', cat: 'beer', name: 'Лагер', emoji: '🍺', abv: 4.5, cal: 210, snack: 'Орешки, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'light-lager', cat: 'beer', name: 'Светлый лагер', emoji: '🍺', abv: 4.2, cal: 195, snack: 'Чипсы, сухарики', ing: ['солод', 'хмель', 'вода'] },
  { id: 'pilsner', cat: 'beer', name: 'Пильзнер', emoji: '🍺', abv: 4.8, cal: 215, snack: 'Рыба, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'dark-lager', cat: 'beer', name: 'Тёмный лагер', emoji: '🍺', abv: 5.0, cal: 230, snack: 'Мясо, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'strong-lager', cat: 'beer', name: 'Крепкий лагер', emoji: '🍺', abv: 8.0, cal: 320, snack: 'Мясо, сыр', ing: ['солод', 'хмель', 'вода'] },
  { id: 'non-alc-lager', cat: 'beer', name: 'Безалкогольный лагер', emoji: '🍺', abv: 0, cal: 80, snack: 'Орешки', ing: ['солод', 'хмель', 'вода'] },
  // --- Стауты и портеры ---
  { id: 'stout', cat: 'beer', name: 'Стаут', emoji: '🍺', abv: 6.0, cal: 250, snack: 'Шоколад, бекон', ing: ['жареный солод', 'хмель', 'вода'] },
  { id: 'porter', cat: 'beer', name: 'Портер', emoji: '🍺', abv: 6.5, cal: 260, snack: 'Шоколад', ing: ['солод', 'хмель', 'вода'] },
  // --- IPA и крафт ---
  { id: 'ipa', cat: 'beer', name: 'IPA', emoji: '🍺', abv: 6.5, cal: 230, snack: 'Бургер, карри', ing: ['солод', 'хмель', 'вода'] },
  { id: 'craft-beer', cat: 'beer', name: 'Крафтовое пиво', emoji: '🍺', abv: 6.0, cal: 230, snack: 'Сыр, мясо', ing: ['солод', 'хмель', 'дрожжи'] },
  // --- Пшеничное ---
  { id: 'weissbier', cat: 'beer', name: 'Пшеничное пиво', emoji: '🍺', abv: 5.4, cal: 230, snack: 'Банан, сосиски', ing: ['пшеничный солод', 'хмель'] },
  // --- Сидры (в пивной категории) ---
  { id: 'cider-beer', cat: 'beer', name: 'Сидр', emoji: '🍎', abv: 4.5, cal: 190, snack: 'Фрукты, сыр', ing: ['яблочный сок', 'дрожжи'] },

  // ============================================================
  // ВИНО
  // ============================================================
  // --- Красное ---
  { id: 'red-wine', cat: 'wine', name: 'Красное вино', emoji: '🍷', abv: 12, cal: 125, snack: 'Сыр, мясо', ing: ['виноград'] },
  { id: 'dry-red', cat: 'wine', name: 'Красное сухое', emoji: '🍷', abv: 12, cal: 120, snack: 'Мясо, сыр', ing: ['виноград'] },
  { id: 'semi-sweet-red', cat: 'wine', name: 'Красное полусладкое', emoji: '🍷', abv: 11, cal: 130, snack: 'Шоколад, фрукты', ing: ['виноград'] },
  // --- Белое ---
  { id: 'white-wine', cat: 'wine', name: 'Белое вино', emoji: '🍷', abv: 11, cal: 120, snack: 'Рыба, фрукты', ing: ['виноград'] },
  { id: 'dry-white', cat: 'wine', name: 'Белое сухое', emoji: '🍷', abv: 11, cal: 115, snack: 'Рыба, морепродукты', ing: ['виноград'] },
  { id: 'semi-sweet-white', cat: 'wine', name: 'Белое полусладкое', emoji: '🍷', abv: 11, cal: 125, snack: 'Фрукты', ing: ['виноград'] },
  // --- Розовое ---
  { id: 'rose-wine', cat: 'wine', name: 'Розовое вино', emoji: '🍷', abv: 11, cal: 120, snack: 'Фрукты, сыр', ing: ['виноград'] },
  // --- Игристое ---
  { id: 'sparkling', cat: 'wine', name: 'Игристое вино', emoji: '🥂', abv: 12, cal: 130, snack: 'Икра, фрукты', ing: ['виноград'] },
  { id: 'champagne', cat: 'wine', name: 'Шампанское', emoji: '🥂', abv: 12, cal: 130, snack: 'Икра, фрукты', ing: ['виноград'] },
  { id: 'prosecco', cat: 'wine', name: 'Просекко', emoji: '🥂', abv: 11, cal: 120, snack: 'Фрукты', ing: ['виноград'] },
  // --- Креплёные ---
  { id: 'port', cat: 'wine', name: 'Портвейн', emoji: '🍷', abv: 18, cal: 160, snack: 'Шоколад, орехи', ing: ['виноград', 'спирт'] },
  { id: 'madeira', cat: 'wine', name: 'Мадера', emoji: '🍷', abv: 18, cal: 160, snack: 'Орехи', ing: ['виноград', 'спирт'] },
  { id: 'muscat', cat: 'wine', name: 'Мускат', emoji: '🍷', abv: 16, cal: 150, snack: 'Фрукты', ing: ['виноград', 'спирт'] },
  { id: 'cahors', cat: 'wine', name: 'Кагор', emoji: '🍷', abv: 16, cal: 150, snack: 'Шоколад', ing: ['виноград', 'спирт'] },

  // ============================================================
  // КОКТЕЙЛИ
  // ============================================================
  { id: 'mojito', cat: 'cocktail', name: 'Мохито', emoji: '🍸', abv: 10, cal: 170, snack: 'Лайм', ing: ['ром', 'лайм', 'мята', 'сахар', 'сода'], recipe: 'Мята+лайм+сахар, лёд, ром, сода.' },
  { id: 'negroni', cat: 'cocktail', name: 'Негрони', emoji: '🍸', abv: 24, cal: 200, snack: 'Оливки', ing: ['джин', 'кампари', 'вермут'], recipe: '1:1:1, лёд, апельсин.' },
  { id: 'aperol-spritz', cat: 'cocktail', name: 'Апероль шприц', emoji: '🍸', abv: 11, cal: 180, snack: 'Брускетта', ing: ['апероль', 'просекко', 'сода'], recipe: '3:2:1, лёд, апельсин.' },
  { id: 'manhattan', cat: 'cocktail', name: 'Манхэттен', emoji: '🍸', abv: 28, cal: 190, snack: 'Вишня', ing: ['виски', 'вермут', 'биттер'], recipe: '2:1:1, лёд, вишня.' },
  { id: 'margarita', cat: 'cocktail', name: 'Маргарита', emoji: '🍸', abv: 20, cal: 180, snack: 'Лайм, соль', ing: ['текила', 'лайм', 'трипл-сек'], recipe: '2:1:1, соль на бокале.' },
  { id: 'pina-colada', cat: 'cocktail', name: 'Пина Колада', emoji: '🍸', abv: 12, cal: 250, snack: 'Ананас', ing: ['ром', 'кокос', 'ананас'], recipe: 'Ром+кокосовое молоко+ананасовый сок, лёд.' },
  { id: 'daiquiri', cat: 'cocktail', name: 'Дайкири', emoji: '🍸', abv: 18, cal: 150, snack: 'Лайм', ing: ['ром', 'лайм', 'сахар'], recipe: '2:1:0.5, лёд.' },
  { id: 'cosmopolitan', cat: 'cocktail', name: 'Космополитен', emoji: '🍸', abv: 15, cal: 160, snack: 'Апельсин', ing: ['водка', 'трипл-сек', 'клюква', 'лайм'], recipe: '1.5:0.5:1:0.5.' },
  { id: 'long-island', cat: 'cocktail', name: 'Лонг-Айленд', emoji: '🍸', abv: 22, cal: 220, snack: 'Лимон', ing: ['водка', 'джин', 'ром', 'текила', 'кола'], recipe: 'Все по 15 мл, кола, лёд.' },
  { id: 'whiskey-sour', cat: 'cocktail', name: 'Виски Сауэр', emoji: '🍸', abv: 18, cal: 170, snack: 'Вишня', ing: ['виски', 'лимон', 'сахар'], recipe: '2:1:0.5, лёд.' },
  { id: 'moscow-mule', cat: 'cocktail', name: 'Московский мул', emoji: '🍸', abv: 12, cal: 160, snack: 'Лайм', ing: ['водка', 'имбирь', 'лайм', 'сода'], recipe: 'Водка+имбирный эль+лайм.' },
  { id: 'bloody-mary', cat: 'cocktail', name: 'Кровавая Мэри', emoji: '🍸', abv: 10, cal: 120, snack: 'Сельдерей', ing: ['водка', 'томат', 'специи'], recipe: 'Водка+томатный сок+специи.' },
  { id: 'gin-tonic', cat: 'cocktail', name: 'Джин-тоник', emoji: '🍸', abv: 10, cal: 140, snack: 'Лайм', ing: ['джин', 'тоник', 'лайм'], recipe: '1:3, лёд, лайм.' },
  { id: 'rum-cola', cat: 'cocktail', name: 'Ром-кола', emoji: '🍸', abv: 10, cal: 150, snack: 'Лайм', ing: ['ром', 'кола', 'лайм'], recipe: '1:3, лёд.' },
  { id: 'screwdriver', cat: 'cocktail', name: 'Отвёртка', emoji: '🍸', abv: 10, cal: 140, snack: 'Апельсин', ing: ['водка', 'апельсиновый сок'], recipe: '1:2, лёд.' },
  { id: 'tequila-sunrise', cat: 'cocktail', name: 'Текила Санрайз', emoji: '🍸', abv: 12, cal: 160, snack: 'Апельсин', ing: ['текила', 'апельсин', 'гренадин'], recipe: 'Текила+сок+гренадин.' },
  { id: 'blue-lagoon', cat: 'cocktail', name: 'Голубая лагуна', emoji: '🍸', abv: 14, cal: 170, snack: 'Лимон', ing: ['водка', 'блю кюрасао', 'лимон'], recipe: 'Водка+ликёр+лимонный сок.' },
  { id: 'mai-tai', cat: 'cocktail', name: 'Май Тай', emoji: '🍸', abv: 18, cal: 200, snack: 'Ананас', ing: ['ром', 'апельсин', 'миндаль'], recipe: 'Ром+соки+сироп.' },
  { id: 'sidecar', cat: 'cocktail', name: 'Сайдкар', emoji: '🍸', abv: 22, cal: 180, snack: 'Лимон', ing: ['коньяк', 'трипл-сек', 'лимон'], recipe: '2:1:1.' },
  { id: 'bellini', cat: 'cocktail', name: 'Беллини', emoji: '🍸', abv: 8, cal: 130, snack: 'Персик', ing: ['просекко', 'персик'], recipe: 'Просекко+персиковое пюре.' },
  { id: 'mimosa', cat: 'cocktail', name: 'Мимоза', emoji: '🍸', abv: 8, cal: 130, snack: 'Апельсин', ing: ['шампанское', 'апельсин'], recipe: '1:1.' },
  { id: 'kir-royale', cat: 'cocktail', name: 'Кир Рояль', emoji: '🍸', abv: 10, cal: 140, snack: 'Смородина', ing: ['шампанское', 'смородиновый ликёр'], recipe: 'Шампанское+ликёр.' },
  { id: 'espresso-martini', cat: 'cocktail', name: 'Эспрессо мартини', emoji: '🍸', abv: 15, cal: 150, snack: 'Кофе', ing: ['водка', 'кофейный ликёр', 'эспрессо'], recipe: 'Водка+ликёр+кофе.' },
  { id: 'old-fashioned', cat: 'cocktail', name: 'Олд Фэшн', emoji: '🍸', abv: 30, cal: 180, snack: 'Апельсин', ing: ['виски', 'сахар', 'биттер'], recipe: 'Виски+сахар+биттер.' },
  { id: 'sazerac', cat: 'cocktail', name: 'Сазерак', emoji: '🍸', abv: 28, cal: 180, snack: 'Лимон', ing: ['коньяк', 'абсент', 'биттер'], recipe: 'Коньяк+абсент+биттер.' },
  { id: 'gimlet', cat: 'cocktail', name: 'Гимлет', emoji: '🍸', abv: 18, cal: 150, snack: 'Лайм', ing: ['джин', 'лайм', 'сахар'], recipe: '2:1:0.5.' },
  { id: 'paloma', cat: 'cocktail', name: 'Палома', emoji: '🍸', abv: 10, cal: 140, snack: 'Грейпфрут', ing: ['текила', 'грейпфрут', 'сода'], recipe: 'Текила+сок+сода.' },
  { id: 'dark-n-stormy', cat: 'cocktail', name: 'Дарк энд Шторми', emoji: '🍸', abv: 12, cal: 160, snack: 'Лайм', ing: ['ром', 'имбирь', 'лайм'], recipe: 'Ром+имбирный эль+лайм.' },
  { id: 'white-russian', cat: 'cocktail', name: 'Белый русский', emoji: '🍸', abv: 15, cal: 200, snack: 'Кофе', ing: ['водка', 'кофейный ликёр', 'сливки'], recipe: 'Водка+ликёр+сливки.' },
  { id: 'black-russian', cat: 'cocktail', name: 'Чёрный русский', emoji: '🍸', abv: 18, cal: 180, snack: 'Кофе', ing: ['водка', 'кофейный ликёр'], recipe: 'Водка+ликёр.' },
  { id: 'amaretto-sour', cat: 'cocktail', name: 'Амаретто сауэр', emoji: '🍸', abv: 12, cal: 180, snack: 'Миндаль', ing: ['амаретто', 'лимон', 'сахар'], recipe: '2:1:0.5.' },
  { id: 'godfather', cat: 'cocktail', name: 'Крёстный отец', emoji: '🍸', abv: 25, cal: 190, snack: 'Миндаль', ing: ['виски', 'амаретто'], recipe: '2:1.' },
  { id: 'b-52-cocktail', cat: 'cocktail', name: 'Б-52', emoji: '🍸', abv: 20, cal: 150, snack: '—', ing: ['кофейный ликёр', 'сливочный ликёр', 'трипл-сек'], recipe: 'Слоями.' },
  { id: 'sangria', cat: 'cocktail', name: 'Сангрия', emoji: '🍷', abv: 10, cal: 140, snack: 'Фрукты', ing: ['вино', 'фрукты', 'содовая'], recipe: 'Вино+фрукты+сода.' },
  { id: 'mulled-wine', cat: 'cocktail', name: 'Глинтвейн', emoji: '🍷', abv: 10, cal: 150, snack: 'Апельсин, корица', ing: ['вино', 'специи', 'мёд'], recipe: 'Вино+специи+мёд, подогреть.' },
  { id: 'grog', cat: 'cocktail', name: 'Грог', emoji: '🍸', abv: 15, cal: 160, snack: 'Лимон', ing: ['ром', 'чай', 'лимон', 'мёд'], recipe: 'Ром+чай+мёд.' },
  { id: 'hot-toddy', cat: 'cocktail', name: 'Хот Тодди', emoji: '🍸', abv: 12, cal: 150, snack: 'Лимон', ing: ['виски', 'мёд', 'лимон', 'вода'], recipe: 'Виски+мёд+лимон+горячая вода.' },

  // ============================================================
  // КРЕПКОЕ (без брендов — только типы)
  // ============================================================
  // --- Водка ---
  { id: 'vodka', cat: 'strong', name: 'Водка', emoji: '🥃', abv: 40, cal: 230, snack: 'Солёное, огурцы', ing: ['спирт', 'вода'] },
  { id: 'vodka-premium', cat: 'strong', name: 'Водка премиум', emoji: '🥃', abv: 40, cal: 230, snack: 'Икра, солёное', ing: ['спирт', 'вода'] },
  // --- Виски ---
  { id: 'whisky', cat: 'strong', name: 'Виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад, сыр', ing: ['зерно', 'вода'] },
  { id: 'bourbon', cat: 'strong', name: 'Бурбон', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад, мясо', ing: ['кукуруза', 'вода'] },
  { id: 'scotch', cat: 'strong', name: 'Шотландский виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Сыр, копчёности', ing: ['солод', 'вода'] },
  { id: 'irish-whiskey', cat: 'strong', name: 'Ирландский виски', emoji: '🥃', abv: 40, cal: 250, snack: 'Шоколад', ing: ['зерно', 'вода'] },
  // --- Коньяк и бренди ---
  { id: 'cognac', cat: 'strong', name: 'Коньяк', emoji: '🥃', abv: 40, cal: 240, snack: 'Шоколад, кофе', ing: ['виноград', 'вода'] },
  { id: 'brandy', cat: 'strong', name: 'Бренди', emoji: '🥃', abv: 40, cal: 240, snack: 'Шоколад', ing: ['виноград', 'вода'] },
  { id: 'armagnac', cat: 'strong', name: 'Арманьяк', emoji: '🥃', abv: 40, cal: 240, snack: 'Кофе, шоколад', ing: ['виноград', 'вода'] },
  // --- Ром ---
  { id: 'rum', cat: 'strong', name: 'Ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Шоколад', ing: ['сахарный тростник'] },
  { id: 'white-rum', cat: 'strong', name: 'Белый ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм, кола', ing: ['сахарный тростник'] },
  { id: 'dark-rum', cat: 'strong', name: 'Тёмный ром', emoji: '🥃', abv: 40, cal: 230, snack: 'Шоколад', ing: ['сахарный тростник'] },
  // --- Джин ---
  { id: 'gin', cat: 'strong', name: 'Джин', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм, тоник', ing: ['можжевельник', 'спирт'] },
  { id: 'london-dry-gin', cat: 'strong', name: 'Лондонский сухой джин', emoji: '🥃', abv: 40, cal: 230, snack: 'Лайм', ing: ['можжевельник', 'спирт'] },
  // --- Текила ---
  { id: 'tequila', cat: 'strong', name: 'Текила', emoji: '🥂', abv: 38, cal: 100, snack: 'Соль, лайм', ing: ['агава', 'вода'] },
  { id: 'tequila-silver', cat: 'strong', name: 'Текила серебряная', emoji: '🥂', abv: 38, cal: 100, snack: 'Соль, лайм', ing: ['агава', 'вода'] },
  // --- Абсент ---
  { id: 'absinthe', cat: 'strong', name: 'Абсент', emoji: '🥃', abv: 70, cal: 280, snack: '—', ing: ['полынь', 'спирт'] },

  // ============================================================
  // ЛИКЁРЫ (без брендов — только типы)
  // ============================================================
  { id: 'herbal-liqueur', cat: 'liqueur', name: 'Травяной ликёр', emoji: '🍯', abv: 35, cal: 120, snack: 'Энергетик', ing: ['травы', 'спирт'] },
  { id: 'anise-liqueur', cat: 'liqueur', name: 'Анисовый ликёр', emoji: '🍯', abv: 38, cal: 110, snack: 'Кофе, оливка', ing: ['анис', 'спирт'] },
  { id: 'cream-liqueur', cat: 'liqueur', name: 'Сливочный ликёр', emoji: '🍯', abv: 17, cal: 200, snack: 'Кофе, десерт', ing: ['сливки', 'спирт'] },
  { id: 'nut-liqueur', cat: 'liqueur', name: 'Ореховый ликёр', emoji: '🍯', abv: 28, cal: 180, snack: 'Миндаль', ing: ['орехи', 'спирт'] },
  { id: 'orange-liqueur', cat: 'liqueur', name: 'Апельсиновый ликёр', emoji: '🍯', abv: 30, cal: 140, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },
  { id: 'coffee-liqueur', cat: 'liqueur', name: 'Кофейный ликёр', emoji: '🍯', abv: 20, cal: 160, snack: 'Кофе', ing: ['кофе', 'спирт'] },
  { id: 'coconut-liqueur', cat: 'liqueur', name: 'Кокосовый ликёр', emoji: '🍯', abv: 21, cal: 150, snack: 'Ананас', ing: ['кокос', 'спирт'] },
  { id: 'bitter-liqueur', cat: 'liqueur', name: 'Горький ликёр', emoji: '🍯', abv: 25, cal: 130, snack: 'Апельсин', ing: ['травы', 'спирт'] },
  { id: 'lemon-liqueur', cat: 'liqueur', name: 'Лимонный ликёр', emoji: '🍯', abv: 25, cal: 140, snack: 'Лимон', ing: ['лимон', 'спирт'] },
  { id: 'cherry-liqueur', cat: 'liqueur', name: 'Вишнёвый ликёр', emoji: '🍯', abv: 25, cal: 160, snack: 'Вишня', ing: ['вишня', 'спирт'] },
  { id: 'peach-liqueur', cat: 'liqueur', name: 'Персиковый ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Персик', ing: ['персик', 'спирт'] },
  { id: 'banana-liqueur', cat: 'liqueur', name: 'Банановый ликёр', emoji: '🍯', abv: 20, cal: 150, snack: 'Банан', ing: ['банан', 'спирт'] },

  // ============================================================
  // АПЕРИТИВЫ (без брендов — только типы)
  // ============================================================
  { id: 'vermouth', cat: 'aperitif', name: 'Вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'bianco-vermouth', cat: 'aperitif', name: 'Белый вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'rosso-vermouth', cat: 'aperitif', name: 'Красный вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Сыр', ing: ['вино', 'травы'] },
  { id: 'dry-vermouth', cat: 'aperitif', name: 'Сухой вермут', emoji: '🍹', abv: 15, cal: 140, snack: 'Оливки', ing: ['вино', 'травы'] },
  { id: 'bitter-aperitif', cat: 'aperitif', name: 'Горький аперитив', emoji: '🍹', abv: 25, cal: 130, snack: 'Апельсин', ing: ['травы', 'спирт'] },
  { id: 'orange-aperitif', cat: 'aperitif', name: 'Апельсиновый аперитив', emoji: '🍹', abv: 11, cal: 120, snack: 'Апельсин', ing: ['апельсин', 'спирт'] },

  // ============================================================
  // СИДРЫ И МЕДЫ
  // ============================================================
  { id: 'cider-apple', cat: 'cider', name: 'Яблочный сидр', emoji: '🍎', abv: 4.5, cal: 190, snack: 'Сыр, фрукты', ing: ['яблоки'] },
  { id: 'cider-pear', cat: 'cider', name: 'Грушевый сидр', emoji: '🍐', abv: 4.5, cal: 190, snack: 'Сыр', ing: ['груши'] },
  { id: 'cider-berry', cat: 'cider', name: 'Ягодный сидр', emoji: '🍓', abv: 4.5, cal: 190, snack: 'Фрукты', ing: ['ягоды'] },
  { id: 'medovukha', cat: 'cider', name: 'Медовуха', emoji: '🍯', abv: 5, cal: 180, snack: 'Мёд, орехи', ing: ['мёд', 'дрожжи'] },
  { id: 'sbiten', cat: 'cider', name: 'Сбитень', emoji: '🍯', abv: 5, cal: 170, snack: 'Пряники', ing: ['мёд', 'специи'] },

  // ============================================================
  // ШОТЫ
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

  // ============================================================
  // БЕЗАЛКОГОЛЬНОЕ
  // ============================================================
  { id: 'cola', cat: 'soft', name: 'Кола', emoji: '🥤', abv: 0, cal: 140, snack: 'Чипсы', ing: ['вода', 'сахар', 'карамель'] },
  { id: 'lemonade', cat: 'soft', name: 'Лимонад', emoji: '🥤', abv: 0, cal: 90, snack: 'Фрукты', ing: ['вода', 'лимон', 'сахар'] },
  { id: 'smoothie', cat: 'soft', name: 'Смузи', emoji: '🥤', abv: 0, cal: 120, snack: '—', ing: ['фрукты', 'йогурт'] },
  { id: 'mocktail', cat: 'soft', name: 'Моктейл', emoji: '🍹', abv: 0, cal: 80, snack: 'Орешки', ing: ['сок', 'сода'], recipe: 'Сок+сода+лёд+сироп.' },
  { id: 'non-alc-beer', cat: 'soft', name: 'Безалкогольное пиво', emoji: '🍺', abv: 0, cal: 80, snack: 'Орешки', ing: ['солод', 'хмель'] },
  { id: 'non-alc-wine', cat: 'soft', name: 'Безалкогольное вино', emoji: '🍷', abv: 0, cal: 60, snack: 'Фрукты', ing: ['виноград'] },
  { id: 'non-alc-cocktail', cat: 'soft', name: 'Безалкогольный коктейль', emoji: '🍸', abv: 0, cal: 70, snack: 'Фрукты', ing: ['сок', 'сода'] },
  { id: 'kvass', cat: 'soft', name: 'Квас', emoji: '🥤', abv: 0, cal: 60, snack: 'Хлеб', ing: ['хлеб', 'дрожжи'] },
  { id: 'kombucha', cat: 'soft', name: 'Комбуча', emoji: '🥤', abv: 0, cal: 40, snack: '—', ing: ['чай', 'гриб'] },
  { id: 'iced-tea', cat: 'soft', name: 'Холодный чай', emoji: '🥤', abv: 0, cal: 70, snack: '—', ing: ['чай', 'сахар'] },
  { id: 'mineral-water', cat: 'soft', name: 'Минеральная вода', emoji: '💧', abv: 0, cal: 0, snack: '—', ing: ['вода'] },
  { id: 'energy-drink', cat: 'soft', name: 'Энергетик', emoji: '⚡', abv: 0, cal: 110, snack: '—', ing: ['кофеин', 'сахар'] },
  { id: 'tonic', cat: 'soft', name: 'Тоник', emoji: '🥤', abv: 0, cal: 80, snack: 'Лайм', ing: ['вода', 'хинин', 'сахар'] },
  { id: 'ginger-ale', cat: 'soft', name: 'Имбирный эль', emoji: '🥤', abv: 0, cal: 90, snack: '—', ing: ['имбирь', 'вода', 'сахар'] },
  { id: 'soda', cat: 'soft', name: 'Содовая', emoji: '💧', abv: 0, cal: 0, snack: '—', ing: ['вода', 'газ'] },
];

// ===== ТЕМАТИЧЕСКИЕ КОЛЁСА =====
const THEMES = [
  { id: 'ny', name: 'Новый год', emoji: '🎄', ids: ['sparkling', 'champagne', 'prosecco', 'red-wine', 'white-wine', 'vodka', 'whisky', 'mojito', 'mimosa'] },
  { id: 'oktober', name: 'Октоберфест', emoji: '🍻', ids: ['lager', 'stout', 'porter', 'ipa', 'weissbier', 'dark-lager', 'strong-lager', 'pilsner'] },
  { id: 'summer', name: 'Лето', emoji: '🌞', ids: ['mojito', 'aperol-spritz', 'lemonade', 'white-wine', 'smoothie', 'mocktail', 'cider-apple', 'cider-pear', 'gin-tonic', 'paloma', 'sangria', 'pina-colada', 'daiquiri', 'margarita'] },
  { id: 'russian', name: 'Русская классика', emoji: '🪆', ids: ['vodka', 'vodka-premium', 'cognac', 'brandy', 'sparkling', 'champagne', 'red-wine', 'lager', 'medovukha', 'sbiten'] },
  { id: 'beer', name: 'Пивная', emoji: '🍺', ids: ['lager', 'light-lager', 'pilsner', 'dark-lager', 'strong-lager', 'non-alc-lager', 'stout', 'porter', 'ipa', 'craft-beer', 'weissbier'] },
  { id: 'wine', name: 'Винная', emoji: '🍷', ids: ['red-wine', 'dry-red', 'semi-sweet-red', 'white-wine', 'dry-white', 'semi-sweet-white', 'rose-wine', 'sparkling', 'champagne', 'prosecco', 'port', 'madeira', 'muscat', 'cahors'] },
  { id: 'strong', name: 'Крепкая', emoji: '🥃', ids: ['vodka', 'vodka-premium', 'whisky', 'bourbon', 'scotch', 'irish-whiskey', 'cognac', 'brandy', 'armagnac', 'rum', 'white-rum', 'dark-rum', 'gin', 'london-dry-gin', 'tequila', 'tequila-silver', 'absinthe'] },
  { id: 'liqueur', name: 'Ликёрная', emoji: '🍯', ids: ['herbal-liqueur', 'anise-liqueur', 'cream-liqueur', 'nut-liqueur', 'orange-liqueur', 'coffee-liqueur', 'coconut-liqueur', 'bitter-liqueur', 'lemon-liqueur', 'cherry-liqueur', 'peach-liqueur', 'banana-liqueur'] },
  { id: 'cocktail', name: 'Коктейльная', emoji: '🍸', ids: ['mojito', 'negroni', 'aperol-spritz', 'manhattan', 'margarita', 'pina-colada', 'daiquiri', 'cosmopolitan', 'long-island', 'whiskey-sour', 'moscow-mule', 'bloody-mary', 'gin-tonic', 'rum-cola', 'screwdriver', 'tequila-sunrise', 'blue-lagoon', 'mai-tai', 'sidecar', 'bellini', 'mimosa', 'kir-royale', 'espresso-martini', 'old-fashioned', 'sazerac', 'gimlet', 'paloma', 'dark-n-stormy', 'white-russian', 'black-russian', 'amaretto-sour', 'godfather', 'b-52-cocktail', 'sangria', 'mulled-wine', 'grog', 'hot-toddy'] },
  { id: 'shots', name: 'Шоты', emoji: '🥂', ids: ['tequila-shot', 'sambuca-shot', 'jager-shot', 'vodka-shot', 'whisky-shot', 'rum-shot', 'gin-shot', 'absinthe-shot', 'b52', 'kamikaze', 'lemon-drop', 'green-tea-shot'] },
  { id: 'soft', name: 'Безалкогольная', emoji: '🥤', ids: ['cola', 'lemonade', 'smoothie', 'mocktail', 'non-alc-beer', 'non-alc-wine', 'non-alc-cocktail', 'kvass', 'kombucha', 'iced-tea', 'mineral-water', 'energy-drink', 'tonic', 'ginger-ale', 'soda'] },
];