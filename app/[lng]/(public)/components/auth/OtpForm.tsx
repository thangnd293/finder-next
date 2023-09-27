"use client";

import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { useOtpSignIn } from "@/service/auth";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type TOtpForm = {
  otp: string;
};

const validateOtpForm = yup.object({
  otp: yup
    .string()
    .length(6, "Please enter a valid OTP")
    .required("Please enter your OTP"),
});

interface OtpFormProps {
  phoneNumber: string;
  countDown: number;
  isSendingSms: boolean;
  onBackToPhoneForm: () => void;
  onSendSms: (phoneNumber: string) => void;
}
const OtpForm = ({
  phoneNumber,
  countDown,
  isSendingSms,
  onBackToPhoneForm,
  onSendSms,
}: OtpFormProps) => {
  const router = useRouter();

  const otpFormResolver = useYupValidationResolver(validateOtpForm);
  const otpForm = useForm<TOtpForm>({
    defaultValues: {
      otp: "682436",
    },
    resolver: otpFormResolver,
  });
  const signIn = useOtpSignIn();

  const handleVerifyOtp = (data: TOtpForm) => {
    signIn.mutate(
      {
        phoneNumber: phoneNumber,
        otp: data.otp,
      },
      {
        onSuccess: (data) => {
          if (data?.ok) {
            router.refresh();

            return;
          }

          otpForm.setError("otp", {
            type: "manual",
            message: "Số điện thoại hoặc mã OTP không đúng",
          });
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-3 text-center"
      onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
    >
      <p className="text-sm text-secondary-foreground">
        Chúng tôi đã gửi một mã xác minh đến số điện thoại {phoneNumber}.{" "}
        <button
          className="text-sm font-medium text-foreground hover:text-primary-500"
          onClick={onBackToPhoneForm}
        >
          Thay đổi số?
        </button>
      </p>
      <Controller
        name="otp"
        control={otpForm.control}
        rules={{ required: true }}
        render={({ field }) => (
          <OtpInput {...field} error={otpForm.formState.errors.otp?.message} />
        )}
      />

      <p className="text-sm text-secondary-foreground">
        Nếu bạn không nhận được mã.{" "}
        {countDown === 0 ? (
          <button
            type="submit"
            className="font-semibold text-primary-500"
            disabled={isSendingSms}
            onClick={() => onSendSms(phoneNumber)}
          >
            {isSendingSms ? "Đang gửi..." : "Gửi lại"}
          </button>
        ) : (
          <span>
            Gửi lại mã sau{" "}
            <span className="font-medium text-foreground">
              00:{countDown > 9 ? countDown : `0${countDown}`}
            </span>
          </span>
        )}
      </p>

      <Button type="submit">Xác thực</Button>
    </form>
  );
};

export default OtpForm;
