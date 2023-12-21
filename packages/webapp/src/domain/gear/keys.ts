import { GearSlot } from "@lotr-rtw/service-types";

export const gearBySlotQueryKey = (raceId: string, slot: GearSlot) =>
  `gear-${raceId}-${slot}`;
