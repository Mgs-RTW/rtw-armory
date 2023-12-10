import { useQuery } from "react-query";
import { fetchCommanders } from "./api";
import { commandersQueryKey } from "./keys";

export function useCommandersQuery() {
  return useQuery([commandersQueryKey], fetchCommanders);
}
