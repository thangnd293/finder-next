import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValues: number[];
  className?: string;
  onChange?: (values: number[]) => void;
}

const RangeSlider = ({
  min,
  max,
  step,
  defaultValues,
  className,
  onChange,
}: RangeSliderProps) => {
  const [values, setValues] = useState(defaultValues);
  const handleChangeValue = (values: number[]) => {
    setValues(values);
    onChange && onChange(values);
  };

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={handleChangeValue}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "28px",
            display: "flex",
          }}
          className={className}
        >
          <div
            ref={props.ref}
            style={{
              height: "2px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors:
                  values.length === 1
                    ? ["#fd5b1d", "#7c8591"]
                    : ["#7c8591", "#fd5b1d", "#7c8591"],
                min: min,
                max: max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            outline: "none",
          }}
          className="border-gray-40 active:bg-gray-10 h-[28px] w-[28px] rounded-full border bg-white shadow-2xl hover:border-primary"
        />
      )}
    />
  );
};

export default RangeSlider;
