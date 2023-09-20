import SidebarHeader from "@/layout/sidebar-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import MatchedTab from "./MatchedTab";
import MessageTab from "./MessageTab";

export default function Sidebar() {
  return (
    <>
      <SidebarHeader />
      <Tabs
        className="flex flex-1 flex-col overflow-hidden"
        defaultValue="matched"
      >
        <TabsList className="w-full space-x-6 px-4">
          <TabsTrigger value="matched">Tương hợp</TabsTrigger>
          <TabsTrigger value="message">Nhắn tin</TabsTrigger>
        </TabsList>
        <MatchedTab />
        <MessageTab />
      </Tabs>
    </>
  );
}
