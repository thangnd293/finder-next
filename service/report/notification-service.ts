import axiosInstance from "@/lib/axios";
import { Image } from "../user";

export interface CreateReportPayload {
  reason: string;
  description: string;
  reportedUser: string;
  images: Image[];
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
