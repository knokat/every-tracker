// Every Tracker – Helper Functions

import { TARGET_KCAL, TARGET_PROTEIN, PORTION_FACTOR } from './bowls.js';

// Rundet auf angegebene Dezimalstellen
export const r1 = (n) => Math.round(n * 10) / 10;
export const r0 = (n) => Math.round(n);

// Berechnet Nährwerte für 3/4 Portion einer Bowl
export function threeQuarterPortion(bowl) {
  return {
    kcal: r0(bowl.kcal * PORTION_FACTOR),
    protein: r1(bowl.protein * PORTION_FACTOR),
    carbs: r1(bowl.carbs * PORTION_FACTOR),
    fat: r1(bowl.fat * PORTION_FACTOR),
    weight_g: r0(bowl.weight_g * PORTION_FACTOR),
  };
}

// Berechnet benötigte Topping-Menge für eine Bowl+Topping-Kombi
// Ziel: 28g Protein total.
// Returns null wenn Menge unrealistisch wäre (<20g oder >150g)
export function calculateTopping(bowl, topping) {
  const bowl34 = threeQuarterPortion(bowl);
  const proteinNeeded = TARGET_PROTEIN - bowl34.protein;

  if (proteinNeeded <= 0) {
    // Bowl hat schon genug Protein, kein Topping nötig
    return { grams: 0, kcal: 0, protein: 0, note: "kein Topping nötig" };
  }

  // Menge Topping für benötigtes Protein
  let grams = Math.round((proteinNeeded / topping.protein_100) * 100);

  // Auf 5g runden
  grams = Math.round(grams / 5) * 5;

  // Plausibilitätscheck
  if (grams < 20 || grams > 150) return null;

  const kcal = r0((grams * topping.kcal_100) / 100);
  const protein = r1((grams * topping.protein_100) / 100);

  return { grams, kcal, protein };
}

// Gesamtmakros (3/4 Bowl + Topping)
export function comboTotals(bowl, topping) {
  const bowl34 = threeQuarterPortion(bowl);
  const top = calculateTopping(bowl, topping);
  if (!top) return null;

  return {
    bowl_kcal: bowl34.kcal,
    bowl_protein: bowl34.protein,
    topping_grams: top.grams,
    topping_kcal: top.kcal,
    topping_protein: top.protein,
    total_kcal: bowl34.kcal + top.kcal,
    total_protein: r1(bowl34.protein + top.protein),
    kcal_diff: bowl34.kcal + top.kcal - TARGET_KCAL,
    protein_diff: r1(bowl34.protein + top.protein - TARGET_PROTEIN),
  };
}

// Gibt alle validen Topping-Kombinationen für eine Bowl zurück
export function validCombos(bowl, toppings) {
  return toppings
    .filter(t => {
      // planted-Bowls: nur dairy_egg Toppings
      if (bowl.has_planted && t.category === "meat") return false;
      return true;
    })
    .map(t => ({ topping: t, totals: comboTotals(bowl, t) }))
    .filter(c => c.totals !== null);
}

// Filter: Bowls die mit einem bestimmten Topping sinnvoll kombinierbar sind
export function bowlsWithTopping(bowls, toppings, toppingId) {
  const topping = toppings.find(t => t.id === toppingId);
  if (!topping) return [];
  return bowls.filter(b => {
    if (!b.combo_suitable) return false;
    if (b.has_planted && topping.category === "meat") return false;
    const combo = comboTotals(b, topping);
    return combo !== null;
  });
}

// Shopify-CDN-URL mit angepasster Breite
export function bowlImage(bowl, width = 300) {
  if (!bowl.img) return null;
  // Die URLs haben schon ?w=500 — ersetze
  return bowl.img.replace(/w=\d+/, `w=${width}`);
}
