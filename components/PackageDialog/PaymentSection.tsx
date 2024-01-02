import Button from "@/components/Button";
import Input from "@/components/Input";
import { PayPackagePayload, usePayPackage } from "@/service/helper";
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { BsCalendar, BsCreditCard, BsLock, BsPerson } from "react-icons/bs";
import { Package } from "@/service/offer";
import { toast } from "react-toastify";
import { useInvalidateCurrentUser } from "@/service/user";
import { useRouter } from "next/navigation";

interface FormValues {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

const validatePaymentForm = yup.object({
  number: yup.string().required("Please enter your card number"),
  name: yup.string().required("Please enter your name"),
  expiry: yup
    .string()
    .required("Please enter expiry date")
    .matches(/\b\d{2}\/(?:\d{2}|\d{4})\b/, "Is not in correct format"),
  cvc: yup.string().length(3, "CVC không hợp lệ").required("Please enter CVC"),
});

interface PaymentSectionProps {
  selectedPackage: Package;
  offerId: string;
  onClose: () => void;
}
const PaymentSection = ({
  offerId,
  selectedPackage,
  onClose,
}: PaymentSectionProps) => {
  const [focused, setFocused] = useState<Focused>("");
  const paymentFormResolver = useYupValidationResolver(validatePaymentForm);

  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      number: "4242424242424242",
      name: "Giang Nguyen",
      expiry: "10/2050",
      cvc: "123",
    },
    resolver: paymentFormResolver,
  });

  const payPackage = usePayPackage();
  const invalidateCurrentUser = useInvalidateCurrentUser();

  const handleInputFocus = (
    evt: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setFocused(evt.target.name as Focused);
  };

  const onSubmit = ({ cvc, expiry, number, name }: FormValues) => {
    const payload: PayPackagePayload = {
      cardNumber: {
        cvc: cvc,
        exp_month: +expiry.split("/")[0],
        number: number,
        exp_year: +expiry.split("/")[1],
      },
      packageId: selectedPackage._id,
      holderName: name,
      offeringId: offerId,
      postalCode: "10000",
    };
    payPackage.mutate(payload, {
      onError: () =>
        toast.error(
          "Thanh toán không thành công. Vui lòng kiểm tra lại thông tin thẻ hoặc số dư trong tài khoản của bạn",
        ),
      onSuccess: () => {
        toast.success("Thanh toán thành công");
        // invalidateCurrentUser();
        // router.refresh();
        document.location.reload();
        onClose();
      },
    });
  };

  const number = watch("number");
  const name = watch("name");
  const expiry = watch("expiry");
  const cvc = watch("cvc");

  return (
    <form
      className="w-full max-w-4xl space-y-6 rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-4 md:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-lg font-semibold text-gray-700">
        Nhập thẻ thanh toán của bạn
      </h3>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Cards
            number={number}
            expiry={expiry}
            cvc={cvc}
            name={name}
            focused={focused}
            locale={{ valid: "Giá trị tới" }}
          />
        </div>
        <div className="flex-1 space-y-6">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                labelClassName="text-gray-700"
                name="name"
                label="Tên chủ thẻ"
                placeholder="Nhập tên thẻ của bạn"
                leftIcon={<BsPerson />}
                value={value}
                error={error?.message}
                onChange={onChange}
                onFocus={handleInputFocus}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                labelClassName="text-gray-700"
                type="number"
                name="number"
                label="Số thẻ"
                placeholder="Nhập số thẻ của bạn"
                leftIcon={<BsCreditCard />}
                value={value}
                error={error?.message}
                onChange={onChange}
                onFocus={handleInputFocus}
              />
            )}
          />

          <div className="flex gap-3">
            <Controller
              control={control}
              name="expiry"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  labelClassName="text-gray-700"
                  className="flex-1"
                  name="expiry"
                  label="Ngày hết hạn"
                  placeholder="MM/YY"
                  leftIcon={<BsCalendar />}
                  value={value}
                  error={error?.message}
                  onChange={onChange}
                  onFocus={handleInputFocus}
                />
              )}
            />

            <Controller
              control={control}
              name="cvc"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  labelClassName="text-gray-700"
                  className="flex-1"
                  type="number"
                  name="cvc"
                  label="CVC"
                  placeholder="CVC"
                  leftIcon={<BsLock />}
                  error={error?.message}
                  value={value}
                  onChange={onChange}
                  onFocus={handleInputFocus}
                />
              )}
            />
          </div>
          <div className="space-y-2 rounded-xl bg-yellow-100 p-4 text-sm text-gray-700">
            <h4 className="font-semibold">Không tìm được CVC ?</h4>
            <p>
              CVC là số có 3 chữ số ở mặt sau thẻ của bạn. Nó xuất hiện ở mặt
              sau và bên phải số thẻ của bạn.
            </p>
          </div>
        </div>
      </div>

      <p className="rounded-xl border bg-yellow-100 p-4 font-semibold text-gray-700">
        Thanh toán định kỳ. Đăng ký của bạn sẽ tự động gia hạn và phương thức
        thanh toán sẽ được tính phí trong cùng thời gian và mức giá trừ khi bạn
        hủy ít nhất 24 giờ trước khi thời gian kết thúc. Để được hướng dẫn về
        cách hủy, hãy truy cập trang Câu hỏi thường gặp của chúng tôi. Bằng cách
        nhấn vào Chấp nhận và thanh toán, bạn đồng ý lưu chi tiết thanh toán của
        mình cho các lần mua hàng trong tương lai, để Thanh toán định kỳ và Điều
        khoản dịch vụ của Finder.
      </p>

      <Button
        className="mx-auto flex w-fit"
        variant="accent"
        type="submit"
        loading={payPackage.isLoading}
      >
        Thanh toán
      </Button>
    </form>
  );
};

export default PaymentSection;
