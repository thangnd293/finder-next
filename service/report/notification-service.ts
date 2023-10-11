import axiosInstance from "@/lib/axios";

export interface CreateReportPayload {
  reason: string;
  description: string;
  reportedUser: string;
}
export class ReportService {
  static prefix = "/report";

  static urls = {
    createReport: `${this.prefix}`,
  };

  static createReport = async (payload: CreateReportPayload) => {
    const { data } = await axiosInstance.post<any>(
      this.urls.createReport,
      payload,
    );
    return data;
  };
}
