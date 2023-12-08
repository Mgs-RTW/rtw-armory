import { BaseEntity } from "./base-entity";

enum GearAttributeTarget {
    Unit,
    Commander
}

enum GearRarity {
    FlawLess = 1,
    Exquisite = 2,
    Superior = 3,
    Fine = 4
}

enum GearAttributeModifier {
    Attack,
    Focus,
    Defense
}

enum GearSlot {
    Head,
    Hand,
    Armour,
    Accessory,
    Relic
}

export interface GearSkill extends BaseEntity {
    // we need discuss on how to proceed with this one
    name: string;
}

export interface GearAttributes extends BaseEntity {
    targets: GearAttributeTarget;
    modifier: GearAttributeModifier;
    amount: number;
}

export interface Gear extends BaseEntity {
    name: string;
    image: string;
    attributes: GearAttributes;
    skill: GearSkill;
    slot: GearSlot;
    rarity: GearRarity;
}