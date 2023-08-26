"use client";

import PhoneNumberInput, {
  Props,
} from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

import React from "react";
import Input from "../Input";
import CountrySelect from "./SelectCountry";

interface IPhoneInputProps
  extends Omit<Props<any, any>, "inputComponent" | "countrySelectComponent"> {
  name: string;
}
export default function PhoneInput(props: IPhoneInputProps) {
  return (
    <PhoneNumberInput
      inputComponent={CustomInput}
      countrySelectComponent={CountrySelect}
      {...props}
    />
  );
}

const CustomInput = React.forwardRef<any, any>((props, ref) => {
  return (
    <div className="w-full">
      <Input id="phone-input" label="Số điện thoại" {...props} ref={ref} />
    </div>
  );
});

CustomInput.displayName = "CustomInput";
