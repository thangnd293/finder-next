import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface OptionsStepProps {
  isEditing?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
}
const OptionsStep = ({
  isEditing,
  options,
  value,
  onChange,
  onCancel,
}: OptionsStepProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onUpdate = () => {
    onChange(internalValue);
  };

  const onChangeValue = (newValue: string) => {
    setInternalValue(newValue);

    if (!isEditing) onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-center gap-2 pt-2">
        {options.map((type) => (
          <Button
            key={type}
            className={cn("rounded-full", {
              "bg-primary text-white": internalValue === type,
            })}
            variant="outline"
            size="xs"
            onClick={() => onChangeValue(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {isEditing && (
        <div className="flex items-center justify-end gap-2 px-3">
          <Button variant="ghost" size="xs" onClick={onCancel}>
            Huỷ
          </Button>
          <Button
            size="xs"
            disabled={internalValue === value}
            onClick={onUpdate}
          >
            Cập nhật
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptionsStep;
