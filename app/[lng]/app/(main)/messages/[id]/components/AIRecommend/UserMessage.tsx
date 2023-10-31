import ActionIcon from "@/components/ActionIcon";
import Avatar from "@/components/Avatar";
import { useCurrentUser } from "@/service/user";
import { ReactNode } from "react";
import { BiEdit } from "react-icons/bi";

interface UserMessageProps {
  message: string;
  isEditing?: boolean;
  disabled?: boolean;
  EditSection?: ReactNode;
  onEdit?: () => void;
  onCancelEdit?: () => void;
}
 const UserMessage = ({
  message,
  isEditing,
  disabled,
  EditSection,
  onEdit,
}: UserMessageProps) => {
  const { data: userAvatar } = useCurrentUser({
    select: (user) => user.images[0]?.url,
  });

  return (
    <div className="group relative flex items-center gap-2 p-1.5">
      <Avatar className="h-10 w-10 self-start" src={userAvatar} />
      <div className="flex-1">
        {isEditing ? EditSection : <p className="text-sm">{message}</p>}
      </div>

      {!isEditing && onEdit && (
        <ActionIcon
          className="absolute right-2 hidden hover:text-primary group-hover:flex"
          variant="transparent"
          disabled={disabled}
          onClick={onEdit}
        >
          <BiEdit />
        </ActionIcon>
      )}
    </div>
  );
};

export default UserMessage;
