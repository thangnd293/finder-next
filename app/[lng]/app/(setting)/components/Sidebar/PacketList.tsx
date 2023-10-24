"use client";

import { PlusIcon, PremiumIcon } from "@/assets/icons";
import { useState } from "react";
import PacketDialog from "./PacketDialog";

const PacketList = () => {
  const [activePacket, setActivePacket] = useState("");

  return (
    <>
      <div className="space-y-3 p-4">
        <button
          className="w-full cursor-pointer space-y-1 rounded-md from-green-200 to-green-300 py-2 text-center md:bg-gradient-to-r md:px-8"
          onClick={() => setActivePacket("plus")}
        >
          <h1 className="flex items-center justify-center gap-2 font-semibold">
            <PlusIcon className="text-green-500" width={30} />{" "}
            <span className="hidden md:block">Finder Plus</span>
          </h1>
          <p className="hidden text-sm md:block">
            Mở khóa tất cả các tính năng bản Pro của ứng dụng
          </p>
        </button>

        <button
          className="cursor-pointer space-y-1 rounded-md bg-gradient-to-r from-yellow-200 to-yellow-300 px-8 py-2 text-center"
          onClick={() => setActivePacket("premium")}
        >
          <h1 className="flex items-center justify-center gap-2 font-semibold">
            <PremiumIcon className="text-yellow-500" width={30} /> Finder
            Premium
          </h1>
          <p className="text-sm">
            Mở khóa tất cả các tính năng bản Pro của ứng dụng
          </p>
        </button>
      </div>

      {activePacket && <PacketDialog onClose={() => setActivePacket("")} />}
    </>
  );
};

export default PacketList;
