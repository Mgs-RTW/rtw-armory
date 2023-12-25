import { client } from "@/util";
import { ApiCommander } from "@lotr-rtw/service-types";

export function fetchCommanders() {
  return client.get<ApiCommander[]>("/commanders");
}

export function createCommander(payload: FormData) {
  return client.post<ApiCommander>("/admin/commander", payload);
}

export function getCommanderById(id: string | null) {
  return client.get<ApiCommander>(`/commanders/${id}`)
}