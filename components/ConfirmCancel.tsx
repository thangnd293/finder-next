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

      <Modal
        className="!h-fit w-fit gap-2 rounded-md p-6"
        size="xs"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <h1 className="text-center text-lg font-extrabold md:text-xl">
          Huỷ hành động?
        </h1>

        <div className="px-4 py-2">Thao tác này sẽ không thể hoàn tác</div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Huỷ
          </Button>
          <Button size="sm" onClick={onClose}>
            Quay lại
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmCancel;
