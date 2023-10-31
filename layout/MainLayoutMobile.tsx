import { PropsWithChildren } from "react";
import SidebarMobile from "./SidebarMobile";

const MainLayoutMobile = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative w-full">
      <div className="h-screen pb-[52px]">{children}</div>
      <SidebarMobile />
    </div>
  );
};

export default MainLayoutMobile;
