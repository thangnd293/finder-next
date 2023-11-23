"use client";

import ActionIcon from "@/components/ActionIcon";
import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import Modal from "@/components/Modal";
import { MobileUserCard } from "@/components/UserCard/MobileUserCard";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { useReceiver } from "@/service/conversation";
import { BsXLg } from "react-icons/bs";

interface ProfileSidebarProps {
  conversation: string;
  onCloseSidebar: () => void;
}
const ProfileSidebar = ({
  conversation: conversationID,
  onCloseSidebar,
}: ProfileSidebarProps) => {
  const { receiver, isError, isLoading } = useReceiver(conversationID);
  const isMobile = useIsMobile();
  if (isLoading)
    return (
      <div className="flex h-full w-80 items-center justify-center">
        <LoadingView />
      </div>
    );

  if (isError || !receiver)
    return (
      <div className="flex h-full w-80 items-center justify-center">
        <ErrorView className="px-10" imageSize={128} />
      </div>
    );

  const Container = isMobile ? Modal : "div";
  return (
    <Container
      className={cn("relative h-full", {
        "w-80": !isMobile,
        "p-0": isMobile,
      })}
      onOpenChange={onCloseSidebar}
    >
      {!isMobile && (
        <ActionIcon
          className="absolute right-3 top-2 z-10 text-white drop-shadow"
          variant="transparent"
          onClick={onCloseSidebar}
        >
          <BsXLg size={22} />
        </ActionIcon>
      )}

      <MobileUserCard user={receiver} />
    </Container>
  );
};

export default ProfileSidebar;
