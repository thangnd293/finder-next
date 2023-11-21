import Avatar from "@/components/Avatar";
import { Message } from "@/service/message";
import { User } from "@/service/user";
import { cn } from "@/lib/utils";
import MessageContent from "./MessageContent";

interface MessageReceivedProps {
  sender?: User;
  message: Message;
  showAvatar?: boolean;
  isEnableSafeMode?: boolean;
}
const MessageReceived = ({
  sender,
  message,
  showAvatar = true,
  isEnableSafeMode,
}: MessageReceivedProps) => {
  return (
    <div className="message-wrapper received gap-1">
      {showAvatar && <Avatar size="sm" src={sender?.images?.[0]?.url} />}
      <MessageContent
        className={cn({
          "ml-9": !showAvatar,
        })}
        message={message}
        isEnableSafeMode={isEnableSafeMode}
      />
    </div>
  );
};

export default MessageReceived;
