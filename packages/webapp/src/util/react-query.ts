import { QueryClient } from "react-query";

import { isApiError, isAuthenticationError } from "./error";
import { ONE_HOUR } from "./time";

const queryStatusBlacklist = [401, 403, 404, 500];
const mutationStatusBlacklist = [400, 403, 409, 413, 500];
const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: (failureCount, error: any) => {
        if (isAuthenticationError(error)) {
          return false;
        }
        if (
          isApiError(error) &&
          mutationStatusBlacklist.includes(error.status)
        ) {
          return false;
        }
        return failureCount < MAX_RETRIES;
      },
    },
    queries: {
      cacheTime: ONE_HOUR,
      staleTime: ONE_HOUR,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        console.log("error", error);
        if (isAuthenticationError(error)) {
          return false;
        }
        if (isApiError(error) && queryStatusBlacklist.includes(error.status)) {
          return false;
        }

        return failureCount < MAX_RETRIES;
      },
    },
  },
});
