"use client";

import ActionIcon from "@/components/ActionIcon";
import FilterForm from "@/components/FilterForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { PiSlidersHorizontal } from "react-icons/pi";

interface FilterSettingProps {
  onReload?: () => void;
}
const FilterSetting = ({ onReload }: FilterSettingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitDone = () => {
    setIsOpen(false);
    onReload?.();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="absolute left-16 flex items-center gap-2 text-[13px] font-semibold opacity-80 transition-opacity hover:opacity-100"
        asChild
      >
        <button onClick={() => setIsOpen(true)}>
          <PiSlidersHorizontal size={20} /> <span>Cài đặt</span>
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
