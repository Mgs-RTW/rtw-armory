"use client";

import { Commander } from "@lotr-rtw/service-types";
import { ReactNode } from "react";
import styles from "./commander-stats.module.scss";

interface Props {
  commander: Commander | undefined;
}

export const CommanderStats = ({ commander }: Props) => {
  if (!commander) {
    return <div className={styles.root}></div>;
  }

  const { name, baseData } = commander;

  return (
    <div className={styles.root}>
      <h2 className={styles.CommanderName}>{name}</h2>
      <ul className={styles.StatsList}>
        <Stat
          label="Damage"
          value={
            <>
              {baseData.minDamage}~{baseData.maxDamage}
            </>
          }
        />
        <Stat label="HP" value={baseData.hp} />
        <Stat label="Command" value={baseData.command} />
        <li>
          <p>{baseData.attack}</p>
          <p>{baseData.defense}</p>
          <p>{baseData.focus}</p>
          <p>{baseData.initiative}</p>
        </li>
      </ul>
      <div className={styles.GearSlots}>
        {["weapon", "chest", "helmet", "accessory"].map((slot, i) => (
          <div
            key={slot}
            className={styles.Slot}
            data-slot={slot}
            data-state="empty"
          ></div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: ReactNode; value: ReactNode }) => (
  <li>
    <p>{label}</p>
    <p>{value}</p>
  </li>
);
