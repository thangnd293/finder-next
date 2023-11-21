import { Message, MessageType } from "@/service/message";
import MessageImages from "./MessageImages";
import MessageText from "./MessageText";
import MessageCall from "./MessageCall";
import { decodeFromBase64 } from "@/utils/base64";

interface MessageContentProps {
  isSelf?: boolean;
  message: Message;
  className?: string;
  isEnableSafeMode?: boolean;
}

interface ICallMessage {
  userId: string;
  receiverIds: string[];
  startTime: string;
  endTime: string;
}

const MessageContent = ({
  isSelf = false,
  message,
  className,
  isEnableSafeMode,
}: MessageContentProps) => {
  const { type, text, images } = message;
  if (type === MessageType.Call) {
    const data = decodeFromBase64<ICallMessage>(text);
    return (
      <MessageCall
        isMiss={!Boolean(data.startTime)}
        isSelf={isSelf}
        startTime={data.startTime}
        endTime={data.endTime}
        className={className}
      />
    );
  }

  if (type === MessageType.Image) {
    return (
      <MessageImages
        className={className}
        images={images}
        isEnableSafeMode={isEnableSafeMode}
      />
    );
  }

  return <MessageText className={className} isSelf={isSelf} text={text} />;
};

export default MessageContent;
