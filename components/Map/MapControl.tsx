import ActionIcon from "@/components/ActionIcon";
import Tooltip from "@/components/Tooltip";
import { DEFAULT_ZOOM } from "@/constant/map";
import useMapControl from "@/hooks/use-map-control";
import useStore from "@/store";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { MdOutlineMyLocation } from "react-icons/md";
import { useShallow } from "zustand/react/shallow";

const MapControl = () => {
  const { map, currentPosition, setCurrentPosition } = useStore(
    useShallow((state) => ({
      map: state.map,
      currentPosition: state.currentPosition,
      setCurrentPosition: state.setCurrentPosition,
    })),
  );

  const { onZoomIn, onZoomOut } = useMapControl(map);
  const onCurrentLocation = () => {
    if (!currentPosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const pos = {
          lat: latitude,
          lng: longitude,
        };
        setCurrentPosition(pos);
        map?.panTo(pos);
      });

      return;
    }

    map?.panTo(currentPosition);
    map?.setZoom(DEFAULT_ZOOM);
  };

  return (
    <div className="absolute bottom-2 right-2 flex flex-col gap-1">
      <ActionIcon
        className="bg-white shadow"
        title="Vị trí hiện tại"
        onClick={onCurrentLocation}
      >
        <MdOutlineMyLocation />
      </ActionIcon>

      <Tooltip label="Thu phóng">
        <div className="flex flex-col rounded-md border bg-white shadow">
          <ActionIcon className="border-none" onClick={onZoomIn}>
            <PlusIcon />
          </ActionIcon>
          <hr />
          <ActionIcon className="border-none" onClick={onZoomOut}>
            <MinusIcon />
          </ActionIcon>
        </div>
      </Tooltip>
    </div>
  );
};

export default MapControl;
