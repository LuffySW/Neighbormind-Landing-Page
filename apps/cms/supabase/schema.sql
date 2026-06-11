-- Neighbormind CMS MVP schema (Phase 3 Step 2)

create extension if not exists "pgcrypto";

create type article_status as enum ('draft', 'published', 'archived');

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  role text not null default 'admin',
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url text not null,
  folder text,
  alt_text text,
  tags text[] not null default '{}',
  width int,
  height int,
  bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  status article_status not null default 'draft',
  theme text,
  release_date date,
  hero_title text,
  hero_subtitle text,
  philosophy text,
  story_content text,
  product_description text,
  shopee_link text,
  seo_title text,
  seo_description text,
  og_image_id uuid references media_assets(id) on delete set null,
  cover_image_id uuid references media_assets(id) on delete set null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create unique index if not exists articles_slug_key on articles (slug);
create index if not exists articles_status_idx on articles (status);
create index if not exists articles_tags_idx on articles using gin (tags);

create table if not exists story_scenes (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  scene_title text,
  large_headline text,
  supporting_narrative text,
  background_image_id uuid references media_assets(id) on delete set null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists story_scenes_article_order_idx on story_scenes (article_id, display_order);

create table if not exists carousel_items (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid not null references story_scenes(id) on delete cascade,
  image_id uuid references media_assets(id) on delete set null,
  title text,
  description text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists carousel_items_scene_order_idx on carousel_items (scene_id, display_order);

create table if not exists article_quotes (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  quote_text text not null,
  quote_author text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists article_quotes_article_order_idx on article_quotes (article_id, display_order);

create table if not exists brand_settings (
  id int primary key default 1,
  brand_name text,
  motto text,
  about_text text,
  social_links jsonb not null default '{}'::jsonb,
  contact_info jsonb not null default '{}'::jsonb,
  seo_defaults jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists homepage_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  enabled boolean not null default true,
  display_order int not null default 0,
  config jsonb not null default '{}'::jsonb
);

create unique index if not exists homepage_sections_key_key on homepage_sections (key);
create index if not exists homepage_sections_order_idx on homepage_sections (display_order);

create table if not exists homepage_featured_articles (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  display_order int not null default 0
);

create unique index if not exists homepage_featured_articles_article_key on homepage_featured_articles (article_id);
create index if not exists homepage_featured_articles_order_idx on homepage_featured_articles (display_order);

create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table profiles enable row level security;
alter table media_assets enable row level security;
alter table articles enable row level security;
alter table story_scenes enable row level security;
alter table carousel_items enable row level security;
alter table article_quotes enable row level security;
alter table brand_settings enable row level security;
alter table homepage_sections enable row level security;
alter table homepage_featured_articles enable row level security;

create policy "profiles_select_own" on profiles
  for select
  using (id = auth.uid());

create policy "profiles_insert_own" on profiles
  for insert
  with check (id = auth.uid());

create policy "profiles_update_own" on profiles
  for update
  using (id = auth.uid());

create policy "admin_all_media_assets" on media_assets
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_media_assets" on media_assets
  for select
  using (true);

create policy "admin_all_articles" on articles
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_published_articles" on articles
  for select
  using (status = 'published');

create policy "admin_all_story_scenes" on story_scenes
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_published_scenes" on story_scenes
  for select
  using (
    exists (
      select 1
      from articles
      where articles.id = story_scenes.article_id
        and articles.status = 'published'
    )
  );

create policy "admin_all_carousel_items" on carousel_items
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_published_carousel_items" on carousel_items
  for select
  using (
    exists (
      select 1
      from story_scenes
      join articles on articles.id = story_scenes.article_id
      where story_scenes.id = carousel_items.scene_id
        and articles.status = 'published'
    )
  );

create policy "admin_all_article_quotes" on article_quotes
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_published_article_quotes" on article_quotes
  for select
  using (
    exists (
      select 1
      from articles
      where articles.id = article_quotes.article_id
        and articles.status = 'published'
    )
  );

create policy "admin_all_brand_settings" on brand_settings
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_brand_settings" on brand_settings
  for select
  using (true);

create policy "admin_all_homepage_sections" on homepage_sections
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_homepage_sections" on homepage_sections
  for select
  using (true);

create policy "admin_all_homepage_featured_articles" on homepage_featured_articles
  for all
  using (is_admin())
  with check (is_admin());

create policy "public_select_homepage_featured_articles" on homepage_featured_articles
  for select
  using (
    exists (
      select 1
      from articles
      where articles.id = homepage_featured_articles.article_id
        and articles.status = 'published'
    )
  );

create or replace view public_article_index_view as
select
  articles.id,
  articles.title,
  articles.slug,
  articles.theme,
  articles.release_date,
  articles.hero_title,
  articles.hero_subtitle,
  articles.seo_title,
  articles.seo_description,
  articles.tags,
  articles.cover_image_id,
  cover.public_url as cover_image_url,
  articles.og_image_id,
  og.public_url as og_image_url,
  articles.published_at
from articles
left join media_assets cover on cover.id = articles.cover_image_id
left join media_assets og on og.id = articles.og_image_id
where articles.status = 'published';

create or replace view public_article_detail_view as
select
  articles.id,
  articles.title,
  articles.slug,
  articles.theme,
  articles.release_date,
  articles.hero_title,
  articles.hero_subtitle,
  articles.philosophy,
  articles.story_content,
  articles.product_description,
  articles.shopee_link,
  articles.seo_title,
  articles.seo_description,
  articles.tags,
  articles.cover_image_id,
  cover.public_url as cover_image_url,
  articles.og_image_id,
  og.public_url as og_image_url,
  articles.published_at,
  (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', scenes.id,
          'scene_title', scenes.scene_title,
          'large_headline', scenes.large_headline,
          'supporting_narrative', scenes.supporting_narrative,
          'background_image_id', scenes.background_image_id,
          'background_image_url', bg.public_url,
          'display_order', scenes.display_order,
          'carousel_items', (
            select coalesce(
              jsonb_agg(
                jsonb_build_object(
                  'id', items.id,
                  'title', items.title,
                  'description', items.description,
                  'image_id', items.image_id,
                  'image_url', media.public_url,
                  'display_order', items.display_order
                ) order by items.display_order
              ),
              '[]'::jsonb
            )
            from carousel_items items
            left join media_assets media on media.id = items.image_id
            where items.scene_id = scenes.id
          )
        ) order by scenes.display_order
      ),
      '[]'::jsonb
    )
    from story_scenes scenes
    left join media_assets bg on bg.id = scenes.background_image_id
    where scenes.article_id = articles.id
  ) as scenes,
  (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', q.id,
          'quote_text', q.quote_text,
          'quote_author', q.quote_author,
          'display_order', q.display_order
        ) order by q.display_order
      ),
      '[]'::jsonb
    )
    from article_quotes q
    where q.article_id = articles.id
  ) as quotes
from articles
left join media_assets cover on cover.id = articles.cover_image_id
left join media_assets og on og.id = articles.og_image_id
where articles.status = 'published';

create or replace view public_homepage_view as
select
  hs.id,
  hs.key,
  hs.enabled,
  hs.display_order,
  hs.config,
  (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'title', a.title,
          'slug', a.slug,
          'theme', a.theme,
          'release_date', a.release_date,
          'hero_title', a.hero_title,
          'hero_subtitle', a.hero_subtitle,
          'tags', a.tags,
          'cover_image_url', cover.public_url
        ) order by hfa.display_order
      ),
      '[]'::jsonb
    )
    from homepage_featured_articles hfa
    join articles a on a.id = hfa.article_id
    left join media_assets cover on cover.id = a.cover_image_id
    where a.status = 'published'
  ) as featured_articles
from homepage_sections hs
order by hs.display_order;
