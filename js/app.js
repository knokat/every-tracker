// Every Tracker – Main App Component

import { html, render, useState, useEffect, useMemo } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { BOWLS } from './bowls.js';
import { loadInventory, adjustQuantity, setQuantity } from './db.js';
import { per100g, bowlImage, r1 } from './helpers.js';

// ================== Components ==================

function BowlCard({ bowl, qty, onInc, onDec, onSelect }) {
  const hasStock = qty > 0;
  const img = bowlImage(bowl, 220);

  return html`
    <div class="bowl-card ${hasStock ? '' : 'empty'}" onclick=${() => onSelect(bowl)}>
      <div class="bowl-img">
        ${img
          ? html`<img src=${img} alt=${bowl.name} loading="lazy" onerror=${(e) => { e.target.style.display = 'none'; }} />`
          : html`<div class="bowl-img-placeholder">🥣</div>`}
        <div class="bowl-qty-badge ${hasStock ? 'has' : 'zero'}">${qty}</div>
      </div>
      <div class="bowl-info">
        <div class="bowl-name">${bowl.name}</div>
        <div class="bowl-macros">
          <span>${bowl.weight_g}g</span>
          <span>${bowl.kcal} kcal</span>
          <span>${r1(bowl.protein)}g P</span>
        </div>
        ${bowl.has_planted ? html`<span class="tag planted">planted.pulled</span>` : null}
        ${bowl.has_mushrooms ? html`<span class="tag mushroom">🍄 Pilze</span>` : null}
        ${!bowl.combo_suitable ? html`<span class="tag excluded">nur für Matthias</span>` : null}
        ${bowl.needs_nutrition_check ? html`<span class="tag nutrition-check" title="Nährwerte bei nächstem Kauf prüfen">⚠️ Nährwerte prüfen</span>` : null}
      </div>
      <div class="bowl-actions" onclick=${(e) => e.stopPropagation()}>
        <button class="qty-btn minus" onclick=${() => onDec(bowl.slug)} disabled=${qty === 0}>−</button>
        <button class="qty-btn plus" onclick=${() => onInc(bowl.slug)}>+</button>
      </div>
    </div>
  `;
}

