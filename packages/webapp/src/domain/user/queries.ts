import { useQuery, UseQueryOptions } from "react-query";
import { fetchCurrentUser } from "./api";
import { currentUserQueryKey } from "./keys";

export function useCurrentUser(options?: Omit<UseQueryOptions, "queryKey">) {
  return useQuery([currentUserQueryKey], fetchCurrentUser, options);
}
