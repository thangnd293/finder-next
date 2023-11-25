"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { useCurrentUser } from "@/service/user";
import { MdOutlineVerifiedUser, MdVerifiedUser } from "react-icons/md";
import Verified, { useVerifyStore, verifyAction } from "./verified";
import { cn } from "@/lib/utils";

const VerifySection = () => {
  const user = useCurrentUser();
  const isOpen = useVerifyStore((s) => s.open);
  return (
    <>
      {isOpen && <Verified />}
      <AccordionItem value="verification">
        <AccordionTrigger>Verification</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <button
              onClick={() => {
                if (user?.data?.isVerifiedFace) return;
                verifyAction.setOpen(true);
              }}
              disabled={user?.data?.isVerifiedFace}
              className={cn(
                "flex w-full items-center gap-2 rounded-full  px-6 py-2.5 transition-[border]",
                user?.data?.isVerifiedFace
                  ? "border-primary font-semibold"
                  : "border border-gray-300  hover:border-primary  hover:text-primary",
              )}
            >
              {user?.data?.isVerifiedFace ? (
                <>
                  <MdVerifiedUser className="text-primary" /> Tài khoản của bạn
                  đã được xác nhận
                </>
              ) : (
                <>
                  <MdOutlineVerifiedUser /> Xác thực tài khoản
                </>
              )}
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default VerifySection;
