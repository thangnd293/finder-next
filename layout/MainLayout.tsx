import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface MainLayoutProps {
  withHeaderBorder?: boolean;
  renderSidebarContent?: () => JSX.Element;
  renderHeaderContent: () => JSX.Element;
}

const MainLayout = ({
  withHeaderBorder = true,
  children,
  renderSidebarContent,
  renderHeaderContent,
}: PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className="flex h-screen w-full">
      {renderSidebarContent && (
        <div
          className="flex max-h-screen w-18 max-w-[400px] flex-col border-r md:w-[25vw] md:min-w-[260px]"
          role="side-bar"
        >
          {renderSidebarContent()}
        </div>
      )}
      <div className="flex h-screen flex-1 flex-col">
        <header
          className={cn(
            "relative flex h-18 flex-shrink-0 items-center justify-center align-middle md:h-20",
            withHeaderBorder && "border-b",
          )}
        >
          {renderHeaderContent()}
        </header>

        <main className="flex max-h-full w-full flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
