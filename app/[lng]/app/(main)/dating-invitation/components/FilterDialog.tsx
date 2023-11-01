import Button from "@/components/Button";
import Chip from "@/components/Chip";
import DatePicker from "@/components/DatePicker";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import { FilterScheduleArgs, Schedule } from "@/service/schedule";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export interface FilterSchedule
  extends Omit<FilterScheduleArgs, "page" | "size" | "status"> {
  status?: Schedule["status"] | "all";
}

interface FilterDialogProps {
  filter: FilterSchedule;
  onFilter: (filter: FilterSchedule) => void;
  close: () => void;
}

const FilterDialog = ({ filter, onFilter, close }: FilterDialogProps) => {
  const { handleSubmit, control } = useForm<FilterSchedule>({
    defaultValues: {
      ...filter,
    },
  });

  const onSubmit = (data: FilterSchedule) => {
    onFilter(data);
    close();
  };

  return (
    <Modal className="!px-0" onOpenChange={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-lg font-semibold">Lọc lời mời</h2>
        <div className="w-full divide-y">
          <div className="px-8 pb-4">
            <Label>Người mời</Label>
            <Controller
              control={control}
              name="sender"
              render={({ field: { value, onChange } }) => (
                <OptionPicker
                  options={senderFilter}
                  value={
                    value && value !== senderFilter[0].value
                      ? "me"
                      : senderFilter[0].value
                  }
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="px-8 py-4">
            <Label>Trạng thái</Label>
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <OptionPicker
                  options={statusFilter}
                  value={value ?? statusFilter[0].value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="px-8 py-4">
            <Label>Thời gian</Label>
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="fromDate"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    className="flex-1"
                    placeholder="Từ ngày"
                    value={value ? new Date(value) : undefined}
                    onChange={onChange}
                  />
                )}
              />

              <span>-</span>

              <Controller
                control={control}
                name="toDate"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    className="flex-1"
                    placeholder="Đến ngày"
                    value={value ? new Date(value) : undefined}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Modal.Footer className="px-8">
          <Button variant="ghost" onClick={close}>
            Hủy
          </Button>
          <Button type="submit">Lọc</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FilterDialog;

const senderFilter = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Của tôi",
    value: "me",
  },
];

const statusFilter: {
  label: string;
  value: Schedule["status"] | "all";
}[] = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Đã hủy",
    value: "Cancel",
  },
  {
    label: "Đã chấp nhận",
    value: "Accept",
  },
  {
    label: "Đã từ chối",
    value: "Decline",
  },
];

interface CustomChipProps extends React.ComponentProps<typeof Chip> {
  isActive?: boolean;
  value?: string;
}
const CustomChip = ({ className, isActive, ...others }: CustomChipProps) => {
  return (
    <Chip
      className={cn("h-full border-2 py-1", {
        "border-primary text-primary": isActive,
      })}
      {...others}
    />
  );
};

interface OptionPickerProps {
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}

const OptionPicker = ({ value, options, onChange }: OptionPickerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((item) => (
        <CustomChip
          key={item.value}
          label={item.label}
          value={item.value}
          isActive={item.value === value}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  );
};
