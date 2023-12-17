import { cn } from "@/lib/utils";
import React from "react";
import {
  BsFillTelephoneOutboundFill,
  BsFillTelephoneXFill,
} from "react-icons/bs";
import dayjs from "dayjs";

const calcTime = (isMiss: boolean, startTime: string, endTime: string) =>
  isMiss ? dayjs(endTime).format("HH:mm")
  : dayjs(endTime).diff(dayjs(startTime), "second") < 60 ?
    dayjs(endTime).diff(dayjs(startTime), "second") + " giây"
  : dayjs(endTime).diff(dayjs(startTime), "minute") < 60 ?
    dayjs(endTime).diff(dayjs(startTime), "minute") + " phút"
  : dayjs(endTime).diff(dayjs(startTime), "hour") < 24 ?
    dayjs(endTime).diff(dayjs(startTime), "hour") + " giờ"
  : dayjs(endTime).diff(dayjs(startTime), "day") + " ngày";

const MessageCall = ({
  endTime,
  isMiss,
  isSelf,
  startTime,
  className,
}: {
  isMiss: boolean;
  isSelf: boolean;
  startTime: string;
  endTime: string;
  className?: string;
}) => {
  if (isSelf)
    return (
      <div
        className={cn(
          "message flex gap-4 bg-gray-600/40 py-3 pl-5 pr-6",
          className,
        )}
      >
        <div className="grid h-6 w-6 place-content-center rounded-full bg-gray-500 p-6">
          {isMiss ?
            <BsFillTelephoneXFill size={20} />
          : <BsFillTelephoneOutboundFill size={20} />}
        </div>
        <div>
          <p className="font-semibold">
            {isMiss ? "Cuộc gọi nhỡ" : "Cuộc gọi"}
          </p>
          <span className="text-sm">
            {calcTime(isMiss, startTime, endTime)}
          </span>
        </div>
      </div>
    );

  return (
    <div
      className={cn(
        "message flex gap-4 bg-gray-600/40 py-3 pl-5 pr-6",
        className,
      )}
    >
      <div className="grid h-6 w-6 place-content-center rounded-full bg-red-500 p-6">
        {isMiss ?
          <BsFillTelephoneXFill size={20} />
        : <BsFillTelephoneOutboundFill size={20} />}
      </div>
      <div>
        <p className="font-semibold">
          {isMiss ? "Đã bỏ lỡ cuộc gọi" : "Cuộc gọi"}
        </p>
        <span className="text-sm">{calcTime(isMiss, startTime, endTime)}</span>
      </div>
    </div>
  );
};

export default MessageCall;
