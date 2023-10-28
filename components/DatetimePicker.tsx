"use client";

import React, { useState } from "react";
import DatePicker from "./DatePicker";
import { AiOutlineClockCircle } from "react-icons/ai";
import Combobox from "./Combobox";

interface DatetimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
}
const DatetimePicker = ({ value, onChange }: DatetimePickerProps) => {
  const currentDate = value ? new Date(value) : new Date();

  const { hour, minute, date } = dateToObject(currentDate);

  //   const changeDateValue = <T extends keyof typeof date>(
  //     key: T,
  //     value: (typeof date)[T],
  //   ) => {
  //     setDate((prev) => {
  //       const newDate = { ...prev, [key]: value };
  //       const { hour, minute, date } = newDate;
  //       const newDateValue = new Date(date?.setHours(+hour, +minute)!);
  //       //   onChange?.(newDateValue.toISOString());
  //       return newDate;
  //     });
  //   };

  return null;
  //   return (
  //     <div className="flex gap-2">
  //       <div className="flex gap-1">
  //         <Combobox
  //           placeholder="Giờ"
  //           data={Array.from({ length: 24 }, (_, i) => ({
  //             label: `${i < 10 ? `0${i}` : i}`,
  //             value: `${i}`,
  //           }))}
  //           leftIcon={<AiOutlineClockCircle />}
  //           value={date.hour}
  //           onChange={changeDateValue.bind(null, "hour")}
  //         />

  //         <Combobox
  //           placeholder="Phút"
  //           data={Array.from({ length: 60 }, (_, i) => ({
  //             label: `${i < 10 ? `0${i}` : i}`,
  //             value: `${i}`,
  //           }))}
  //           leftIcon={<AiOutlineClockCircle />}
  //           value={date.minute}
  //           onChange={changeDateValue.bind(null, "minute")}
  //         />
  //       </div>
  //       <DatePicker
  //         className="w-40"
  //         placeholder="Chọn ngày hẹn"
  //         value={date.date}
  //         onChange={changeDateValue.bind(null, "date")}
  //       />
  //     </div>
  //   );
};

export default DatetimePicker;

const dateToObject = (date: Date) => {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    date: date,
  };
};

const objectToDate = (obj: { hour: number; minute: number; date: Date }) => {
  const { hour, minute, date } = obj;
  return new Date(date.setHours(hour, minute));
};
