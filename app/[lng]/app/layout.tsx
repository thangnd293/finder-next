"use client";

import UpdateLocation from "@/components/UpdateLocation";
import { useCurrentUser } from "@/service/user";
import { eraseCookie } from "@/utils/cookie";
import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const IS_DONE_GET_STARTED = 4;
export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { currentUser, isLoading, isError } = useCurrentUser();

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-primary-100">
        Loading...
      </div>
    );

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
      {/* <ButtonLogout /> */}
      <UpdateLocation />
    </>
  );
}
