"use client";

import ActionIcon from "@/components/ActionIcon";
import Label from "@/components/Label";
import RequestPermissionDialog from "@/components/RequestPermissionDialog";
import { useCurrentUser, useUpdateLocation } from "@/service/user";
import { requestLocationPermission } from "@/utils/helper";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const LocationSetting = () => {
  const [isOpenPermissionDialog, setIsOpenPermissionDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: address } = useCurrentUser({
    select: (user) => user.address,
  });

  const updateLocation = useUpdateLocation();

  const handleUpdateLocation = () => {
    requestLocationPermission()
      .then(({ coords: { latitude, longitude } }) =>
        updateLocation.mutate(
          {
            lat: latitude,
            long: longitude,
          },
          {
            onSettled: () => setIsLoading(false),
          },
        ),
      )
      .catch(() => {
        setIsLoading(false);
        setIsOpenPermissionDialog(true);
      });
  };

  return (
    <>
      <div className="w-full space-y-1.5">
        <Label className="px-6 text-base text-black">Vị trí hiện tại</Label>

        <div className="flex items-center justify-between rounded-full border px-6 py-1">
          <span>{address?.province}</span>
          <ActionIcon
            variant="transparent"
            onClick={handleUpdateLocation}
            isLoading={isLoading}
          >
            <ReloadIcon />
          </ActionIcon>
        </div>
      </div>

      <RequestPermissionDialog
        open={isOpenPermissionDialog}
        onOpenChange={setIsOpenPermissionDialog}
      />
    </>
  );
};

export default LocationSetting;
