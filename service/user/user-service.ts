import axiosInstance from "@/lib/axios";

export class UserService {
  static prefix = "/users";

  static urls = {
    currentUser: `${this.prefix}/current-user`,
  };

  static getCurrentUser = async () => {
    const { data } = await axiosInstance.get(this.urls.currentUser);

    return data;
  };
}
