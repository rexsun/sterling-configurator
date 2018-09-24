import React from "react";

import LoadingIndicator from "../LoadingIndicator";

import WholeScreen from "./WholeScreen";

const LoadingScreen = () => (
  <WholeScreen children={<LoadingIndicator size={100} />} />
);

export default LoadingScreen;
