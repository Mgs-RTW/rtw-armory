"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useCommandersQuery, useCommanderStore } from "@/domain/commander";
import { Image } from "@/components";
import { CommanderGear, CommanderStats } from "./components";

type Side = "good" | "evil";

export default function Home() {
  const [side, setSide] = useState<Side>("good");
  const { data: commanders } = useCommandersQuery();
  const [commander, setCommander] = useCommanderStore();

  const toggleSide = (side: Side) => {
    setSide(side);
    document.documentElement.setAttribute("data-side", side);
  };

  if (commander === undefined && commanders !== undefined) {
    setTimeout(() => {
      setCommander(commanders[0]);
    }, 300);
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.SideToggler}>
          <button onClick={() => toggleSide("good")}>Good</button>
          <button onClick={() => toggleSide("evil")}>Bad</button>
        </div>
        <ul className={styles.CommanderList}>
          {commanders?.map((el, i) => (
            <li
              key={i}
              data-state={el.id === commander?.id ? "selected" : undefined}
              onClick={() => setCommander(el)}
              className={styles.CommanderItem}
            >
              <Image alt={el.name} src={el.image} />
            </li>
          ))}
        </ul>
      </div>
      {commander && (
        <div className={styles.CharacterImage}>
          <Image alt="Commander image" src={commander.image} />
        </div>
      )}
      {commander && (
        <div className={styles.StatsAndGear}>
          <CommanderStats commander={commander} />
          <CommanderGear />
        </div>
      )}
    </div>
  );
}
