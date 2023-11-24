import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import { Place } from "@/types/map";
import { useState } from "react";
import AIRecommend from "../AIRecommend";
import ScheduleEditor from "./ScheduleEditor";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleDialog = ({ isOpen, onClose }: ScheduleDialogProps) => {
  const isMobile = useIsMobile();

  const [isShowScheduleEditor, setIsShowScheduleEditor] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

  const handleClose = () => {
    onClose();
    setIsShowScheduleEditor(false);
  };

  const onOpenScheduleEditor = () => setIsShowScheduleEditor(true);

  return (
    <Modal
      className={cn("")}
      open={isOpen}
      onOpenChange={onClose}
      size={isShowScheduleEditor ? "full" : "lg"}
      hasAnimate={!isShowScheduleEditor}
      closeOnEscape={!isShowScheduleEditor}
    >
      {!isShowScheduleEditor && (
        <>
          <Modal.Header withCloseButton>Finder bot</Modal.Header>
          <Modal.Body className="p-4 md:overflow-hidden">
            <AIRecommend
              onSelectedPlacesChange={setSelectedPlaces}
              onOpenScheduleEditor={onOpenScheduleEditor}
            />
          </Modal.Body>
        </>
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
