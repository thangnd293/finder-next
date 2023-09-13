import { socket } from "@/lib/socket";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import useMessageStore from "./use-message-store";

const useSocket = (active: boolean) => {
  const { addMessage, markMessagesSeen } = useMessageStore();

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
    if (!isConnected) return;

    socket.on("newMessage", (newMessage) => {
      addMessage(newMessage);
    });

    socket.on("sentMessage", (sentMessage) => {
      addMessage(sentMessage);
    });

    socket.on("seenMessage", (data) => {
      console.log("seenMessage", data);

      markMessagesSeen(data);
    });

    return () => {
      socket.off("newMessage");
      socket.off("sentMessage");
      socket.off("seenMessage");
    };
  }, [isConnected, addMessage, markMessagesSeen]);
};

export default useSocket;
