import { BaseEntity } from "./base-entity";

enum CommanderAlignment {
    Evil,
    Good
}

enum CommanderTier {
    T1,
    T2,
    T3
}

export interface CommanderAttributes extends BaseEntity {
    minDamage: number;
    maxDamage: number;
    hp: number;
    command: number;
    attack: number;
    defense: number;
    focus: number;
    initiative: number;
}

export interface Commander extends BaseEntity {
    name: string;
    image: string;
    tier: CommanderTier;
    alignment: CommanderAlignment;
    baseData: CommanderAttributes;
    raceId: string;
    assets: CommanderAssets
}

export interface CommanderAssets extends BaseEntity {
    imageUrl: string;
    avatarUrl: string;
    commanderId: string;
}