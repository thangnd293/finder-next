"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { useInvalidateCurrentUser } from "@/service/user";
import { useEffect } from "react";
import { LinkAccountInstagram } from "./LinkAccountInstagram";
import { LinkAccountSpotify } from "./LinkAccountSpotify";

const LinkedAccount = () => {
  const invalidateCurrentUser = useInvalidateCurrentUser();

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent<{
        isSuccess: boolean;
        provider: "instagram" | "spotify";
      }>,
    ) => {
      const { data } = event;

      if (data.isSuccess) invalidateCurrentUser();
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <AccordionItem value="linked-account">
      <AccordionTrigger>Liên kết tài khoản</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6">
          <LinkAccountInstagram />
          <LinkAccountSpotify />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LinkedAccount;
