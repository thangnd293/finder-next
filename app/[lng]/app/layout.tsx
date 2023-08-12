import UpdateLocation from "@/components/update-location";
import React, { PropsWithChildren } from "react";
import ButtonLogout from "../log-out";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <UpdateLocation />
      <ButtonLogout />
    </>
  );
}
