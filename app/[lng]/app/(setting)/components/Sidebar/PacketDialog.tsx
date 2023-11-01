import { PremiumIcon } from "@/assets/icons";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import { PayPackagePayload, usePayPackage } from "@/service/helper";
import { Offer, Package } from "@/service/offer";
import Image from "next/image";
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import ActionIcon from "@/components/ActionIcon";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import {
  BsCalendar,
  BsCreditCard,
  BsLock,
  BsPerson,
  BsXLg,
} from "react-icons/bs";

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

interface PacketDialogProps extends Offer {
  onClose: () => void;
}
const PacketDialog = ({
  _id,
  type,
  iconUrl,
  merchandising,
  packages,
  primaryColor,
  onClose,
}: PacketDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);

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
      offeringId: _id,
      postalCode: "10000",
    };
    payPackage.mutate(payload);
  };

  const number = watch("number");
  const name = watch("name");
  const expiry = watch("expiry");
  const cvc = watch("cvc");

  return (
    <Modal
      className="items-center gap-8 overflow-y-auto p-8"
      size="full"
      closeOnClickOutside={false}
      onOpenChange={onClose}
    >
      <ActionIcon
        className="absolute right-3 top-2 rounded-full"
        variant="ghost"
        onClick={onClose}
      >
        <BsXLg />
      </ActionIcon>
      <header
        className="flex items-center justify-center gap-2 text-3xl font-semibold"
        style={{
          color: primaryColor,
        }}
      >
        <Image width={30} height={30} src={iconUrl} alt={type} />
        {type}
      </header>

      <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-8">
        <h3 className="text-lg font-semibold">Mở khóa {type}</h3>

        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col justify-between space-y-20 text-sm font-semibold">
            <div className="space-y-2.5">
              {merchandising.map((item, index) => (
                <p key={index} className="flex items-center gap-2">
                  <Image
                    width={30}
                    height={30}
                    src={item.iconUrl}
                    alt={item.text}
                  />

                  <span>{item.text}</span>
                </p>
              ))}
            </div>

            <p>
              Bạn sẽ thanh toán{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: selectedPackage.currency,
              }).format(selectedPackage.price)}{" "}
              cứ sau {selectedPackage.refreshInterval} tháng
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {packages.map((item) => (
              <button
                key={item._id}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 font-semibold",
                  {
                    "border-2 border-black": item._id === selectedPackage._id,
                  },
                )}
                onClick={() => setSelectedPackage(item)}
              >
                <div className="flex items-center gap-2">
                  <PremiumIcon width={46} />
                  {item.refreshInterval} tháng
                </div>

                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: item.currency,
                  }).format(item.price)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        className="w-full max-w-4xl space-y-6 rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-lg font-semibold">
          Nhập thẻ thanh toán của bạn
        </h3>

        <div className="flex gap-4">
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
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
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
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
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
            <div className="space-y-2 rounded-xl bg-yellow-100 p-4 text-sm">
              <h4 className="font-semibold">Không tìm được CVC ?</h4>
              <p>
                CVC là số có 3 chữ số ở mặt sau thẻ của bạn. Nó xuất hiện ở mặt
                sau và bên phải số thẻ của bạn.
              </p>
            </div>
          </div>
        </div>

        <p className="rounded-xl border bg-yellow-100 p-4 font-semibold ">
          Thanh toán định kỳ. Đăng ký của bạn sẽ tự động gia hạn và phương thức
          thanh toán sẽ được tính phí trong cùng thời gian và mức giá trừ khi
          bạn hủy ít nhất 24 giờ trước khi thời gian kết thúc. Để được hướng dẫn
          về cách hủy, hãy truy cập trang Câu hỏi thường gặp của chúng tôi. Bằng
          cách nhấn vào Chấp nhận và thanh toán, bạn đồng ý lưu chi tiết thanh
          toán của mình cho các lần mua hàng trong tương lai, để Thanh toán định
          kỳ và Điều khoản dịch vụ của Finder.
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
    </Modal>
  );
};

export default PacketDialog;
