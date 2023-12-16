CREATE TABLE IF NOT EXISTS race_gear (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  race_id uuid NOT NULL REFERENCES race,
  gear_id uuid NOT NULL REFERENCES gear,
  CONSTRAINT race_gear_pkey PRIMARY KEY (race_id, gear_id)
);

ALTER TABLE gear DROP CONSTRAINT IF EXISTS race_fkey;
ALTER TABLE gear DROP COLUMN IF EXISTS race_id;

ALTER TYPE gear_slot ADD VALUE IF NOT EXISTS 'accessory';
ALTER TYPE gear_slot ADD VALUE IF NOT EXISTS 'relic';

DROP TRIGGER IF EXISTS race_gear_modified ON race_gear;

CREATE TRIGGER race_gear_modified
  BEFORE UPDATE ON race_gear
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

INSERT INTO race_gear (gear_id, race_id) (SELECT id AS gear_id, (SELECT id FROM race WHERE name = 'maiar') AS race_id FROM gear);