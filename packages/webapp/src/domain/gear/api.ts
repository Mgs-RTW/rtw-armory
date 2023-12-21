import { client } from "@/util";
import { ApiGear, GearSlot } from "@lotr-rtw/service-types";

export function fetchGearBySlot(raceId: string, slot: GearSlot) {
  return client.get<ApiGear[]>(`/gear/${raceId}/${slot}`);
}

export function createGear(body: FormData) {
  return client.post<ApiGear>("/admin/gear", body);
}
