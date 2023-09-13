import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { Message } from "./type";

export class MessageService {
  static prefix = "/message";

  static urls = {
    getAllMessages: (conversationID: string) =>
      `${MessageService.prefix}/?page=1&size=100&conversation=${conversationID}`,
  };

  static getAllMessages = async (conversationID: string) => {
    const { data } = await axiosInstance.get<List<Message>>(
      this.urls.getAllMessages(conversationID),
    );
    return data;
  };
}
