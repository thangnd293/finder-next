import { useCallback } from "react";

const useMapControl = (map: google.maps.Map | null) => {
  const onZoomIn = useCallback(() => {
    const zoom = map?.getZoom();

    if (zoom) {
      map?.setZoom(zoom + 1);
    }
  }, [map]);

  const onZoomOut = useCallback(() => {
    const zoom = map?.getZoom();

    if (zoom) {
      map?.setZoom(zoom - 1);
    }
  }, [map]);

  return {
    onZoomIn,
    onZoomOut,
  };
};

export default useMapControl;
