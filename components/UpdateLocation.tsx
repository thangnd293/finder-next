"use client";

import { useUpdateLocation } from "@/service/user";
import { useEffect } from "react";

// const updateLocation =
export default function UpdateLocation() {
  const updateLocation = useUpdateLocation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        updateLocation.mutate(
          {
            lat: coords.latitude,
            long: coords.longitude,
          },
          {
            onSettled: () => {
              console.log("onSettled");
            },
          },
        );
      },
      (error) => console.log("error", error),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
