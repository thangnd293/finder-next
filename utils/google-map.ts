import { Place } from "@/types/map";

export const searchPlaces = (
  map: google.maps.Map,
  keyword: string,
  location: google.maps.LatLngLiteral,
  cb: (
    a: google.maps.places.PlaceResult[] | null,
    b: google.maps.places.PlacesServiceStatus,
    c: google.maps.places.PlaceSearchPagination | null,
  ) => void,
) => {
  const service = new google.maps.places.PlacesService(map);

  const request: google.maps.places.TextSearchRequest = {
    location,
    radius: 500,
    query: keyword,
  };

  service.textSearch(request, cb);
};

export const getDetails = (
  map: google.maps.Map,
  placeId: string,
  cb: (
    a: google.maps.places.PlaceResult | null,
    b: google.maps.places.PlacesServiceStatus,
  ) => void,
) => {
  const service = new google.maps.places.PlacesService(map);

  service.getDetails(
    {
      placeId,
      language: "vi",
    },
    cb,
  );
};

export const placeProxy = (place: google.maps.places.PlaceResult): Place => {
  const {
    name,
    formatted_address,
    url,
    photos,
    place_id,
    international_phone_number,
    website,
    rating,
    user_ratings_total,
    geometry,
    reviews,
    price_level,
  } = place;

  const lat = geometry?.location?.lat();
  const lng = geometry?.location?.lng();

  if (!place_id || !name || !formatted_address || !url || !lat || !lng)
    throw new Error("Invalid place");

  return {
    place_id,
    name,
    url,
    address: formatted_address,
    image: photos?.[0].getUrl(),
    phoneNumber: international_phone_number,
    website,
    rating,
    userRatingsTotal: user_ratings_total,
    location: {
      lat,
      lng,
    },
    priceLevel: price_level,
    reviews,
  };
};
