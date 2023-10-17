import axiosInstance from "@/lib/axios";

export interface SuggestDatePayload {
  content: string;
  location: string;
}

export interface CreateSchedulePayload {
  appointmentDate: string;
  name?: string;
  description: string;
  receiver: string;
  locationDating: string[];
  isShowLocationDating: boolean;
}
export class ScheduleService {
  static prefix = "/schedule";

  static urls = {
    suggest: `${this.prefix}/suggest`,
  };

  static suggestDate = async (payload: SuggestDatePayload) => {
    const response = await axiosInstance.post(
      ScheduleService.urls.suggest,
      payload,
    );
    return response.data;
  };

  static createSchedule = async (payload: CreateSchedulePayload) => {
    const response = await axiosInstance.post(ScheduleService.prefix, payload);

    return response.data;
  };
}
