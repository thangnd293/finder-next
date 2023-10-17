import Button from "@/components/Button";
import ConfirmCancel from "@/components/ConfirmCancel";
import useStore from "@/store";
import { Place } from "@/types/map";
import { getDetails } from "@/utils/google-map";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_ZOOM, LNG_PADDING } from "@/constant/map";
import PlaceItem from "./PlaceItem";

interface SelectedPlaceProps {
  selectedPlaces: Place[];
  onSelectedPlacesChange: (places: Place[]) => void;
  onCloseEditor: () => void;
  onOpenDetailDialog?: () => void;
}
const SelectedPlaces = ({
  selectedPlaces,
  onSelectedPlacesChange,
  onCloseEditor,
  onOpenDetailDialog,
}: SelectedPlaceProps) => {
  const { map, setPlaceDetail } = useStore(
    useShallow((state) => ({
      map: state.map,
      setPlaceDetail: state.setPlaceDetail,
    })),
  );

  const onPlaceClick = (place_id: string) => {
    if (!map) return;

    getDetails(map, place_id, (result) => {
      if (!result) return;

      setPlaceDetail(result);
      const lat = result.geometry?.location?.lat();
      const lng = result.geometry?.location?.lng();
      if (!lat || !lng) return;

      map.panTo({
        lat,
        lng: lng - LNG_PADDING,
      });
      map.setZoom(DEFAULT_ZOOM);
    });
  };

  const onRemovePlace = (place_id: string) => {
    const newPlaces = selectedPlaces.filter((p) => p.place_id !== place_id);
    onSelectedPlacesChange(newPlaces);
  };

  return (
    <div className="flex h-screen w-[25vw] max-w-[408px] flex-shrink-0 flex-col overflow-hidden border-l">
      <h2 className="border-b p-3 text-center text-lg font-semibold">
        Địa điểm đã chọn
      </h2>
      <div className="w-full flex-1 overflow-auto py-1">
        <ScrollArea className="h-full w-full">
          {selectedPlaces.length === 0 && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <Image
                src="/images/empty.png"
                alt="empty"
                width={100}
                height={100}
              />
              <p className="px-3 text-center text-muted-foreground">
                Chọn địa điểm bạn muốn đi cùng người ấy
              </p>
            </div>
          )}

          {selectedPlaces.map((place) => (
            <PlaceItem
              key={place.place_id}
              {...place}
              onRemovePlace={onRemovePlace}
              onPlaceClick={onPlaceClick}
            />
          ))}
        </ScrollArea>
      </div>
      <div className="flex w-full justify-end gap-2 border-t p-3">
        <ConfirmCancel onCancel={onCloseEditor} />
        <Button onClick={onOpenDetailDialog}>Tiếp tục</Button>
      </div>
    </div>
  );
};

export default SelectedPlaces;
