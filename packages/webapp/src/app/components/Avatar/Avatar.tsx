import styles from "./Avatar.module.scss";

interface Props {
  src: string;
  alt: string;
}

export const Avatar = (props: Props) => {
  return <img alt={props.alt} className={styles.Avatar} src={props.src} />;
};
