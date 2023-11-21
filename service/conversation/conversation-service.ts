import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { ChangeSafeModePayload, Conversation } from "./type";

export class ConversationService {
  static prefix = "/conversation";

  static urls = {
    conversation: (conversationID: string) =>
      `${this.prefix}/${conversationID}`,
    allConversations: (hasMessage: boolean) =>
      `${this.prefix}?page=1&size=100&message=${Number(hasMessage)}`,
    changeSafeMode: `${this.prefix}/safe-mode`,
  };

  static getAllConversations = async (hasMessage: boolean) => {
    const { data } = await axiosInstance.get<List<Conversation>>(
      `${this.urls.allConversations(hasMessage)}`,
    );

    return data;
  };

  static getConversation = async (conversationID: string) => {
    const { data } = await axiosInstance.get<Conversation>(
      `${this.urls.conversation(conversationID)}`,
    );

    return data;
  };

  static changeSafeMode = async (payload: ChangeSafeModePayload) => {
    const { data } = await axiosInstance.post<Conversation>(
      `${this.urls.changeSafeMode}`,
      payload,
    );

    return data;
  };
}
