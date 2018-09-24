import React, { Fragment } from "react";
import PropTypes from "prop-types";

import LoadingScreen from "../../components/LoadingScreen";

import { connect } from "react-redux";
import { compose } from "redux";

import injectReducer from "../../utils/injectReducer";

import reducer, { localState } from "./reducer";

/* eslint-disable react/prefer-stateless-function */
export class LoadingScreenContainer extends React.PureComponent {
  render() {
    const { isLoading } = this.props;
    return (
      isLoading && (
        <Fragment>
          <LoadingScreen />
        </Fragment>
      )
    );
  }
}

LoadingScreenContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export function mapStateToProps(state) {
  const loadingScreenState = state.get("loadingScreen", localState);
  return {
    isLoading: loadingScreenState.isLoading
  };
}

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: "loadingScreen", reducer });

export default compose(
  withReducer,
  withConnect
)(LoadingScreenContainer);
