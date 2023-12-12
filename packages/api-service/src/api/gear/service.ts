import { Gear, GearSlot } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getGearBySlot(slot: GearSlot) {
  const gear = await sql<Gear[]>`
    SELECT 
    g.id, 
    name, 
    image, 
    description, 
    slot, 
    rarity,
    race_id,
    json_agg(ga) as "attributes"
    FROM gear g
    LEFT JOIN gear_attribute ga ON ga.gear_id = g.id
    WHERE slot = ${slot}
    GROUP BY g.id;
  `;

  return gear;
}
