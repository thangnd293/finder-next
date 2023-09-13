import { cn } from "@/lib/utils";
import React from "react";

const MessageText = ({
  className,
  isSelf,
  text,
}: {
  className?: string;
  isSelf: boolean;
  text: string;
}) => {
  return (
    <div
      className={cn(
        "message p-2.5",
        {
          "bg-primary text-white": isSelf,
          "bg-background-100 text-black": !isSelf,
        },
        className,
      )}
    >
      {text}
    </div>
  );
};

export default MessageText;
