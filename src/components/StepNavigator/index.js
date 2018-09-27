import _ from "lodash";
import React from "react";
import classnames from "classnames";
import styled from "styled-components";

const StepLabel = styled.span`
  font-size: 20px;
  line-height: 24px;
`;

const StepNavigator = props => {
  const { step } = props;

  if (step < 1 || step > 4) {
    return null;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="nav nav-pills nav-fill">
          {_.map([1, 2, 3, 4], (val, idx) => (
            <li className="nav-item" key={"step" + val}>
              <a
                className={classnames("nav-link", {
                  "active disabled": idx + 1 === step
                })}
                href={"#step" + val}
              >
                <StepLabel>{val}</StepLabel>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepNavigator;
