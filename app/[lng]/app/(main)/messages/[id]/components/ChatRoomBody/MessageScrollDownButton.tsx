import Avatar from "@/components/Avatar";
import { Message, MessageType } from "@/service/message";
import { User } from "@/service/user";

interface MessageScrollDownButtonProps {
  receiver?: User;
  message: Message;
  onScrollToEnd: (behavior?: ScrollBehavior) => void;
}

const MessageScrollDownButton = ({
  receiver,
  message,
  onScrollToEnd,
}: MessageScrollDownButtonProps) => {
  const getMessageText = () => {
    if (message.type === MessageType.Text) return message.text;
    if (message.type === MessageType.Image)
      return `Đã gửi ${message.images?.length} ảnh`;
    if (message.type === MessageType.Call) return "Đã gọi video";
    if (message.type === MessageType.Missed) return "Cuộc gọi nhỡ";
  };
  return (
    <button
      className="hover:bg-pr sticky bottom-10 left-1/2 flex h-9 w-fit flex-shrink-0 -translate-x-1/2 items-center justify-center space-x-1 rounded-full bg-primary px-2 py-1 text-white"
      onClick={() => onScrollToEnd("smooth")}
    >
      <Avatar className="h-6 w-6" src={receiver?.images[0]?.url} />
      <p className="min-w-[24px]">{getMessageText()}</p>
    </button>
  );
};

export default MessageScrollDownButton;
