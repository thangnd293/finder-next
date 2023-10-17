import ScrollArea from "@/components/ScrollArea";
import { DEFAULT_IMAGE } from "@/constant/common";
import { DEFAULT_ZOOM, LNG_PADDING } from "@/constant/map";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { Place } from "@/types/map";
import { getDetails, placeProxy } from "@/utils/google-map";
import { MarkerF } from "@react-google-maps/api";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import UserRating from "../UserRating";
import PlaceDetail from "./PlaceDetail";
import PlaceDetailCard from "./PlaceDetailCard";

interface SearchResultProps {
  selectedPlaces: Place[];
  onSelectedPlacesChange: (places: Place[]) => void;
}
const SearchResult = ({
  selectedPlaces,
  onSelectedPlacesChange,
}: SearchResultProps) => {
  const { map, searchResults, placeDetail, setPlaceDetail } = useStore(
    useShallow((state) => ({
      map: state.map,
      searchResults: state.searchResults,
      placeDetail: state.placeDetail,
      setPlaceDetail: state.setPlaceDetail,
    })),
  );

  const handlePlaceClick = (place_id: string) => {
    if (!map) return;

    getDetails(map, place_id, (place) => {
      const lat = place?.geometry?.location?.lat();
      const lng = place?.geometry?.location?.lng();

      if (!lat || !lng) return;
      map.panTo({
        lat,
        lng: lng - LNG_PADDING,
      });
      map.setZoom(DEFAULT_ZOOM);
      setPlaceDetail(place);
    });
  };

  const handleAddPlace = (place: google.maps.places.PlaceResult) => {
    const newPlace = placeProxy(place);

    const newPlaces = [...selectedPlaces, newPlace];
    onSelectedPlacesChange(newPlaces);
  };

  const handleRemovePlace = (place: google.maps.places.PlaceResult) => {
    const newPlaces = selectedPlaces.filter(
      (p) => p.place_id !== place.place_id,
    );
    onSelectedPlacesChange(newPlaces);
  };

  const showSidebar = !!placeDetail || !!searchResults;

  return (
    <>
      {showSidebar && (
        <div
          className={cn(
            "absolute bottom-0 left-0 top-0 w-[25vw] max-w-sm border-r bg-background",
            !!searchResults && "pt-18",
          )}
        >
          <ScrollArea className="h-full w-full overflow-hidden">
            {placeDetail && !searchResults && (
              <PlaceDetail
                place={placeDetail}
                isChoosing={selectedPlaces?.some(
                  (place) => place.place_id === placeDetail.place_id,
                )}
                onAddPlace={handleAddPlace}
                onRemovePlace={handleRemovePlace}
              />
            )}

            {searchResults && (
              <div className="full overflow-x-hidden">
                {searchResults.map((place) => (
                  <PlaceItem
                    key={place.place_id}
                    place={place}
                    onPlaceClick={handlePlaceClick}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}

      {placeDetail && (
        <MarkerF
          key={placeDetail.place_id}
          position={placeDetail.geometry?.location!}
          onClick={() => setPlaceDetail(placeDetail)}
          animation={google.maps.Animation.DROP}
          zIndex={999}
          icon={{
            url: "/images/pin-large.png",
          }}
        />
      )}

      {searchResults?.map((place) => (
        <MarkerF
          key={place.place_id}
          position={place.geometry?.location!}
          visible={
            !(
              place.place_id === placeDetail?.place_id ||
              selectedPlaces?.some((p) => p.place_id === place.place_id)
            )
          }
          icon={{
            url: "/images/pin-small.png",
          }}
          onClick={() => setPlaceDetail(place)}
        />
      ))}

      {placeDetail && searchResults && (
        <PlaceDetailCard
          place={placeDetail}
          isChoosing={selectedPlaces?.some(
            (place) => place.place_id === placeDetail.place_id,
          )}
          onAddPlace={handleAddPlace}
          onRemovePlace={handleRemovePlace}
        />
      )}
    </>
  );
};

export default SearchResult;

interface PlaceItemProps {
  place: google.maps.places.PlaceResult;
  onPlaceClick: (place_id: string) => void;
}

const PlaceItem = ({ place, onPlaceClick }: PlaceItemProps) => {
  const {
    place_id,
    user_ratings_total,
    name,
    rating,
    formatted_address,
    opening_hours,
    photos,
  } = place;
  return (
    <div
      key={place_id}
      className="flex cursor-pointer gap-3 border-b px-5 py-3 last:border-b-0 hover:bg-background-100"
      onClick={() => onPlaceClick(place_id!)}
    >
      <div className="flex-1 overflow-hidden text-sm">
        <h2 className="font-semibold">{name}</h2>

        {!!(rating && user_ratings_total) ? (
          <UserRating rating={rating} total={user_ratings_total} />
        ) : (
          <p className="text-muted-foreground">Chưa có đánh giá</p>
        )}
        <p className="text-muted-foreground">{formatted_address}</p>
        {opening_hours?.open_now && (
          <p className="font-light text-green-600">Đang mở cửa</p>
        )}
      </div>

      <div className="object-cover">
        <Image
          className="block aspect-square rounded-md object-cover object-center"
          src={photos?.[0].getUrl() ?? DEFAULT_IMAGE}
          alt={name ?? ""}
          width={84}
          height={84}
        />
      </div>
    </div>
  );
};
