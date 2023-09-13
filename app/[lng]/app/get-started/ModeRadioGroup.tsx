"use client";

import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Label from "@/components/Label";
import { cn } from "@/lib/utils";

interface ModeRadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
}
export default function ModeRadioGroup({
  value,
  onChange,
}: ModeRadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div>
      <Label>Bạn đang tìm kiếm gì?</Label>
      <RadioGroup.Root
        className="flex flex-col gap-2.5"
        value={selectedValue}
        onValueChange={handleChange}
      >
        {data.map((item) => (
          <label
            key={item.value}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3",
              {
                "border-primary bg-primary-100": selectedValue === item.value,
              },
            )}
          >
            <div className="flex items-center gap-3">
              <Image src={item.icon} alt={""} width={50} height={50} />
              <div>
                <p className={item.color}>{item.label}</p>
                <p className="text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <RadioGroup.Item
              className="h-6 w-6 flex-shrink-0 rounded-full border-2 outline-none data-[state=checked]:border-none"
              value={item.value}
            >
              <RadioGroup.Indicator className="flex h-full w-full items-center justify-center rounded-full bg-primary">
                <CheckIcon className="text-white" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
          </label>
        ))}
      </RadioGroup.Root>
    </div>
  );
}

const data = [
  {
    value: "Date",
    label: "date",
    icon: "/images/date.png",
    color: "text-primary",
  },
  {
    value: "Bff",
    label: "bff",
    icon: "/images/bff.png",
    color: "text-green-600",
  },
];