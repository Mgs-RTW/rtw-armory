import argon2 from "argon2";
import { sql } from "../../db";
import { InvalidCredentialsError } from "../../errors";
import { ApiUser } from "../user/types";

interface DbUser extends ApiUser {
  password: string;
}

export const signInUser = async (
  email: string,
  password: string
): Promise<DbUser> => {
  const [user]: [DbUser?] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordMatches = await argon2.verify(user.password, password);
  if (!passwordMatches) {
    throw new InvalidCredentialsError();
  }

  return user;
};

export const registerUser = async (
  email: string,
  password: string
): Promise<DbUser> => {
  const hashedPassword = await argon2.hash(password);

  const [user]: [DbUser] = await sql`
    INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *
  `;

  return user;
};
