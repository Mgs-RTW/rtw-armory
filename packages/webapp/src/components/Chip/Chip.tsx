import { ReactNode } from "react";
import styles from "./chip.module.scss";

interface Props {
  children: ReactNode;
  onDelete: () => void;
}

export const Chip = ({ children, onDelete }: Props) => (
  <div className={styles.root}>
    {children}
    <button className={styles.close} onClick={onDelete}>
      x
    </button>
  </div>
);
