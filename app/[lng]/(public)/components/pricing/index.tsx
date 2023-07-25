import Button from "@/components/button";
import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import { ITranslation } from "@/type/common";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Heading from "../heading";
import PricingCard from "./pricing-card";

interface IPricingProps extends ITranslation {}
export default function Pricing({ t }: IPricingProps) {
  return (
    <div className="container pb-32">
      <Heading subtitle="Discover" title="Our" highlight="Pricing" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
        <PricingCard />
        <PricingCard variant="quarterly" />
        <PricingCard className="sm:col-span-2 lg:col-span-1" variant="yearly" />

        <div className="flex flex-col justify-between gap-6 rounded-4xl border px-11 py-10 sm:col-span-2 sm:flex-row lg:col-span-3">
          <div className="space-y-2 sm:max-w-[66%] sm:space-y-1">
            <p className={cn(libreBaskerville.className, "text-xl")}>
              Are you interested in a quoted project?
            </p>
            <p className="text-secondary-foreground">
              If your project doesn&rsquo;t fit in the above plans, or if
              you&rsquo;d like to discuss before making up your mind, book a
              call with us.
            </p>
          </div>
          <Button variant="accent" size="lg" leftIcon={<ArrowRightIcon />}>
            Join now
          </Button>
        </div>
      </div>
    </div>
  );
}
