"use client";

import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const sections = [
  {
    label: "Trang chủ",
    id: "hero",
  },
  {
    label: "Thông tin",
    id: "info",
  },
  {
    label: "Câu chuyện",
    id: "story",
  },
];
const Navbar = () => {
  return (
    <div className="group fixed bottom-14 left-1/2 z-50 flex w-max -translate-x-1/2 items-center gap-2 rounded-2xl border border-gray-50 bg-background px-6 py-3 shadow-xl sm:px-8">
      {sections.map((section) => (
        <Link
          key={section.id}
          className="hidden text-sm font-light text-secondary-foreground transition-colors duration-200 hover:text-primary md:block"
          href={`#${section.id}`}
        >
          {section.label}
        </Link>
      ))}

      <SignIn
        renderButton={({ onClick }) => (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "block h-10 gap-0 px-4 transition-all duration-500 will-change-transform active:translate-y-px group-hover:duration-150 sm:ml-6 sm:hidden sm:h-12 sm:group-hover:gap-4",
            )}
            onClick={onClick}
          >
            Đăng nhập
          </Button>
        )}
      />

      <SignUp
        renderButton={({ onClick }) => (
          <Button
            size="sm"
            className={cn(
              "min-w-12 h-10 gap-0 px-4 transition-all duration-500 will-change-transform active:translate-y-px group-hover:duration-150 sm:ml-6 sm:h-12 sm:group-hover:gap-4",
            )}
            onClick={onClick}
          >
            <ArrowRightIcon className="hidden sm:block" />
            <span className="overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-xs sm:invisible sm:max-w-0 sm:opacity-0 sm:group-hover:visible sm:group-hover:opacity-100">
              Đăng ký
            </span>
          </Button>
        )}
      />
    </div>
  );
};

export default Navbar;
