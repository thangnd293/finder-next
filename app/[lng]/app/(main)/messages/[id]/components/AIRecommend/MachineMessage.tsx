import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { randomNumber } from "@/utils/helper";
import { useEffect, useState } from "react";

type MachineMessageProps = {
  isLoading?: boolean;
} & (
  | {
      message: string;
      children?: never;
    }
  | {
      message?: never;
      children: React.ReactNode;
    }
);
const MachineMessage = ({
  isLoading,
  message,
  children,
}: MachineMessageProps) => {
  const [isShowSpinner, setIsShowSpinner] = useState(isLoading ?? true);

  useEffect(() => {
    setIsShowSpinner(isLoading ?? true);
  }, [isLoading]);

  useEffect(() => {
    if (typeof isLoading !== "undefined") return;
    const timer = setTimeout(
      () => {
        setIsShowSpinner(false);
      },
      randomNumber(500, 1000),
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-background-200 p-1.5">
      {isShowSpinner ? (
        <div className="flex h-10 w-10 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <Avatar className="h-10 w-10 self-start" src="/images/bot.jpeg" />
          {message ? <p className="text-sm">{message}</p> : children}
        </>
      )}
    </div>
  );
};

export default MachineMessage;
