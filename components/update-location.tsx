"use client";

import { useUpdateLocation } from "@/service/common";
import { useCurrentUser } from "@/service/user";
import React, { useEffect } from "react";

// const updateLocation =
export default function UpdateLocation() {
  const updateLocation = useUpdateLocation();
  const { userInfo } = useCurrentUser();

  console.log("userInfo", userInfo);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords }) => {
  //       updateLocation.mutate(
  //         {
  //           lat: coords.latitude,
  //           long: coords.longitude,
  //         },
  //         {
  //           onSettled: () => {
  //             console.log("onSettled");
  //           },
  //         },
  //       );
  //     },
  //     (error) => console.log("error", error),
  //   );
  // }, []);

  return null;
}
