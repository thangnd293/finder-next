"use client";

import Button from "@/components/Button";
import PhoneInput from "@/components/PhoneInput";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { useSendSms } from "@/service/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";
import OtpForm from "./OtpForm";

type PhoneForm = {
  phoneNumber: string;
};

const validatePhoneForm = yup.object({
  phoneNumber: yup
    .string()
    .required("Please enter your phone number")
    .test("is-phone-number", "Please enter a valid phone number", (value) =>
      isValidPhoneNumber(value),
    ),
});

const PhoneAuth = () => {
  const phoneFormResolver = useYupValidationResolver(validatePhoneForm);

  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [countDown, setCountDown] = useState(0);

  const sendSms = useSendSms();

  const phoneForm = useForm<PhoneForm>({
    defaultValues: {
      phoneNumber: "0344329446",
    },
    resolver: phoneFormResolver,
  });

  const handleSendSms = (phoneNumber: string) => {
    sendSms.mutate(phoneNumber, {
      onSuccess: () => {
        setShowOtpVerify(true);
        setCountDown(60);
      },
      onError: (error) => {
        if (typeof error.response?.data.data.diffTime === "number") {
          setShowOtpVerify(true);
          setCountDown(error.response?.data.data.diffTime || 0);
        }
      },
    });
  };

  const handleBack = () => {
    setShowOtpVerify(false);
    setCountDown(0);
  };

  const handleSubmitPhoneForm = (data: PhoneForm) => {
    handleSendSms(data.phoneNumber);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countDown > 0) {
      timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);

  return !showOtpVerify ? (
    <form
      className="flex flex-col gap-3"
      onSubmit={phoneForm.handleSubmit(handleSubmitPhoneForm)}
    >
      <PhoneInput
        name={"phoneNumber"}
        defaultCountry="VN"
        control={phoneForm.control}
        error={phoneForm.formState.errors.phoneNumber?.message}
      />
      <p className="text-sm text-secondary-foreground">
        Nhập số điện thoại để tiếp tục. Khi bạn nhấn{" "}
        <span className="font-medium text-foreground">
          &quot;Tiếp tục&quot;
        </span>{" "}
        chúng tôi sẽ gửi một mã tới số điện thoại của bạn. Bạn có thể phải trả
        phí tin nhắn và dữ liệu. Số điện thoại đã được xác minh này có thể được
        dùng để đăng nhập.
      </p>
      <Button type="submit" loading={sendSms.isLoading}>
        Tiếp tục
      </Button>
    </form>
  ) : (
    <OtpForm
      phoneNumber={phoneForm.getValues().phoneNumber}
      countDown={countDown}
      isSendingSms={sendSms.isLoading}
      onBackToPhoneForm={handleBack}
      onSendSms={handleSendSms}
    />
  );
};

export default PhoneAuth;
