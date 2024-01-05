import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { Schedule } from "@/service/schedule";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import InvitationAction from "./InvitationAction";

interface SelfInvitationCardProps extends Schedule {
  onClick?: () => void;
}
const SelfInvitationCard = ({
  _id,
  status,
  receiver,
  description,
  appointmentDate,
  locationDating,
  sender,
  onClick,
}: SelfInvitationCardProps) => {
  const countDown = dayjs(appointmentDate).diff(dayjs(), "day");

  return (
    <div
      className="relative flex cursor-pointer flex-col gap-3 rounded-sm border p-4 hover:bg-background-50 md:flex-row"
      onClick={onClick}
    >
      {statusBadge[status]}

      <div>
        <p className="text-left text-sm font-medium text-secondary-foreground md:text-center">
          Người nhận
        </p>
        <div className="flex items-center gap-4">
          <Avatar size="xl" src={receiver.images?.[0]?.url} />
          <div className="pb-3.5 md:hidden">
            <p className="font-medium">{receiver.name}</p>
            <p className="line-clamp-3 w-full text-sm text-secondary-foreground">
              <BiMessageDetail className="inline-block" />
              &nbsp;{description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 divide-y overflow-hidden">
        <div className="hidden pb-3.5 md:block">
          <p className="font-medium">{receiver.name}</p>
          <p className="line-clamp-3 w-full text-sm text-secondary-foreground">
            <BiMessageDetail className="inline-block" />
            &nbsp;{description}
          </p>
        </div>

        <div className="flex items-center justify-between py-3.5 text-center text-sm">
          <div className="flex flex-col items-center justify-center gap-1">
            <AiOutlineClockCircle size={20} />
            <p
              className={cn("text-[13px]", {
                "font-semibold text-red-500": countDown < 0,
                "text-green-500": countDown > 7,
                "font-semibold text-yellow-500":
                  countDown >= 0 && countDown <= 7,
              })}
            >
              {appointmentDate.prettyFullDate()}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <MdLocationOn size={20} />
            <p className="text-[13px]">Quan 7, TP HCM</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <GrMapLocation size={20} />
            <p className="text-[13px]">{locationDating.length} địa điểm</p>
          </div>
        </div>

        <div>
          <div
            className="ml-auto mt-3.5 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <InvitationAction
              _id={_id}
              status={status}
              appointmentDate={appointmentDate}
              sender={sender}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfInvitationCard;

const statusBadge: Record<Schedule["status"], ReactNode> = {
  "Wait for approval": (
    <div className="absolute right-2 top-2 rounded-sm bg-yellow-500 px-2 py-1 text-sm text-white">
      Đang chờ
    </div>
  ),
  Accept: (
    <div className="absolute right-2 top-2 rounded-sm bg-green-500 px-2 py-1 text-sm text-white">
      Đã chấp nhận
    </div>
  ),
  Decline: (
    <div className="absolute right-2 top-2 rounded-sm bg-red-500 px-2 py-1 text-sm text-white">
      Không đồng ý
    </div>
  ),
  Cancel: (
    <div className="absolute right-2 top-2 rounded-sm bg-gray-500 px-2 py-1 text-sm text-white">
      Đã hủy
    </div>
  ),
};
