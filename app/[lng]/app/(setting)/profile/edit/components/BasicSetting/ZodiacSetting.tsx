import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const ZodiacSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Cung hoàng đạo của bạn là gì?"
      type={TagType.ZODIAC}
      {...props}
    />
  );
};

export default ZodiacSetting;
