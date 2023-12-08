import { BaseEntity } from "./base-entity";
import { Commander } from './commander';
import { Gear } from './gear';

export type UserRole = "admin" | "user";

export interface ApiUser extends BaseEntity {
  email: string;
  role: UserRole;
  loadouts: ApiUserCommanderLoadout[];
}

export interface ApiUserCommanderLoadout extends BaseEntity {
  commander: Commander;
  gear: Gear;
}