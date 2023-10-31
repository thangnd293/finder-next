import React, { PropsWithChildren } from "react";
import { Sidebar } from "./components/Sidebar";
import { checkMobileDevice } from "@/utils/check-mobile-device";
import MainLayoutMobile from "@/layout/MainLayoutMobile";

export default function MainLayout({ children }: PropsWithChildren) {
  const isMobileDevice = checkMobileDevice();

  if (isMobileDevice) {
    return <MainLayoutMobile>{children}</MainLayoutMobile>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden max-h-screen w-1/4 max-w-[360px] flex-col border-r lg:flex"
        role="side-bar"
      >
        <Sidebar />
      </div>
      <div className="flex max-h-screen flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
