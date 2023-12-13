import { Commander } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getAllCommanders() {
  const commanders = await sql<Commander[]>`
          SELECT 
          c.id, 
          c.name, 
          image, 
          tier, 
          alignment, 
          cr.id as raceId,
          to_json(ca) as "baseData",
          to_json(cass) as "assets"
          FROM commander c 
          JOIN race cr on cr.id = c.race_id
          LEFT JOIN commander_attributes ca
          on ca.commander_id = c.id
          LEFT JOIN commander_assets cass 
          on cass.commander_id = c.id
          group by c.id,cr.id,ca.*,cass.*;
    `;
  return commanders;
}
