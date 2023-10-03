import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const DrinkSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory title="Tửu lượng của bạn" type={TagType.DRINK} {...props} />
  );
};

export default DrinkSetting;
