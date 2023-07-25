import React from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TOption = {
  label: string;
  value: string;
};

interface ISelectProps {
  label: string;
  placeholder: string;
  options: TOption[];
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
}
export default function Select({
  label,
  options,
  placeholder,
  value,
  onChange,
  onValueChange,
}: ISelectProps) {
  console.log("options", options);

  const handleChange = (
    value: React.ChangeEvent<HTMLSelectElement> | string,
  ) => {
    if (typeof value === "string") return onValueChange?.(value);

    onChange?.(value);
  };

  return (
    <SelectRoot value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
