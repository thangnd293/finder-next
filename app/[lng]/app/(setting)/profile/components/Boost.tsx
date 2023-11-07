"use client";

import PacketDialog from "@/components/PackageDialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Offer } from "@/service/offer";
import { useCurrentUser } from "@/service/user";
import { TiFlash } from "react-icons/ti";

interface BoostProps {
  offer: Offer;
}
const Boost = ({ offer }: BoostProps) => {
  const { isOpen, close, open } = useDisclosure();

  const { data: featureAccess } = useCurrentUser({
    select: (user) => user.featureAccess,
  });

  const boost = featureAccess?.find((feature) => feature.name === "Boosts");

  return (
    <>
      <button
        className="flex w-1/2 flex-col items-center justify-center space-y-1 px-4 py-3"
        onClick={open}
      >
        <TiFlash className="text-violet-500" size={22} />
        <span className="text-sm">{boost?.amount} lượt boost</span>
      </button>
      {isOpen && <PacketDialog {...offer} onClose={close} />}
    </>
  );
};

export default Boost;
