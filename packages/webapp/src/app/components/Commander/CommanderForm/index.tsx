"use client";
import { FormEvent } from "react";
import { RaceDropdown } from "@/components";
import { ApiCommander, CreateCommanderBody } from "@lotr-rtw/service-types";
import { MdArrowBack } from "react-icons/md";
import styles from "./commander-form.module.scss";

interface Props {
  commander?: ApiCommander;
  submit(e: FormEvent<HTMLFormElement>): void;
  cancel(): void;
}

export const CommanderForm = (props: Props) => {
  return (
    <>
      <form onSubmit={props.submit}>
        <RaceDropdown name="raceId" fullWidth />
        <input name="name" placeholder="Commander name" />
        <input name="tier" placeholder="Commander tier (t1, t2, t3)" />
        <input
          name="alignment"
          placeholder="Commander alignment (evil, good)"
        />
        <input name="baseData.minDamage" placeholder="Minimum damage" />
        <input name="baseData.maxDamage" placeholder="Maximum damage" />
        <input name="baseData.hp" placeholder="Commander HP" />
        <input name="baseData.command" placeholder="Command damage" />
        <div className={styles.ScaleFields}>
          <input name="baseData.attack" placeholder="Attack damage" />
          <input
            name="baseData.attackScalePerLevel"
            placeholder="Attack scale per level"
          />
        </div>
        <input name="baseData.defense" placeholder="Commander defense" />
        <input name="baseData.focus" placeholder="Focus" />
        <input name="baseData.initiative" placeholder="Initiative" />
        <label htmlFor="image">Commander big image</label>
        <input type="file" name="image" placeholder="Commander image" />
        <label htmlFor="avatar">Commander avatar</label>
        <input type="file" name="avatar" placeholder="Commander avatar" />
        <button type="submit">Create commander</button>
      </form>
      <MdArrowBack
        onClick={props.cancel}
        className={styles.cancel}
        color="green"
      ></MdArrowBack>
    </>
  );
};
