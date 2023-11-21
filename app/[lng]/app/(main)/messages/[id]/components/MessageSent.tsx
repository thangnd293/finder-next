import Avatar from "@/components/Avatar";
import Tooltip from "@/components/Tooltip";
import { Message, MessageStatus } from "@/service/message";
import { User } from "@/service/user";
import { useEffect, useState } from "react";
import MessageContent from "./MessageContent";

interface MessageSentProps {
  isLast: boolean;
  message: Message;
  receiver?: User;
  isEnableSafeMode?: boolean;
}
const MessageSent = ({
  message,
  isLast,
  receiver,
  isEnableSafeMode,
}: MessageSentProps) => {
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowStatus(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="message-wrapper sent flex-col">
      <MessageContent
        isSelf
        message={message}
        isEnableSafeMode={isEnableSafeMode}
      />

      {message.status === MessageStatus.SENDING && showStatus && (
        <p className="text-sm text-secondary-foreground">Đang gửi</p>
      )}

      {isLast && message.status === MessageStatus.SENT && (
        <p className="text-sm text-secondary-foreground">
          {`Đã gửi ${message.createdAt.fromNow()}`}
        </p>
      )}

      {isLast && message.status === MessageStatus.RECEIVED && (
        <p className="text-sm text-secondary-foreground">{`Đã nhận`}</p>
      )}

      {isLast && message.status === MessageStatus.SEEN && (
        <Tooltip label={`Đã xem lúc ${message.seenAt?.prettyFullDate()}`}>
          <span>
            <Avatar
              className="h-[14px] w-[14px]"
              src={receiver?.images[0]?.url}
            />
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default MessageSent;
