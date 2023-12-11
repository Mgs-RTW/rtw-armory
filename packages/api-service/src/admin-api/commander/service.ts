import { Commander, CommanderAttributes } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function createCommander(commander: Commander) {
  const [commanderSavedInDb]: [Commander] = await sql`
    INSERT INTO commander (
        name,
        image,
        tier,
        alignment,
        race_id
    )
    VALUES (
        ${commander.name}, 
        ${commander.image},
        ${commander.tier.toString().toLowerCase()},
        ${commander.alignment.toString().toLowerCase()},
        ${commander.raceId}
        ) RETURNING *
    `;

  const baseData = commander.baseData;
  const [attributes]: [CommanderAttributes] = await sql`
    INSERT INTO commander_attributes (
        min_damage,
        max_damage,
        hp,
        command,
        attack,
        defense,
        initiative,
        commander_id
    ) 
    VALUES (
        ${baseData.minDamage}, 
        ${baseData.maxDamage}, 
        ${baseData.hp},
        ${baseData.command},
        ${baseData.attack},
        ${baseData.defense},
        ${baseData.initiative},
        ${commanderSavedInDb.id}
        ) RETURNING *
    `;

  commanderSavedInDb.baseData = attributes;
  return commanderSavedInDb;
}
