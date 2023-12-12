import { GearSlot } from "@lotr-rtw/service-types";
import { useQuery } from "react-query";
import { fetchGearBySlot } from "./api";
import { gearQueryKey } from "./keys";

export function useGearBySlotQuery(slot: GearSlot, enabled = true) {
  return useQuery([gearQueryKey, slot], () => fetchGearBySlot(slot), {
    enabled,
  });
}
