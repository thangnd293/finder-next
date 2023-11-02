"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useVerifyFormToken } from "@/service/schedule";
import Image from "next/image";
import { PropsWithChildren } from "react";

const VerifyFormToken = ({ children }: PropsWithChildren) => {
  const { data, isError } = useVerifyFormToken();

  if (isError) return <InvalidToken />;

  if (!data) return <LoadingScreen />;

  return <>{children}</>;
};

export default VerifyFormToken;

const InvalidToken = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <Image src="/images/cat.png" alt="" width={520} height={520} />
        <p className="text-center text-3xl font-semibold text-primary">
          Form không hợp lệ
        </p>
      </div>
    </div>
  );
};