function BowlDetailSheet({ bowl, qty, onClose, onInc, onDec, onSetQty }) {
  if (!bowl) return null;
  const p100 = per100g(bowl);
  const img = bowlImage(bowl, 400);
  const [editQty, setEditQty] = useState(false);
  const [qtyValue, setQtyValue] = useState(qty);

  useEffect(() => setQtyValue(qty), [qty]);

  return html`
    <div class="sheet-overlay" onclick=${onClose}>
      <div class="sheet" onclick=${(e) => e.stopPropagation()}>
        <div class="sheet-header">
          <button class="sheet-close" onclick=${onClose}>✕</button>
          <div class="sheet-title">${bowl.name}</div>
        </div>
        <div class="sheet-body">
          ${img ? html`<img class="sheet-img" src=${img} alt=${bowl.name} onerror=${(e) => { e.target.style.display = 'none'; }} />` : null}
          <div class="sheet-desc">${bowl.desc}</div>

          <div class="stock-row">
            <div class="stock-label">Bestand</div>
            <div class="stock-controls">
              <button class="qty-btn minus" onclick=${() => onDec(bowl.slug)} disabled=${qty === 0}>−</button>
              ${editQty ? html`
                <input type="number" class="qty-input" value=${qtyValue}
                  onInput=${(e) => setQtyValue(parseInt(e.target.value) || 0)}
                  onBlur=${() => { onSetQty(bowl.slug, qtyValue); setEditQty(false); }}
                  onKeyDown=${(e) => { if (e.key === 'Enter') { onSetQty(bowl.slug, qtyValue); setEditQty(false); } }}
                  autofocus />
              ` : html`
                <div class="qty-display" onclick=${() => setEditQty(true)}>${qty}</div>
              `}
              <button class="qty-btn plus" onclick=${() => onInc(bowl.slug)}>+</button>
            </div>
          </div>

          <h3 class="sheet-section-title">Nährwerte</h3>
          ${bowl.needs_nutrition_check ? html`
            <div class="nutrition-check-warning">
              ⚠️ Die Nährwerte dieser Bowl könnten sich geändert haben. Bitte beim nächsten Kauf auf every-foods.com prüfen und ggf. in der DB korrigieren.
            </div>
          ` : null}
          <table class="macros-table">
            <thead>
              <tr><th></th><th>pro 100 g</th><th>ganze Bowl (${bowl.weight_g} g)</th></tr>
            </thead>
            <tbody>
              <tr><td>Kalorien</td><td>${p100.kcal} kcal</td><td>${bowl.kcal} kcal</td></tr>
              <tr><td>Protein</td><td>${p100.protein} g</td><td>${r1(bowl.protein)} g</td></tr>
              <tr><td>Kohlenhydrate</td><td>${p100.carbs} g</td><td>${r1(bowl.carbs)} g</td></tr>
              <tr><td>Fett</td><td>${p100.fat} g</td><td>${r1(bowl.fat)} g</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function SearchBar({ value, onInput }) {
  return html`
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="search" class="search-input" placeholder="Bowl suchen…" value=${value}
        onInput=${(e) => onInput(e.target.value)} />
      ${value ? html`<button class="search-clear" onclick=${() => onInput('')}>✕</button>` : null}
    </div>
  `;
}

function StatsHeader({ inventory }) {
  const totalBowls = Object.values(inventory).reduce((sum, q) => sum + q, 0);
  const uniqueVarieties = Object.values(inventory).filter(q => q > 0).length;
  const suitableInStock = BOWLS
    .filter(b => b.combo_suitable)
    .filter(b => (inventory[b.slug] || 0) > 0).length;

  return html`
    <div class="stats-header">
      <div class="stat">
        <div class="stat-value">${totalBowls}</div>
        <div class="stat-label">Bowls total</div>
      </div>
      <div class="stat">
        <div class="stat-value">${uniqueVarieties}</div>
        <div class="stat-label">Sorten</div>
      </div>
      <div class="stat">
        <div class="stat-value">${suitableInStock}</div>
        <div class="stat-label">Katja-tauglich</div>
      </div>
    </div>
  `;
}

// ================== Main App ==================

function App() {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedBowl, setSelectedBowl] = useState(null);
  const [search, setSearch] = useState('');
  const [eatenOpen, setEatenOpen] = useState(true);

  // Load inventory on mount
  useEffect(() => {
    loadInventory().then(inv => {
      setInventory(inv);
      setLoading(false);
    });
  }, []);

  // Suche anwenden + nach Bestand splitten, jeweils alphabetisch
  const { inStock, eaten } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? BOWLS.filter(b =>
          b.name.toLowerCase().includes(q) ||
          (b.desc || '').toLowerCase().includes(q))
      : BOWLS;
    const byName = (a, b) => a.name.localeCompare(b.name, 'de');
    return {
      inStock: filtered.filter(b => (inventory[b.slug] || 0) > 0).sort(byName),
      eaten: filtered.filter(b => (inventory[b.slug] || 0) === 0).sort(byName),
    };
  }, [inventory, search]);

  // Handlers
  const handleInc = async (slug) => {
    const current = inventory[slug] || 0;
    setInventory({ ...inventory, [slug]: current + 1 });
    await adjustQuantity(slug, current, 1);
  };

  const handleDec = async (slug) => {
    const current = inventory[slug] || 0;
    if (current === 0) return;
    setInventory({ ...inventory, [slug]: current - 1 });
    await adjustQuantity(slug, current, -1);
  };

  const handleSetQty = async (slug, qty) => {
    const newQty = Math.max(0, qty);
    setInventory({ ...inventory, [slug]: newQty });
    await setQuantity(slug, newQty);
  };

  if (loading) {
    return html`<div class="loading">Lade Bowls...</div>`;
  }

  const card = (bowl) => html`
    <${BowlCard}
      key=${bowl.slug}
      bowl=${bowl}
      qty=${inventory[bowl.slug] || 0}
      onInc=${handleInc}
      onDec=${handleDec}
      onSelect=${setSelectedBowl}
    />
  `;

  return html`
    <div class="app">
      <header class="app-header">
        <div class="app-title">
          <span class="logo-dot"></span>
          Every Tracker
        </div>
        <div class="app-subtitle">Bowl-Inventar</div>
      </header>

      <${StatsHeader} inventory=${inventory} />

      <${SearchBar} value=${search} onInput=${setSearch} />

      <main class="bowls-grid-wrap">
        ${inStock.length > 0 ? html`
          <section class="stock-section">
            <h2 class="section-title">
              <span>Vorrätig</span>
              <span class="count">${inStock.length}</span>
            </h2>
            <div class="bowls-grid">
              ${inStock.map(card)}
            </div>
          </section>
        ` : null}

        ${eaten.length > 0 ? html`
          <section class="stock-section eaten">
            <h2 class="section-title collapsible" onclick=${() => setEatenOpen(o => !o)}>
              <span class="chevron ${eatenOpen ? 'open' : ''}">▸</span>
              <span>Schon gegessen</span>
              <span class="count">${eaten.length}</span>
            </h2>
            ${eatenOpen ? html`
              <div class="bowls-grid">
                ${eaten.map(card)}
              </div>
            ` : null}
          </section>
        ` : null}

        ${inStock.length === 0 && eaten.length === 0 ? html`
          <div class="empty-state">
            <div>Keine Bowl gefunden</div>
            <div class="empty-hint">${search ? 'Andere Suche probieren.' : 'Bestand über + hinzufügen.'}</div>
          </div>
        ` : null}
      </main>

      <${BowlDetailSheet}
        bowl=${selectedBowl}
        qty=${selectedBowl ? (inventory[selectedBowl.slug] || 0) : 0}
        onClose=${() => setSelectedBowl(null)}
        onInc=${handleInc}
        onDec=${handleDec}
        onSetQty=${handleSetQty}
      />
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
