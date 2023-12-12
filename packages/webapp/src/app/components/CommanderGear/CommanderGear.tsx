"use client";

import { GearSlot as Slot } from "@lotr-rtw/service-types";
import { GearSlot } from "./GearSlot/GearSlot";
import styles from "./commander-gear.module.scss";

const slots: Slot[] = ["hand", "armour", "head", "accessory"];

export const CommanderGear = () => {
  return (
    <div className={styles.GearSlots}>
      {slots.map((slot) => (
        <GearSlot key={slot} slot={slot} />
      ))}
    </div>
  );
};
