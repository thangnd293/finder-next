import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const DietarySetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Chế độ ăn của bạn là gì?"
      type={TagType.DIETARY_PREFERENCE}
      {...props}
    />
  );
};

export default DietarySetting;
