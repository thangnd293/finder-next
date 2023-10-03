import axiosInstance from "@/lib/axios";
import { type Province } from ".";

export class HelperService {
  static prefix = "";

  static urls = {
    getAllProvince: `${this.prefix}/location/province`,
    unlinkInstagramAccount: `${this.prefix}/ins/unlink`,
    unlinkSpotifyAccount: `${this.prefix}/spotify/unlink`,
  };

  static getAllProvince = async () => {
    const { data } = await axiosInstance.get<Province[]>(
      this.urls.getAllProvince,
    );

    return data;
  };

  static unlinkInstagramAccount = async () => {
    return await axiosInstance.post(this.urls.unlinkInstagramAccount);
  };

  static unlinkSpotifyAccount = async () => {
    return await axiosInstance.post(this.urls.unlinkSpotifyAccount);
  };
}
