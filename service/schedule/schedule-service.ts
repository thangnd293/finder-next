import axiosInstance from "@/lib/axios";
import { Data, List } from "@/types/http";
import { Schedule, ScheduleDetail } from "./type";
import { User } from "../user";

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

export type FilterScheduleArgs = {
  page: string;
  size: string;
  fromDate?: string;
  toDate?: string;
  status?: Schedule["status"];
  sender?: string;
};

export type ScheduleAction = "cancel" | "accept" | "decline";
export type ScheduleActionArgs = {
  action: ScheduleAction;
  id: string;
};

export type FeedbackSchedulePayload = {
  token: string;
  isJoin?: boolean;
  datingStatus?: string;
  detail?: {
    question: string;
    answer: string;
  }[];
};
export class ScheduleService {
  static prefix = "/schedule";

  static urls = {
    suggest: `${this.prefix}/suggest`,
    getSchedules: (args: FilterScheduleArgs) =>
      `${this.prefix}?${new URLSearchParams(args)}`,
    getSchedulesDetail: (id: string) => `${this.prefix}/${id}`,
    actionSchedule: (action: ScheduleAction, id: string) =>
      `${this.prefix}/${action}/${id}`,
    verifyToken: (token: string) =>
      `${this.prefix}/verify-token?token=${token}`,
    feedbackSchedule: (token: string) => `${this.prefix}/review?token=${token}`,
  };

  static suggestDate = async (payload: SuggestDatePayload) => {
    const response = await axiosInstance.post(this.urls.suggest, payload);
    return response.data;
  };

  static createSchedule = async (payload: CreateSchedulePayload) => {
    const response = await axiosInstance.post(this.prefix, payload);

    return response.data;
  };

  static getSchedules = async (args: FilterScheduleArgs) => {
    const { data } = await axiosInstance.get<List<Schedule>>(
      this.urls.getSchedules(args),
    );
    return data;
  };

  static getSchedulesDetail = async (id: string) => {
    const { data } = await axiosInstance.get<ScheduleDetail>(
      this.urls.getSchedulesDetail(id),
    );
    return data;
  };

  static actionSchedule = async ({ action, id }: ScheduleActionArgs) => {
    const { data } = await axiosInstance.post<Data<Schedule>>(
      this.urls.actionSchedule(action, id),
    );
    return data;
  };

  static verifyToken = async (token: string) => {
    const { data } = await axiosInstance.get<
      Data<{
        schedule: Schedule;
        currentUser: User;
      }>
    >(this.urls.verifyToken(token));
    return data.data;
  };

  static feedbackSchedule = async ({
    token,
    ...payload
  }: FeedbackSchedulePayload) => {
    const { data } = await axiosInstance.post<Data<Schedule>>(
      this.urls.feedbackSchedule(token),
      payload,
    );
    return data;
  };
}
