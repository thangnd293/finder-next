import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import useMessageStore from "@/hooks/use-message-store";
import { SeenMessagePayload, socket } from "@/lib/socket";
import { useReceiver } from "@/service/conversation";
import { MessageStatus, useAllMessages } from "@/service/message";
import { useCurrentUserID } from "@/service/user";
import useStore from "@/store";
import MessageScrollDownButton from "./MessageScrollDownButton";
import SimpleScrollDownButton from "./SimpleScrollDownButton";

interface ChatRoomBodyProps {
  children: React.ReactNode;
}
const ChatRoomBody = ({ children }: ChatRoomBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams() as {
    id: string;
  };

  const isFocused = useStore((state) => state.isFocused);
  const { markMessagesSeen } = useMessageStore();

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const { currentUserID } = useCurrentUserID();
  const { messages } = useAllMessages(id);
  const { receiver } = useReceiver(id);

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);

  const hasNewMessage =
    !!lastMessage &&
    lastMessage.sender !== currentUserID &&
    lastMessage.status !== MessageStatus.SEEN;

  useEffect(() => {
    if (!isFocused || showScrollToBottom || !currentUserID || !hasNewMessage)
      return;

    const payload: SeenMessagePayload = {
      conversation: id,
      seenAt: new Date().toISOString(),
      messageID: lastMessage._id,
      sender: lastMessage.sender,
      receiver: currentUserID,
    };

    socket.emit("seenMessage", payload, (data) => {
      markMessagesSeen(data);
    });
  }, [
    hasNewMessage,
    showScrollToBottom,
    isFocused,
    markMessagesSeen,
    currentUserID,
    id,
    lastMessage?._id,
    lastMessage?.sender,
  ]);

  useEffect(() => {
    if (!messageContainerRef.current) return;
    const containerObserver = new MutationObserver(() => {
      console.log("containerObserver");

      if (showScrollToBottom) return;

      messagesEndRef.current?.scrollIntoView();
    });

    containerObserver.observe(messageContainerRef.current, {
      childList: true,
    });
    return () => containerObserver.disconnect();
  }, [showScrollToBottom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - (scrollTop + clientHeight) > 200) {
      setShowScrollToBottom(true);
    } else {
      setShowScrollToBottom(false);
    }
  };

  const scrollToEnd = (behavior?: ScrollBehavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  return (
    <div
      className="relative flex-1 overflow-y-auto px-2"
      onScroll={handleScroll}
    >
      <div className="flex h-full flex-col py-4" ref={messageContainerRef}>
        {children}

        <div ref={messagesEndRef} />

        {showScrollToBottom &&
          (hasNewMessage ? (
            <MessageScrollDownButton
              receiver={receiver}
              message={lastMessage}
              onScrollToEnd={scrollToEnd}
            />
          ) : (
            <SimpleScrollDownButton onScroll={scrollToEnd} />
          ))}
      </div>
    </div>
  );
};

export default ChatRoomBody;
