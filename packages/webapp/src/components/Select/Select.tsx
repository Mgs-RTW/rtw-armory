// your-select.jsx
import React, { ForwardedRef, ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./select.module.scss";

interface Props extends SelectPrimitive.SelectProps {
  trigger: ReactNode;
  search?: ReactNode;
}

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef(
  (
    { children, trigger, search, ...props }: Props,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          className={styles.SelectTrigger}
          asChild
        >
          <span>{trigger}</span>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={styles.SelectContent}
            position="popper"
          >
            <SelectPrimitive.Viewport className={styles.SelectViewport}>
              {search}
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

// eslint-disable-next-line react/display-name
export const SelectItem = React.forwardRef(
  (
    { children, ...props }: SelectPrimitive.SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SelectPrimitive.Item
        {...props}
        ref={forwardedRef}
        className={styles.SelectItem}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }
);
