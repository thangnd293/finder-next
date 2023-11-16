"use client";

import {
  DARK_STYLES,
  DEFAULT_LOCATION,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
} from "@/constant/map";
import useStore from "@/store";
import { Place } from "@/types/map";
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../Loader";
import MapControl from "./MapControl";
import SearchPlace from "./SearchPlace";
import SearchResult from "./SearchResult";
import { useTheme } from "next-themes";

const libraries: Libraries = ["places"];

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "roadmap",
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
};

interface MapProps {
  selectedPlaces: Place[];
  onSelectedPlacesChange: (places: Place[]) => void;
}
const Map = ({ selectedPlaces, onSelectedPlacesChange }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    language: "vi",
    libraries,
  });
  const { theme } = useTheme();

  const { setMap, reset, currentPosition } = useStore(
    useShallow((state) => ({
      setMap: state.setMap,
      reset: state.reset,
      currentPosition: state.currentPosition,
    })),
  );

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), [setMap]);
  const mapStyles = theme === "dark" ? DARK_STYLES : undefined;

  if (!isLoaded)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full min-h-screen relative"
      center={DEFAULT_LOCATION}
      zoom={DEFAULT_ZOOM}
      options={{ ...options, styles: mapStyles }}
      onLoad={onLoad}
      onUnmount={reset}
    >
      <MapControl />
      <SearchPlace />
      <SearchResult
        selectedPlaces={selectedPlaces}
        onSelectedPlacesChange={onSelectedPlacesChange}
      />
      {currentPosition && (
        <MarkerF
          position={currentPosition}
          icon={{
            url: "/images/current-position.png",
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 20),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
