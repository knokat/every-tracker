// Every Foods Bowl Database
// Portion = 1 package. For Katja's "3/4 Portion" concept, values are calculated in app.
// Kategorien:
//   - planted: enthält planted.pulled (Fleischersatz) → kein Hähnchen/Fisch obendrauf
//   - regular: kein planted.pulled → jedes Topping möglich
//   - excluded_from_combos: ungeeignet für Topping-Konzept (zu wenig P oder zu viele kcal)
//   - mushrooms: enthält Pilze (kann Katja weiterhin essen)

export const BOWLS = [
  // ==== PASTA & NOODLES ====
  { slug: "lemongrass-thai-ragout", name: "Lemongrass Thai Ragout", desc: "Zitronengras-Ragout mit Nudeln und Boonian.", weight_g: 450, kcal: 445, protein: 20.5, carbs: 57.6, fat: 11.3, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/48a9e3a2ba97bd421f23684ad1d9e82524c3405d-2000x2000.jpg?w=500&auto=format" },
  { slug: "peanut-noodles", name: "Peanut Noodles", desc: "Nudeln in Erdnussbutter-Sauce mit Gemüse.", weight_g: 450, kcal: 491, protein: 20.3, carbs: 50, fat: 22, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/8b58186cd8308420657e31b498fa682114425713-2000x2000.jpg?w=500&auto=format" },
  { slug: "paprika-thai-ragout", name: "Paprika Thai Ragout", desc: "Thai-Ragout mit Nudeln, Boonian und Paprika.", weight_g: 450, kcal: 510, protein: 25, carbs: 55, fat: 18, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/aca6be64f2972b78c3f93dfaf163ba3d8b224145-890x890.png?w=500&auto=format" },
  { slug: "sambal-curry-noodles", name: "Sambal Curry Noodles", desc: "Cremige Mie-Nudeln mit Gemüse & Kokos-Curry.", weight_g: 450, kcal: 394, protein: 9.9, carbs: 45, fat: 18, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/d53967223cab7f45a5b39bb46440d552e65d2827-954x955.png?w=500&auto=format" },
  { slug: "spaetzle-goulash", name: "Spätzle Goulash", desc: "Würzige Spätzle mit Pilzen & Paprika.", weight_g: 450, kcal: 518, protein: 25.7, carbs: 60, fat: 18, category: "pasta", has_planted: false, has_mushrooms: true, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/3c11d8f87eb65b5c2a7dc2e0443ef78a37316bcd-1057x1056.png?w=500&auto=format" },
  { slug: "mushroom-gnocchi", name: "Mushroom Gnocchi", desc: "Gnocchi mit Pilzen, Linsen & cremiger Sauce.", weight_g: 450, kcal: 484, protein: 17.6, carbs: 55, fat: 20, category: "pasta", has_planted: false, has_mushrooms: true, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/2eecb7f5d8f7115863ccf2550aa4a140bd066a1f-1049x1049.png?w=500&auto=format" },
  { slug: "pasta-rustica", name: "Pasta Rustica", desc: "Penne mit Grillgemüse & Tomatensauce.", weight_g: 450, kcal: 385, protein: 14, carbs: 55, fat: 10, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/7961424ee1e40a9b97a271b5a209e6d63bbeeae2-1024x1024.png?w=500&auto=format" },
  { slug: "ramen-noodles", name: "Ramen Noodles", desc: "Nudelsuppe mit Gemüse auf Soja-Basis.", weight_g: 550, kcal: 440, protein: 18.2, carbs: 60, fat: 11, category: "pasta", has_planted: false, has_mushrooms: true, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/e5eaa9fa4cef59fee1b760946ae3d9921c0db86f-1625x1625.png?w=500&auto=format" },
  { slug: "edamame-zen", name: "Edamame Zen", desc: "Nudeln mit Pak Choi, Wildreis & Edamame.", weight_g: 450, kcal: 423, protein: 20.3, carbs: 67.1, fat: 5.4, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/b92598c3f44b84e60104a5e6e874da78f951824f-3125x3125.jpg?w=500&auto=format" },
  { slug: "teriyaki-wok", name: "Teriyaki Wok", desc: "Asiatische Nudeln mit planted.pulled & Edamame.", weight_g: 450, kcal: 489, protein: 27, carbs: 52, fat: 18, category: "pasta", has_planted: true, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/a8f4c05c0942abb8a0b1c8080f102eed797c2771-1250x1250.png?w=500&auto=format" },
  { slug: "mushroom-spaetzle", name: "Mushroom Spätzle", desc: "Cremige Spätzle mit Pilzen & herzhaftem Gemüse.", weight_g: 450, kcal: 430, protein: 16, carbs: 50, fat: 17, category: "pasta", has_planted: false, has_mushrooms: true, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/4ff59099a7dcf473135cc132d03cdbbdea74a755-1750x1750.png?w=500&auto=format" },
  { slug: "pasta-arrabbiata", name: "Pasta Arrabbiata", desc: "Würzige Pasta mit Cherrytomaten & Chili.", weight_g: 450, kcal: 410, protein: 14, carbs: 58, fat: 12, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/7cc26ef46acd48f5c9ff7111e1255d2bfc4a7c04-1625x1625.png?w=500&auto=format" },
  { slug: "bami-goreng-bowl", name: "Bami Goreng", desc: "Nudeln mit planted.pulled & Pak Choi.", weight_g: 450, kcal: 468, protein: 28.4, carbs: 57.6, fat: 11.3, category: "pasta", has_planted: true, has_mushrooms: true, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/bc59efc5c386eb36b36af8cb366550694a427086-1625x1625.png?w=500&auto=format" },
  { slug: "coco-curry-pasta", name: "Coco Curry Pasta", desc: "Cremige Kokos-Curry-Pasta mit Brokkoli.", weight_g: 450, kcal: 541, protein: 18.5, carbs: 55, fat: 25, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: "https://cdn.sanity.io/images/eiijw0fc/production/94c720f7241788c0199f5bce972d9d042b750b5c-1500x1500.png?w=500&auto=format" },
  { slug: "brilliant-bolognese", name: "Brilliant Bolognese", desc: "Bolognese mit veganem Hack.", weight_g: 450, kcal: 519, protein: 20, carbs: 62, fat: 20, category: "pasta", has_planted: true, has_mushrooms: false, combo_suitable: false, img: null },
  { slug: "pumpkin-pasta", name: "Pumpkin Pasta", desc: "Pasta mit Kürbis-Sauce.", weight_g: 450, kcal: 563, protein: 15.8, carbs: 65, fat: 25, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: false, img: null },
  { slug: "peas-and-love", name: "Peas & Love", desc: "Pasta mit grünen Erbsen und Pesto.", weight_g: 450, kcal: 546, protein: 22, carbs: 60, fat: 22, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "green-curry-noodles", name: "Green Curry Noodles", desc: "Duftende Currynudeln, Blumenkohl & Spinat.", weight_g: 450, kcal: 477, protein: 14, carbs: 55, fat: 20, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "garden-gnocchi", name: "Garden Gnocchi", desc: "Gnocchi mit Gartengemüse.", weight_g: 450, kcal: 468, protein: 15.8, carbs: 60, fat: 15, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },

  // ==== CURRYS & DALS ====
  { slug: "japanese-sweet-curry", name: "Japanese Sweet Curry", desc: "Curry mit planted.pulled, Gemüse & Kartoffeln.", weight_g: 450, kcal: 450, protein: 25, carbs: 55, fat: 12, category: "curry", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "creamy-mango-curry", name: "Creamy Mango Curry", desc: "Cremiges Curry mit Mango, Gemüse & Wildreis.", weight_g: 450, kcal: 398, protein: 10.5, carbs: 60, fat: 12, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "better-butter-chicken", name: "Better Butter Chicken", desc: "Cremiges Butter Chicken mit planted.pulled.", weight_g: 450, kcal: 454, protein: 23, carbs: 50, fat: 18, category: "curry", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "tikka-masala", name: "Tikka Masala", desc: "Pikantes Curry mit Reis & planted.pulled.", weight_g: 450, kcal: 497, protein: 23.9, carbs: 58, fat: 18, category: "curry", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "red-curry", name: "Red Curry", desc: "Mildes rotes Curry mit planted.pulled.", weight_g: 450, kcal: 518, protein: 24.8, carbs: 52.7, fat: 21.2, category: "curry", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "golden-curry", name: "Golden Curry", desc: "Mildes gelbes Curry.", weight_g: 450, kcal: 423, protein: 13.1, carbs: 55, fat: 15, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "dal-delight-bowl", name: "Dal Delight", desc: "Indisches Dal mit roten Linsen, Bohnen, Süßkartoffel und Spinat.", weight_g: 450, kcal: 493, protein: 23.9, carbs: 60, fat: 15, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "green-dal", name: "Green Dal", desc: "Braune Linsen mit Spinat, Grünkohl, Pastinaken & Kokos.", weight_g: 450, kcal: 450, protein: 20, carbs: 50, fat: 18, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "sweet-lentil-dal", name: "Sweet Lentil Dal", desc: "Rote & braune Linsen mit Zucchini, Apfel, Karotten und Kichererbsen.", weight_g: 500, kcal: 470, protein: 19, carbs: 58, fat: 16, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "sweet-lentil-dal-high-protein", name: "Sweet Lentil Dal (High Protein)", desc: "Protein-Version mit roten & braunen Linsen, Kichererbsen und Gemüse.", weight_g: 500, kcal: 490, protein: 28, carbs: 58, fat: 14, category: "curry", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },

  // ==== SIGNATURE BOWLS ====
  { slug: "smoky-lentil-stew", name: "Smoky Lentil Stew", desc: "Rauchiger Linseneintopf.", weight_g: 450, kcal: 374, protein: 23.9, carbs: 50, fat: 8, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "farmhouse-ratatouille", name: "Farmhouse Ratatouille", desc: "Ratatouille aus Auberginen, Tomaten & Paprika.", weight_g: 450, kcal: 463, protein: 9.5, carbs: 45, fat: 22, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "mustard-veggies", name: "Mustard Veggies", desc: "Senf-glasierter Gemüse-Mix.", weight_g: 450, kcal: 452, protein: 9, carbs: 50, fat: 20, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "nasi-goreng", name: "Nasi Goreng", desc: "Basmati-Reis mit Gemüse & planted.pulled.", weight_g: 450, kcal: 528, protein: 26.1, carbs: 60, fat: 18, category: "signature", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "umami-rice", name: "Umami Rice", desc: "Würziger Gemüse-Reis mit planted.pulled.", weight_g: 450, kcal: 432, protein: 27.9, carbs: 55, fat: 10, category: "signature", has_planted: true, has_mushrooms: true, combo_suitable: true, img: null },
  { slug: "paella-del-sol", name: "Paella Del Sol", desc: "Paella mediterran mit Oliven & Tomaten.", weight_g: 450, kcal: 451, protein: 19.5, carbs: 55, fat: 16, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "golden-glow-bowl", name: "Golden Glow Bowl", desc: "Goldene Bowl mit Kichererbsen & Süßkartoffeln.", weight_g: 500, kcal: 590, protein: 16.5, carbs: 68, fat: 25, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: false, img: null },
  { slug: "chili-sin-carne", name: "Chili sin Carne", desc: "Proteinreiches veganes Chili mit Bohnen, Kartoffeln & planted.pulled.", weight_g: 450, kcal: 459, protein: 25.2, carbs: 55, fat: 14, category: "signature", has_planted: true, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "potato-panorama", name: "Potato Panorama", desc: "Kartoffelgericht mit Gemüse.", weight_g: 450, kcal: 441, protein: 8.6, carbs: 60, fat: 18, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: false, img: null },
  { slug: "forest-green-bowl", name: "Green Forest Bowl", desc: "Bärlauch-Dinkel-Mix mit Spargel & Steinpilzen.", weight_g: 450, kcal: 532, protein: 18, carbs: 39.2, fat: 32, category: "signature", has_planted: false, has_mushrooms: true, combo_suitable: true, img: null },
  { slug: "naked-taco", name: "Naked Taco", desc: "Tex-Mex-Reis-Bohnen-Mix mit Tomaten & Mais.", weight_g: 450, kcal: 494, protein: 15.3, carbs: 60, fat: 13.1, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "hearty-harissa-pilaf", name: "Hearty Harissa Pilaf", desc: "Würzige Bowl mit Harissa, Aubergine und Paprika.", weight_g: 450, kcal: 470, protein: 16, carbs: 58, fat: 18, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "green-boost-bowl", name: "Green Boost", desc: "Gemüse mit Kichererbsen, Linsen & Minzpesto.", weight_g: 450, kcal: 513, protein: 20.3, carbs: 32.4, fat: 31.1, category: "signature", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
  { slug: "pasta-norma", name: "Pasta Norma", desc: "Pasta mit Aubergine in würziger Tomatensauce.", weight_g: 450, kcal: 470, protein: 14, carbs: 60, fat: 16, category: "pasta", has_planted: false, has_mushrooms: false, combo_suitable: true, img: null },
];

// Protein-Toppings (Nährwerte pro 100g)
// Kategorie "meat" = nicht mit planted-Bowls kombinieren (doppeltes Protein vermeiden)
// Kategorie "dairy_egg" = mit planted-Bowls OK
export const TOPPINGS = [
  { id: "haehnchen",  name: "Hähnchenbrust",    kcal_100: 110, protein_100: 23, category: "meat" },
  { id: "kabeljau",   name: "Kabeljau",          kcal_100: 77,  protein_100: 17, category: "meat" },
  { id: "lachs",      name: "Lachs",             kcal_100: 180, protein_100: 20, category: "meat" },
  { id: "garnelen",   name: "Garnelen",          kcal_100: 91,  protein_100: 18, category: "meat" },
  { id: "thunfisch",  name: "Thunfisch (Dose)",  kcal_100: 126, protein_100: 28, category: "meat" },
  { id: "feta",       name: "Feta",              kcal_100: 250, protein_100: 14, category: "dairy_egg" },
  { id: "mozzarella", name: "Mozzarella",        kcal_100: 250, protein_100: 18, category: "dairy_egg" },
  { id: "ei",         name: "Ei (60g/Stück)",    kcal_100: 143, protein_100: 12, category: "dairy_egg" },
  { id: "tempeh_soja",  name: "Tempeh Soja",       kcal_100: 155, protein_100: 18, category: "dairy_egg" },
  { id: "tempeh_lupinen",name: "Tempeh Lupinen",   kcal_100: 125, protein_100: 16, category: "dairy_egg" },
];

// Zielwerte für Katja: ~460 kcal, ~28g P mit 3/4 Bowl-Portion + Topping
export const TARGET_KCAL = 460;
export const TARGET_PROTEIN = 28;
export const PORTION_FACTOR = 0.75; // 3/4 Portion

// Kategorie-Labels
export const CATEGORIES = {
  pasta: { label: "Pasta & Noodles", icon: "🍜", color: "#D97706" },
  curry: { label: "Currys & Dals",    icon: "🍛", color: "#B45309" },
  signature: { label: "Signature Bowls", icon: "🥣", color: "#065F46" },
};
