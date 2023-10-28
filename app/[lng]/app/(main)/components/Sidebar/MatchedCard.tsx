import CustomImage from "@/components/CustomImage";
import { Conversation } from "@/service/conversation";
import {
  NotificationStatus,
  NotificationType,
  useInvalidateAllNotifications,
  useUpdateStatus
} from "@/service/notification";
import Link from "next/link";
import Card from "./Card";

interface MatchedCardProps extends Conversation {
  notificationId?: string;
  isNew?: boolean;
}

const MatchedCard = ({
  _id,
  notificationId,
  user,
  isNew,
}: MatchedCardProps) => {
  const updateStatus = useUpdateStatus();
  const invalidateAllNotifications = useInvalidateAllNotifications();

  const handleClick = () => {
    if (!isNew || !notificationId) return;

    updateStatus.mutate(
      {
        id: notificationId,
        notification: {
          status: NotificationStatus.Seen,
        },
      },
      {
        onSuccess: () => {
          invalidateAllNotifications(NotificationType.Matched);
        },
      },
    );
  };

  return (
    <Link href={`/app/messages/${_id}`} onClick={handleClick}>
      <Card>
        <CustomImage
          className="rounded-md object-cover object-center"
          fill
          image={user.images[0]}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <p className="text-shadow absolute bottom-0 left-0 w-full overflow-hidden truncate p-1 text-sm font-bold text-white drop-shadow-2xl">
          {user.name}
        </p>

        {isNew && (
          <div className="absolute right-1 top-1 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-white bg-primary shadow-sm" />
        )}
      </Card>
    </Link>
  );
};

export default MatchedCard;
