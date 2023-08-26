"use client";

import React, { useMemo, useState } from "react";
import Combobox from "./Combobox";
import { useAllProvince } from "@/service/helper";

interface ProvinceSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Combobox>, "data"> {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const ProvinceSelect = React.forwardRef<HTMLInputElement, ProvinceSelectProps>(
  ({ className, value, onChange, ...others }, ref) => {
    const { provinces } = useAllProvince();
    const [province, setProvince] = useState(
      () => provinces.find((p) => p.name === value)?.name || "",
    );

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
        label="Quê quán"
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
