import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ChangeSafeModePayload, Conversation } from "..";
import { ConversationService } from "../conversation-service";

export const useChangeSafeMode = (
  config: UseMutationOptions<
    Conversation,
    unknown,
    ChangeSafeModePayload,
    unknown
  > = {},
) => {
  return useMutation({
    mutationFn: ConversationService.changeSafeMode,
    ...config,
  });
};
