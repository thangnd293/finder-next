import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { useDisclosure } from "@/hooks/use-disclosure";
import { RelationshipType } from "@/service/relationship";
import { useRelationship } from "@/service/relationship/hooks";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const LookingForSetting = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <div className="space-y-1">
        <Label>Đang tìm</Label>
        <button
          className="relative flex w-full items-center rounded-md border p-2.5 pr-10 text-left"
          onClick={open}
        >
          Người nói chuyện
          <ChevronDownIcon className="absolute right-2" />
        </button>
      </div>

      <LookingForSettingDialog isOpen={isOpen} onClose={close} />
    </>
  );
};

export default LookingForSetting;

interface LookingForSettingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookingForSettingDialog = ({
  isOpen,
  onClose,
}: LookingForSettingDialogProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data } = useRelationship(RelationshipType.LOOKING_FOR);
  console.log("selectedItems", selectedItems);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Header withCloseButton onOpenChange={onClose}>
        Bạn đang tìm kiếm gì?
      </Modal.Header>

      <Modal.Body className="space-y-2 p-6">
        {data?.results.map((relationship) => (
          <div
            key={relationship._id}
            className="flex items-center justify-between"
          >
            {relationship.name}{" "}
            <Checkbox
              checked={selectedItems.includes(relationship._id)}
              onCheckedChange={(value) => {
                if (value) {
                  setSelectedItems([...selectedItems, relationship._id]);
                } else {
                  setSelectedItems(
                    selectedItems.filter((item) => item !== relationship._id),
                  );
                }
              }}
            />
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="ghost">Hủy</Button>
        <Button>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};
