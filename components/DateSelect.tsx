"use client";

import React, { useEffect, useMemo, useState } from "react";
import Combobox from "./Combobox";
import { daysInMonth } from "@/utils/helper";
import Label from "./Label";

const VALID_AGE = 18;
const MAX_AGE = 100;

interface DateSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
const DateSelect = React.forwardRef<HTMLInputElement, DateSelectProps>(
  ({ label, value, onChange }, ref) => {
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - VALID_AGE);
    const date = value ? new Date(value) : currentDate;

    const [day, setDay] = useState<number>(() => date.getDate());
    const [month, setMonth] = useState<number>(() => date.getMonth() + 1);
    const [year, setYear] = useState<number>(() => date.getFullYear());

    const yearData = useMemo(() => getYearData(), []);
    const monthData = useMemo(() => getMonthData(), []);

    const dayData = useMemo(() => getDayData(month, year), [month, year]);

    useEffect(() => {
      const date = new Date(year, month - 1, day);
      onChange?.(date.toISOString());
    }, [day, month, year, onChange]);

    return (
      <div>
        <Label>{label}</Label>
        <div className="flex gap-3">
          <Combobox
            className="flex-[2]"
            data={dayData}
            value={day.toString()}
            placeholder="Ngày"
            onChange={(value) => setDay(parseInt(value))}
          />
          <Combobox
            className="flex-[3]"
            data={monthData}
            value={month.toString()}
            placeholder="Tháng"
            onChange={(value) => setMonth(parseInt(value))}
          />
          <Combobox
            className="flex-[2]"
            data={yearData}
            value={year.toString()}
            placeholder="Năm"
            onChange={(value) => setYear(parseInt(value))}
          />
        </div>
      </div>
    );
  },
);

DateSelect.displayName = "DateSelect";

export default DateSelect;

const getYearData = () => {
  const currentYear = new Date().getFullYear();
  const yearData = [];
  for (let i = currentYear - VALID_AGE; i >= currentYear - MAX_AGE; i--) {
    yearData.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  return yearData;
};

const getMonthData = () => {
  const monthData = [];
  for (let i = 1; i <= 12; i++) {
    monthData.push({
      value: i.toString(),
      label: `Tháng ${i}`,
    });
  }

  return monthData;
};

const getDayData = (month: number, year: number) => {
  const days = daysInMonth(month, year);

  const dayData = [];

  for (let i = 1; i <= days; i++) {
    dayData.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  return dayData;
};
