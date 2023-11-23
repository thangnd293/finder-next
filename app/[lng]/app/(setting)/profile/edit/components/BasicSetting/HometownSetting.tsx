"use client";

import ProvinceSelect from "@/components/ProvinceSelect";
import { useCurrentUser, useUpdateProfile } from "@/service/user";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

const HometownSetting = () => {
  const { data } = useCurrentUser({
    select: (user) => user.homeTown?.province,
  });

  const [hometown, setHometown] = useState(data ?? "");
  const debouncedHometown = useDebounce(hometown, 500);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (!debouncedHometown || data === debouncedHometown) return;

    updateProfile.mutate({
      homeTown: {
        province: debouncedHometown,
      },
    });
  }, [debouncedHometown]);

  return (
    <ProvinceSelect
      className="w-full space-y-1.5"
      label="Quê quán"
      value={hometown}
      placeholder="Quê quán của bạn"
      onChange={setHometown}
    />
  );
};

export default HometownSetting;
