"use client";
import DialogConfirm from "@/app/[lng]/room/[room]/_comps/dialog-confirm";
import Room from "./_ui/room";
import BrowserOnly from "@/components/BrowserOnly";

export default function Page() {
  return (
    <BrowserOnly>
      <Room />
    </BrowserOnly>
  );
}
