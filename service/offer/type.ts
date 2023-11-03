import { List } from "@/types/http";

export interface Offer {
  _id: string;
  iconUrl: string;
  text: string;
  primaryColor: string;
  type: string;
  background: string;
  packages: Package[];
  merchandising: Feature[];
  isRetail?: boolean;
}

export interface Package {
  price: number;
  originalPrice: number;
  refreshInterval: number;
  refreshIntervalUnit: string;
  currency: string;
  discount: number;
  _id: string;
}

export interface Feature {
  name: string;
  type: string;
  amount: number;
  refreshInterval: number;
  refreshIntervalUnit: string;
  iconUrl: string;
  text: string;
}

interface OfferMetadata {
  metadata: {
    featureGroup: Offer["merchandising"];
  };
}

export type OfferResponse = List<Offer> & OfferMetadata;
