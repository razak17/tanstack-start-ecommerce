import { queryOptions } from "@tanstack/react-query";

import { getUserSessionFn } from "../fn/auth";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getUserSessionFn(),
      staleTime: 5000,
    }),
};
