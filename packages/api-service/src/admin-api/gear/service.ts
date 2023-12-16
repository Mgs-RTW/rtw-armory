import { Gear, GearAttribute, GearSkill } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function createGear(gear: Gear) {
  const [gearSavedInDb]: [Gear] = await sql`
    INSERT INTO gear (
        name,
        image,
        description,
        slot,
        rarity,
        race_id
    )
    VALUES (
        ${gear.name}, 
        ${gear.image},
        ${gear.description},
        ${gear.slot},
        ${gear.rarity},
        ${gear.raceId}
        ) RETURNING *
    `;

  if (gear.attributes && gear.attributes.length > 0) {
    gearSavedInDb.attributes = [];
    for (const attribute of gear.attributes) {
      const [gearAttribute]: [GearAttribute] = await sql`
            INSERT INTO gear_attribute (
                target,
                modifier,
                amount,
                gear_id
            )
            VALUES (
                ${attribute.target}, 
                ${attribute.modifier},
                ${attribute.amount},
                ${gearSavedInDb.id}
                ) RETURNING *
            `;
      gearSavedInDb.attributes.push(gearAttribute);
    }
  }

  return gearSavedInDb;
}

export async function getGearSkills() {
  const gear = await sql<Gear[]>`
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
