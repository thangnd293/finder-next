"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import SidebarHeader from "@/layout/sidebar-header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MessageTab from "./ConversationTab";
import MatchedTab from "./MatchedTab";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "matched";

  const onValueChange = (value: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? []),
    );

    current.set("tab", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <SidebarHeader />
      <Tabs
        className="flex flex-1 flex-col overflow-hidden"
        value={currentTab}
        onValueChange={onValueChange}
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
};
