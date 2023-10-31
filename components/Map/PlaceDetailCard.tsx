import PlaceDetail from "./PlaceDetail";

interface PlaceDetailCardProps {
  place: google.maps.places.PlaceResult;
  isChoosing: boolean;
  onAddPlace: (place: google.maps.places.PlaceResult) => void;
  onRemovePlace: (place: google.maps.places.PlaceResult) => void;
}
const PlaceDetailCard = ({ place, ...others }: PlaceDetailCardProps) => {
  return (
    <div className="absolute left-[calc(25vw+16px)] top-16 w-[25vw] max-w-sm shadow xl:left-[400px]">
      <PlaceDetail place={place} {...others} />
    </div>
  );
};

export default PlaceDetailCard;
