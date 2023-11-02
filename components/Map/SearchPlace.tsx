import usePlacesAutocomplete from "use-places-autocomplete";
import QuickSearch from "./QuickSearch";
import SearchPlacesAutocomplete from "./SearchPlacesAutocomplete";
import { cn } from "@/lib/utils";
import { getDetails, searchPlaces } from "@/utils/google-map";
import { DEFAULT_LOCATION } from "@/constant/map";
import useStore from "@/store";
import { useShallow } from "zustand/react/shallow";

const SearchPlace = () => {
  const {
    map,
    currentPosition,
    searchResults,
    placeDetail,
    setPlaceDetail,
    setSearchResults,
  } = useStore(
    useShallow((state) => ({
      map: state.map,
      currentPosition: state.currentPosition,
      searchResults: state.searchResults,
      placeDetail: state.placeDetail,
      setSearchResults: state.setSearchResults,
      setPlaceDetail: state.setPlaceDetail,
    })),
  );

  const location = currentPosition || DEFAULT_LOCATION;

  const {
    value: keyword,
    suggestions: { status, data },
    setValue: setKeyword,
  } = usePlacesAutocomplete({
    requestOptions: {
      language: "vi",
      region: "VN",
      locationBias: {
        center: location,
        radius: 200 * 1000,
      },
    },
  });

  const handleSearch = (keyword: string) => {
    if (!keyword.trim() || !map) return;

    searchPlaces(map, keyword, location, (results) => {
      if (results?.length === 1) {
        getDetails(map, results[0].place_id!, (place) => {
          map?.panTo(place?.geometry?.location!);
          setPlaceDetail(place);
          setSearchResults(null);
        });

        return;
      }

      let latlngbounds = new google.maps.LatLngBounds();
      results?.forEach((result) =>
        latlngbounds.extend(result.geometry?.location!),
      );

      setSearchResults(results);
      setPlaceDetail(null);
      map.fitBounds(latlngbounds);
    });
  };

  const handleQuickSearch = (keyword: string) => {
    setKeyword(keyword);
    handleSearch(keyword);
  };

  return (
    <div
      className={cn(
        "absolute left-0 top-3 z-10 flex w-full flex-col items-center gap-4 transition-[gap] md:flex-row md:gap-0",
        !!(searchResults || placeDetail) && "!gap-4",
      )}
    >
      <SearchPlacesAutocomplete
        keyword={keyword}
        setKeyword={setKeyword}
        predictions={data}
        status={status}
        onSearch={() => handleSearch(keyword)}
        onQuickSearch={handleSearch}
      />

      <QuickSearch onSearch={handleQuickSearch} />
    </div>
  );
};

export default SearchPlace;
