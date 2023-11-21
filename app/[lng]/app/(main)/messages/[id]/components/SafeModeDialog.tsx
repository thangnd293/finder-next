import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  useChangeSafeMode,
  useInvalidateConversationByID,
} from "@/service/conversation";
import React from "react";

interface SafeModeDialogProps {
  isEnableSafeMode?: boolean;
  isOpen: boolean;
  conversation: string;
  onClose: () => void;
}
const SafeModeDialog = ({
  isEnableSafeMode,
  isOpen,
  conversation,
  onClose,
}: SafeModeDialogProps) => {
  const invalidateConversationByID = useInvalidateConversationByID();

  const changeSafeMode = useChangeSafeMode({
    onSuccess: () => {
      invalidateConversationByID(conversation);
      onClose();
    },
  });

  const onSafeModeChange = () => {
    changeSafeMode.mutate({
      conversation,
      enable: !isEnableSafeMode,
    });
  };

  return (
    <Modal open={isOpen || changeSafeMode.isLoading} onOpenChange={onClose}>
      <Modal.Header withCloseButton>Chế độ an toàn</Modal.Header>
      <Modal.Body className="p-4">
        <p>
          Chế độ an toàn sẽ tự động phát hiện và làm mờ những hình ảnh có nội
          dung không phù hợp.
        </p>
        <p>Bạn có thể bật/tắt chế độ này bất cứ lúc nào.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ghost">Hủy</Button>
        <Button loading={changeSafeMode.isLoading} onClick={onSafeModeChange}>
          {isEnableSafeMode ? "Tắt" : "Bật"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SafeModeDialog;
