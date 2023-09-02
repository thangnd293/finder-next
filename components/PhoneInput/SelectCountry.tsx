"use client";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CountryCode } from "libphonenumber-js/core";
import { useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  type Country,
} from "react-phone-number-input";
import vi from "react-phone-number-input/locale/vi.json";
import ButtonBase from "../ButtonBase";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../Command";
import Label from "../Label";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import ScrollArea from "../ScrollArea";

interface CountrySelectProps {
  value: Country;
  onChange: (value: Country) => void;
}
const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const countries = getCountries();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="mr-2 w-min cursor-pointer"
          role="combobox"
          aria-controls="country-select"
          aria-expanded={open}
          onClick={(e) => e.stopPropagation()}
        >
          <Label>Quốc gia</Label>
          <ButtonBase
            asChild
            variant="social"
            className="relative w-[70px] !translate-y-0 justify-center pl-0 pr-2 text-sm font-normal"
          >
            <div>
              {value
                ? `+${getCountryCallingCode(
                    value.toUpperCase() as CountryCode,
                  )}`
                : "Select country..."}
              <CaretSortIcon className="absolute right-1 ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </ButtonBase>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[376px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <ScrollArea className="h-72">
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                >
                  {vi[country]} +{getCountryCallingCode(country)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;
