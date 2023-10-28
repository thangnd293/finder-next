import axiosInstance from "@/lib/axios";
import { type Province } from ".";

export interface PayPackagePayload {
  cardNumber: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
  holderName: string;
  postalCode: string;
  offeringId: string;
  packageId: string;
}

export class HelperService {
  static prefix = "";

  static urls = {
    getAllProvince: `${this.prefix}/location/province`,
    unlinkInstagramAccount: `${this.prefix}/ins/unlink`,
    unlinkSpotifyAccount: `${this.prefix}/spotify/unlink`,
    payPackage: `${this.prefix}/payment/stripe/checkout`,
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

  static payPackage = async (payload: PayPackagePayload) => {
    return await axiosInstance.post(this.urls.payPackage, payload);
  };
}
