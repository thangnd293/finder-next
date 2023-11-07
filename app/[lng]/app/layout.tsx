"use client";

import CheckLocation from "@/components/CheckLocation";
import LoadingScreen from "@/components/LoadingScreen";
import Notification from "@/components/Notification";
import NotifyNewMatched from "@/components/NotifyNewMatched";
import { ROUTE } from "@/constant/route";
import useDetectUserFocusState from "@/hooks/use-detect-user-focus-state";
import useSocket from "@/hooks/use-socket";
import { useCurrentUser } from "@/service/user";
import { eraseCookie } from "@/utils/cookie";
import "@/utils/prototype";
import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogConfirm from "./room/[room]/_comps/dialog-confirm";

const IS_DONE_GET_STARTED = 4;
export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const active =
    !isError &&
    !!currentUser &&
    currentUser.stepStarted === IS_DONE_GET_STARTED &&
    !!currentUser.geoLocation;

  useSocket(active);
  useDetectUserFocusState();

  if (isLoading) return <LoadingScreen />;

  if (isError || !currentUser) {
    eraseCookie("accessToken");
    redirect("/");
  }

  if (
    currentUser.stepStarted !== IS_DONE_GET_STARTED &&
    !pathname?.includes(ROUTE.GET_STARTED)
  ) {
    redirect(ROUTE.GET_STARTED);
  }

  if (
    currentUser.stepStarted === IS_DONE_GET_STARTED &&
    !pathname?.includes(ROUTE.LOCATION_PERMISSION) &&
    !currentUser.geoLocation
  ) {
    redirect(ROUTE.LOCATION_PERMISSION);
  }

  if (
    currentUser.stepStarted === IS_DONE_GET_STARTED &&
    pathname?.includes(ROUTE.GET_STARTED)
  ) {
    redirect(ROUTE.HOME);
  }

  return (
    <>
      {children}
      <DialogConfirm />
      <Notification />
      {/* <NotifyNewLiked /> */}
      {/* <NotifyNewSuperLike /> */}
      <NotifyNewMatched />
      <ToastContainer />
      <CheckLocation />
    </>
  );
}
