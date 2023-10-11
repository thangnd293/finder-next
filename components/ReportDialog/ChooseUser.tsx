import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { useAllConversations } from "@/service/conversation";
import { Image, User } from "@/service/user";
import { CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { FormValues, StepProps } from ".";
import Container from "./Container";

interface ChooseUserProps extends StepProps {}

const ChooseUser = ({ onNext }: ChooseUserProps) => {
  const { conversations, isLoading } = useAllConversations(false);
  const { watch, setValue } = useFormContext<FormValues>();

  const users: User[] = conversations.map((conversation) => conversation.user);
  const target = watch("target");

  const handleChooseUser = (user: User) => {
    setValue("target", user);
  };

  return (
    <Container title="Báo cáo ai đó" isDisabled={!target} onNext={onNext}>
      <p className="text-center">
        Hãy cho chúng tôi biết người bạn muốn báo cáo. Dưới đây là các tương hợp
        gần đây của bạn.
      </p>

      <div className="flex w-full flex-col gap-3">
        {isLoading ? (
          <Spinner className="mx-auto h-3 w-3 shrink-0" />
        ) : (
          users?.map((user) => (
            <UserItem
              key={user._id}
              avatar={user.images?.[0]}
              name={user.name}
              isActive={target?._id === user._id}
              onClick={() => handleChooseUser(user)}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export default ChooseUser;

interface UserItemProps {
  avatar?: Image;
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

const UserItem = ({ avatar, name, isActive, onClick }: UserItemProps) => {
  return (
    <button
      className="flex w-full cursor-pointer items-center gap-3 rounded-sm p-1 hover:bg-background-50 "
      onClick={onClick}
    >
      <Avatar
        className={cn({
          "border-2 border-primary p-0.5": isActive,
        })}
        src={avatar?.url}
      />

      <p className="flex h-full flex-1 items-center justify-between border-b py-3.5 font-semibold">
        <span>{name}</span>
        {isActive && (
          <CheckIcon width={20} height={20} className="mr-3 text-primary" />
        )}
      </p>
    </button>
  );
};
