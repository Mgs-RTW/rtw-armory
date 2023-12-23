"use client";
import { FormEvent } from "react";
import { RaceDropdown } from "@/components";
import { useCreateCommanderMutation } from "@/domain/commander";
import styles from "./commander-form.module.scss";

export const CommanderForm = () => {
  const { mutateAsync, error } = useCreateCommanderMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));

    const transformed = Object.entries(body).reduce((acc, [key, value]) => {
      if (key.includes(".")) {
        const [head, tail] = key.split(".");
        acc.append(`${head}[${tail}]`, value);
      } else {
        acc.append(key, value);
      }
      return acc;
    }, new FormData());

    mutateAsync(transformed).then(console.log).catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RaceDropdown name="raceId" fullWidth />
      <input name="name" placeholder="Commander name" />
      <input name="tier" placeholder="Commander tier (t1, t2, t3)" />
      <input name="alignment" placeholder="Commander alignment (evil, good)" />
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
  );
};
