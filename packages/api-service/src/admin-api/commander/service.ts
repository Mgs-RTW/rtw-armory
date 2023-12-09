import { Commander, CommanderAttributes } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getCommanders() {
    const commanders: Commander[] = await sql`
        SELECT 
        c.id, 
        c.name, 
        image, 
        tier, 
        alignment, 
        cr.id as raceId,
        to_json(ca) as baseData
        FROM commander c 
        JOIN race cr on cr.id = c.race_id
        LEFT JOIN commander_attributes ca
        on ca.commander_id = c.id
        group by c.id,cr.id,ca.*;
    `;
    return commanders;
}

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
    `

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
