import { ApiUser } from "@lotr-rtw/service-types";
import { sql } from "../../db";

export async function getUserById(userId: string) {
  const [user]: [ApiUser] = await sql`
    SELECT id, created, modified, email, role FROM users WHERE id = ${userId}
  `;

  return user;
}
