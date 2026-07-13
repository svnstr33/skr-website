-- Run this in Supabase Dashboard → SQL Editor before using the admin portal.
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
alter table public.enquiries enable row level security;
create policy "Anyone can send an enquiry" on public.enquiries for insert to anon with check (true);
create policy "Authenticated admins can view enquiries" on public.enquiries for select to authenticated using (true);
create policy "Authenticated admins can update enquiries" on public.enquiries for update to authenticated using (true) with check (true);

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
create policy "Anyone can read website settings" on public.site_settings for select using (true);
create policy "Authenticated admins can manage website settings" on public.site_settings for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public) values ('enquiry-files', 'enquiry-files', false) on conflict (id) do nothing;
create policy "Anyone can upload enquiry files" on storage.objects for insert to anon with check (bucket_id = 'enquiry-files');
create policy "Authenticated admins can read enquiry files" on storage.objects for select to authenticated using (bucket_id = 'enquiry-files');
