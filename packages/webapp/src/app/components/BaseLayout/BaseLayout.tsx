import { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./base-layout.module.scss";

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);
