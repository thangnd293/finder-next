import PlaceDetail from "./PlaceDetail";

interface PlaceDetailCardProps {
  place: google.maps.places.PlaceResult;
  isChoosing: boolean;
  onAddPlace: (place: google.maps.places.PlaceResult) => void;
  onRemovePlace: (place: google.maps.places.PlaceResult) => void;
  onClose: () => void;
}
const PlaceDetailCard = ({ place, ...others }: PlaceDetailCardProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full shadow md:absolute md:left-[calc(25vw+16px)] md:top-16 md:w-[25vw] md:min-w-[314px] md:max-w-sm xl:left-[400px]">
      <PlaceDetail place={place} {...others} />
    </div>
  );
};

export default PlaceDetailCard;
