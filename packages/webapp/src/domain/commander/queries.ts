import { useQuery } from "react-query";
import { fetchCommanders } from "./api";
import { commandersQueryKey } from "./keys";
import { useCommanderGearStore } from "./state";

export function useCommandersQuery() {
  const prepare = useCommanderGearStore((state) => state.prepare);

  return useQuery([commandersQueryKey], fetchCommanders, {
    onSuccess: prepare,
  });
}
