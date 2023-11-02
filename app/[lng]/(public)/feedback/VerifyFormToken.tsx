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
        <p className="px-6 text-center text-xl font-semibold text-primary md:text-3xl">
          Form bạn đang truy cập không tồn tại
        </p>
      </div>
    </div>
  );
};
