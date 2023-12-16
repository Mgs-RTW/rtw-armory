import { ApiRace } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getRaces() {
  const races = await sql<ApiRace[]>`
        SELECT 
        id, 
        name
        FROM Race;
    `;
  return races;
}
