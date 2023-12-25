"use client";

import { ReactNode } from "react";
import { ApiCommander } from "@lotr-rtw/service-types";
import styles from "./commander-stats.module.scss";
import { useCommanderAttackDamage } from "@/domain/commander";

interface Props {
  commander: ApiCommander;
}

export const CommanderStats = ({ commander }: Props) => {
  const { name, baseData } = commander;
  const attackDamage = useCommanderAttackDamage();
  console.log(attackDamage);

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
          <p>{attackDamage}</p>
          <p>{baseData.defense}</p>
          <p>{baseData.focus}</p>
          <p>{baseData.initiative}</p>
        </li>
      </ul>
    </div>
  );
};

const Stat = ({ label, value }: { label: ReactNode; value: ReactNode }) => (
  <li>
    <p>{label}</p>
    <p>{value}</p>
  </li>
);
