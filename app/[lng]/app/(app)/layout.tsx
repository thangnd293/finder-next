import React, { PropsWithChildren } from "react";
import Sidebar from "./components/sidebar";
import MainLayout from "@/layout/main-layout";
import Header from "./components/header";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <MainLayout renderSidebarContent={Sidebar} renderHeaderContent={Header}>
      {children}
    </MainLayout>
  );
}
