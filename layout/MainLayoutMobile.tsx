import { PropsWithChildren } from "react";
import SidebarMobile from "./SidebarMobile";

const MainLayoutMobile = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 pb-[52px]">{children}</div>
      <SidebarMobile />
    </div>
  );
};

export default MainLayoutMobile;
