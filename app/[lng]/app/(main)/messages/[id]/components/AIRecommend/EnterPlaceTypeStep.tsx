import OptionsStep from "./OptionsStep";

interface EnterPlaceTypeStepProps {
  isEditing?: boolean;
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
}
const EnterPlaceTypeStep = ({
  isEditing,
  value,
  onChange,
  onCancel,
}: EnterPlaceTypeStepProps) => {
  return (
    <OptionsStep
      options={placeTypeOptions}
      isEditing={isEditing}
      value={value}
      onChange={onChange}
      onCancel={onCancel}
    />
  );
};
export default EnterPlaceTypeStep;

const placeTypeOptions = [
  "Nhà hàng",
  "Quán cà phê",
  "Quán bar",
  "Quán ăn",
  "Khách sạn",
  "Tôi chưa có ý tưởng",
];
