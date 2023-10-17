export interface Place {
  place_id: string;
  name: string;
  url: string;
  address: string;
  image?: string;
  phoneNumber?: string;
  website?: string;
  rating?: number;
  userRatingsTotal?: number;
  location: {
    lat: number;
    lng: number;
  };
  priceLevel?: number;
  reviews?: google.maps.places.PlaceReview[];
}
