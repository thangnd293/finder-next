import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { Notification, NotificationStatus, NotificationType } from "./type";

export interface UpdateStatusPayload {
  id: string;
  status: NotificationStatus;
}

export interface NotificationQueryParams {
  types?: NotificationType[];
  page?: number;
}

export interface AllNotificationQueryParams {
  types?: NotificationType[];
  status?: NotificationStatus;
}

export interface FilterReceiveNotificationParams {
  types?: NotificationType[];
  status?: NotificationStatus;
  payload: {
    status: NotificationStatus;
  };
}
export class NotificationService {
  static prefix = "/notification";

  static urls = {
    getAllNotification: ({ types, status }: AllNotificationQueryParams) => {
      const params = new URLSearchParams();
      if (types) {
        types.map((type) => params.append("types", type));
      }

      if (status) {
        params.append("status", status.toString());
      }

      return `${NotificationService.prefix}?${params}`;
    },
    getNotifications: ({ types, page }: NotificationQueryParams = {}) => {
      const params = new URLSearchParams();

      if (types) {
        types.map((type) => params.append("types", type));
      }

      if (page) {
        params.append("page", page.toString());
        params.append("size", "10");
      }

      return `${NotificationService.prefix}?${params}`;
    },
    getNotificationCount: (types?: NotificationType[]) => {
      const params = new URLSearchParams();
      if (types) {
        types.map((type) => params.append("types", type));
      }

      return `${NotificationService.prefix}/count?status=Not%20received&${params}`;
    },
    receiveNotifications: ({
      types,
      status,
    }: Partial<FilterReceiveNotificationParams>) => {
      const params = new URLSearchParams();
      if (types) {
        types.map((type) => params.append("types", type));
      }

      if (status) {
        params.append("status", status.toString());
      }

      return `${NotificationService.prefix}/received?${params}`;
    },
  };

  static getNotifications = async (query: NotificationQueryParams) => {
    const { data } = await axiosInstance.get<List<Notification>>(
      this.urls.getNotifications(query),
    );
    return data;
  };

  static getAllNotifications = async (query: AllNotificationQueryParams) => {
    const { data } = await axiosInstance.get<List<Notification>>(
      this.urls.getAllNotification(query),
    );
    return data;
  };

  static updateStatus = async ({ id, ...payload }: UpdateStatusPayload) => {
    const { data } = await axiosInstance.patch<any>(
      `${NotificationService.prefix}/${id}`,
      payload,
    );
    return data;
  };

  static getNotificationCount = async (types?: NotificationType[]) => {
    const { data } = await axiosInstance.get<{
      data: {
        totalCount: number;
        totalNewNotification: number;
      };
    }>(this.urls.getNotificationCount(types));
    return data;
  };

  static receiveNotifications = async ({
    payload,
    ...query
  }: FilterReceiveNotificationParams) => {
    const { data } = await axiosInstance.patch(
      this.urls.receiveNotifications(query),
      payload,
    );

    return data;
  };
}
