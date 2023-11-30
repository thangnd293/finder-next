import SuperLikeIcon from "@/assets/icons/super-like-icon";
import CustomImage from "@/components/CustomImage";
import { cn } from "@/lib/utils";
import { Conversation } from "@/service/conversation";
import { useSeenNotification } from "@/service/notification";
import Link from "next/link";
import Card from "./Card";

interface MatchedCardProps extends Conversation {
  className?: string;
  notificationId?: string;
  isNew?: boolean;
}

const MatchedCard = ({
  _id,
  notificationId,
  user,
  isNew,
  className,
  type,
}: MatchedCardProps) => {
  const seenNotification = useSeenNotification();
  const isSuperLike = type === "Super like";

  const handleClick = () => {
    if (!isNew || !notificationId) return;

    seenNotification.mutate(notificationId);
  };

  return (
    <Card className={cn("relative", className)}>
      <Link href={`/app/messages/${_id}`} onClick={handleClick}>
        <CustomImage
          className="rounded-md object-cover object-center"
          fill
          image={user.images[0]}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div
          className="absolute bottom-0 left-0 h-2/5 w-full rounded-b-md"
          style={
            isSuperLike
              ? {
                  backgroundImage:
                    "linear-gradient(to top, rgb(71, 161, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                }
              : undefined
          }
        >
          <p className="text-shadow absolute bottom-0 left-0 flex w-full items-center overflow-hidden truncate p-1 text-sm font-bold text-white drop-shadow-2xl">
            <span className="flex-1 truncate">{user.name}</span>{" "}
            {isSuperLike && <SuperLikeIcon width={20} height={20} />}
          </p>
        </div>
        {isNew && (
          <div className="absolute right-1 top-1 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-white bg-primary shadow-sm" />
        )}
      </Link>
    </Card>
  );
};

export default MatchedCard;
