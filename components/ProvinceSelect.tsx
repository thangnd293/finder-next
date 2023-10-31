"use client";

import React, { useMemo, useState } from "react";
import Combobox from "./Combobox";
import { useAllProvince } from "@/service/helper";

interface ProvinceSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Combobox>, "data"> {
  label?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const ProvinceSelect = React.forwardRef<HTMLInputElement, ProvinceSelectProps>(
  ({ className,inputClassName, label, value, onChange, ...others }, ref) => {
    const { provinces } = useAllProvince();
    const [province, setProvince] = useState(value);

    const provinceData = useMemo(
      () =>
        provinces.map((province) => ({
          value: province.name,
          label: province.name,
        })),
      [provinces],
    );

    const handleChange = (value: string) => {
      setProvince(value);
      onChange?.(value);
    };

    return (
      <Combobox
        ref={ref}
        className={className}
        inputClassName={inputClassName}
        label={label}
        data={provinceData}
        value={province}
        placeholder="Chọn quê quán"
        onChange={handleChange}
        {...others}
      />
    );
  },
);

ProvinceSelect.displayName = "ProvinceSelect";
export default ProvinceSelect;
