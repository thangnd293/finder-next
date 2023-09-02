"use client";

import LocationIcon from "@/assets/icons/location-icon";
import Button from "@/components/Button";
import React from "react";

export default function LocationPermit() {
  const handleLocationPermit = () => {
    requestLocationPermission()
      .then((position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      })
      .catch((error) => {
        console.error("Error getting location:", error.message);
      });
  };
  return (
    <div className="flex flex-col items-center gap-4 pt-16">
      <LocationIcon width={160} />

      <h3 className="text-center text-2xl font-bold">
        Chúng tôi cần vị trí của bạn để hiển thị những người ở gần
      </h3>
      <p className="max-w-3xl text-center text-sm text-secondary-foreground">
        Bạn cần cấn cho Finder quyền truy cập vị trí của bạn để chúng tôi có thể
        cho bạn thấy những người tuyệt vời quanh khu vực của bạn.
      </p>

      <Button onClick={handleLocationPermit}>Cho phép truy cập vị trí</Button>
    </div>
  );
}

function requestLocationPermission(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
