import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import Button from "./Button";
import Calendar from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}
const DatePicker = ({
  className,
  placeholder,
  error,
  value,
  onChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value);

  const handleChange = (date: Date | undefined) => {
    setDate(date);
    onChange?.(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          <Button
            className={cn(
              "w-full justify-start border-border px-3 text-left text-sm font-normal text-foreground hover:bg-background-50 hover:text-foreground",
              !date && "text-muted-foreground",
            )}
            variant="outline"
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy") : placeholder ?? "Chọn ngày"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          locale={vi}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
