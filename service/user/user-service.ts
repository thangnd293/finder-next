import axiosInstance from "@/lib/axios";
import { type Discovery, type User } from ".";
import { List } from "@/types/http";

export interface UpdateSettingPayload {
  discovery: Partial<Discovery>;
  stepStarted: number;
}

export interface UpdateLocationPayload {
  lat: number;
  long: number;
}

export interface UpdateProfilePayload extends Partial<Omit<User, "images">> {
  images?: string[];
}

export class UserService {
  static prefix = "/users";

  static urls = {
    currentUser: `${this.prefix}/current-user`,
    updateProfile: `${this.prefix}/update_profile`,
    updateSetting: `${this.prefix}/update_setting`,
    updateLocation: `${this.prefix}/update_location`,
    recommendation: (page: number, size: number) =>
      `${this.prefix}/recommendation?page=${page}&size=${size}`,
  };

  static getCurrentUser = async () => {
    const { data } = await axiosInstance.get<User>(this.urls.currentUser);

    return data;
  };

  static updateProfile = async (user: UpdateProfilePayload) => {
    const { data } = await axiosInstance.patch<User>(
      this.urls.updateProfile,
      user,
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

  static getRecommendedUsers = async (page: number, size: number) => {
    const { data } = await axiosInstance.get<List<User>>(
      this.urls.recommendation(page, size),
    );

    return data;
  };
}
