-- All Things Fitness · Phase 2
-- Run with the Supabase CLI (`supabase db push`) or paste into the SQL editor.

create extension if not exists citext with schema extensions;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username extensions.citext unique,
  display_name text,
  bio text,
  avatar_url text,
  fitness_level text check (fitness_level is null or fitness_level in ('Beginner', 'Intermediate', 'Advanced')),
  interests text[] not null default '{}',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username is null or username::text ~ '^[a-z0-9_]{3,30}$')
);

create table if not exists public.fitness_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  age smallint check (age is null or age between 13 and 120),
  height_cm numeric(5,2) check (height_cm is null or height_cm between 50 and 275),
  weight_kg numeric(6,2) check (weight_kg is null or weight_kg between 20 and 500),
  target_weight_kg numeric(6,2) check (target_weight_kg is null or target_weight_kg between 20 and 500),
  activity_level text,
  goals text[] not null default '{}',
  dietary_preferences text[] not null default '{}',
  allergies text[] not null default '{}',
  preferred_workouts text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists fitness_goals_set_updated_at on public.fitness_goals;
create trigger fitness_goals_set_updated_at before update on public.fitness_goals
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  desired_username text;
begin
  desired_username := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', ''), '[^a-zA-Z0-9_]', '', 'g'));
  if length(desired_username) < 3 then
    desired_username := 'athlete_' || substring(new.id::text, 1, 8);
  end if;
  desired_username := left(desired_username, 30);
  if exists (select 1 from public.profiles where username = desired_username) then
    desired_username := left(desired_username, 23) || '_' || substring(new.id::text, 1, 6);
  end if;

  insert into public.profiles (id, username, display_name)
  values (new.id, desired_username, nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.fitness_goals enable row level security;

drop policy if exists "Authenticated users can view profiles" on public.profiles;
create policy "Authenticated users can view profiles" on public.profiles
for select to authenticated using (true);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile" on public.profiles
for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles
for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile" on public.profiles
for delete to authenticated using ((select auth.uid()) = id);

drop policy if exists "Users can view their own fitness goals" on public.fitness_goals;
create policy "Users can view their own fitness goals" on public.fitness_goals
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own fitness goals" on public.fitness_goals;
create policy "Users can create their own fitness goals" on public.fitness_goals
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own fitness goals" on public.fitness_goals;
create policy "Users can update their own fitness goals" on public.fitness_goals
for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own fitness goals" on public.fitness_goals;
create policy "Users can delete their own fitness goals" on public.fitness_goals
for delete to authenticated using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.fitness_goals to authenticated;
