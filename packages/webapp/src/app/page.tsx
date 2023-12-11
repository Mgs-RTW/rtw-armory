"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useCommandersQuery } from "@/domain/commander";
import { Image } from "@/components";
import { CommanderStats } from "./components";
import { Commander } from "@lotr-rtw/service-types";

type Side = "good" | "evil";

export default function Home() {
  const [side, setSide] = useState<Side>("good");
  const [activeCommander, setActiveCommander] = useState<Commander | undefined>(
    undefined
  );
  const { data: commanders } = useCommandersQuery();

  const toggleSide = (side: Side) => {
    setSide(side);
    document.documentElement.setAttribute("data-side", side);
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.SideToggler}>
          <button onClick={() => toggleSide("good")}>Good</button>
          <button onClick={() => toggleSide("evil")}>Bad</button>
        </div>
        <ul className={styles.CommanderList}>
          {commanders?.map((commander, i) => (
            <li
              data-state={
                commander.id === activeCommander?.id ? "selected" : undefined
              }
              onClick={() => setActiveCommander(commander)}
              className={styles.CommanderItem}
              key={i}
            >
              <Image alt={commander.name} src={commander.image} />
            </li>
          ))}
        </ul>
      </div>
      <CommanderStats commander={activeCommander} />
    </div>
  );
}
