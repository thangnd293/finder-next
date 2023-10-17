import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Calendar from "./Calendar";
import { vi } from "date-fns/locale";

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}
const DatePicker = ({
  className,
  placeholder,
  value,
  onChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  useEffect(() => {
    onChange?.(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start border-border px-3 text-left text-sm font-normal text-foreground hover:bg-background-50 hover:text-foreground",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : placeholder ?? "Chọn ngày"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={vi}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
