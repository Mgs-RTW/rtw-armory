import { client } from "@/util";
import { ApiRace } from "@lotr-rtw/service-types";

export function fetchAllRaces() {
  return client.get<ApiRace[]>("/races");
}
