import { PremiumIcon } from "@/assets/icons";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";

import {
  BsCalendar,
  BsCreditCard,
  BsLock,
  BsPerson,
  BsQuestionCircle,
} from "react-icons/bs";

interface FormValues {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

interface PacketDialogProps {
  onClose: () => void;
}
const PacketDialog = ({ onClose }: PacketDialogProps) => {
  const [state, setState] = useState<FormValues>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (
    evt: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
  };

  return (
    <Modal
      className="gap-8"
      size="full"
      closeOnClickOutside={false}
      onOpenChange={onClose}
    >
      <header className="flex items-center justify-center gap-2 text-3xl font-semibold text-yellow-500">
        <PremiumIcon width={30} /> Premium
      </header>

      <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-8">
        <h3 className="text-lg font-semibold">Mở khóa Finder Premium</h3>

        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col justify-between text-sm font-semibold">
            <div className="space-y-2.5">
              <p>See who&apos;s swiped right on you in your Beeline</p>
              <p>
                Focus on what you&apos;re really looking for with Advanced
                Filters
              </p>
              <p>
                You also get all Boost features like Rematch, Extend, Spotlight
                and more.
              </p>
            </div>

            <p>You will be charged 889,000₫ every 6 months. Cancel anytime</p>
          </div>

          <div className="flex-1 space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 font-semibold",
                  {
                    "border-2 border-black": true,
                  },
                )}
              >
                <div className="flex items-center gap-2">
                  <PremiumIcon width={46} />6 months
                </div>

                <span>889,000₫</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-6 rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-8">
        <h3 className="text-center text-lg font-semibold">
          Enter your card details
        </h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
          </div>
          <form className="flex-1 space-y-6">
            <Input
              name="name"
              label="Cardholder Name"
              placeholder="Nhập tên thẻ của bạn"
              leftIcon={<BsPerson />}
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Input
              type="number"
              name="number"
              label="Card Number"
              placeholder="Nhập số thẻ của bạn"
              leftIcon={<BsCreditCard />}
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />

            <div className="flex gap-3">
              <Input
                className="flex-1"
                name="expiry"
                label="Expiry"
                placeholder="MM/YY"
                leftIcon={<BsCalendar />}
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <Input
                className="flex-1"
                type="number"
                name="cvc"
                label="CVC"
                placeholder="CVC"
                leftIcon={<BsLock />}
                rightIcon={<BsQuestionCircle />}
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="space-y-2 rounded-xl bg-yellow-100 p-4 text-sm">
              <h4 className="font-semibold">How to find the CVC ?</h4>
              <p>
                The CVC is a 3-digit number on the back of your card. It appears
                after and to the right of your card number.
              </p>
            </div>
          </form>
        </div>

        <p className="rounded-xl border bg-yellow-100 p-4 font-semibold ">
          Recurring Billing. Your subscription will automatically renew and your
          payment method will be charged for the same period and price unless
          you cancel at least 24 hours before the period ends. For instructions
          on how to cancel, visit our FAQs page. By tapping on Accept and Pay,
          you agree to save your payment details for future purchases, to
          Recurring Billing and to Finder&apos;s Terms of Service.
        </p>

        <Button className="mx-auto flex w-fit" variant="accent">
          Accept and Pay
        </Button>
      </div>
    </Modal>
  );
};

export default PacketDialog;
