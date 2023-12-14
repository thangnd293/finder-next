import { cn } from "@/lib/utils";
import React from "react";
import {
  BsFillTelephoneOutboundFill,
  BsFillTelephoneXFill,
} from "react-icons/bs";
import dayjs from "dayjs";

//function kiểm tra ngày đầu vào có bằng ngày hiện tại không
const isToday = (date: string) =>
  dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY");
const calcTime = (isMiss: boolean, startTime: string, endTime: string) =>
  isMiss
    ? isToday(endTime)
      ? dayjs(endTime).format("HH:mm")
      : dayjs(endTime).format("DD/MM/YYYY")
    : dayjs(endTime).from(dayjs(), true);

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
          {isMiss ? (
            <BsFillTelephoneXFill size={20} />
          ) : (
            <BsFillTelephoneOutboundFill size={20} />
          )}
        </div>
        <div>
          <p className="font-semibold">Cuộc gọi</p>
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
        {isMiss ? (
          <BsFillTelephoneXFill size={20} />
        ) : (
          <BsFillTelephoneOutboundFill size={20} />
        )}
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
