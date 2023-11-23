import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import { useDisclosure } from "@/hooks/use-disclosure";
import {
  useChangeSafeMode,
  useInvalidateConversationByID,
  useSafeModeStatus,
} from "@/service/conversation";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { BsXLg } from "react-icons/bs";

const SafeModeAlert = () => {
  const { id } = useParams() as {
    id: string;
  };
  const { isOpen, close, open } = useDisclosure(true);
  const { isEnableSafeMode } = useSafeModeStatus(id);
  const invalidateConversationByID = useInvalidateConversationByID();

  const changeSafeMode = useChangeSafeMode({
    onSuccess: () => {
      invalidateConversationByID(id);
    },
  });

  useEffect(() => {
    if (isEnableSafeMode) open();
  }, [isEnableSafeMode]);

  const onDisableSafeMode = () => {
    changeSafeMode.mutate({
      conversation: id,
      enable: false,
    });
  };

  return (
    <>
      {isEnableSafeMode && isOpen && (
        <div className="sticky left-0 top-0 z-10 flex items-center gap-1 border-b bg-background px-3 py-2 pr-10 text-sm md:gap-3">
          Chế độ an toàn đang bật trong cuộc trò chuyện này{" "}
          <Button size="sm" onClick={onDisableSafeMode}>
            Tắt
          </Button>
          <ActionIcon
            className="absolute right-1 rounded-full md:right-3"
            variant="ghost"
            onClick={close}
          >
            <BsXLg />
          </ActionIcon>
        </div>
      )}
    </>
  );
};

export default SafeModeAlert;
