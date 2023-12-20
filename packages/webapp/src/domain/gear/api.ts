import { client } from "@/util";
import { ApiGear, CreateGearBody, GearSlot } from "@lotr-rtw/service-types";

export function fetchGearBySlot(raceId: string, slot: GearSlot) {
  return client.get<ApiGear[]>(`/gear/${raceId}/${slot}`);
}

export function createGear(body: CreateGearBody) {
  return client.post<ApiGear>("/admin/gear", body);
}
