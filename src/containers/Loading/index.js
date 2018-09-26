import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";

import reduxCompose from "../../utils/reduxCompose";
import reducer, { localState } from "./reducer";
import { initState } from "../../configureStore";

import LoadingScreen from "../../components/LoadingScreen";

export class container extends React.PureComponent {
  render() {
    const self = this;
    const { isLoading } = self.props;
    return !isLoading ? (
      <div />
    ) : (
      <Fragment>
        <LoadingScreen />
      </Fragment>
    );
  }
}

const reducerName = "loadingScreen";
const getState = state => state.get(reducerName, initState);

const mapState = {
  isLoading: {
    type: PropTypes.string,
    getter: state => _.get(getState(state), ["isLoading"], "")
  }
};

export default reduxCompose(container, reducerName, reducer, mapState, null);
