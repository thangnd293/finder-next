"use client";

import ProvinceSelect from "@/components/ProvinceSelect";
import { useCurrentUser, useUpdateProfile } from "@/service/user";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

const LiveAtSetting = () => {
  const { data } = useCurrentUser({
    select: (user) => user.liveAt.province,
  });

  const [liveAt, setLiveAt] = useState(data ?? "");
  const debouncedHometown = useDebounce(liveAt, 500);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    updateProfile.mutate({
      liveAt: {
        province: debouncedHometown,
      },
    });
  }, [debouncedHometown]);

  return (
    <ProvinceSelect
      className="w-full space-y-1.5"
      label="Sống tại"
      value={liveAt}
      placeholder="Nơi ở hiện tại"
      onChange={setLiveAt}
    />
  );
};

export default LiveAtSetting;
