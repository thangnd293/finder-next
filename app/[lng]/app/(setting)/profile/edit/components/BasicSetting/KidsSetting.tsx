import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const KidsSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Kế hoạch lý tưởng của bạn cho trẻ em là gì?"
      type={TagType.KIDS}
      {...props}
    />
  );
};

export default KidsSetting;
