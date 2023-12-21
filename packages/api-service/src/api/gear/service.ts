import { ApiGear, GearSlot } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getGearBySlot(raceId: string, slot: GearSlot) {
  const gear = await sql<ApiGear[]>`
    SELECT
      g.*,
      json_agg(ga) as "attributes"
    FROM
      race_gear
    LEFT JOIN
      gear g on race_gear.gear_id = g.id
    LEFT JOIN
      gear_attribute ga on ga.gear_id = race_gear.gear_id
    WHERE race_id = ${raceId} AND slot = ${slot}
    GROUP BY g.id
  `;

  return gear;
}
