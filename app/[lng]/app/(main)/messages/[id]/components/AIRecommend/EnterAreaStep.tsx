import Button from "@/components/Button";
import LocationPicker from "@/components/LocationPicker";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

interface EnterAreaStepProps {
  isEditing?: boolean;
  value: string;
  onChange: (area: string) => void;
  onCancel?: () => void;
}

const EnterAreaStep = ({
  isEditing,
  value,
  onChange,
  onCancel,
}: EnterAreaStepProps) => {
  const [isOpenLocationPicker, setIsOpenLocationPicker] = useState(false);

  const onOpenLocationPicker = () => setIsOpenLocationPicker(true);
  const onCloseLocationPicker = () => setIsOpenLocationPicker(false);

  return (
    <>
      {isEditing ? (
        <div className="w-full">
          <p className="text-sm">{value}</p>

          <div className="ml-auto w-fit">
            <Button variant="ghost" size="xs" onClick={onCancel}>
              Huỷ
            </Button>
            <Button size="xs" onClick={onOpenLocationPicker}>
              Chọn khu vực
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-center gap-2 pt-4">
          <Button
            className="rounded-full"
            variant="outline"
            size="xs"
            onClick={onOpenLocationPicker}
          >
            Chọn khu vực
          </Button>
        </div>
      )}

      {isOpenLocationPicker && (
        <LocationPickerDialog
          value={value}
          onChange={onChange}
          onClose={onCloseLocationPicker}
        />
      )}
    </>
  );
};

export default EnterAreaStep;

interface LocationPickerDialogProps {
  value?: string;
  onChange?: (value: string) => void;
  onClose: () => void;
}
const LocationPickerDialog = ({
  value,
  onChange,
  onClose,
}: LocationPickerDialogProps) => {
  const [location, setLocation] = useState(value ?? "");

  useEffect(() => {
    setLocation(value ?? "");
  }, [value]);

  const onSave = () => {
    onChange?.(location);
    onClose();
  };

  return (
    <Modal
      className="!inset-0 !h-[calc(100vh-64px)]"
      size="xl"
      withCloseButton={false}
      withOverlay={false}
      onOpenChange={onClose}
    >
      <h1 className="text-center text-lg font-semibold">Chọn khu vực</h1>
      <LocationPicker value={location} onChange={setLocation} />

      <Modal.Footer>
        <Button variant="ghost" onClick={onClose}>
          Huỷ
        </Button>
        <Button disabled={!location} onClick={onSave}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
