import { Offer } from "@/service/offer";
import Image from "next/image";
import { useState } from "react";
import CurrentOfferDialog from "./CurrentOfferDialog";

interface CurrentOfferProps extends Offer {
  expiredDate?: string;
}
const CurrentOffer = ({ iconUrl, ...others }: CurrentOfferProps) => {
  const [open, setOpen] = useState(false);
  const { type } = others;

  return (
    <>
      <button
        className="relative flex w-full cursor-pointer items-center space-y-1 rounded-full py-2 text-center hover:bg-background-50 md:px-8"
        onClick={() => setOpen(true)}
      >
        <Image width={30} height={30} src={iconUrl} alt={type} />

        <div className="absolute left-1/2 hidden -translate-x-1/2 pb-1 md:block">
          <p className="font-semibold">{type}</p>
          <p className="text-sm text-muted-foreground">Quản lý gói của bạn</p>
        </div>
      </button>
      <CurrentOfferDialog
        open={open}
        {...others}
        type={type}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default CurrentOffer;
