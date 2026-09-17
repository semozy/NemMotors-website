alter table public.vehicles
add column if not exists new_arrival boolean not null default false;
