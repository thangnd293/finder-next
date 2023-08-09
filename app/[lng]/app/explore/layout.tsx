import MainLayout from "@/layout/main-layout";
import React, { PropsWithChildren } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function SettingLayout({ children }: PropsWithChildren) {
  return (
    <MainLayout
      withHeaderBorder
      renderSidebarContent={Sidebar}
      renderHeaderContent={Header}
    >
      {children}
    </MainLayout>
  );
}
