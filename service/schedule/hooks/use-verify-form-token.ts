import { useQuery } from "@tanstack/react-query";
import { ScheduleService } from "../schedule-service";
import { useSearchParams } from "next/navigation";

export const useVerifyFormToken = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  return useQuery({
    queryKey: ["verifyToken", token],
    queryFn: () => ScheduleService.verifyToken(token ?? ""),
    select: (data) => ({
      data,
      token,
    }),
  });
};
