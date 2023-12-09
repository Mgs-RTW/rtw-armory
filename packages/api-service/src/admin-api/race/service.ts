import { Race } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getRaces() {
    const races: Race[] = await sql`
        SELECT 
        id, 
        name
        FROM Race;
    `;
    return races;
}