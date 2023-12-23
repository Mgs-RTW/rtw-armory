import {
  ApiBaseCommander,
  ApiCommander,
  ApiCommanderAssets,
  ApiCommanderAttributes,
  CommanderAssets,
  CreateCommanderBody,
} from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function createCommander(
  payload: CreateCommanderBody,
  assetsPayload: CommanderAssets
): Promise<ApiCommander> {
  const [baseCommander, attributes, assets] = await sql.begin(async (sql) => {
    const [baseCommander]: [ApiBaseCommander] = await sql`
      INSERT INTO commander (
        name,
        tier,
        alignment,
        race_id
      ) VALUES (
        ${payload.name},
        ${payload.tier},
        ${payload.alignment},
        ${payload.raceId}        
      ) RETURNING *
    `;

    const { baseData } = payload;
    const [attributes]: [ApiCommanderAttributes] = await sql`
    INSERT INTO commander_attributes (
        min_damage,
        max_damage,
        hp,
        command,
        attack,
        defense,
        initiative,
        commander_id,
        attack_scale_per_level
    ) 
    VALUES (
        ${baseData.minDamage}, 
        ${baseData.maxDamage}, 
        ${baseData.hp},
        ${baseData.command},
        ${baseData.attack},
        ${baseData.defense},
        ${baseData.initiative},
        ${baseCommander.id},
        ${baseData.attackScalePerLevel}
        ) RETURNING *
    `;

    const [commanderAssets]: [ApiCommanderAssets] = await sql`
      INSERT INTO commander_assets (
          image_url,
          avatar_url,
          commander_id
      )
      VALUES (
        ${assetsPayload.imageUrl}, 
        ${assetsPayload.avatarUrl},
        ${baseCommander.id}
      ) RETURNING *
    `;

    return [baseCommander, attributes, commanderAssets];
  });

  return {
    ...baseCommander,
    assets,
    baseData: attributes,
  };
}
