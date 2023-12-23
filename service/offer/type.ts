import { List } from "@/types/http";

export interface Offer {
  _id: string;
  iconUrl: string;
  text: string;
  type: string;
  packages: Package[];
  merchandising: Feature[];
  isRetail?: boolean;
  style: {
    buttonColor: string;
    buttonBackground: string;
    background: string;
    primaryColor: string;
  };
  level?: number;
}

export interface Package {
  amount: number;
  price: number;
  originalPrice: number;
  refreshInterval: number;
  refreshIntervalUnit: RefreshIntervalUnit;
  currency: string;
  discount: number;
  _id: string;
}

export enum RefreshIntervalUnit {
  MINUTES = "Minutes",
  HOURS = "Hours",
  DAY = "Day",
  WEEK = "Week",
  MONTH = "Month",
  YEAR = "Year",
}

export interface Feature {
  name: string;
  type: string;
  amount: number;
  refreshInterval: number;
  refreshIntervalUnit: RefreshIntervalUnit;
  iconUrl: string;
  text: string;
}

interface OfferMetadata {
  metadata: {
    featureGroup: Offer["merchandising"];
  };
}

export type OfferResponse = List<Offer> & OfferMetadata;
