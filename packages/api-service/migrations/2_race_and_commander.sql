CREATE TYPE commander_alignment AS ENUM(
  'evil',
  'good');

CREATE TYPE commander_tier AS ENUM(
  't1',
  't2',
  't3');

CREATE TABLE IF NOT EXISTS race(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name character varying(255) NOT NULL UNIQUE,
  CONSTRAINT race_pkey PRIMARY KEY (id)
);

CREATE TRIGGER race_modified
  BEFORE UPDATE ON race
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

INSERT INTO race (name) VALUES ('orc'),('urukhai'),('maiar'),('elf'),('men'),('dwarf'),('evilMen'),('undead');

CREATE TABLE IF NOT EXISTS commander(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  race_id uuid NOT NULL,
  name character varying(255) NOT NULL UNIQUE,
  image character varying(255) NULL,
  tier commander_tier DEFAULT 't1' ::commander_tier,
  alignment commander_alignment DEFAULT 'good' ::commander_alignment, 
  CONSTRAINT commander_pkey PRIMARY KEY (id),
  CONSTRAINT commander_race FOREIGN KEY(race_id) 
   REFERENCES race(id)
   ON DELETE CASCADE
);

CREATE TRIGGER update_commander_modified
  BEFORE UPDATE ON commander
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TABLE IF NOT EXISTS commander_attributes(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  commander_id uuid NOT NULL,
  min_damage integer NOT NULL DEFAULT 0,
  max_damage integer NOT NULL DEFAULT 0,
  hp integer NOT NULL DEFAULT 0,
  command integer NOT NULL DEFAULT 0,
  attack integer NOT NULL DEFAULT 0,
  defense integer NOT NULL DEFAULT 0,
  focus integer NOT NULL DEFAULT 0,
  initiative integer NOT NULL DEFAULT 0,
  CONSTRAINT commander_attributes_pkey PRIMARY KEY (id),
  CONSTRAINT commander_attributes_commander_fkey FOREIGN KEY(commander_id) 
   REFERENCES commander(id)
   ON DELETE CASCADE
);

CREATE TRIGGER update_commander_attributes_modified
  BEFORE UPDATE ON commander_attributes
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();