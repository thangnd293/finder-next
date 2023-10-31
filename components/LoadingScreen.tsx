import React from "react";
import Loader from "./Loader";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader size={60} />
    </div>
  );
};

export default LoadingScreen;
