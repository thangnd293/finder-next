import ActionIcon from "@/components/ActionIcon";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { Combobox } from "@headlessui/react";
import { CiLocationOn } from "react-icons/ci";
import { MdClear, MdSearch } from "react-icons/md";
import { Status } from "use-places-autocomplete";
import { useShallow } from "zustand/react/shallow";

interface SearchPlacesAutocompleteProps {
  keyword: string;
  status: Status;
  predictions: google.maps.places.AutocompletePrediction[];
  setKeyword: (keyword: string) => void;
  onSearch: () => void;
  onQuickSearch: (keyword: string) => void;
}

const SearchPlacesAutocomplete = ({
  keyword,
  status,
  predictions,
  setKeyword,
  onSearch,
  onQuickSearch,
}: SearchPlacesAutocompleteProps) => {
  const { setPlaceDetail, setSearchResults } = useStore(
    useShallow((state) => ({
      setSearchResults: state.setSearchResults,
      setPlaceDetail: state.setPlaceDetail,
    })),
  );

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onClearSearch = () => {
    setKeyword("");
    setSearchResults(null);
    setPlaceDetail(null);
  };

  const handleQuickSearch = (keyword: string) => {
    setKeyword(keyword);
    onQuickSearch(keyword);
  };

  return (
    <div className="w-full px-4 md:w-[25vw] md:min-w-[314px] md:max-w-sm">
      <Combobox value={keyword} onChange={handleQuickSearch}>
        {({ open }) => {
          const isShowAutocomplete =
            open && status === "OK" && !!keyword.trim();

          return (
            <>
              <div
                className={cn(
                  "relative flex items-center rounded-full border bg-white py-3 pl-6 pr-28",
                  {
                    "rounded-b-none rounded-t-2xl": isShowAutocomplete,
                  },
                )}
              >
                <Combobox.Button
                  className="w-full"
                  onClick={(e) => {
                    if (open) e.preventDefault();
                  }}
                >
                  <Combobox.Input
                    className="w-full border-none text-sm outline-none"
                    type="text"
                    placeholder="Tìm kiếm địa điểm"
                    autoComplete="off"
                    onChange={onKeywordChange}
                  />
                </Combobox.Button>

                <div className="absolute right-0 top-0 flex items-center">
                  <ActionIcon
                    className="h-12 w-12 text-muted-foreground hover:text-primary"
                    variant="transparent"
                    disabled={!keyword.trim()}
                    onClick={onSearch}
                  >
                    <MdSearch size={24} />
                  </ActionIcon>
                  <ActionIcon
                    className="h-12 w-12 text-muted-foreground hover:text-primary"
                    variant="transparent"
                    disabled={!keyword.trim()}
                    onClick={onClearSearch}
                  >
                    <MdClear size={24} />
                  </ActionIcon>
                </div>
              </div>

              {isShowAutocomplete && (
                <Combobox.Options
                  className="mx-0.5 rounded-b-2xl bg-background shadow"
                  static
                >
                  {predictions.map((item) => (
                    <Combobox.Option
                      key={item.place_id}
                      value={item.structured_formatting.main_text}
                      className="flex cursor-pointer items-center px-4 py-3 text-sm ui-active:bg-background-50"
                    >
                      <CiLocationOn className="ml-1.5 mr-4 flex-shrink-0" />
                      <p className="flex-1 truncate">
                        <span>{item.structured_formatting.main_text}</span>
                        &nbsp;
                        <span className="text-muted-foreground">
                          {item.structured_formatting.secondary_text}
                        </span>
                      </p>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </>
          );
        }}
      </Combobox>
    </div>
  );
};

export default SearchPlacesAutocomplete;
