CREATE TABLE IF NOT EXISTS gear_adjustment (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,    
  gear_id uuid NOT NULL,
  strengths integer NOT NULL DEFAULT 0,
  refines integer NOT NULL DEFAULT 0,
  CONSTRAINT gear_adjustment_pkey PRIMARY KEY (id),
  CONSTRAINT gear_adjustment_gear_fkey FOREIGN KEY(gear_id) 
   REFERENCES gear(id)
   ON DELETE CASCADE 
);

CREATE TRIGGER gear_adjustment_modified
  BEFORE UPDATE ON gear_adjustment
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TABLE IF NOT EXISTS loadout (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name character varying(255) NULL,
  created_by uuid NOT NULL,
  commander_id uuid NOT NULL,  
  CONSTRAINT loadout_pkey PRIMARY KEY (id),
  CONSTRAINT loadout_user_fkey FOREIGN KEY(created_by)
   REFERENCES users(id)
   ON DELETE CASCADE,
  CONSTRAINT loadout_commander_fkey FOREIGN KEY(commander_id) 
   REFERENCES commander(id)
   ON DELETE CASCADE
);

CREATE TRIGGER loadout_modified
  BEFORE UPDATE ON loadout
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();


CREATE TABLE IF NOT EXISTS loadout_gear (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  name character varying(255) NULL,
  loadout_id uuid NOT NULL,
  gear_id uuid NOT NULL,
  CONSTRAINT loadout_gear_pkey PRIMARY KEY (id),
  CONSTRAINT loadout_gear_gear_fkey FOREIGN KEY(gear_id) 
   REFERENCES gear(id)
   ON DELETE CASCADE,
  CONSTRAINT loadout_gear_loadout_fkey FOREIGN KEY(loadout_id) 
   REFERENCES loadout(id)
   ON DELETE CASCADE
);

CREATE TRIGGER loadout_gear_modified
  BEFORE UPDATE ON loadout_gear
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();


CREATE TABLE IF NOT EXISTS loadout_gear_adjustment (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  loadout_gear_id uuid NOT NULL,
  gear_adjustment_id uuid NOT NULL,
  CONSTRAINT loadout_gear_adjustment_pkey PRIMARY KEY (id),
  CONSTRAINT loadout_gear_adjustment_loadout_gear_fkey FOREIGN KEY(loadout_gear_id) 
   REFERENCES loadout_gear(id)
   ON DELETE CASCADE,
  CONSTRAINT loadout_gear_gear_adjustment_fkey FOREIGN KEY(gear_adjustment_id) 
   REFERENCES gear_adjustment(id)
   ON DELETE CASCADE
);

CREATE TRIGGER loadout_gear_adjustment_modified
  BEFORE UPDATE ON loadout_gear_adjustment
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TABLE IF NOT EXISTS loadout_gear_skill (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  loadout_gear_id uuid NOT NULL,
  gear_skill_id uuid NOT NULL,
  CONSTRAINT loadout_gear_skill_pkey PRIMARY KEY (id),
  CONSTRAINT loadout_gear_skill_loadout_gear_fkey FOREIGN KEY(loadout_gear_id) 
   REFERENCES loadout_gear(id)
   ON DELETE CASCADE,
  CONSTRAINT loadout_gear_gear_adjustment_fkey FOREIGN KEY(gear_skill_id) 
   REFERENCES gear_skill(id)
   ON DELETE CASCADE
);

CREATE TRIGGER loadout_gear_skill_modified
  BEFORE UPDATE ON loadout_gear_skill
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();