"use client";
import ReactOtpInput from "react-otp-input";
import { InputBase } from "./input-base";

interface IOtpInputProps {
  name: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}
export default function OtpInput({
  name,
  value,
  error,
  onChange,
}: IOtpInputProps) {
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
            name={name}
            style={{}}
            className="h-12 w-12 flex-shrink-0 p-0 text-center"
          />
        )}
      />
      {error && <p className="text-left text-sm text-destructive">{error}</p>}
    </div>
  );
}
