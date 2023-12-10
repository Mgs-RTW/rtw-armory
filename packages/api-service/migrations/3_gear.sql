CREATE TYPE gear_attribute_target AS ENUM(
  'unit',
  'commander');

CREATE TYPE gear_attribute_modifier AS ENUM(
  'attack',
  'focus',
  'defense');

CREATE TYPE gear_rarity as ENUM(
  'flawless',
  'exquisite',
  'superior',
  'fine',
  'unique');

CREATE TYPE gear_slot as ENUM(
    'head',
    'hand',
    'armour',
    'accessory'
    'relic');

CREATE TABLE IF NOT EXISTS gear(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name character varying(255) NOT NULL UNIQUE,
  image character varying(255) NOT NULL,
  description character varying(255) NOT NULL,
  slot gear_slot DEFAULT 'head'::gear_slot,
  rarity gear_rarity DEFAULT 'flawless'::gear_rarity,
  CONSTRAINT gear_pkey PRIMARY KEY (id)
);

CREATE TRIGGER gear_modified
  BEFORE UPDATE ON gear
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TABLE IF NOT EXISTS gear_attribute(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  gear_id uuid NOT NULL,
  target gear_attribute_target DEFAULT 'unit'::gear_attribute_target,
  modifier gear_attribute_modifier DEFAULT 'attack'::gear_attribute_modifier,
  amount integer NOT NULL DEFAULT 0,
  CONSTRAINT gear_attribute_pkey PRIMARY KEY (id),
  CONSTRAINT gear_attribute_gear_fkey FOREIGN KEY(gear_id) 
   REFERENCES gear(id)
   ON DELETE CASCADE
);

-- Each gear have a special skill that will be stored here 
-- there are about 10 total and its random what the gear will roll as
-- these need a separate route in frontend to be created
CREATE TABLE IF NOT EXISTS gear_skill(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name character varying(255) NOT NULL UNIQUE,
  target gear_attribute_target DEFAULT 'unit'::gear_attribute_target,
  modifier gear_attribute_modifier DEFAULT 'attack'::gear_attribute_modifier,
  minAmount integer NOT NULL DEFAULT 0,
  maxAmount integer NOT NULL DEFAULT 0,
  CONSTRAINT gear_skill_primary_pkey PRIMARY KEY (id)
);

CREATE TRIGGER gear_skill_modified
  BEFORE UPDATE ON gear_skill
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();


-- Link table between gear skill and gear itself
CREATE TABLE IF NOT EXISTS gear_gear_skill(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  gear_id uuid NOT NULL,
  gear_skill_id uuid NOT NULL,
  CONSTRAINT gear_gear_skill_pkey PRIMARY KEY (id),
  CONSTRAINT gear_skill_gear_fkey FOREIGN KEY(gear_id) 
   REFERENCES gear(id)
   ON DELETE CASCADE,
  CONSTRAINT gear_gear_skill_fkey FOREIGN KEY(gear_skill_id) 
   REFERENCES gear(id)
   ON DELETE CASCADE
);
CREATE TRIGGER gear_gear_skill_modified
  BEFORE UPDATE ON gear_gear_skill
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();