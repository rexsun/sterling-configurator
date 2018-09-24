import React from "react";
import PropTypes from "prop-types";
// @TODO: the performance of MUI circular progress is bad. need to find another solution
import Circle from "./Circle";

const LoadingIndicator = props => {
  const { error, size } = props;

  // eslint-disable-next-line no-console
  if (error) console.error(error);
  return (
    <div style={`width: ${size}px; height: ${size}px`}>
      <Circle />
    </div>
  );
};

LoadingIndicator.propTypes = {
  error: PropTypes.any,
  size: PropTypes.number
};

LoadingIndicator.defaultProps = {
  size: 40
};

export default LoadingIndicator;
