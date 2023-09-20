import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { MatchRequest } from ".";

export interface MatchRequestCountPayload {
  totalCount: number;
  blur: string;
}

export class MatchRequestService {
  static prefix = "/match-request";

  static urls = {
    getMatchRequests: () => `${MatchRequestService.prefix}/?page=1&size=100`,
    matchRequestCount: `${MatchRequestService.prefix}/count`,
  };

  static getMatchRequests = async () => {
    const { data } = await axiosInstance.get<List<MatchRequest>>(
      this.urls.getMatchRequests(),
    );
    return data;
  };

  static getMatchRequestCount = async () => {
    const { data } = await axiosInstance.get<{
      data: MatchRequestCountPayload;
    }>(this.urls.matchRequestCount);
    return data;
  };
}
