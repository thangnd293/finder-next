import axiosInstance from "@/lib/axios";
import { NotificationStatus, NotificationType } from "./type";

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
}
