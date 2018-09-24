import React from "react";

import LoadingIndicator from "../LoadingIndicator";

import WholeScreen from "./WholeScreen";

const LoadingScreen = () => (
  <WholeScreen>
    <LoadingIndicator size={100} />
  </WholeScreen>
);

export default LoadingScreen;
