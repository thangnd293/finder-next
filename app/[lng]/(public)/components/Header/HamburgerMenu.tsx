"use client";

import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";

import {
  ArrowRightIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import SignUp from "../auth/SignUp";

const HamburgerMenu = () => {
  return (
    <Collapsible className="sm:hidden">
      <CollapsibleTrigger
        asChild
        className="[&>.close-icon]:data-[state=open]:block [&>.hamburger-icon]:data-[state=closed]:block"
      >
        <ActionIcon variant="transparent" size="lg">
          <HamburgerMenuIcon className="hamburger-icon hidden h-5 w-5 sm:h-6 sm:w-6" />
          <Cross1Icon className="close-icon hidden h-5 w-5 sm:h-6 sm:w-6" />
        </ActionIcon>
      </CollapsibleTrigger>

      <CollapsibleContent
        className="absolute left-0 right-0 z-10 rounded-b-3xl bg-background"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 18px 15px 0px",
        }}
      >
        <div className="mx-auto w-1/2 space-y-6 py-8">
          <p className="text-secondary-foreground sm:text-lg">
            Finder là nơi bạn có thể <br /> tìm kiếm, kết bạn và hẹn hò.
          </p>

          <SignUp
            renderButton={({ onClick }) => (
              <Button
                className="w-full"
                leftIcon={<ArrowRightIcon />}
                onClick={onClick}
              >
                Đăng ký
              </Button>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default HamburgerMenu;
