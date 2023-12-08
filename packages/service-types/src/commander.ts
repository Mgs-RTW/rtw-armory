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

enum CommanderRace {
    Orc,
    UrukHai,
    Maiar,
    Elf,
    Men,
    Dwarf,
    EvilMen,
    Undead
}

export interface CommanderAttributes extends BaseEntity {
    damage: string;
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
    race: CommanderRace;
}