import ProvinceSelect from "@/components/ProvinceSelect";
import { useCurrentUser } from "@/service/user";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  homeTown: string;
  liveAt: string;
};

const LocationSetting = () => {
  const { data } = useCurrentUser();
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      homeTown: data?.homeTown?.province || "",
      liveAt: data?.homeTown?.province || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(
      "🚀 ~ file: LocationSetting.tsx ~ line 19 ~ onSubmit ~ data",
      data,
    );
  };

  return (
    <form className="space-y-3" onClick={handleSubmit(onSubmit)}>
      <Controller
        name="homeTown"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ProvinceSelect
            className="w-full space-y-1.5"
            label="Quê quán"
            value={value}
            error={error?.message}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name="liveAt"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ProvinceSelect
            className="w-full space-y-1.5"
            label="Sống tại"
            value={value}
            error={error?.message}
            onChange={onChange}
          />
        )}
      />
    </form>
  );
};

export default LocationSetting;
