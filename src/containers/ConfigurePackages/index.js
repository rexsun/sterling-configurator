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
import StepNavigator from "../../components/StepNavigator";

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
              "far fa-check-circle " + (!muted ? "text-primary" : "text-muted")
            }
          />
        </span>
        <span className={!muted ? "text-dark" : "text-muted"}>{text}</span>
      </div>
    );
  }

  renderPackages(self) {
    const { activeTab } = self.state;
    return (
      <div>
        <Nav pills justified>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "0" })}
              onClick={_.partial(self.do$selectTab, "0")}
            >
              Basic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={_.partial(self.do$selectTab, "1")}
            >
              Preferred
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={_.partial(self.do$selectTab, "2")}
            >
              Pro
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="0">
            <Row>
              <Col md="12">
                <div className="py-3">
                  {_.map(
                    [
                      "Social Security Number Trace",
                      "Current County Criminal Record Search",
                      "National Criminal Database Search",
                      "DOJ Sex Offender"
                    ],
                    (o, i) => self.renderDetailedItem(o, `basic_${i}`)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="1">
            <Row>
              <Col md="12">
                <div className="py-3">
                  {_.map(
                    [
                      "Social Security Number Trace",
                      "7-Year County Criminal Search",
                      "National Criminal Database Search",
                      "DOJ Sex Offender",
                      "Current Federal Criminal Record Search",
                      "Terrorist Watch List (OFAC)"
                    ],
                    (o, i) => self.renderDetailedItem(o, `preferred_${i}`)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="12">
                <div className="py-3">
                  {_.map(
                    [
                      "Social Security Number Trace",
                      "7-Year County Criminal Record Search",
                      "National Criminal Database Search",
                      "DOJ Sex Offender",
                      "Terrorist Watch List (OFAC)",
                      "7-Year Federal District Criminal Record Search",
                      "Locator Select"
                    ],
                    (o, i) => self.renderDetailedItem(o, `pro_${i}`)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }

  renderDetailedItem(text, key) {
    const StyledWrapper = styled.div`
  background: #F5F5F5;
  padding: 10px 15px;
  margin-bottom: 2px;
`;
    return (
      <div key={key}>
        <StyledWrapper>
          <span className="pr-2">
            <i class="fas fa-check-circle text-primary" />
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
