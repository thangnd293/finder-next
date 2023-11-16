import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { type Conversation } from "@/service/conversation";
import { MessageStatus, MessageType } from "@/service/message";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ConversationProps extends Conversation {}

const Conversation = ({ _id, user, lastMessage }: ConversationProps) => {
  const pathname = usePathname();

  const isTyping = false;
  const isActive = pathname?.includes(_id);
  const isLastMessageFromMe = lastMessage?.sender !== user._id;
  const isUnread =
    !isLastMessageFromMe && lastMessage.status !== MessageStatus.SEEN;

  const getSubject = () => {
    if (isLastMessageFromMe) return "Bạn";

    if (lastMessage.type === MessageType.Text) return "";

    return user.name;
  };

  const getMessageDescription = () => {
    const subject = getSubject();

    if (lastMessage.type === MessageType.Text) {
      return `${subject}${isLastMessageFromMe ? ": " : " "}${lastMessage.text}`;
    }

    if (lastMessage.type === MessageType.Call) {
      if (isLastMessageFromMe) return `Bạn đã gọi cho ${user.name}`;
      return `${user.name} đã gọi cho bạn`;
    }

    if (lastMessage.status === MessageStatus.SENDING) {
      return `${subject} đang gửi ${lastMessage?.images?.length} ảnh`;
    }

    return `${subject} đã gửi ${lastMessage?.images?.length} ảnh`;
  };

  return (
    <Link className="block" href={`/app/messages/${_id}?tab=message`}>
      <div
        className={cn(
          "relative flex items-center space-x-2.5 rounded-md py-3 pl-6 pr-12 hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive && "bg-gray-100 dark:bg-gray-800",
        )}
      >
        <Avatar
          className="block h-12 w-12 flex-shrink-0 rounded-full"
          fallback={user.name}
          src={user.images[0]?.url}
        />

        <div className="h-fit space-y-1 overflow-hidden">
          <p className="flex items-center space-x-1 text-sm font-medium">
            <span className="flex-1 truncate">{user.name}</span>
            {isTyping && (
              <span className="text-xs text-primary-500">Đang nhập...</span>
            )}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <p
              className={cn(
                "flex-1 truncate text-secondary-foreground",
                isUnread && "font-semibold text-foreground",
              )}
            >
              {getMessageDescription()}
            </p>

            <span
              className="inline-block h-1 w-1 rounded-full bg-secondary-foreground"
              role="dot"
            />
            <span className="text-secondary-foreground">
              {lastMessage.createdAt.fromNow()}
            </span>
          </div>
        </div>

        {isUnread && (
          <div
            role="unseen-signal"
            className="absolute right-6 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary-500 text-[12px] text-white"
          />
        )}

        {isLastMessageFromMe && lastMessage.status === MessageStatus.SEEN && (
          <Avatar
            className="absolute right-6 h-3.5 w-3.5"
            src={user.images[0]?.url}
          />
        )}
      </div>
    </Link>
  );
};

export default Conversation;
