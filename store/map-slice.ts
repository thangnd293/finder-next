import { StateCreator } from "zustand";

export interface MapSlice {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  searchResults: google.maps.places.PlaceResult[] | null;
  setSearchResults: (results: google.maps.places.PlaceResult[] | null) => void;
  placeDetail: google.maps.places.PlaceResult | null;
  setPlaceDetail: (place: google.maps.places.PlaceResult | null) => void;
  currentPosition: google.maps.LatLngLiteral | null;
  setCurrentPosition: (
    currentPosition: google.maps.LatLngLiteral | null,
  ) => void;
  reset: () => void;
}

const createMapSlice: StateCreator<MapSlice, [], [], MapSlice> = (set) => ({
  map: null,
  setMap: (map) => set({ map }),
  searchResults: null,
  setSearchResults: (searchResults) => set({ searchResults }),
  placeDetail: null,
  setPlaceDetail: (placeDetail) => set({ placeDetail }),
  currentPosition: null,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  reset: () =>
    set({
      map: null,
      searchResults: null,
      placeDetail: null,
      currentPosition: null,
    }),
});

export default createMapSlice;
