import axiosInstance from "@/lib/axios";
import { type Province } from ".";
import { Data } from "@/types/http";
import { Image } from "../user";

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
    uploadImage: `${this.prefix}/images/upload`,
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

  static uploadImage = async ({
    file,
    blur = false,
    nsfw = false,
  }: {
    file: File;
    blur?: boolean;
    nsfw?: boolean;
  }) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("blur", blur.toString());
    formData.append("nsfw", nsfw.toString());

    const { data } = await axiosInstance.post<Data<Image>>(
      this.urls.uploadImage,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data.data;
  };
}
