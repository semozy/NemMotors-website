-- Drop the old constraint
ALTER TABLE public.test_drive_requests DROP CONSTRAINT IF EXISTS test_drive_requests_status_check;

-- Add the new constraint allowing more statuses
ALTER TABLE public.test_drive_requests ADD CONSTRAINT test_drive_requests_status_check 
CHECK (status IN ('nieuw', 'bevestigd', 'geannuleerd', 'afgehandeld'));

