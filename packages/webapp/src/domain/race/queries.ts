import { useQuery } from "react-query";
import { fetchAllRaces } from "./api";
import { racesQueryKey } from "./keys";

export function useRacesQuery() {
  return useQuery([racesQueryKey], fetchAllRaces);
}
