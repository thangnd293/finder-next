"use client";

import { cn } from "@/lib/utils";
import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as RadixPortal from "@radix-ui/react-portal";
import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import Input from "./Input";
import { labelVariants } from "./Label";
import ScrollArea from "./ScrollArea";

export interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  label?: string;
  data: Option[];
  error?: string;
  value?: string;
  search?: string;
  leftIcon?: React.ReactNode;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
}
const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      className,
      inputClassName,
      data,
      label,
      value,
      onChange,
      search,
      onSearch,
      leftIcon,
      ...others
    },
    ref,
  ) => {
    const [_value, setValue] = useState<Option | null>(() => {
      const selectedItem = data.find((item) => item.value === value);
      return selectedItem ? selectedItem : null;
    });

    const [referenceElement, setReferenceElement] =
      useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null,
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement);

    const [query, setQuery] = useState(search || "");

    const filteredOptions =
      query === ""
        ? data
        : data.filter((person) => {
            return person.label.toLowerCase().includes(query.toLowerCase());
          });

    const handleChange = (value: Option) => {
      setValue(value);
      onChange?.(value.value);
    };

    const handleSearchChange = (search: string) => {
      setQuery(search);
      onSearch?.(search);
    };

    useEffect(() => {
      const selectedItem = data.find((item) => item.value === value);
      setValue(selectedItem ? selectedItem : null);
    }, [value, data]);

    return (
      <HeadlessCombobox
        as="div"
        className={cn("relative", className)}
        by="value"
        value={_value}
        onChange={handleChange}
      >
        {({ open }) => (
          <>
            <HeadlessCombobox.Label className={cn(labelVariants())}>
              {label}
            </HeadlessCombobox.Label>
            <HeadlessCombobox.Button
              ref={setReferenceElement}
              className="relative w-full"
              onClick={(e) => open && e.preventDefault()}
            >
              <HeadlessCombobox.Input
                as={Input}
                displayValue={(option: Option) => option?.label}
                onChange={(event) => handleSearchChange(event.target.value)}
                rightIcon={<CaretSortIcon />}
                ref={ref}
                className={inputClassName}
                leftIcon={leftIcon}
                {...others}
              />
            </HeadlessCombobox.Button>
            {open && (
              <RadixPortal.Root>
                <Transition
                  ref={setPopperElement}
                  className={cn(
                    "mt-1 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
                  )}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                  style={{
                    ...styles.popper,
                    width: referenceElement?.offsetWidth,
                  }}
                  {...attributes.popper}
                >
                  <HeadlessCombobox.Options static>
                    <ScrollArea className="h-fit max-h-40">
                      {filteredOptions.length === 0 && (
                        <p className="h-full px-2 py-2 text-center text-sm">
                          Không tìm thấy
                        </p>
                      )}

                      {filteredOptions.map((person) => (
                        <HeadlessCombobox.Option
                          key={person.value}
                          className="relative flex w-full cursor-default select-none items-center rounded-sm py-2.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground ui-active:bg-background-100 ui-disabled:pointer-events-none ui-disabled:opacity-50"
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              {person.label}
                              {selected && (
                                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                                  <CheckIcon className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </HeadlessCombobox.Option>
                      ))}
                    </ScrollArea>
                  </HeadlessCombobox.Options>
                </Transition>
              </RadixPortal.Root>
            )}
          </>
        )}
      </HeadlessCombobox>
    );
  },
);

Combobox.displayName = "Combobox";
export default Combobox;
