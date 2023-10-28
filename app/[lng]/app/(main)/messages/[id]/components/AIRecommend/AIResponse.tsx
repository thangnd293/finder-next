import Button from "@/components/Button";
import DatingLocation from "@/components/DatingLocation";
import { Place } from "@/types/map";

interface AIResponseProps {
  suggestPlaces: Place[];
  onRegenerate: () => void;
  onOpenScheduleEditor: () => void;
}
const AIResponse = ({
  suggestPlaces,
  onRegenerate,
  onOpenScheduleEditor,
}: AIResponseProps) => {
  if (suggestPlaces.length === 0)
    return (
      <div className="w-full space-y-2 overflow-hidden text-sm">
        <p>Xin lỗi chúng tôi không tìm thấy địa điểm phù hợp ☹️</p>
        <div className="!mt-3 ml-auto w-fit space-x-2">
          <Button size="sm" onClick={onRegenerate}>
            Gợi ý lại
          </Button>
          <Button variant="accent" size="sm" onClick={onOpenScheduleEditor}>
            Tạo cuộc hẹn
          </Button>
        </div>
      </div>
    );

  return (
    <div className="w-full space-y-2 overflow-hidden text-sm">
      <p>Dưới đây là: </p>
      <div className="space-y-4">
        {suggestPlaces.map((place: Place) => (
          <DatingLocation key={place.place_id} {...place} />
        ))}
      </div>
      <div className="!mt-3 ml-auto w-fit space-x-2">
        <Button size="sm" onClick={onRegenerate}>
          Gợi ý lại
        </Button>
        <Button variant="accent" size="sm" onClick={onOpenScheduleEditor}>
          Tạo cuộc hẹn
        </Button>
      </div>
    </div>
  );
};

export default AIResponse;
