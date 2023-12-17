import { client } from "@/util";
import { ApiGear, GearSlot } from "@lotr-rtw/service-types";

export function fetchGearBySlot(raceId: string, slot: GearSlot) {
  return client.get<ApiGear[]>(`/gear/${raceId}/${slot}`);
}
