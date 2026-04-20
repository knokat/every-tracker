-- Every Tracker – Supabase Schema
-- Führe das im Supabase SQL Editor aus (einmalig)

-- Tabelle: every_inventory
-- Speichert Bestand pro Bowl-Slug
create table if not exists public.every_inventory (
  bowl_slug text primary key,
  quantity integer not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now()
);

-- Index für schnelle Abfrage
create index if not exists every_inventory_updated_at_idx
  on public.every_inventory (updated_at desc);

-- RLS aktivieren
alter table public.every_inventory enable row level security;

-- Public Policy: Jeder darf lesen und schreiben (keine Auth nötig)
-- Die App läuft ohne Login, der Anon Key genügt
drop policy if exists "Public read access" on public.every_inventory;
create policy "Public read access"
  on public.every_inventory for select
  to anon, authenticated
  using (true);

drop policy if exists "Public write access" on public.every_inventory;
create policy "Public write access"
  on public.every_inventory for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public update access" on public.every_inventory;
create policy "Public update access"
  on public.every_inventory for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Public delete access" on public.every_inventory;
create policy "Public delete access"
  on public.every_inventory for delete
  to anon, authenticated
  using (true);
