import postgres from "postgres";

export interface BaseEntity {
  id: string;
  created: string;
  modified: string;
}

export const sql = postgres(process.env.POSTGRES_URL, {
  transform: postgres.camel,
});
