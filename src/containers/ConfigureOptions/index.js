import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";

import reduxCompose from "../../utils/reduxCompose";
import reducer, { localState } from "./reducer";
import * as actions from "./actions";

import Master from "../Master";
import StepNavigator from "../../components/StepNavigator";

export class container extends React.PureComponent {
  render() {
    const self = this;
    const { currentStep, setCurrentStep } = self.props;
    return (
      <Master>
        <StepNavigator step={1} />
        <div>options, step: {currentStep}</div>
        <button onClick={_.partial(setCurrentStep, 1)}>Set Step 1</button>
        <button onClick={_.partial(setCurrentStep, 2)}>Set Step 2</button>
      </Master>
    );
  }
}

const reducerName = "ConfigureOptions";
const getState = state => state.get(reducerName, localState);

const mapState = {
  currentStep: {
    type: PropTypes.string.isRequired,
    getter: state => _.get(getState(state), ["currentStep"], "1")
  }
};

export default reduxCompose(container, reducerName, reducer, mapState, actions);
