"use client";

import ActionIcon from "@/components/ActionIcon";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useCurrentUser } from "@/service/user";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { BsPlusLg } from "react-icons/bs";
import SchoolSettingDialog from "./SchoolSettingDialog";

const SchoolSetting = () => {
  const { isOpen, open, close } = useDisclosure();

  const { data: school } = useCurrentUser({
    select: (user) => user.school,
  });

  return (
    <>
      {!school ? (
        <button
          className="flex w-full items-center gap-2 rounded-full border px-6 py-2.5 transition-[border] hover:border-primary hover:text-primary"
          onClick={open}
        >
          <BsPlusLg /> Thêm học vấn
        </button>
      ) : (
        <div>
          <p className="px-6 font-medium text-secondary-foreground">Học vấn</p>
          <div className="group relative flex w-full items-center gap-2 rounded-full border bg-background py-2.5 pl-6 pr-10">
            {school}
            <ActionIcon
              className="absolute right-2 hidden group-hover:flex"
              variant="ghost"
              size="sm"
              onClick={open}
            >
              <Pencil1Icon />
            </ActionIcon>
          </div>
        </div>
      )}
      <SchoolSettingDialog isOpen={isOpen} isEmpty={!school} close={close} />
    </>
  );
};

export default SchoolSetting;
