import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const PetsSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Bạn có thú cưng không?"
      type={TagType.PETS}
      {...props}
    />
  );
};

export default PetsSetting;
