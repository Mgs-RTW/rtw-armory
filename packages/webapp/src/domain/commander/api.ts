import { client } from "@/util";
import { ApiCommander, CreateCommanderBody } from "@lotr-rtw/service-types";

export function fetchCommanders() {
  return client.get<ApiCommander[]>("/commanders");
}

export function createCommander(payload: CreateCommanderBody) {
  return client.post<ApiCommander>("/admin/commander", payload);
}
