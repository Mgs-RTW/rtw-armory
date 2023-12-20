import {
  MultiSelect,
  ObjectWithLabelAndValue,
  SelectItem,
} from "@/components/MultiSelect/MultiSelect";
import { useRacesQuery } from "@/domain/race";
import { useState } from "react";

export const CreateGearForm = () => {
  const [selectedRaces, setSelectedRaces] = useState<ObjectWithLabelAndValue[]>(
    []
  );
  const { data = [] } = useRacesQuery();

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

  return (
    <MultiSelect
      name="raceIds"
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
  );
};
