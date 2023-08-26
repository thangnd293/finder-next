import axiosInstance from "@/lib/axios";
import { type Province } from ".";

export class HelperService {
  static prefix = "";

  static urls = {
    getAllProvince: `${this.prefix}/location/province`,
  };

  static getAllProvince = async () => {
    const { data } = await axiosInstance.get<Province[]>(
      this.urls.getAllProvince,
    );

    return data;
  };
}
