// Every Tracker – Supabase DB Layer

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://qxbnjemssqjczexevnff.supabase.co';
// Anon key – öffentlich, read/write ist via Policy geregelt
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4Ym5qZW1zc3FqY3pleGV2bmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjUyMDYsImV4cCI6MjA5MTQwMTIwNn0.dZLv-Cgar7FaSSbyZBFcWq1JGQrp-v8UQ-CNjN3Fm2Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tabelle: every_inventory
//   bowl_slug TEXT PRIMARY KEY
//   quantity  INT DEFAULT 0
//   updated_at TIMESTAMPTZ

// Liest alle Inventar-Bestände
export async function loadInventory() {
  const { data, error } = await supabase
    .from('every_inventory')
    .select('bowl_slug, quantity');
  if (error) {
    console.error('loadInventory error:', error);
    return {};
  }
  // Konvertiere in Map: { slug: quantity }
  const map = {};
  data.forEach(row => { map[row.bowl_slug] = row.quantity; });
  return map;
}

// Setzt den Bestand für eine Bowl (upsert)
export async function setQuantity(slug, qty) {
  const { error } = await supabase
    .from('every_inventory')
    .upsert(
      { bowl_slug: slug, quantity: Math.max(0, qty), updated_at: new Date().toISOString() },
      { onConflict: 'bowl_slug' }
    );
  if (error) console.error('setQuantity error:', error);
  return !error;
}

// Erhöhe/verringere Bestand um delta (+1 / -1)
export async function adjustQuantity(slug, currentQty, delta) {
  const newQty = Math.max(0, currentQty + delta);
  return setQuantity(slug, newQty);
}
