import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

interface ConfirmCancelProps {
  onCancel?: () => void;
}
const ConfirmCancel = ({ onCancel: _onCancel }: ConfirmCancelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onCancel = () => {
    _onCancel?.();
    onClose();
  };

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        Huỷ
      </Button>

      <Modal className="gap-2" size="xs" open={isOpen} onOpenChange={setIsOpen}>
        <div>
          <h2 className="text-lg font-semibold">Huỷ hành động?</h2>
          <p className="text-muted-foreground">
            Thao tác này không thể hoàn tác
          </p>
        </div>
        <Modal.Footer>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Huỷ
          </Button>
          <Button size="sm" onClick={onClose}>
            Quay lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmCancel;
