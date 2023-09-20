import { socket } from "@/lib/socket";
import { useCurrentUserID } from "@/service/user";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import useMessageStore from "./use-message-store";

const useSocket = (active: boolean) => {
  const { currentUserID } = useCurrentUserID();
  const { addMessage, upsertMessage, markMessagesSeen } = useMessageStore();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");

    if (!token || !active) return;
    socket.connect();
    setIsConnected(true);

    socket.on("connect", () => {
      console.log("connected");

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
      console.log("seenMessage", data);

      markMessagesSeen(data);
    });

    return () => {
      socket.off("sentMessage");
      socket.off("seenMessage");
      socket.off("receivedMessage");
    };
  }, [isConnected, addMessage, markMessagesSeen]);
};

export default useSocket;

function playNotificationSound() {
  const audio = new Audio("/audio/notification.mp3");
  audio.play();
}
