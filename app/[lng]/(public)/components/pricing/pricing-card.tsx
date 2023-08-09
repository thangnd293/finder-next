import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import SignUp from "../sign-up";

const features = [
  "Unlimited access to all courses",
  "Personalized learning plan",
  "Offline viewing",
  "No ads",
  "Cancel anytime",
];

interface IPricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "monthly" | "quarterly" | "yearly";
}
export default function PricingCard({
  variant = "monthly",
  className,
  ...others
}: IPricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-4xl border px-11 py-16 transition-transform duration-300 will-change-transform hover:-translate-y-3",
        {
          "bg-primary-foreground": variant === "quarterly",
          "bg-accent-background text-accent sm:grid sm:grid-cols-2 sm:gap-24 lg:block":
            variant === "yearly",
        },
        className,
      )}
      {...others}
    >
      <div>
        <p
          className={cn(
            libreBaskerville.className,
            "text-xl",
            variant === "yearly" && "text-accent",
          )}
        >
          {variant.capitalizeFirstLetter()}
        </p>
        <p
          className={cn(
            "mt-2 text-secondary-foreground",
            variant === "yearly" && "text-accent-secondary",
          )}
        >
          Gives you the most freedom. Perfect if you want to try the membership
          out.
        </p>
        <p
          className={cn(libreBaskerville.className, "mt-5 text-4xl font-light")}
        >
          $4,999 <span className="text-base">/mo.</span>
        </p>
        <SignUp
          className="my-6 w-full rounded-lg"
          variant={
            {
              monthly: "outline",
              quarterly: "default",
              yearly: "outline",
            }[variant] as any
          }
        />
      </div>
      <div>
        <p className="font-bold">What&apos;s included</p>
        <ul className="mt-3 list-none space-y-3">
          {features.map((feature, index) => (
            <li key={index}>
              <p className="flex items-center gap-1.5 text-sm font-light">
                <CheckIcon /> {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
