import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";
const PersonalitySetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Kiểu tính cách của bạn là gì?"
      type={TagType.PERSONALITY_TYPE}
      {...props}
    />
  );
};

export default PersonalitySetting;
