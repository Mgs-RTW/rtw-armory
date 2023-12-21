import { FormEvent, useState } from "react";
import { CreateGearAttributesBody } from "@lotr-rtw/service-types";
import { Select } from "@/components";
import {
  MultiSelect,
  ObjectWithLabelAndValue,
  SelectItem,
} from "@/components/MultiSelect/MultiSelect";
import { useRacesQuery } from "@/domain/race";
import styles from "./gear-form.module.scss";
import { useCreateGearMutation } from "@/domain/gear";

export const CreateGearForm = () => {
  const [selectedRaces, setSelectedRaces] = useState<ObjectWithLabelAndValue[]>(
    []
  );
  const [attributes, setAttributes] = useState<CreateGearAttributesBody[]>([]);
  const { data = [] } = useRacesQuery();
  const { mutateAsync } = useCreateGearMutation();

  const options: ObjectWithLabelAndValue[] = data.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const handleRaceSelect = (id: string) => {
    const isAlreadySelected =
      selectedRaces.findIndex((el) => el.value === id) !== -1;
    if (isAlreadySelected) {
      return;
    }

    const race = data.find((el) => el.id === id);
    if (race) {
      setSelectedRaces((curr) => [
        ...curr,
        { label: race.name, value: race.id },
      ]);
    }
  };

  const handleRaceDelete = (id: string) =>
    setSelectedRaces((curr) => curr.filter((el) => el.value !== id));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    selectedRaces.forEach((race, index) =>
      data.append(`raceIds[${index}]`, race.value)
    );
    mutateAsync(data).then(console.log);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <MultiSelect
        value={selectedRaces}
        onValueChange={handleRaceSelect}
        onDeleteItem={handleRaceDelete}
        triggerHeight={40}
        placeholder="Select eligable races"
        fullWidth
      >
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </MultiSelect>
      <input name="name" placeholder="Gear name" />
      <input name="description" placeholder="Gear description" />
      <Select name="slot" placeholder="Gear slot" triggerHeight={40}>
        {["head", "hand", "armour", "accessory", "relic"].map((slot) => (
          <SelectItem key={slot} value={slot}>
            {slot}
          </SelectItem>
        ))}
      </Select>
      <Select name="rarity" placeholder="Gear rarity" triggerHeight={40}>
        {["flawless", "exquisite", "superior", "fine", "unique"].map(
          (rarity) => (
            <SelectItem key={rarity} value={rarity}>
              {rarity}
            </SelectItem>
          )
        )}
      </Select>
      <label htmlFor="image">Image</label>
      <input name="image" type="file" />
      <button
        type="button"
        onClick={() =>
          setAttributes((curr) => [
            ...curr,
            { amount: "", modifier: "attack", target: "commander" },
          ])
        }
      >
        Add attribute
      </button>
      {attributes.map((attribute, index) => (
        <div key={`${attribute.target}-${index}`} className={styles.attributes}>
          <input name={`attributes[${index}][amount]`} placeholder="Amount" />
          <Select
            fullWidth={false}
            triggerHeight={40}
            name={`attributes[${index}][target]`}
            placeholder="Attribute target"
          >
            {["unit", "commander"].map((target, i) => (
              <SelectItem key={`${target}-${i}`} value={target}>
                {target}
              </SelectItem>
            ))}
          </Select>
          <Select
            fullWidth={false}
            triggerHeight={40}
            name={`attributes[${index}][modifier]`}
            placeholder="Attribute modifier"
          >
            {["attack", "focus", "defense"].map((modifier, i) => (
              <SelectItem key={`${modifier}-${i}`} value={modifier}>
                {modifier}
              </SelectItem>
            ))}
          </Select>
          <button
            onClick={() =>
              setAttributes((curr) => curr.filter((_, i) => i !== index))
            }
          >
            X
          </button>
        </div>
      ))}
      <button type="submit">Create gear</button>
    </form>
  );
};
