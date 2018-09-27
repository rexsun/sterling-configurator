import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styled from "styled-components";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

import reduxCompose from "../../utils/reduxCompose";
import reducer, { localState } from "./reducer";
import * as actions from "./actions";

import Master from "../Master";

export class container extends React.PureComponent {
  constructor(props) {
    super(props);

    const self = this;

    self.state = {
      activeTab: "0"
    };

    self.do$selectTab = idx => {
      if (self.state.activeTab !== idx) {
        self.setState({
          activeTab: idx
        });
      }
    };
  }

  renderPackageItem(text, muted) {
    return (
      <div className="pb-1 pt-1">
        <span className="pr-2">
          <i
            className={
              "far fa-check-circle " + (!muted ? "text-orange" : "text-muted")
            }
          />
        </span>
        <span className={!muted ? "text-dark" : "text-muted"}>{text}</span>
      </div>
    );
  }

  renderPackage(self, idx, text) {
    const { activeTab } = self.state;
    const idxKey = idx + "";
    const isActive = activeTab === idxKey;
    return (
      <NavItem key={`package_${idxKey}`}>
        <NavLink
          className={classnames("special py-4", {
            active: isActive,
            "ml-2": !!idx
          })}
          onClick={_.partial(self.do$selectTab, idxKey)}
        >
          {text}
        </NavLink>
        <div
          className={classnames("tooltip bs-tooltip-top", {
            show: isActive
          })}
        >
          <div className="arrow" />
        </div>
        <div
          className={classnames("tooltip bs-tooltip-bottom", {
            show: isActive
          })}
        >
          <div className="arrow" />
        </div>
      </NavItem>
    );
  }

  renderPackageDetails(self, idx, items) {
    const idxKey = idx + "";
    return (
      <TabPane key={`package_detail_${idxKey}`} tabId={idxKey}>
        <Row>
          <Col md="12">
            <div className="pb-3">
              {_.map(items, (o, i) => self.renderDetailedItem(o, `basic_${i}`))}
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  }

  renderPackages(self) {
    const { activeTab } = self.state;
    return (
      <div>
        <Nav pills justified>
          {_.map(["Basic", "Preferred", "Pro"], (o, i) =>
            self.renderPackage(self, i, o)
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          {_.map(
            [
              [
                "Social Security Number Trace",
                "Current County Criminal Record Search",
                "National Criminal Database Search",
                "DOJ Sex Offender"
              ],
              [
                "Social Security Number Trace",
                "7-Year County Criminal Search",
                "National Criminal Database Search",
                "DOJ Sex Offender",
                "Current Federal Criminal Record Search",
                "Terrorist Watch List (OFAC)"
              ],
              [
                "Social Security Number Trace",
                "7-Year County Criminal Record Search",
                "National Criminal Database Search",
                "DOJ Sex Offender",
                "Terrorist Watch List (OFAC)",
                "7-Year Federal District Criminal Record Search",
                "Locator Select"
              ]
            ],
            (o, i) => self.renderPackageDetails(self, i, o)
          )}
        </TabContent>
      </div>
    );
  }

  renderDetailedItem(text, key) {
    const StyledWrapper = styled.div`
      background: #f5f5f5;
      padding: 10px 15px;
      margin-bottom: 2px;
    `;
    return (
      <div key={key}>
        <StyledWrapper>
          <span className="pr-2">
            <i className="fas fa-check-circle text-orange" />
          </span>
          <span className="text-dark">{text}</span>
        </StyledWrapper>
      </div>
    );
  }

  render() {
    const self = this;
    return (
      <Master currentStep={2} headerText="Package Selector">
        <div className="col col-md-12">
          {self.renderPackageItem("General")}
          {self.renderPackageItem("Health Care (Coming Soon)", 1)}
          {self.renderPackageItem("Finance (Coming Soon)", 1)}
          {self.renderPackageItem("Caregivers (Coming Soon)", 1)}
          {self.renderPackageItem("Drivers/dilivery (Coming Soon)", 1)}
          <hr />
        </div>
        <div className="col-md-12">{self.renderPackages(self)}</div>
      </Master>
    );
  }
}

const reducerName = "ConfigurePackages";
const getState = state => state.get(reducerName, localState);

const mapState = {
  currentStep: {
    type: PropTypes.string.isRequired,
    getter: state => _.get(getState(state), ["currentStep"], "2")
  }
};

export default reduxCompose(container, reducerName, reducer, mapState, actions);
