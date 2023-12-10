import { client } from "@/util";
import { Commander } from "@lotr-rtw/service-types";

export function fetchCommanders() {
  return client.get<Commander[]>("/commanders");
}
