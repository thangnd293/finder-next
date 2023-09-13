import React, { PropsWithChildren } from "react";
import { Sidebar } from "./components/Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="flex max-h-screen w-[360px] flex-col border-r"
        role="side-bar"
      >
        <Sidebar />
      </div>
      <div className="flex max-h-screen flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
