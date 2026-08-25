-- Architecture draft only: do not apply until the client funds backend review.
-- Extends the Phase 2 profiles and fitness_goals tables.

-- Staff roles are separate from subscriptions. In production, create one account per
-- owner or board member; never share the public demo credentials or trust a client flag.
create type public.staff_role as enum ('moderator', 'owner', 'board_member');
create table public.staff_roles (user_id uuid primary key references public.profiles(id) on delete cascade, role public.staff_role not null, granted_by uuid references public.profiles(id), granted_at timestamptz not null default now());

create table public.follows (follower_id uuid references public.profiles(id) on delete cascade, following_id uuid references public.profiles(id) on delete cascade, created_at timestamptz default now(), primary key (follower_id, following_id), check (follower_id <> following_id));
create table public.videos (id uuid primary key default gen_random_uuid(), creator_id uuid not null references public.profiles(id) on delete cascade, storage_path text not null, thumbnail_path text, caption text not null default '', categories text[] not null default '{}', hashtags text[] not null default '{}', status text not null default 'processing' check (status in ('processing','published','failed','removed')), created_at timestamptz default now());
create table public.video_likes (user_id uuid references public.profiles(id) on delete cascade, video_id uuid references public.videos(id) on delete cascade, created_at timestamptz default now(), primary key (user_id, video_id));
create table public.video_comments (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, video_id uuid not null references public.videos(id) on delete cascade, body text not null check (char_length(body) between 1 and 1000), created_at timestamptz default now(), updated_at timestamptz default now());
create table public.saved_videos (user_id uuid references public.profiles(id) on delete cascade, video_id uuid references public.videos(id) on delete cascade, created_at timestamptz default now(), primary key (user_id, video_id));

create table public.nutrition_logs (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, log_date date not null, water_ml integer not null default 0 check (water_ml >= 0), unique (user_id, log_date));
create table public.food_entries (id uuid primary key default gen_random_uuid(), nutrition_log_id uuid not null references public.nutrition_logs(id) on delete cascade, user_id uuid not null references public.profiles(id) on delete cascade, meal text not null check (meal in ('Breakfast','Lunch','Dinner','Snacks')), name text not null, serving text, calories numeric not null check (calories >= 0), protein_g numeric not null default 0, carbs_g numeric not null default 0, fat_g numeric not null default 0, source text not null default 'manual', created_at timestamptz default now());

create table public.recipes (id uuid primary key default gen_random_uuid(), creator_id uuid not null references public.profiles(id) on delete cascade, name text not null, description text not null default '', country text, cuisine text, meal text, dietary_tags text[] not null default '{}', image_paths text[] not null default '{}', prep_minutes integer, servings numeric, calories numeric, protein_g numeric, carbs_g numeric, fat_g numeric, instructions text[] not null default '{}', status text not null default 'published', created_at timestamptz default now(), updated_at timestamptz default now());
create table public.recipe_ingredients (id uuid primary key default gen_random_uuid(), recipe_id uuid not null references public.recipes(id) on delete cascade, position integer not null, quantity numeric, unit text, name text not null);
create table public.recipe_likes (user_id uuid references public.profiles(id) on delete cascade, recipe_id uuid references public.recipes(id) on delete cascade, created_at timestamptz default now(), primary key (user_id, recipe_id));
create table public.saved_recipes (user_id uuid references public.profiles(id) on delete cascade, recipe_id uuid references public.recipes(id) on delete cascade, created_at timestamptz default now(), primary key (user_id, recipe_id));
create table public.recipe_ratings (user_id uuid references public.profiles(id) on delete cascade, recipe_id uuid references public.recipes(id) on delete cascade, rating smallint check (rating between 1 and 5), created_at timestamptz default now(), primary key (user_id, recipe_id));

create table public.clubs (id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id), name text not null, type text, description text, location_name text, latitude numeric, longitude numeric, contact_email text, social_links jsonb not null default '{}', services text[] not null default '{}', membership_info text, verified boolean not null default false, status text not null default 'active', created_at timestamptz default now());
create table public.club_members (club_id uuid references public.clubs(id) on delete cascade, user_id uuid references public.profiles(id) on delete cascade, role text not null default 'follower' check (role in ('follower','member','moderator','owner')), joined_at timestamptz default now(), primary key (club_id, user_id));
create table public.events (id uuid primary key default gen_random_uuid(), club_id uuid references public.clubs(id) on delete set null, creator_id uuid not null references public.profiles(id), name text not null, description text, type text, starts_at timestamptz not null, ends_at timestamptz not null, location_name text, latitude numeric, longitude numeric, capacity integer, status text not null default 'published', created_at timestamptz default now());
create table public.event_attendees (event_id uuid references public.events(id) on delete cascade, user_id uuid references public.profiles(id) on delete cascade, status text not null default 'going' check (status in ('going','waitlist','cancelled')), created_at timestamptz default now(), primary key (event_id, user_id));

create table public.notifications (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, actor_id uuid references public.profiles(id) on delete set null, type text not null, title text not null, body text not null, entity_type text, entity_id uuid, read_at timestamptz, created_at timestamptz default now());
create table public.subscriptions (id uuid primary key default gen_random_uuid(), user_id uuid not null unique references public.profiles(id) on delete cascade, provider text not null check (provider in ('apple','google')), provider_customer_id text, provider_entitlement_id text, status text not null, current_period_end timestamptz, updated_at timestamptz default now());
create table public.content_reports (id uuid primary key default gen_random_uuid(), reporter_id uuid not null references public.profiles(id), target_type text not null check (target_type in ('video','comment','user','recipe','club','event')), target_id uuid not null, reason text not null, details text, status text not null default 'pending', reviewed_by uuid references public.profiles(id), reviewed_at timestamptz, created_at timestamptz default now());

-- Every table must enable RLS before deployment. Public content gets published-only SELECT.
-- Owner-generated content gets auth.uid() ownership INSERT/UPDATE/DELETE policies.
-- Nutrition, notifications, saves, attendance and subscriptions get owner-only SELECT/WRITE.
-- Moderation actions require server-issued staff claims; never trust a client-side admin flag.
alter table public.follows enable row level security;
alter table public.videos enable row level security;
alter table public.video_likes enable row level security;
alter table public.video_comments enable row level security;
alter table public.saved_videos enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.food_entries enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.recipe_likes enable row level security;
alter table public.saved_recipes enable row level security;
alter table public.recipe_ratings enable row level security;
alter table public.clubs enable row level security;
alter table public.club_members enable row level security;
alter table public.events enable row level security;
alter table public.event_attendees enable row level security;
alter table public.notifications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.content_reports enable row level security;
alter table public.staff_roles enable row level security;
