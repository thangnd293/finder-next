import Modal from "@/components/Modal";
import { Offer, Package } from "@/service/offer";
import Image from "next/image";
import { useState } from "react";

import ActionIcon from "@/components/ActionIcon";
import { BsXLg } from "react-icons/bs";
import PaymentSection from "./PaymentSection";
import PriceSection from "./PriceSection";

interface PacketDialogProps extends Offer {
  onClose: () => void;
}
const PacketDialog = ({
  _id,
  type,
  iconUrl,
  style,
  packages,
  merchandising,
  onClose,
}: PacketDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);

  return (
    <Modal
      className="items-center gap-8 overflow-y-auto p-6"
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
          color: style.primaryColor,
        }}
      >
        <Image width={30} height={30} src={iconUrl} alt={type} />
        {type}
      </header>
      <PriceSection
        type={type}
        merchandising={merchandising}
        packages={packages}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />

      <PaymentSection offerId={_id} selectedPackage={selectedPackage} />
    </Modal>
  );
};

export default PacketDialog;
