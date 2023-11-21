import axiosInstance from "@/lib/axios";
import { type Discovery, type User } from ".";
import { List } from "@/types/http";
import { TagType } from "../tag";

export interface UpdateSettingPayload {
  discovery: Partial<Discovery>;
  stepStarted?: number;
}

export interface UpdateLocationPayload {
  lat: number;
  long: number;
}

export interface UpdateUserTagPayload {
  tagId: string;
  tagType: TagType;
}
export type UpdateProfilePayload =
  | (Partial<Omit<User, "relationships">> & {
      relationships?: string[];
    })
  | {
      heightSetting: {
        value: number;
        isShowInFinder: boolean;
      };
    };

export class UserService {
  static prefix = "/users";

  static urls = {
    currentUser: `${this.prefix}/current-user`,
    updateProfile: `${this.prefix}/update_profile`,
    updateSetting: `${this.prefix}/update_setting`,
    updateLocation: `${this.prefix}/update_location`,
    updateTag: `${this.prefix}/update_tag`,
    recommendation: (page: number, size: number) =>
      `${this.prefix}/recommendation?page=${page}&size=${size}`,
  };

  static getCurrentUser = async () => {
    const { data } = await axiosInstance.get<User>(this.urls.currentUser);

    return data;
  };

  static updateProfile = async (payload: UpdateProfilePayload) => {
    const { data } = await axiosInstance.patch<User>(
      this.urls.updateProfile,
      payload,
    );

    return data;
  };

  static updateSetting = async (payload: UpdateSettingPayload) => {
    const { data } = await axiosInstance.patch<User>(
      this.urls.updateSetting,
      payload,
    );

    return data;
  };

  static updateLocation = async (payload: UpdateLocationPayload) => {
    const { data } = await axiosInstance.patch(
      this.urls.updateLocation,
      payload,
    );

    return data;
  };

  static updateUserTag = async (payload: UpdateUserTagPayload) => {
    const { data } = await axiosInstance.patch(this.urls.updateTag, payload);

    return data;
  };

  static getRecommendedUsers = async (page: number, size: number) => {
    const { data } = await axiosInstance.get<List<User>>(
      this.urls.recommendation(page, size),
    );

    return data;
  };
}
