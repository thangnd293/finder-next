import React from "react";
import Loader from "./Loader";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary-100">
      <Loader />
    </div>
  );
};

export default LoadingScreen;
