"use client";

import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";

import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export default function HamburgerMenu() {
  const [show, setShow] = useState(false);

  const Icon = show ? Cross1Icon : HamburgerMenuIcon;

  return (
    <div className="sm:hidden">
      <ActionIcon
        variant="transparent"
        size="lg"
        onClick={() => setShow(!show)}
      >
        <Icon className="h-8 w-8" />
      </ActionIcon>
      <div
        className={cn(
          "invisible absolute left-0 top-full h-0 w-full rounded-b-3xl bg-background opacity-0 transition-all duration-300",
          show && "visible h-52 translate-y-0 opacity-100",
        )}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 18px 15px 0px",
        }}
      >
        <div className="mx-auto w-1/2">
          <p className="py-10 text-xl text-secondary-foreground">
            Finder là nơi bạn có thể <br /> tìm kiếm, kết bạn và hẹn hò.
          </p>

          <Button className="w-full" leftIcon={<ArrowRightIcon />}>
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
}
