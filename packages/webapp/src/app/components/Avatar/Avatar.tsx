import styles from "./Avatar.module.scss";

interface Props {
  src: string;
}

export const Avatar = (props: Props) => {
  return <img className={styles.Avatar} src={props.src} />;
};
