import _ from "lodash";
import React from "react";

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
                className={
                  "nav-link" + (idx + 1 === step ? " active disabled" : "")
                }
                href={"#step" + val}
              >
                {val}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepNavigator;
