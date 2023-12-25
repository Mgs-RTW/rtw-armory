import { ApiCommander } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getAllCommanders() {
  const commanders = await sql<ApiCommander[]>`
          SELECT 
          c.id, 
          c.name,
          tier, 
          alignment, 
          cr.id as "raceId",
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


export async function getCommanderById(id: string) {
  const [commander]: [ApiCommander] = await sql`
          SELECT
          c.id, 
          c.name,
          tier, 
          alignment, 
          cr.id as "raceId",
          to_json(ca) as "baseData",
          to_json(cass) as "assets"
          FROM commander c 
          JOIN race cr on cr.id = c.race_id
          LEFT JOIN commander_attributes ca
          on ca.commander_id = c.id
          LEFT JOIN commander_assets cass 
          on cass.commander_id = c.id
          where c.id = ${id}
          group by c.id,cr.id,ca.*,cass.*
          
          limit 1;
    `;
  return commander;
}
