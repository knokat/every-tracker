// Every Tracker – Helper Functions

// Rundet auf angegebene Dezimalstellen
export const r1 = (n) => Math.round(n * 10) / 10;
export const r0 = (n) => Math.round(n);

// Berechnet Nährwerte pro 100 g aus den Werten der ganzen Packung
export function per100g(bowl) {
  const f = 100 / bowl.weight_g;
  return {
    kcal: r0(bowl.kcal * f),
    protein: r1(bowl.protein * f),
    carbs: r1(bowl.carbs * f),
    fat: r1(bowl.fat * f),
  };
}

// Shopify-CDN-URL mit angepasster Breite
export function bowlImage(bowl, width = 300) {
  if (!bowl.img) return null;
  // Die URLs haben schon ?w=500 — ersetze
  return bowl.img.replace(/w=\d+/, `w=${width}`);
}
