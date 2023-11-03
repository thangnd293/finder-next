import { socket } from "@/lib/socket";
import { useCurrentUserID } from "@/service/user";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import useMessageStore from "./use-message-store";
import { useInvalidateScheduleNotifications } from "@/service/notification/hooks/use-schedule-notification";
import { useInvalidateScheduleNotificationCount } from "@/service/notification/hooks/use-schedule-notification-count";

const useSocket = (active: boolean) => {
  const { currentUserID } = useCurrentUserID();
  const { addMessage, upsertMessage, markMessagesSeen } = useMessageStore();
  const invalidateScheduleNotifications = useInvalidateScheduleNotifications();
  const invalidateScheduleNotificationCount =
    useInvalidateScheduleNotificationCount();

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

    socket.on("notiSchedule", (data) => {
      console.log("notiSchedule", data);

      invalidateScheduleNotifications();
      invalidateScheduleNotificationCount();
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
    invalidateScheduleNotifications,
    invalidateScheduleNotificationCount,
  ]);
};

export default useSocket;

function playNotificationSound() {
  const audio = new Audio("/audio/notification.mp3");
  audio.play();
}
