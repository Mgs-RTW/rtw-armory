import { GearSlot } from "@lotr-rtw/service-types";
import { useQuery } from "react-query";
import { fetchGearBySlot } from "./api";
import { gearBySlotQueryKey } from "./keys";

export function useGearBySlotQuery(
  raceId: string,
  slot: GearSlot,
  enabled = true
) {
  return useQuery(
    [gearBySlotQueryKey(raceId, slot)],
    () => fetchGearBySlot(raceId, slot),
    {
      enabled,
    }
  );
}
