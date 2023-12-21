import {
  ApiBaseGear,
  CreateGearBody,
  GearSkill,
} from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function createGear(
  payload: CreateGearBody,
  imageUrl: string
): Promise<ApiBaseGear> {
  const [baseGear] = await sql.begin(async (sql) => {
    const [gear]: [ApiBaseGear] = await sql`
      INSERT INTO gear (
        name,
        description,
        image,
        slot,
        rarity
      ) VALUES (
        ${payload.name},
        ${payload.description},
        ${imageUrl},
        ${payload.slot},
        ${payload.rarity}
      ) RETURNING *
    `;

    const gearAttributes = payload.attributes.map((attr) => ({
      ...attr,
      gearId: gear.id,
    }));

    await sql`
      INSERT INTO gear_attribute ${sql(gearAttributes)}
    `;

    const raceGear = payload.raceIds.map((raceId) => ({
      raceId,
      gearId: gear.id,
    }));

    await sql`
      INSERT INTO race_gear ${sql(raceGear)}
    `;

    return [gear];
  });

  return { ...baseGear, raceIds: payload.raceIds };
}

export async function getGearSkills() {
  const gear = await sql<GearSkill[]>`
    SELECT 
        name,
        target,
        modifier,
        minAmount,
        maxAmount
    FROM gear_skill
    `;
  return gear;
}

export async function createGearSkill(gearSkill: GearSkill) {
  const [gearSkillSavedInDb]: [GearSkill] = await sql`
     INSERT INTO gear_skill (
        name,
        target,
        modifier,
        minAmount,
        maxAmount
    )
    VALUES (
        ${gearSkill.name}, 
        ${gearSkill.target},
        ${gearSkill.modifier},
        ${gearSkill.minAmount},
        ${gearSkill.maxAmount}
        ) RETURNING *
    `;
  return gearSkillSavedInDb;
}

export async function createGearSkillToGearLink(
  gearId: string,
  gearSkillId: string
) {
  const [createdGearSkillToGearLink]: [GearSkill] = await sql`
    INSERT INTO gear_gear_skill (
        gear_id,
        gear_skill_id
    )
    VALUES (
        ${gearId},
        ${gearSkillId}
        ) RETURNING *
    `;
  return createdGearSkillToGearLink;
}
