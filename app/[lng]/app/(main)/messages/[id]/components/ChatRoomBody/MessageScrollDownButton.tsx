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
  return (
    <button
      className="hover:bg-pr sticky bottom-10 left-1/2 flex h-9 w-fit flex-shrink-0 -translate-x-1/2 items-center justify-center space-x-1 rounded-full bg-primary px-2 py-1 text-white"
      onClick={() => onScrollToEnd("smooth")}
    >
      <Avatar className="h-6 w-6" src={receiver?.images[0]?.url} />
      <p className="min-w-[24px]">
        {message.type === MessageType.Text
          ? message.text
          : `Đã gửi ${message.images?.length} ảnh`}
      </p>
    </button>
  );
};

export default MessageScrollDownButton;
