import _ from "lodash";
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

import getInjectors from "./reducerInjectors";
import randomString from "./helpers";

const _injectReducer = ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

export default function reduxCompose(
  container,
  reducerKey,
  reducer,
  mapState,
  mapDispatch
) {
  const propTypes = {};
  _.forIn(mapState, (val, key) => {
    _.set(propTypes, key, _.get(mapState, [key, "type"], PropTypes.object));
  });
  _.forIn(mapDispatch, (val, key) => {
    _.set(propTypes, key, PropTypes.func);
  });
  container.propTypes = propTypes;

  const mapStateToProps = state =>
    _.mapValues(mapState, (val, key) => _.invoke(val, "getter", state));

  return compose(
    _injectReducer({ key: reducerKey, reducer }),
    connect(
      mapStateToProps,
      mapDispatch
    )
  )(container);
}
