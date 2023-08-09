import React from "react";
import Avatar from "./avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MessageUser() {
  const isTyping = Math.random() > 0.5;
  const isActive = Math.random() > 0.5;
  const unseenMessages = Math.round(Math.random() * 3);

  return (
    <Link href="/app/messages/thangnguyen">
      <div
        className={cn(
          "relative flex items-center space-x-2.5 rounded-md py-3 pl-6 pr-12 hover:bg-gray-100",
          isActive && "bg-gray-100",
        )}
      >
        <Avatar
          className="block h-12 w-12 flex-shrink-0 rounded-md"
          fallback="DT"
        />

        <div className="h-fit space-y-1 overflow-hidden">
          <p className="flex items-center space-x-1 text-sm font-medium">
            <span className="flex-1 truncate">Nguyen Dac Thang</span>
            {isTyping && (
              <span className="text-xs text-primary-500">Đang nhập...</span>
            )}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <p
              className={cn(
                "flex-1 truncate text-secondary-foreground",
                unseenMessages > 0 && "font-semibold text-foreground",
              )}
            >
              Same here. I&apos;ve been trying to keep myself occupied
            </p>

            <span
              className="inline-block h-1 w-1 rounded-full bg-secondary-foreground"
              role="dot"
            />
            <span className="text-secondary-foreground">40 min</span>
          </div>
        </div>

        {unseenMessages > 0 && (
          <div
            role="unseen-signal"
            className="absolute right-6 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[12px] text-white"
          >
            {unseenMessages == 1 ? undefined : unseenMessages}
          </div>
        )}
      </div>
    </Link>
  );
}
