export interface Offer {
  _id: string;
  iconUrl: string;
  text: string;
  primaryColor: string;
  type: string;
  background: string;
  packages: Package[];
  merchandising: Feature[];
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
  type: string;
  amount: number;
  refreshInterval: number;
  refreshIntervalUnit: string;
  iconUrl: string;
  text: string;
}
