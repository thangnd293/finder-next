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
import { useState } from "react";
import ActionIcon from "@/components/ActionIcon";
import { BsChevronDown, BsListUl } from "react-icons/bs";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();

  const [isHidden, setIsHidden] = useState(isMobile);

  const { map, setPlaceDetail, searchResults } = useStore(
    useShallow((state) => ({
      map: state.map,
      setPlaceDetail: state.setPlaceDetail,
      searchResults: state.searchResults,
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

  if (isHidden)
    return (
      <button
        className={cn(
          "absolute bottom-32 right-3 flex items-center gap-2 rounded-md border bg-background px-4 py-2.5 text-sm text-primary shadow-xl",
          {
            "bottom-3": !!searchResults,
          },
        )}
        onClick={() => setIsHidden(false)}
      >
        <BsListUl />
        Địa điểm đã chọn{" "}
        {selectedPlaces.length > 0 && `(${selectedPlaces.length})`}
      </button>
    );

  return (
    <div className="flex h-screen w-full flex-shrink-0 flex-col overflow-hidden border-l md:flex md:w-[25vw] md:min-w-[314px] md:max-w-[408px]">
      <h2 className="relative border-b p-3 text-center text-lg font-semibold">
        <ActionIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 active:-translate-y-1/2"
          title="Ẩn danh sách địa điểm đã chọn"
          variant="ghost"
          onClick={() => setIsHidden(true)}
        >
          <BsChevronDown />
        </ActionIcon>
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
