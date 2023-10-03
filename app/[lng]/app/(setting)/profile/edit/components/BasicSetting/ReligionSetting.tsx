import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const ReligionSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Bạn có theo tôn giáo nào không?"
      type={TagType.RELIGION}
      {...props}
    />
  );
};

export default ReligionSetting;
