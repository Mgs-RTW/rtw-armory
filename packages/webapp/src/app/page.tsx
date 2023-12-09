"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./page.module.scss";

type Side = "good" | "evil";

const commanders = new Array(4).fill(null);

export default function Home() {
  const [side, setSide] = useState<Side>("good");
  const [activeCommander, setActiveCommander] = useState(0);

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
          {commanders.map((commander, i) => (
            <li
              data-state={i === activeCommander ? "selected" : undefined}
              onClick={() => setActiveCommander(i)}
              className={styles.CommanderItem}
              key={i}
            ></li>
          ))}
        </ul>
      </div>
      <div className={styles.StatsContainer}></div>
    </div>
  );
}
