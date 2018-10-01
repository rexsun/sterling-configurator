import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import styled from "styled-components";

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
    no: { text: "No Fingerprinting", selected: false }
  },
  styling: {
    inherent: { text: "Inherit Styles", selected: false },
    custom: { text: "Custom Styles", selected: true }
  }
};

const helpContent = {
  host: "",
  pay:
    "Select who will pay for the background screen, the candidate or company.",
  finterPrinting: "",
  styling: ""
};

const ColorBlock = styled.div`
  & .value {
    background-color: #ededed;
    padding: 10px 15px;
  }
`;

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
                <div className="col-md-10 col-xs-10">
                  {_.values(
                    _.mapValues(val, (_val, _key) => (
                      <div
                        className="pb-1 pt-1"
                        key={`options_${key}_${_key}`}
                        onClick={_.partial(self.do$setOptions, key, _key)}
                      >
                        <span className="pr-2">
                          {!_val.selected ? (
                            <i className="far fa-circle text-lgray" />
                          ) : (
                            <i className="far fa-check-circle text-orange" />
                          )}
                        </span>
                        <span
                          className={
                            !_val.selected ? "text-lgray" : "text-dark"
                          }
                        >
                          {_val.text}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div
                  id={`help_${key}`}
                  className="col-md-2 col-xs-2 text-center border-left"
                >
                  <i className="mt-4 fas fa-question text-orange" />
                </div>
                {self.renderHelpTip(self, key, `help_${key}`)}
                {!("styling" === key) && (
                  <div className="col-md-12">
                    <hr />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  }

  renderHelpTip(self, key, targetId) {
    const helpText = _.get(helpContent, key, null);
    return !helpText ? null : (
      <UncontrolledTooltip placement="left" target={targetId}>
        {helpText}
      </UncontrolledTooltip>
    );
  }

  renderColors(self, colors) {
    return !_.get(
      self.state,
      ["options", "styling", "custom", "selected"],
      false
    ) ? null : (
      <div className="row">
        <div className="col-md-12">
          <hr />
        </div>
        {_.map(colors, (o, i) => (
          <ColorBlock className="col col-md-6" key={`color_${i}`}>
            <div>{o.label}</div>
            <div
              className="mt-2"
              style={{
                backgroundColor: o.value,
                height: "60px",
                border: "1px solid #b2b2b2",
                borderRadius: "9px"
              }}
            />
            <div className="value mt-3">{o.value}</div>
          </ColorBlock>
        ))}
      </div>
    );
  }

  render() {
    const self = this;
    const { currentStep, setCurrentStep } = self.props;
    return (
      <Master currentStep={1} headerText="Configuration Options">
        {self.renderOptions(self)}
        {self.renderColors(self, [
          { label: "Primary Color", value: "#FF4700" },
          { label: "Secondary Color", value: "#FFFFFF" }
        ])}
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
