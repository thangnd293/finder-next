"use client";

import React from "react";
import { ROUTE } from "@/constant/route";
import { useUpdateLocation } from "@/service/user";
import { requestLocationPermission } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import RequestPermissionDialog from "@/components/RequestPermissionDialog";

const RequestPermission = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpenPermissionDialog, setIsOpenPermissionDialog] = useState(false);
  const updateLocation = useUpdateLocation();

  const handleLocationPermit = () => {
    setIsProcessing(true);

    requestLocationPermission()
      .then(({ coords: { latitude, longitude } }) => {
        updateLocation.mutate(
          {
            lat: latitude,
            long: longitude,
          },
          {
            onSuccess: () => {
              router.replace(ROUTE.HOME);
            },
          },
        );
      })
      .catch(() => setIsOpenPermissionDialog(true))
      .finally(() => setIsProcessing(false));
  };
  return (
    <>
      {" "}
      <Button loading={isProcessing} onClick={handleLocationPermit}>
        Cho phép truy cập vị trí
      </Button>
      <RequestPermissionDialog
        open={isOpenPermissionDialog}
        onOpenChange={setIsOpenPermissionDialog}
      />
    </>
  );
};

export default RequestPermission;
