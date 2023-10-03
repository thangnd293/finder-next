import RadioGroup from "@/components/RadioGroup";
import { Gender, useCurrentUser, useUpdateProfile } from "@/service/user";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

const GenderSetting = () => {
  const { data } = useCurrentUser({
    select: (user) => user.gender,
  });

  const [gender, setGender] = useState<Gender>(data ?? Gender.Male);

  const debouncedGender = useDebounce<Gender>(gender, 500);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    updateProfile.mutate({
      gender: debouncedGender,
    });
  }, [debouncedGender]);

  return (
    <RadioGroup
      className="space-y-1.5"
      label="Giới tính"
      data={genderData}
      value={gender}
      onChange={(value) => setGender(value as Gender)}
    />
  );
};

export default GenderSetting;

const genderData = [
  {
    label: "Nam",
    value: Gender.Male,
  },
  {
    label: "Nữ",
    value: Gender.Female,
  },
];
