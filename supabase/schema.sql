create table if not exists public.portfolio_content (
  id text primary key default 'primary' check (id = 'primary'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

grant select on public.portfolio_content to anon, authenticated;
grant all on public.portfolio_content to service_role;

drop policy if exists "Portfolio content is publicly readable" on public.portfolio_content;
create policy "Portfolio content is publicly readable"
  on public.portfolio_content
  for select
  to anon, authenticated
  using (true);

comment on table public.portfolio_content is
  'The single editable content document rendered by the public portfolio.';
