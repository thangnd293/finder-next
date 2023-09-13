import { Message, MessageType } from "@/service/message";
import MessageImages from "./MessageImages";
import MessageText from "./MessageText";

interface MessageContentProps {
  isSelf?: boolean;
  message: Message;
  className?: string;
}

const MessageContent = ({
  isSelf = false,
  message,
  className,
}: MessageContentProps) => {
  const { type, text, images } = message;

  if (type === MessageType.Image) {
    return <MessageImages className={className} images={images} />;
  }

  return <MessageText className={className} isSelf={isSelf} text={text} />;
};

export default MessageContent;
