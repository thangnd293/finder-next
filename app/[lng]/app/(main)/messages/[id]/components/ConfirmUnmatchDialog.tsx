import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ROUTE } from "@/constant/route";
import { useUnmatch } from "@/service/action/hooks";
import {
  useConversationByID,
  useInvalidateAllConversations,
} from "@/service/conversation";
import { User } from "@/service/user";
import { useRouter } from "next/navigation";
import React from "react";

interface ConfirmUnmatchDialogProps {
  conversation: string;
  user: User;
  isOpen: boolean;
  onClose: () => void;
}
const ConfirmUnmatchDialog = ({
  conversation,
  isOpen,
  user,
  onClose,
}: ConfirmUnmatchDialogProps) => {
  const { data } = useConversationByID(conversation);
  const invalidateAllConversation = useInvalidateAllConversations();
  const router = useRouter();

  const unmatch = useUnmatch({
    onSuccess: () => {
      onClose();
      router.replace(ROUTE.HOME);
      invalidateAllConversation(!!data?.lastMessage);
    },
  });

  const onUnmatch = () => {
    unmatch.mutate(user._id);
  };

  return (
    <Modal size="sm" open={isOpen || unmatch.isLoading} onOpenChange={onClose}>
      <Modal.Header withCloseButton onOpenChange={onClose}>
        Hủy ghép đôi
      </Modal.Header>
      <Modal.Body className="p-6">
        Bạn có chắc chắn muốn hủy ghép đôi với người này không? Hành động này
        không thể hoàn tác.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ghost" onClick={onClose}>
          Quay lại
        </Button>
        <Button loading={unmatch.isLoading} onClick={onUnmatch}>
          Hủy ghép đôi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmUnmatchDialog;
