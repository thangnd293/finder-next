"use client";
import { TPageParams } from "@/types/common";

export default function Lab({
  params: { lng },
}: TPageParams<{
  lng: string;
}>) {
  // Make sure we're not on the ssr

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4">
        lab
      </main>
    </>
  );
}
