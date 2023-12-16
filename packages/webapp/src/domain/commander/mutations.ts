import { useMutation, useQueryClient } from "react-query";
import { createCommander } from "./api";
import { commandersQueryKey, createCommanderMutationKey } from "./keys";

export function useCreateCommanderMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationKey: createCommanderMutationKey,
    mutationFn: createCommander,
    onSuccess: () => client.invalidateQueries([commandersQueryKey]),
  });
}
