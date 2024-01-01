import { socket } from "@/lib/socket";
import { useInvalidateAllConversations } from "@/service/conversation";
import { useInvalidateMatchRequest } from "@/service/matchRequest";
import {
  NotificationType,
  useInvalidateNotificationCount,
  useInvalidateNotifications,
} from "@/service/notification";
import { useCurrentUserID } from "@/service/user";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import useMessageStore from "./use-message-store";

const useSocket = (active: boolean) => {
  const { currentUserID } = useCurrentUserID();
  const { addMessage, upsertMessage, markMessagesSeen } = useMessageStore();
  const invalidateNotifications = useInvalidateNotifications();
  const invalidateNotificationCount = useInvalidateNotificationCount();
  const invalidateConversations = useInvalidateAllConversations();
  const invalidateMatchRequest = useInvalidateMatchRequest();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");

    if (!token || !active) return;
    socket.connect();
    setIsConnected(true);

    socket.on("connect", () => {
      socket.emit("verifyFirstConnection");
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
      setIsConnected(false);
    };
  }, [active]);

  useEffect(() => {
    if (!isConnected || !currentUserID) return;

    socket.on("newMessage", (newMessage) => {
      addMessage(newMessage);
      playNotificationSound();
      if (newMessage.sender !== currentUserID)
        socket.emit("receivedMessage", newMessage);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [isConnected, currentUserID, addMessage, markMessagesSeen]);

  useEffect(() => {
    if (!isConnected) return;

    socket.on("sentMessage", (sentMessage) => {
      upsertMessage(sentMessage);
    });

    socket.on("receivedMessage", (receivedMessage) => {
      upsertMessage(receivedMessage);
    });

    socket.on("seenMessage", (data) => {
      markMessagesSeen(data);
    });

    socket.on("newNotification", (data) => {
      if (
        data.type === NotificationType.SuperLike ||
        data.type === NotificationType.Matched
      ) {
        invalidateConversations(false);
      }

      if (data.type === NotificationType.Like) {
        invalidateMatchRequest();
      }

      invalidateNotifications();
      invalidateNotificationCount();
    });

    return () => {
      socket.off("sentMessage");
      socket.off("seenMessage");
      socket.off("receivedMessage");
    };
  }, [
    isConnected,
    addMessage,
    markMessagesSeen,
    invalidateNotifications,
    invalidateNotificationCount,
  ]);
};

export default useSocket;

function playNotificationSound() {
  const audio = new Audio("/audio/notification.mp3");
  audio.play();
}
