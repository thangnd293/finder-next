import Button from "@/components/Button";
import { Offer } from "@/service/offer";
import { useState } from "react";
import CurrentOfferDialog from "../../components/Sidebar/CurrentOfferDialog";

interface CurrentOfferProps extends Offer {
  expiredDate?: string;
}
const CurrentOffer = ({ iconUrl, ...others }: CurrentOfferProps) => {
  const [open, setOpen] = useState(false);
  const { type } = others;

  return (
    <>
      <Button
        className="rounded-full"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        Gói của bạn
      </Button>

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
