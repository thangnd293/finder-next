"use client";

import Button from "@/components/button";
import React from "react";
import { signOut } from "next-auth/react";
import { eraseCookie } from "@/utils/cookie";

export default function ButtonLogout() {
  const handleSignOut = () => {
    signOut();
    eraseCookie("accessToken");
  };
  return <Button onClick={handleSignOut}>Log out</Button>;
}
