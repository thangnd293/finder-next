"use client";
import ReactOtpInput from "react-otp-input";
import InputBase from "./InputBase";
import React from "react";

interface OtpInputProps {
  name: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}
const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  ({ name, value, error, onChange }, ref) => {
    return (
      <div className="mx-auto w-fit">
        <ReactOtpInput
          value={value}
          onChange={onChange}
          numInputs={6}
          inputType="number"
          containerStyle="gap-1"
          renderInput={(props) => (
            <InputBase
              {...props}
              ref={ref}
              name={name}
              style={{}}
              className="h-12 w-12 flex-shrink-0 p-0 text-center"
            />
          )}
        />
        {error && <p className="text-left text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

export default OtpInput;
