import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { CreateReportPayload, ReportService } from "../notification-service";

export const useCreateReport = (
  config: UseMutationOptions<any, unknown, CreateReportPayload, unknown> = {},
) => {
  return useMutation({
    mutationFn: ReportService.createReport,
    ...config,
  });
};
