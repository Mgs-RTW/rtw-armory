import clsx from "clsx";
import { ImageProps } from "next/image";
import NextImage from "next/image";
import styles from "./image.module.scss";

export function Image({
  alt,
  className,
  sizes,
  src,
  style,
  ...rest
}: ImageProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <NextImage
        alt={alt || ""}
        className={styles["root__image"]}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src}
        fill
        {...rest}
        style={{
          objectPosition: "center center",
          ...style,
        }}
      />
    </div>
  );
}
