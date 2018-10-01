import React from "react";
import { Input } from "reactstrap";

import Master from "../Master";

const container = () => {
  return (
    <Master currentStep={4} headerText="Request Web Token">
      <div className="mt-3">
        <Input
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Company Name"
        />
      </div>
      <div className="mt-3">
        <Input type="email" name="email" id="email" placeholder="Email" />
      </div>
      <div className="mt-3">
        <Input type="text" name="phone" id="phone" placeholder="Telephone" />
      </div>
      <div className="mt-3 mb-2">
        <Input type="text" name="domain" id="domain" placeholder="Domain" />
      </div>
    </Master>
  );
};

export default container;
