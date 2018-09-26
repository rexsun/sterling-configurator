import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

import reduxCompose from "../../utils/reduxCompose";
import reducer, { localState } from "./reducer";
import * as actions from "./actions";

import Master from "../Master";

const defaultOptions = {
  host: {
    external: { text: "External Host", selected: false },
    self: { text: "Self Host", selected: true }
  },
  pay: {
    candidate: { text: "Candidate Pay", selected: false },
    company: { text: "Company Pay", selected: true }
  },
  finterPrinting: {
    with: { text: "With Fingerprinting", selected: true },
    no: { text: "No Finterprinting", selected: false }
  },
  styling: {
    inherent: { text: "Inherent Styling", selected: false },
    custom: { text: "Custom Styling", selected: true }
  }
};

export class container extends React.PureComponent {
  constructor(props) {
    super(props);

    const self = this;

    self.state = {
      options: _.cloneDeep(defaultOptions)
    };

    self.do$setOptions = (key, subKey) => {
      self.setState(prevState => {
        const result = _.cloneDeep(prevState);
        _.set(
          result,
          ["options", key],
          _.mapValues(_.get(prevState, ["options", key], {}), (_val, _key) => {
            return _.merge(_val, { selected: _key === subKey });
          })
        );
        return result;
      });
    };
  }

  renderOptions(self) {
    const { options } = self.state;
    return (
      <div>
        {_.values(
          _.mapValues(options, (val, key) => {
            return (
              <div className="row" key={`options_${key}`}>
                <div className="col-md-10">
                  {_.values(
                    _.mapValues(val, (_val, _key) => (
                      <div
                        className="pb-1 pt-1"
                        key={`options_${key}_${_key}`}
                        onClick={_.partial(self.do$setOptions, key, _key)}
                      >
                        <span className="pr-2">
                          {!_val.selected ? (
                            <i class="far fa-circle text-muted" />
                          ) : (
                            <i class="far fa-check-circle text-primary" />
                          )}
                        </span>
                        <span
                          className={
                            !_val.selected ? "text-muted" : "text-dark"
                          }
                        >
                          {_val.text}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="col-md-2">?</div>
                <div className="col-md-12">
                  <hr />
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  render() {
    const self = this;
    const { currentStep, setCurrentStep } = self.props;
    return (
      <Master currentStep={1} headerText="Configuration Options">
        {self.renderOptions(self)}
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
