"use client";
import Room from "./_ui/room";
import BrowserOnly from "@/components/browser-only";

export default function Page() {
  return (
    <BrowserOnly>
      <Room />
    </BrowserOnly>
  );
}
