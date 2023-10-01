"use client";

import SiteInformationIcon from "@/assets/icons/site-information-icon";
import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { useCurrentUser, useUpdateLocation } from "@/service/user";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const LocationSetting = () => {
  const [isOpenPermissionDialog, setIsOpenPermissionDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: address } = useCurrentUser({
    select: (user) => user.address,
  });

  const updateLocation = useUpdateLocation();

  const handleUpdateLocation = () => {
    if (!navigator?.geolocation)
      console.log("Browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        updateLocation.mutate(
          {
            lat: latitude,
            long: longitude,
          },
          {
            onSettled: () => setIsLoading(false),
          },
        );
      },
      () => {
        setIsLoading(false);
        setIsOpenPermissionDialog(true);
      },
    );
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

interface RequestPermissionDialogProps
  extends Omit<React.ComponentProps<typeof Modal>, "children"> {}
const RequestPermissionDialog = (props: RequestPermissionDialogProps) => {
  return (
    <Modal className="gap-0 text-center" size="lg" {...props}>
      <SiteInformationIcon className="w-full" />
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">
          Chúng tôi cần quyền truy cập vào vị trí của bạn
        </h2>
        <p className="font-medium">
          Để cấp quyền, hãy làm theo hướng dẫn: 🔒 trên trình duyệt của bạn &gt;
          Location &gt; Allow
        </p>
        <div className="mx-auto w-fit">
          <Button onClick={() => props.onOpenChange(false)}>Đã hiểu</Button>
        </div>
      </div>
    </Modal>
  );
};
