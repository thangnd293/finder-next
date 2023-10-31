"use client";

import { DEFAULT_LOCATION, DEFAULT_ZOOM } from "@/constant/map";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  GoogleMap,
  InfoWindow,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import ActionIcon from "./ActionIcon";
import useMapControl from "@/hooks/use-map-control";

const libraries: Libraries = ["places"];

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "roadmap",
  clickableIcons: false,
};

interface LocationPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}
const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    language: "vi",
    libraries,
  });

  const { onZoomIn, onZoomOut } = useMapControl(map);

  const onMapLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onMapUnmount = useCallback(() => setMap(null), []);

  const onMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const address = (await getAddressFromLatLng(e.latLng)) ?? "";
    onChange?.(address);
  }, []);

  const onCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const pos: google.maps.LatLngLiteral = {
        lat: latitude,
        lng: longitude,
      };
      const address = (await getAddressFromLatLng(pos)) ?? "";
      onChange?.(address);
    });
  };

  useEffect(() => {
    if (!value) return;

    const service = new google.maps.Geocoder();
    service.geocode(
      {
        address: value,
      },
      (results, status) => {
        if (status !== "OK" || !results) return;

        const place = results[0];
        if (!place) return;

        const bounds = place.geometry?.bounds;
        const latlng = place.geometry?.location;

        if (!bounds) return;

        setSelectedLocation(latlng);

        map?.fitBounds(place.geometry.viewport);
      },
    );
  }, [value, isLoaded, map]);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full relative"
      center={DEFAULT_LOCATION}
      zoom={DEFAULT_ZOOM}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
    >
      <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2.5 rounded-xl border bg-background p-1.5 shadow">
        <ActionIcon onClick={onZoomIn}>
          <PlusIcon />
        </ActionIcon>

        <ActionIcon onClick={onZoomOut}>
          <MinusIcon />
        </ActionIcon>

        <ActionIcon onClick={onCurrentLocation}>
          <MdOutlineMyLocation />
        </ActionIcon>
      </div>
      {selectedLocation && (
        <InfoWindow position={selectedLocation}>
          <div className="text-md rounded-sm bg-background p-2 font-normal">
            Hẹn hò tại {value}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default LocationPicker;

const getAddressFromLatLng = async (
  latLng: google.maps.LatLng | google.maps.LatLngLiteral,
) => {
  const service = new google.maps.Geocoder();
  const { results } = await service.geocode({
    location: latLng,
  });

  const place = results[0];
  if (!place) return;

  const address = place.address_components
    .slice(-3, -1)
    .map((item) => item.long_name)
    .join(", ");

  return address;
};
