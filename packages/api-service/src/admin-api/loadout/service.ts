import { ApiLoadout, ApiLoadoutGear, ApiLoadoutGearAdjustment, ApiLoadoutGearSkill, CreateLoadoutSchema } from "@lotr-rtw/service-types";
import { sql } from "../../db";
import { create } from 'domain';

export async function createLoadout(
    payload: CreateLoadoutSchema
): Promise<ApiLoadout> {
    const loadout = await sql.begin(async (sql) => {
        const [loadout]: [ApiLoadout] = await sql`
      INSERT INTO loadout (
        name,
        created_by
        commander_id,
       
      ) VALUES (
        ${payload.name},
        ${payload.createdBy},
        ${payload.commanderId},      
      ) RETURNING *
    `;

        let createdGear: ApiLoadoutGear[] = [];
        for (const gear of payload.gear) {
            const [loadoutGear]: [ApiLoadoutGear] = await sql`
    INSERT INTO loadout_gear (
        loadout_id,
        gear_id
    ) 
    VALUES (
        ${loadout.id}, 
        ${gear.gearId}, 
        ) RETURNING *
    `;

            const [loadoutGearSkill]: [ApiLoadoutGearSkill] = await sql`
    INSERT INTO loadout_gear_skill (
        loadout_gear_id,
        gear_skill_id
    ) 
    VALUES (
        ${loadoutGear.id}, 
        ${gear.gearSkillId}, 
        ) RETURNING *
    `;

            const [loadoutGearAdjustment]: [ApiLoadoutGearAdjustment] = await sql`
    INSERT INTO loadout_gear_adjustment (
        loadout_gear_id,
        strengths,
        refinements
    ) 
    VALUES (
        ${loadoutGear.id}, 
        ${gear.gearAdjustments.strengths}, 
        ${gear.gearAdjustments.refinements}, 
        ) RETURNING *
    `;
            createdGear.push({
                ...gear,
                gearSkillId: loadoutGearSkill.id,
                gearAdjustments: loadoutGearAdjustment,
                id: '',
                created: '',
                modified: ''
            })

        }
        loadout.gear = createdGear;
        return loadout;
    });

    return loadout
}
