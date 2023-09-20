import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateMatchRequest = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(["matchRequests"]);
  };
};
