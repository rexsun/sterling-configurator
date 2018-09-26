import React from "react";

import Master from "../Master";
import StepNavigator from "../../components/StepNavigator";

const container = () => {
  return (
    <Master>
      <StepNavigator step={4} />
      <div>secrets</div>
    </Master>
  );
};

export default container;
