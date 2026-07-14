-- Run this entire file in Supabase Dashboard > SQL Editor.
-- It is safe to run again: it creates the required tables, fills in columns
-- missing from earlier versions, and refreshes the app's access policies.

create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  type text not null,
  quantity text,
  material text,
  finish text,
  delivery text,
  location text,
  requirement text not null,
  attachment_url text,
  status text not null default 'new' check (status in ('new', 'in_review', 'replied', 'closed'))
);

alter table public.enquiries
  add column if not exists phone text,
  add column if not exists quantity text,
  add column if not exists material text,
  add column if not exists finish text,
  add column if not exists delivery text,
  add column if not exists location text,
  add column if not exists attachment_url text,
  add column if not exists status text not null default 'new';
alter table public.enquiries enable row level security;

drop policy if exists "Anyone can send an enquiry" on public.enquiries;
drop policy if exists "Authenticated admins can view enquiries" on public.enquiries;
drop policy if exists "Authenticated admins can update enquiries" on public.enquiries;
create policy "Anyone can send an enquiry" on public.enquiries for insert to anon, authenticated with check (true);
create policy "Authenticated admins can view enquiries" on public.enquiries for select to authenticated using (true);
create policy "Authenticated admins can update enquiries" on public.enquiries for update to authenticated using (true) with check (true);
grant insert on public.enquiries to anon, authenticated;
grant select, update on public.enquiries to authenticated;

create table if not exists public.site_settings (
  id text primary key default 'main',
  hero_eyebrow text not null,
  hero_title text not null,
  hero_description text not null,
  contact_email text not null,
  contact_address text not null,
  contact_response text not null,
  business_hours text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

drop policy if exists "Anyone can read website settings" on public.site_settings;
drop policy if exists "Authenticated admins can manage website settings" on public.site_settings;
create policy "Anyone can read website settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Authenticated admins can manage website settings" on public.site_settings for all to authenticated using (true) with check (true);
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

insert into public.site_settings (
  id, hero_eyebrow, hero_title, hero_description, contact_email,
  contact_address, contact_response, business_hours
) values (
  'main',
  'SKR Metal Industries Pvt. Ltd.',
  'Precision metal products & engineering solutions.',
  'Manufacturing umbrella ribs and frames along with precision-machined metal components for industrial applications—driven by accuracy, consistency and reliable performance.',
  'skrfalna@suthargroup.com',
  'A-36, Rana Pratap Marg Industrial Area, Falna, Pali, Rajasthan 306116, India',
  'Share complete requirements for a faster review by the relevant division.',
  'Monday–Saturday · Business enquiries responded to by the relevant team.'
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('enquiry-files', 'enquiry-files', false)
on conflict (id) do nothing;

drop policy if exists "Anyone can upload enquiry files" on storage.objects;
drop policy if exists "Authenticated admins can read enquiry files" on storage.objects;
create policy "Anyone can upload enquiry files" on storage.objects for insert to anon, authenticated with check (bucket_id = 'enquiry-files');
create policy "Authenticated admins can read enquiry files" on storage.objects for select to authenticated using (bucket_id = 'enquiry-files');
