import axiosInstance from "@/lib/axios";
import { OfferResponse } from "./type";

export class OfferService {
  static prefix = "/offering";

  static urls = {
    getOffers: `${this.prefix}?page=1&size=100`,
  };

  static async getOffers() {
    const { data } = await axiosInstance.get<OfferResponse>(
      "/offering?page=1&size=100",
    );

    return data;
  }
}
