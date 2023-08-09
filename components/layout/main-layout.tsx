import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface IMainLayoutProps {
  withHeaderBorder?: boolean;
  renderSidebarContent: () => JSX.Element;
  renderHeaderContent: () => JSX.Element;
}

export default function MainLayout({
  withHeaderBorder = false,
  children,
  renderSidebarContent,
  renderHeaderContent,
}: PropsWithChildren<IMainLayoutProps>) {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="flex max-h-screen w-[360px] flex-col border-r"
        role="side-bar"
      >
        {renderSidebarContent()}
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className={cn("h-20", withHeaderBorder && "border-b")}>
          {renderHeaderContent()}
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
