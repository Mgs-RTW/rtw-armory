CREATE TABLE IF NOT EXISTS commander_assets(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  commander_id uuid NOT NULL,
  image_url character varying(255) NULL,
  avatar_url character varying(255) NULL,
  CONSTRAINT commander_assets_pkey PRIMARY KEY (id),
  CONSTRAINT commander_assets_commander_fkey FOREIGN KEY(commander_id) 
   REFERENCES commander(id)
   ON DELETE CASCADE
);

CREATE TRIGGER update_commander_assets_modified
  BEFORE UPDATE ON commander_assets
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();
