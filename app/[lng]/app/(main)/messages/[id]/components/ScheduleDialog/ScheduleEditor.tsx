import Map from "@/components/Map";
import { Place } from "@/types/map";
import { useState } from "react";
import SelectedPlaces from "./SelectedPlaces";
import CreateScheduleDialog from "./CreateScheduleDialog";

interface ScheduleEditorProps {
  selectedPlaces: Place[];
  onSelectedPlacesChange: (places: Place[]) => void;
  onCloseEditor: () => void;
}

const ScheduleEditor = ({
  selectedPlaces,
  onSelectedPlacesChange,
  onCloseEditor,
}: ScheduleEditorProps) => {
  const [isShowDetailDialog, setIsShowDetailDialog] = useState(false);

  const onCreateDone = () => {
    setIsShowDetailDialog(false);
    onCloseEditor();
  };

  return (
    <>
      <div className="flex h-screen w-full">
        <Map
          selectedPlaces={selectedPlaces}
          onSelectedPlacesChange={onSelectedPlacesChange}
        />
        <SelectedPlaces
          selectedPlaces={selectedPlaces}
          onSelectedPlacesChange={onSelectedPlacesChange}
          onCloseEditor={onCloseEditor}
          onOpenDetailDialog={() => setIsShowDetailDialog(true)}
        />
      </div>
      {isShowDetailDialog && (
        <CreateScheduleDialog
          selectedPlaces={selectedPlaces}
          onClose={() => setIsShowDetailDialog(false)}
          onCreateDone={onCreateDone}
        />
      )}
    </>
  );
};

export default ScheduleEditor;
