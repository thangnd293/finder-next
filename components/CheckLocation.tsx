"use client";

import { ROUTE } from "@/constant/route";
import { useUpdateLocation } from "@/service/user";
import { requestLocationPermission } from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { useEffectOnce } from "usehooks-ts";

export default function CheckLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const updateLocation = useUpdateLocation();

  useEffectOnce(() => {
    if (
      pathname?.includes(ROUTE.LOCATION_PERMISSION) ||
      pathname?.includes(ROUTE.GET_STARTED)
    )
      return;

    requestLocationPermission()
      .then(({ coords: { latitude, longitude } }) =>
        updateLocation.mutate({
          lat: latitude,
          long: longitude,
        }),
      )
      .catch(() => {
        router.push(ROUTE.LOCATION_PERMISSION);
      });
  });

  return null;
}
