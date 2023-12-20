import { useRacesQuery } from "@/domain/race";
import { Select, SelectItem, SelectProps } from "../Select/Select";

interface Props extends SelectProps {
  onRaceSelect?: (raceId: string) => void;
}

export const RaceDropdown = ({ value, onRaceSelect, ...rest }: Props) => {
  const { data = [] } = useRacesQuery();

  return (
    <Select
      value={value}
      onValueChange={onRaceSelect}
      triggerHeight={40}
      placeholder="Select race"
      {...rest}
    >
      {data.map((race) => (
        <SelectItem key={race.id} value={race.id}>
          {race.name}
        </SelectItem>
      ))}
    </Select>
  );
};
