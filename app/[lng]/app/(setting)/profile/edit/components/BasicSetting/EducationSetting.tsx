import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const EducationSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Trình độ học vấn của bạn là?"
      type={TagType.EDUCATION}
      {...props}
    />
  );
};

export default EducationSetting;
