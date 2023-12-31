import { BaseEntity } from "../base";

export type UserRole = "admin" | "user";

export interface ApiUser extends BaseEntity {
  email: string;
  role: UserRole;
}
