"use client";

import ActionIcon from "@/components/ActionIcon";
import FilterForm from "@/components/FilterForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { ROUTE } from "@/constant/route";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { PiSlidersHorizontal } from "react-icons/pi";

interface FilterSettingProps {
  onReload?: () => void;
}
const FilterSetting = ({ onReload }: FilterSettingProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitDone = () => {
    setIsOpen(false);
    onReload?.();
  };

  if (!pathname?.endsWith(ROUTE.HOME) || searchParams?.toString()) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="absolute right-3 flex items-center gap-2 text-[13px] font-semibold opacity-80 transition-opacity hover:opacity-100 md:left-16"
        asChild
      >
        <button onClick={() => setIsOpen(true)}>
          <PiSlidersHorizontal className="h-6 w-6 md:h-5 md:w-5" />
          <span className="hidden md:inline-block">Cài đặt</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="relative w-96" align="start">
        <ActionIcon
          className="absolute right-2 top-2"
          variant="ghost"
          onClick={() => setIsOpen(false)}
        >
          <BsXLg />
        </ActionIcon>
        <FilterForm onSubmitDone={onSubmitDone} />
      </PopoverContent>
    </Popover>
  );
};

export default FilterSetting;
