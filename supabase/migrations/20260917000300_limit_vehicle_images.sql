create or replace function public.enforce_vehicle_image_limit()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (
    select count(*)
    from public.vehicle_images
    where vehicle_id = new.vehicle_id
  ) >= 15 then
    raise exception 'Een wagen kan maximaal 15 foto''s hebben.' using errcode = '23514';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_vehicle_image_limit on public.vehicle_images;
create trigger enforce_vehicle_image_limit
before insert on public.vehicle_images
for each row execute function public.enforce_vehicle_image_limit();
