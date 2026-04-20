# Every Tracker

Inventar- und Kombinations-App für [every-foods.com](https://every-foods.com) Tiefkühl-Bowls.

**Live:** [knokat.github.io/every-tracker/](https://knokat.github.io/every-tracker/)

## Features

- **Inventar-Ansicht:** Alle 32 Bowls mit Bild, Gewicht, Nährwerten und Bestand (+/-)
- **Filter nach Protein-Topping:** Zeigt nur Bowls die mit einem bestimmten Topping sinnvoll kombinierbar sind
- **Detail-Sheet pro Bowl:** Nährwerte für ganze Packung & ¾ Portion, plus alle validen Topping-Kombis mit exakten Gramm-Angaben und Gesamt-Makros
- **Kategorien:** Pasta & Noodles, Currys & Dals, Signature Bowls
- **Tags:** planted.pulled, Pilze, "nur für Matthias" (Bowls die nicht fürs ¾-Konzept geeignet sind)

## Das Konzept

Katja teilt jede every-Bowl auf 1,33 Portionen auf (3 Packungen → 4 Mahlzeiten) und fügt ein Protein-Topping hinzu, um auf ~460 kcal und ~28g Protein pro Mahlzeit zu kommen. Matthias isst die Bowls ganz, unverändert.

## Tech Stack

- **Frontend:** Preact + htm (kein Build-Step)
- **DB:** Supabase (Tabelle `every_inventory`, public policy, kein Auth)
- **Hosting:** GitHub Pages

## Setup

1. Supabase-Tabelle anlegen: `supabase-schema.sql` im SQL Editor ausführen
2. Dateien in GitHub Repo `knokat/every-tracker` pushen
3. GitHub Pages auf `main` branch aktivieren
4. App öffnen: `https://knokat.github.io/every-tracker/`

## Datenmodell (Supabase)

```
every_inventory
  bowl_slug   TEXT PRIMARY KEY
  quantity    INT DEFAULT 0
  updated_at  TIMESTAMPTZ
```

Bowls selbst sind hardcoded in `js/bowls.js` (Nährwerte, Slug, Bild, Tags).

## Bowls hinzufügen / korrigieren

Editiere `js/bowls.js` — pro Bowl ein Objekt mit:
- `slug` (unique, für DB-Lookup)
- `name`, `desc`, `weight_g`, `kcal`, `protein`, `carbs`, `fat`
- `category` (`pasta` | `curry` | `signature`)
- `has_planted` (bool), `has_mushrooms` (bool)
- `combo_suitable` (bool — ist fürs ¾-Konzept geeignet)
- `img` (Shopify-CDN-URL oder `null`)

## Bilder nachpflegen

Nur 14 der 43 Bowls haben aktuell Bilder. So findest du die Bild-URL für fehlende Bowls:

1. Öffne in Chrome: `https://every-foods.com/products/[slug]` (z.B. `https://every-foods.com/products/tikka-masala`)
2. Rechtsklick aufs Hauptbild → "Bildadresse kopieren"
3. URL sieht aus wie: `https://cdn.sanity.io/images/eiijw0fc/production/XXXXX-1625x1625.png?w=500&auto=format`
4. In `js/bowls.js` beim entsprechenden Slug `img: null` → `img: "<URL>"`
5. Bei Bedarf `?w=500` anpassen — die App zeigt immer 220px breite Bilder.

Falls ein Slug nicht existiert (404), probiere `[slug]-bowl` (z.B. `bami-goreng-bowl`, `dal-delight-bowl`, `forest-green-bowl`).

## Dateistruktur

```
index.html           Shell + CSS
manifest.json        PWA Manifest
supabase-schema.sql  DB Schema
js/bowls.js          Bowl-Datenbank + Toppings + Targets
js/helpers.js        Portion-Berechnung, Kombinations-Logik
js/db.js             Supabase Client + Inventory-Funktionen
js/app.js            Main Preact-Komponente
icons/               PWA Icons
```
