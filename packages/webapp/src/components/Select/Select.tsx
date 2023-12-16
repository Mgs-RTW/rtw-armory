import React, { ForwardedRef, ReactNode } from "react";
import clsx from "clsx";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "./select.module.scss";

export interface SelectProps extends SelectPrimitive.SelectProps {
  trigger?: ReactNode;
  search?: ReactNode;
  fullWidth?: boolean;
  triggerHeight?: number;
}

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef(
  (
    {
      children,
      trigger,
      search,
      fullWidth,
      triggerHeight = 0,
      ...props
    }: SelectProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          style={{ height: triggerHeight }}
          className={clsx(styles.SelectTrigger, fullWidth && styles.FullWidth)}
          asChild={!!trigger}
        >
          {trigger ? <span>{trigger}</span> : null}
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
