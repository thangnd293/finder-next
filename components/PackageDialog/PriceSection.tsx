import { PremiumIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Offer, Package } from "@/service/offer";
import Image from "next/image";

interface PriceSectionProps
  extends Pick<Offer, "type" | "merchandising" | "packages"> {
  selectedPackage: Package;
  setSelectedPackage: (pack: Package) => void;
}

const PriceSection = ({
  type,
  merchandising,
  packages,
  selectedPackage,
  setSelectedPackage,
}: PriceSectionProps) => {
  return (
    <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-400 p-4 md:p-8">
      <h3 className="text-lg font-semibold">Mở khóa {type}</h3>

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-col justify-between space-y-10 text-sm font-semibold md:space-y-20">
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
  );
};

export default PriceSection;
