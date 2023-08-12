import axiosInstance from "@/lib/axios";
import { IMutateSuccess } from "@/types/http";

export class AuthService {
  static prefix = "/auth";

  static urls = {
    sendSms: `${this.prefix}/send-sms`,
  };

  static sendSms = async (phoneNumber: string) => {
    const { data: responseData } = await axiosInstance.post<IMutateSuccess>(
      this.urls.sendSms,
      {
        phoneNumber,
      },
    );

    return responseData;
  };
}
