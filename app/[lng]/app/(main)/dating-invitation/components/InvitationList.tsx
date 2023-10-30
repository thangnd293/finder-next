"use client";

import FilterIcon from "@/assets/icons/filter-icon";
import ActionIcon from "@/components/ActionIcon";
import EmptyView from "@/components/EmptyView";
import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import ScrollArea from "@/components/ScrollArea";
import { useDisclosure } from "@/hooks/use-disclosure";
import { FilterScheduleArgs, useSchedules } from "@/service/schedule";
import { useCurrentUser } from "@/service/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterDialog, { FilterSchedule } from "./FilterDialog";
import InvitationCard from "./InvitationCard";
import InvitationDetailDialog from "./InvitationDetailDialog";
import SelfInvitationCard from "./SelfInvitationCard";

const InvitationList = () => {
  const searchParams = useSearchParams();
  const queryID = searchParams?.get("id");
  const router = useRouter();

  const { isOpen, close, open } = useDisclosure();

  const [selectedScheduleID, setSelectedScheduleID] = useState("");
  const [filter, setFilter] = useState<FilterSchedule>({});

  const {
    data: schedules,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useSchedules({
    size: "10",
    ...(filter as Partial<FilterScheduleArgs>),
  });
  const { data: currentUserID } = useCurrentUser({
    select: (user) => user._id,
  });

  useEffect(() => {
    if (queryID) setSelectedScheduleID(queryID ?? "");
  }, [queryID]);

  const onFilter = (filter: FilterSchedule) => {
    const payload = { ...filter };

    if (payload.sender === "all" || !payload.sender) delete payload.sender;
    if (payload.sender === "me") payload.sender = currentUserID;
    if (payload.status === "all" || !payload.status) delete payload.status;
    if (!payload.fromDate) delete payload.fromDate;
    if (!payload.toDate) delete payload.toDate;

    setFilter(payload);
  };

  const onCloseDetailDialog = () => {
    setSelectedScheduleID("");
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete("id");
    router.replace(`/app/dating-invitation?${params.toString()}`);
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <ScrollArea className="flex-1">
      <div className="mt-8 p-11">
        <ActionIcon className="w-12 rounded-full border-2" onClick={open}>
          <FilterIcon />
        </ActionIcon>

        {schedules.pages.length > 0 && (
          <div className="mt-7 grid grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {schedules.pages.map((schedule) => {
              const isSelf = schedule.sender._id === currentUserID;

              const Component = isSelf ? SelfInvitationCard : InvitationCard;
              return (
                <Component
                  key={schedule._id}
                  onClick={() => setSelectedScheduleID(schedule._id)}
                  {...schedule}
                />
              );
            })}
          </div>
        )}

        {!schedules.pages.length && <EmptyView className="min-h-[50vh]" />}
      </div>

      {isOpen && (
        <FilterDialog filter={filter} onFilter={onFilter} close={close} />
      )}

      <InvitationDetailDialog
        selectedScheduleID={selectedScheduleID}
        close={onCloseDetailDialog}
      />
    </ScrollArea>
  );
};

export default InvitationList;
