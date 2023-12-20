"use client";

import React, { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "./multi-select.module.scss";
import { Chip } from "../Chip/Chip";

export type ObjectWithLabelAndValue = { label: string; value: string };

export interface SelectProps<T extends ObjectWithLabelAndValue>
  extends Omit<SelectPrimitive.SelectProps, "value" | "onValueChange"> {
  trigger?: ReactNode;
  search?: ReactNode;
  fullWidth?: boolean;
  triggerHeight?: number;
  showValue?: boolean;
  placeholder?: string;
  value: T[];
  onValueChange: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

function Select<T extends ObjectWithLabelAndValue>(
  {
    children,
    trigger,
    search,
    fullWidth,
    triggerHeight = 0,
    placeholder = "",
    value = [],
    onValueChange,
    onDeleteItem,
    ...props
  }: SelectProps<T>,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  return (
    <SelectPrimitive.Root {...props} onValueChange={onValueChange}>
      <div className={styles.SelectValueWrapper}>
        <SelectPrimitive.Value asChild placeholder={placeholder}>
          <UnOverridableDiv>
            {value.map((item) => (
              <Chip key={item.value} onDelete={() => onDeleteItem(item.value)}>
                {item.label}
              </Chip>
            ))}
          </UnOverridableDiv>
        </SelectPrimitive.Value>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          style={{ height: triggerHeight }}
          className={clsx(styles.SelectTrigger, fullWidth && styles.FullWidth)}
          asChild={!!trigger}
        />
      </div>
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

export const MultiSelect = React.forwardRef(Select);

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

// eslint-disable-next-line react/display-name
const UnOverridableDiv = React.forwardRef(
  (
    props: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { style: _, ...rest } = props;
    return <div className={styles.SelectedValuesWrapper} ref={ref} {...rest} />;
  }
);
