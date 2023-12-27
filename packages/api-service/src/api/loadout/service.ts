import { ApiLoadout } from '@lotr-rtw/service-types';
import { sql } from "../../db";

export async function getLoadoutById(loadoutId: string) {
  const [loadout]: [ApiLoadout] = await sql`
    SELECT
      *      
    FROM
      loadout     
    WHERE id = ${loadoutId}
    LIMIT 1
  `;

  return loadout;
}
