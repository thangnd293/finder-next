import { PropsWithChildren } from "react";
import Sidebar from "./components/Sidebar";

export default function SettingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex max-h-screen flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
