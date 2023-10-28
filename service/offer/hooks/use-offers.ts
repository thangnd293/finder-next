import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../offer-service";

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: OfferService.getOffers,
  });
};
