import axiosInstance from "@/lib/axios";
import { Discovery, User } from ".";

export interface UpdateSettingPayload {
  discovery: Partial<Discovery>;
  stepStarted: number;
}

export class UserService {
  static prefix = "/users";

  static urls = {
    currentUser: `${this.prefix}/current-user`,
    updateProfile: `${this.prefix}/update_profile`,
    updateSetting: `${this.prefix}/update_setting`,
  };

  static getCurrentUser = async () => {
    const { data } = await axiosInstance.get<User>(this.urls.currentUser);

    return data;
  };

  static updateProfile = async (user: Partial<User>) => {
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
}
