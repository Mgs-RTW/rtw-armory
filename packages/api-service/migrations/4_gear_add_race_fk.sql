ALTER TABLE gear ADD COLUMN race_id uuid NOT NULL;
ALTER TABLE gear ADD CONSTRAINT race_fkey FOREIGN KEY (race_id) REFERENCES race (id);