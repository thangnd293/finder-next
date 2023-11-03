"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Image from "next/image";
import Label from "./Label";

interface ModeRadioGroupProps {
  className?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
const ModeRadioGroup = ({
  label,
  className,
  value,
  onChange,
}: ModeRadioGroupProps) => {
  const handleChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className={className}>
      <Label>{label}</Label>

      <RadioGroup.Root
        className="flex flex-col gap-2.5"
        value={value}
        onValueChange={handleChange}
      >
        {data.map((item) => (
          <label
            key={item.value}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3",
              {
                "border-primary bg-primary-100": value === item.value,
              },
            )}
          >
            <div className="flex items-center gap-3">
              <Image src={item.icon} alt={""} width={50} height={50} />
              <div>
                <p className={item.color}>{item.label}</p>
                <p className="text-sm">{item.content}</p>
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
};

export default ModeRadioGroup;

const data = [
  {
    value: "Date",
    label: "date",
    icon: "/images/date.png",
    color: "text-primary",
    content: "Bạn ế quá lâu?. Đừng lo chúng tôi ở đây để giúp bạn",
  },
  {
    value: "Bff",
    label: "bff",
    icon: "/images/bff.png",
    color: "text-green-600",
    content: "Hãy tìm người tốt, đừng tìm người xấu",
  },
];
