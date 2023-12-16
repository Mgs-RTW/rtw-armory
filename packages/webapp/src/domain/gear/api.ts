import { client } from "@/util";
import { Gear, GearSlot } from "@lotr-rtw/service-types";

export function fetchGearBySlot(raceId: string, slot: GearSlot) {
  return client.get<Gear[]>(`/gear/${raceId}/${slot}`);
}
