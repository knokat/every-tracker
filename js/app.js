// Every Tracker – Main App Component

import { html, render, useState, useEffect, useMemo } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { BOWLS, TOPPINGS, CATEGORIES, TARGET_KCAL, TARGET_PROTEIN } from './bowls.js';
import { loadInventory, adjustQuantity, setQuantity } from './db.js';
import { threeQuarterPortion, validCombos, bowlImage, r1, r0 } from './helpers.js';

// ================== Components ==================

function BowlCard({ bowl, qty, onInc, onDec, onSelect }) {
  const bowl34 = threeQuarterPortion(bowl);
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
  const bowl34 = threeQuarterPortion(bowl);
  const combos = bowl.combo_suitable ? validCombos(bowl, TOPPINGS) : [];
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
          <table class="macros-table">
            <thead>
              <tr><th></th><th>Ganze Packung (${bowl.weight_g}g)</th><th>¾ Portion (${bowl34.weight_g}g)</th></tr>
            </thead>
            <tbody>
              <tr><td>Kalorien</td><td>${bowl.kcal} kcal</td><td>${bowl34.kcal} kcal</td></tr>
              <tr><td>Protein</td><td>${r1(bowl.protein)}g</td><td>${bowl34.protein}g</td></tr>
              <tr><td>Kohlenhydrate</td><td>${r1(bowl.carbs)}g</td><td>${bowl34.carbs}g</td></tr>
              <tr><td>Fett</td><td>${r1(bowl.fat)}g</td><td>${bowl34.fat}g</td></tr>
            </tbody>
          </table>

          ${bowl.combo_suitable ? html`
            <h3 class="sheet-section-title">Topping-Kombinationen <span class="target-hint">Ziel: ${TARGET_KCAL} kcal, ${TARGET_PROTEIN}g P</span></h3>
            ${combos.length === 0 ? html`
              <div class="no-combos">Keine passenden Kombinationen gefunden.</div>
            ` : html`
              <div class="combos-list">
                ${combos.map(c => html`
                  <div class="combo-row">
                    <div class="combo-name">${c.topping.name}</div>
                    <div class="combo-amount">${c.totals.topping_grams}g</div>
                    <div class="combo-totals">
                      <span class="combo-kcal ${Math.abs(c.totals.kcal_diff) > 30 ? 'off' : 'ok'}">${c.totals.total_kcal} kcal</span>
                      <span class="combo-protein ${c.totals.total_protein < TARGET_PROTEIN - 2 ? 'off' : 'ok'}">${c.totals.total_protein}g P</span>
                    </div>
                  </div>
                `)}
              </div>
            `}
          ` : html`
            <div class="excluded-note">
              Diese Bowl ist nicht fürs ¾-Konzept geeignet (zu wenig Protein oder zu viele Kalorien).
              Matthias kann sie ganz essen.
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function FilterBar({ activeFilter, setActiveFilter, showEmpty, setShowEmpty }) {
  return html`
    <div class="filter-bar">
      <div class="filter-group">
        <div class="filter-label">Filter:</div>
        <div class="chip ${activeFilter === null ? 'active' : ''}" onclick=${() => setActiveFilter(null)}>Alle</div>
        ${TOPPINGS.map(t => html`
          <div class="chip ${activeFilter === t.id ? 'active' : ''}"
               onclick=${() => setActiveFilter(activeFilter === t.id ? null : t.id)}>
            ${t.name}
          </div>
        `)}
      </div>
      <label class="toggle-row">
        <input type="checkbox" checked=${showEmpty} onChange=${(e) => setShowEmpty(e.target.checked)} />
        <span>Leere Bestände anzeigen</span>
      </label>
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
  const [activeFilter, setActiveFilter] = useState(null);
  const [showEmpty, setShowEmpty] = useState(true);

  // Load inventory on mount
  useEffect(() => {
    loadInventory().then(inv => {
      setInventory(inv);
      setLoading(false);
    });
  }, []);

  // Filtered + sorted bowls
  const displayedBowls = useMemo(() => {
    let list = [...BOWLS];

    // Filter by topping compatibility
    if (activeFilter) {
      const topping = TOPPINGS.find(t => t.id === activeFilter);
      list = list.filter(b => {
        if (!b.combo_suitable) return false;
        if (b.has_planted && topping.category === "meat") return false;
        const combos = validCombos(b, [topping]);
        return combos.length > 0;
      });
    }

    // Filter by stock
    if (!showEmpty) {
      list = list.filter(b => (inventory[b.slug] || 0) > 0);
    }

    // Sort: in-stock first, then alphabetically
    return list.sort((a, b) => {
      const qa = inventory[a.slug] || 0;
      const qb = inventory[b.slug] || 0;
      if (qa !== qb) return qb - qa;
      return a.name.localeCompare(b.name);
    });
  }, [inventory, activeFilter, showEmpty]);

  // Group by category
  const grouped = useMemo(() => {
    const groups = { pasta: [], curry: [], signature: [] };
    displayedBowls.forEach(b => groups[b.category].push(b));
    return groups;
  }, [displayedBowls]);

  // Handlers
  const handleInc = async (slug) => {
    const current = inventory[slug] || 0;
    const newQty = current + 1;
    setInventory({ ...inventory, [slug]: newQty });
    await adjustQuantity(slug, current, 1);
  };

  const handleDec = async (slug) => {
    const current = inventory[slug] || 0;
    if (current === 0) return;
    const newQty = current - 1;
    setInventory({ ...inventory, [slug]: newQty });
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

  return html`
    <div class="app">
      <header class="app-header">
        <div class="app-title">
          <span class="logo-dot"></span>
          Every Tracker
        </div>
        <div class="app-subtitle">Inventar &amp; Kombinationen</div>
      </header>

      <${StatsHeader} inventory=${inventory} />

      <${FilterBar}
        activeFilter=${activeFilter}
        setActiveFilter=${setActiveFilter}
        showEmpty=${showEmpty}
        setShowEmpty=${setShowEmpty}
      />

      <main class="bowls-grid-wrap">
        ${Object.entries(grouped).map(([key, bowls]) => bowls.length > 0 && html`
          <section class="category-section">
            <h2 class="category-title" style=${`--cat-color: ${CATEGORIES[key].color}`}>
              <span>${CATEGORIES[key].icon}</span> ${CATEGORIES[key].label}
              <span class="count">${bowls.length}</span>
            </h2>
            <div class="bowls-grid">
              ${bowls.map(bowl => html`
                <${BowlCard}
                  key=${bowl.slug}
                  bowl=${bowl}
                  qty=${inventory[bowl.slug] || 0}
                  onInc=${handleInc}
                  onDec=${handleDec}
                  onSelect=${setSelectedBowl}
                />
              `)}
            </div>
          </section>
        `)}
        ${displayedBowls.length === 0 ? html`
          <div class="empty-state">
            <div>Keine Bowls gefunden</div>
            <div class="empty-hint">Probier einen anderen Filter oder zeig leere Bestände.</div>
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
