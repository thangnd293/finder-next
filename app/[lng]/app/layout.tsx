"use client";

import UpdateLocation from "@/components/UpdateLocation";
import LoadingScreen from "@/components/LoadingScreen";
import NotifyNewLiked from "@/components/NotifyNewLiked";
import Notification from "@/components/Notification";
import NotifyNewMatched from "@/components/NotifyNewMatched";
import useDetectUserFocusState from "@/hooks/use-detect-user-focus-state";
import useSocket from "@/hooks/use-socket";
import { useCurrentUser } from "@/service/user";
import { eraseCookie } from "@/utils/cookie";
import "@/utils/prototype";
import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import DialogConfirm from "./room/[room]/_comps/dialog-confirm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IS_DONE_GET_STARTED = 4;
export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const active = !isError && !!currentUser;

  useSocket(active);
  useDetectUserFocusState();

  if (isLoading) return <LoadingScreen />;

  if (isError || !currentUser) {
    eraseCookie("accessToken");
    redirect("/");
  }

  if (
    currentUser.stepStarted !== IS_DONE_GET_STARTED &&
    !pathname?.includes("/app/get-started")
  ) {
    redirect("/app/get-started");
  }

  if (
    currentUser.stepStarted === IS_DONE_GET_STARTED &&
    pathname?.includes("/app/get-started")
  ) {
    redirect("/app");
  }

  return (
    <>
      {children}
      <DialogConfirm />
      <Notification />
      <NotifyNewLiked />
      <NotifyNewMatched />
      <UpdateLocation />
      <ToastContainer />
    </>
  );
}
