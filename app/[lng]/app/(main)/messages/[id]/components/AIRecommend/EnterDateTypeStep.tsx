import OptionsStep from "./OptionsStep";

interface EnterDateTypeStepProps {
  isEditing?: boolean;
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
}
const EnterDateTypeStep = ({
  isEditing,
  value,
  onChange,
  onCancel,
}: EnterDateTypeStepProps) => {
  return (
    <OptionsStep
      options={dateTypeOptions}
      isEditing={isEditing}
      value={value}
      onChange={onChange}
      onCancel={onCancel}
    />
  );
};

export default EnterDateTypeStep;

const dateTypeOptions = [
  "Lãng mạn",
  "Năng động",
  "Thoải mái",
  "Thư giãn",
  "Sao cũng được",
];
