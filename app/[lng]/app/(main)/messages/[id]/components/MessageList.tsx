import { useReceiver, useSafeModeStatus } from "@/service/conversation";
import { MessageStatus, useAllMessages } from "@/service/message";
import { useCurrentUserID } from "@/service/user";
import React, { Fragment } from "react";
import MessageReceived from "./MessageReceived";
import { useParams } from "next/navigation";
import MessageSent from "./MessageSent";
import Spinner from "@/components/Spinner";
import Avatar from "@/components/Avatar";

const MessageList = () => {
  const { id } = useParams() as {
    id: string;
  };
  const { messages, isLoading } = useAllMessages(id);
  const { currentUserID } = useCurrentUserID();
  const { receiver } = useReceiver(id);
  const { isEnableSafeMode } = useSafeModeStatus(id);

  const lastMessageSeenIndex = messages.findLastIndex(
    (message) =>
      message.sender === currentUserID && message.status === MessageStatus.SEEN,
  );

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center text-primary">
        <Spinner size={30} />
      </div>
    );

  if (messages.length === 0)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <p className="text-lg text-secondary-foreground">
          Bạn đã ghép đôi với{" "}
          <span className="font-semibold text-foreground">
            {receiver?.name}
          </span>{" "}
          ❤️
        </p>

        <Avatar className="h-48 w-48" src={receiver?.images[0]?.url} />

        <p className="text-secondary-foreground">
          👋 Đừng ngại, mở lời tới ngay thôi nào
        </p>
      </div>
    );

  return (
    <>
      {messages.map((message, index, arr) => {
        const isMine = message.sender === currentUserID;
        const showAvatar = !isMine && arr[index + 1]?.sender !== message.sender;

        return (
          <Fragment key={message._id}>
            {isMine ? (
              <MessageSent
                isLast={
                  arr.length - 1 === index || lastMessageSeenIndex === index
                }
                receiver={receiver}
                message={message}
                isEnableSafeMode={isEnableSafeMode}
              />
            ) : (
              <MessageReceived
                showAvatar={showAvatar}
                sender={receiver}
                message={message}
                isEnableSafeMode={isEnableSafeMode}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default React.memo(MessageList);
