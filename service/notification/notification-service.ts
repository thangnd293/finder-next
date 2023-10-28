import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { Notification, NotificationStatus, NotificationType } from "./type";

export interface UpdateStatusPayload {
  id: string;
  notification: {
    status: NotificationStatus;
  };
}

export class NotificationService {
  static prefix = "/notification";

  static urls = {
    getAllNotification: (type: NotificationType) =>
      `${NotificationService.prefix}/?page=1&size=100&type=${type}`,
    getNotificationCount: `${NotificationService.prefix}/count`,
    getScheduleNotification: (page: number) =>
      `${NotificationService.prefix}/schedule?page=${page}&size=10`,
    getScheduleNotificationCount: `${NotificationService.prefix}/count-schedule`,
    receiveNotifications: `${NotificationService.prefix}/schedule`,
  };

  static getAllNotifications = async (type: NotificationType) => {
    const { data } = await axiosInstance.get<any>(
      this.urls.getAllNotification(type),
    );
    return data;
  };

  static updateStatus = async ({ id, ...payload }: UpdateStatusPayload) => {
    const { data } = await axiosInstance.patch<any>(
      NotificationService.prefix,
      {
        ids: [id],
        ...payload,
      },
    );
    return data;
  };

  static getNotificationCount = async () => {
    const { data } = await axiosInstance.get<{
      data: {
        totalCount: number;
      };
    }>(this.urls.getNotificationCount);
    return data;
  };

  static getScheduleNotification = async (page: number) => {
    const { data } = await axiosInstance.get<List<Notification>>(
      this.urls.getScheduleNotification(page),
    );
    return data;
  };

  static getScheduleNotificationCount = async () => {
    const { data } = await axiosInstance.get<{
      data: {
        totalCount: number;
      };
    }>(this.urls.getScheduleNotificationCount);
    return data;
  };

  static receiveNotifications = async () => {
    const { data } = await axiosInstance.patch(this.urls.receiveNotifications);

    return data;
  };
}
