"use client";

import Button from "@/components/Button";
import { eraseCookie } from "@/utils/cookie";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut();
    eraseCookie("accessToken");
  };

  return (
    <Button
      className="w-full rounded-full"
      variant="social"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  );
};

export default LogoutButton;
