import { useMutation, useQueryClient } from "react-query";
import { createGear } from "./api";
import { gearBySlotQueryKey } from "./keys";

export function useCreateGearMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGear,
    onSuccess: (data) =>
      data.raceIds.forEach((raceId) =>
        queryClient.invalidateQueries([gearBySlotQueryKey(raceId, data.slot)])
      ),
  });
}
