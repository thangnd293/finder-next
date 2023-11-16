"use client";
import ActionIcon from "@/components/ActionIcon";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useCurrentUser } from "@/service/user";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { BsPlusLg } from "react-icons/bs";
import WorkSettingDialog from "./WorkSettingDialog";

export interface WorkFormValues {
  title: string;
  company: string;
}
const WorkSetting = () => {
  const { isOpen, open, close } = useDisclosure();
  const { data } = useCurrentUser({
    select: (user) => ({
      company: user.company,
      jobs: user.jobs,
    }),
  });

  const isEmpty = !data?.company || !data?.jobs || data.jobs?.length === 0;

  return (
    <>
      {isEmpty ? (
        <button
          className="flex w-full items-center gap-2 rounded-full border px-6 py-2.5 transition-[border] hover:border-primary hover:text-primary"
          onClick={open}
        >
          <BsPlusLg /> Thêm công việc
        </button>
      ) : (
        <div>
          <p className="px-6 font-medium text-secondary-foreground">
            Công việc
          </p>
          <div className="group relative space-y-1 rounded-2xl border bg-background px-6 py-3">
            <p>Chức danh {data.jobs?.[0]}</p>
            <p>Tại {data.company}</p>
            <ActionIcon
              className="absolute right-2 top-1 hidden group-hover:flex"
              variant="ghost"
              size="sm"
              onClick={open}
            >
              <Pencil1Icon />
            </ActionIcon>
          </div>
        </div>
      )}
      <WorkSettingDialog isOpen={isOpen} close={close} />
    </>
  );
};

export default WorkSetting;
