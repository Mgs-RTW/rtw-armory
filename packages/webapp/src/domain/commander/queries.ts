import { useQuery } from "react-query";
import { fetchCommanders,getCommanderById } from "./api";
import { commandersQueryKey } from "./keys";
import { useCommanderGearStore } from "./state";

export function useCommandersQuery() {
  const prepare = useCommanderGearStore((state) => state.prepare);

  return useQuery([commandersQueryKey], fetchCommanders, {
    onSuccess: prepare,
  });
}

export function useCommanderQuery(id:string | null) {
  return useQuery([commandersQueryKey, id], () => getCommanderById(id), { enabled: !!id })
}