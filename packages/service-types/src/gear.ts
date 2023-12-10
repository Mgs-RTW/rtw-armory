import { BaseEntity } from "./base-entity";

enum GearAttributeTarget {
    Unit,
    Commander
}

enum GearAttributeModifier {
    Attack,
    Focus,
    Defense
}

enum GearRarity {
    FlawLess = 1,
    Exquisite = 2,
    Superior = 3,
    Fine = 4,
    Unique = 5
}

enum GearSlot {
    Head,
    Hand,
    Armour,
    Accessory,
    Relic
}

export interface Gear extends BaseEntity {
    name: string;
    image: string;
    description: string;
    attributes: GearAttribute[];
    slot: GearSlot;
    rarity: GearRarity;
}

export interface GearAttribute extends BaseEntity {
    target: GearAttributeTarget;
    modifier: GearAttributeModifier;
    amount: number;
    gearId: string;
}

export interface GearAdjustment extends BaseEntity {
    strengths: number;
    refinements: number;
    gearId: string;
}

export interface GearSkill extends BaseEntity {
    name: string;
    target: GearAttributeTarget;
    modifier: GearAttributeModifier;
    minAmount: number;
    maxAmount: number;
}