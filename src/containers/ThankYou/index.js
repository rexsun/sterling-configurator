import React from "react";

import Master from "../Master";

const container = () => {
  return (
    <Master currentStep={5} headerText="Thank you">
      <div className="mt-3">
        <div className="alert alert-secondary" role="alert">
          Congratulations! Your Sterling Widgets are all set.
        </div>
      </div>
    </Master>
  );
};

export default container;
