import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { Input } from "reactstrap";

import Master from "../Master";
import StepNavigator from "../../components/StepNavigator";

const FixedHeightContainer = styled.div`
height: 330px;
overflow: scroll;
border: 2px solid #eee;
padding: 20px;
`;

const container = () => {
  return (
    <Master currentStep={3} headerText="Master Service Agreement">
      <FixedHeightContainer>
        <h4 className="text-center mt-3">STERLINGNOW SERVICE AGREEMENT</h4>
        <div className="mt-3">
          This SterlingNow Service Agreement (this “Agreement”) is entered into
          by and between Sterling Infosystems, Inc. dba Sterling Talent
          Solutions with offices located at 1 State Street Plaza, 24th
        </div>
        <div className="mt-3">
          Floor, New York, NY 10004 (“Sterling”) and you or the entity on whose
          behalf you are accepting this Agreement, as applicable (“Client”,
          “You”, or “Your”). This Agreement sets forth the terms and conditions
          that govern Your access to and use of the SterlingNow platform
          (“Platform”) and the Sterling screening services available via the
          Platform (“Services”).
        </div>
        <div className="mt-3">
          BY CHECKING THE BOX INDICATING ACCEPTANCE OF THIS AGREEMENT AND
          CLICKING THE BUTTON TO CONTINUE, OR BY OTHER MEANS PROVIDED BY
          STERLING FOR ACCEPTANCE, YOU (A) ACCEPT THIS AGREEMENT AND AGREE THAT
          YOU ARE LEGALLY BOUND BY ITS TERMS EFFECTIVE AS OF THE DATE OF
          ACCEPTANCE (“EFFECTIVE DATE”); AND (B) REPRESENT AND WARRANT THAT: (I)
          YOU ARE OF LEGAL AGE TO ENTER INTO A BINDING AGREEMENT; AND (II) IF
          YOU ARE ENTERING INTO THIS AGREEMENT FOR A CORPORATION, GOVERNMENTAL
          ORGANIZATION, OR OTHER LEGAL ENTITY, YOU HAVE THE RIGHT, POWER, AND
          AUTHORITY TO ENTER INTO THIS AGREEMENT ON BEHALF OF SUCH LEGAL ENTITY
          AND BIND SUCH LEGAL ENTITY TO THIS AGREEMENT AND ANY REFERENCES TO
          "YOU" OR "YOUR" IN THIS AGREEMENT REFER TO SUCH ENTITY AND ALL OF ITS
          EMPLOYEES, CONTRACTORS, AGENTS AND REPRESENTATIVES. IF YOU DO NOT
          AGREE TO THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MUST NOT
          ACCEPT OR SIGN THIS AGREEMENT AND MAY NOT USE THE PLATFORM OR
          SERVICES.{" "}
        </div>
      </FixedHeightContainer>
      <div className="mt-3">
        <Input
          type="text"
          name="signature"
          id="signature"
          placeholder="Signature"
        />
      </div>
    </Master>
  );
};

export default container;
