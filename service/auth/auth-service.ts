import axiosInstance from "@/lib/axios";
import { MutateSuccess } from "@/types/http";

export class AuthService {
  static prefix = "/auth";

  static urls = {
    sendSms: `${this.prefix}/send-sms`,
  };

  static sendSms = async (phoneNumber: string) => {
    const { data } = await axiosInstance.post<MutateSuccess>(
      this.urls.sendSms,
      {
        phoneNumber,
      },
    );

    return data;
  };
}
