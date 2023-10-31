import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import { Place } from "@/types/map";
import { useState } from "react";
import AIRecommend from "../AIRecommend";
import ScheduleEditor from "./ScheduleEditor";

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleDialog = ({ isOpen, onClose }: ScheduleDialogProps) => {
  const [isShowScheduleEditor, setIsShowScheduleEditor] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

  const handleClose = () => {
    onClose();
    setIsShowScheduleEditor(false);
  };

  const onOpenScheduleEditor = () => setIsShowScheduleEditor(true);

  return (
    <Modal
      className={cn("p-4", {
        "left-0 top-0 !m-0 !h-screen !w-screen overflow-hidden !rounded-none !p-0":
          isShowScheduleEditor,
      })}
      open={isOpen}
      onOpenChange={onClose}
      size="lg"
      hasAnimate={!isShowScheduleEditor}
      withCloseButton={false}
      closeOnEscape={!isShowScheduleEditor}
    >
      {!isShowScheduleEditor && (
        <AIRecommend
          onSelectedPlacesChange={setSelectedPlaces}
          onOpenScheduleEditor={onOpenScheduleEditor}
        />
      )}

      {isShowScheduleEditor && (
        <ScheduleEditor
          selectedPlaces={selectedPlaces}
          onCloseEditor={handleClose}
          onSelectedPlacesChange={setSelectedPlaces}
        />
      )}
    </Modal>
  );
};

export default ScheduleDialog;
