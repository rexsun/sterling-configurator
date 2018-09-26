import React from "react";

import Master from "../Master";
import StepNavigator from "../../components/StepNavigator";

const container = () => {
  return (
    <Master>
      <StepNavigator step={3} />
      <div>agreements</div>
    </Master>
  );
};

export default container;
