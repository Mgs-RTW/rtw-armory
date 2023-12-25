"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { RaceDropdown, Image } from "@/components";
import {
  ApiCommander,
  CommanderAssets,
  CreateCommanderBody,
} from "@lotr-rtw/service-types";
import { MdArrowBack } from "react-icons/md";
import styles from "./commander-form.module.scss";
import { setValueAtPath } from "@/util/object";
import { buildFormData } from "@/util/form";

type CommanderBody = CreateCommanderBody & {
  assets: CommanderAssets;
};

interface CreateCommanderAssets {
  image: File | undefined;
  avatar: File | undefined;
}

const emptyCommander: CommanderBody = {
  name: "",
  alignment: "good",
  raceId: "",
  tier: "t3",
  baseData: {
    attack: "",
    attackScalePerLevel: "",
    command: "",
    defense: "",
    focus: "",
    hp: "",
    initiative: "",
    maxDamage: "",
    minDamage: "",
  },
  assets: {
    avatarUrl: "",
    imageUrl: "",
  },
};

interface CommanderFormProps {
  commander?: ApiCommander;
  onSubmit: (data: FormData, assets?: CreateCommanderAssets) => void;
  cancel: () => void;
}

export const CommanderForm = ({
  commander,
  onSubmit,
  cancel,
}: CommanderFormProps) => {
  const [formValues, setFormValues] = useState<CommanderBody>(
    commander ?? emptyCommander
  );
  const [assets, setAssets] = useState<CreateCommanderAssets>({
    image: undefined,
    avatar: undefined,
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const nextState = setValueAtPath(target.name, target.value, formValues);
    setFormValues(nextState);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = buildFormData(formValues);
    onSubmit(formData, assets);
  };

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    setAssets((curr) => ({ ...curr, [target.name]: file }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RaceDropdown
          name="raceId"
          value={formValues.raceId}
          onValueChange={(value) =>
            setFormValues((curr) => ({ ...curr, raceId: value }))
          }
          fullWidth
        />
        <input
          name="name"
          value={formValues.name}
          placeholder="Commander name"
          onChange={handleChange}
        />
        <input
          name="tier"
          value={formValues.tier}
          placeholder="Commander tier (t1, t2, t3)"
          onChange={handleChange}
        />
        <input
          name="alignment"
          value={formValues.alignment}
          placeholder="Commander alignment (evil, good)"
          onChange={handleChange}
        />
        <input
          name="baseData.minDamage"
          value={formValues.baseData.minDamage}
          placeholder="Minimum damage"
          onChange={handleChange}
        />
        <input
          name="baseData.maxDamage"
          value={formValues.baseData.maxDamage}
          placeholder="Maximum damage"
          onChange={handleChange}
        />
        <input
          name="baseData.hp"
          value={formValues.baseData.hp}
          placeholder="Commander HP"
          onChange={handleChange}
        />
        <input
          name="baseData.command"
          value={formValues.baseData.command}
          placeholder="Command damage"
          onChange={handleChange}
        />
        <div className={styles.ScaleFields}>
          <input
            name="baseData.attack"
            value={formValues.baseData.attack}
            placeholder="Attack damage"
            onChange={handleChange}
          />
          <input
            name="baseData.attackScalePerLevel"
            value={formValues.baseData.attackScalePerLevel}
            placeholder="Attack scale per level"
            onChange={handleChange}
          />
        </div>
        <input
          name="baseData.defense"
          value={formValues.baseData.defense}
          placeholder="Commander defense"
          onChange={handleChange}
        />
        <input
          name="baseData.focus"
          value={formValues.baseData.focus}
          placeholder="Focus"
          onChange={handleChange}
        />
        <input
          name="baseData.initiative"
          value={formValues.baseData.initiative}
          placeholder="Initiative"
          onChange={handleChange}
        />
        {formValues.assets.imageUrl ? (
          <Image
            alt="Commander image"
            src={formValues.assets.imageUrl}
            style={{ objectFit: "contain" }}
            className={styles.image}
          />
        ) : (
          <>
            <label htmlFor="image">Commander big image</label>
            <input
              type="file"
              onChange={handleFileChange}
              name="image"
              placeholder="Commander image"
            />
          </>
        )}
        {formValues.assets.avatarUrl ? (
          <Image
            alt="Commander avatar"
            src={formValues.assets.avatarUrl}
            style={{ objectFit: "contain" }}
            className={styles.avatar}
          />
        ) : (
          <>
            <label htmlFor="image">Commander avatar</label>
            <input
              type="file"
              onChange={handleFileChange}
              name="avatar"
              placeholder="Commander avatar"
            />
          </>
        )}
        <button type="submit">Create commander</button>
      </form>
      <MdArrowBack
        onClick={cancel}
        className={styles.cancel}
        color="green"
      ></MdArrowBack>
    </>
  );
};
