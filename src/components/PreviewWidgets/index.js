import _ from "lodash";
import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

import PreviewScript from "../PreviewScript";

const items = [
  { text: "Select a workflow" },
  {
    text: "Account Setup",
    params: {
      workflowName: "CREATE_ACCOUNT"
    }
  },
  {
    text: "Create Order",
    params: {
      workflowName: "CREATE_ORDER"
    }
  },
  {
    text: "Reports",
    params: {
      workflowName: "REPORT"
    }
  }
];

const scriptTemplate = _.template(`<script>
var partnerName = 'Demo';
function initWidget() {        
    var config = new sterlingts.Config(accessToken);
    var workflowType = sterlingts.workflow.WorkflowType;
    var workflowOptions = {
            element: document.getElementById('sterlingWidget')
        };

    var workflow = new sterlingts.workflow.GetWorkflow(
            workflowType.<% print(workflowName) %>,
            workflowOptions
    );

    config.set('partnerName', partnerName);

    workflow.on('complete', function(input) {
        console.log(input);
    })
    .on('ready', function(data) {
        console.log('Workflow Ready');
    })
    .on('close', function() {
        alert('User says they are done. This could be a point where you take over the UI again');
    })
    .on("error", function(error) {
        console.log("Error in workflow");
        console.log(error);
    });

    workflow.initialize();
}
</script>
<script src="http://dev.app.sterling.io/js/sterling.js?callback=initWidget"></script>
`);

const StretchedDropDown = styled.div`
& .dropdown-toggle {
width: 100%;
text-align: left;
 &::after {
   position: absolute;
   top: 18px;
   right: 8px;
 }
}

& .dropdown-menu {
  width: 100%;
}
`;

export default class PreviewWidgets extends React.PureComponent {
  constructor(props) {
    super(props);

    const self = this;

    self.state = {
      dropdownOpen: false,
      selectedIndex: 1,
      widgetView: false
    };

    self.do$toggleDropDown = () => {
      self.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    self.do$select = idx => {
      self.setState(prevState => ({
        selectedIndex: idx
      }));
    };

    self.do$toggleView = () => {
      self.setState(prevState => ({
        widgetView: !prevState.widgetView
      }));
    };
  }

  renderDropDown(self) {
    const { selectedIndex } = self.state;
    return (
      <StretchedDropDown>
        <Dropdown
          isOpen={self.state.dropdownOpen}
          toggle={self.do$toggleDropDown}
        >
          <DropdownToggle color="primary" caret>
            {_.get(items, [selectedIndex, "text"], "Select a workflow")}
          </DropdownToggle>
          <DropdownMenu>
            {_.map(items, (val, idx) => {
              return (
                <DropdownItem
                  active={selectedIndex === idx}
                  key={`ddi_${idx}`}
                  onClick={_.partial(self.do$select, idx)}
                >
                  {val.text}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </StretchedDropDown>
    );
  }

  renderTabs(self) {
    const { selectedIndex } = self.state;
    return (
      <div>
        <Nav pills justified>
          {_.map(
            items,
            (o, i) =>
              !i ? null : (
                <NavItem>
                  <NavLink
                    className={classnames({ active: selectedIndex === i })}
                    onClick={_.partial(self.do$select, i)}
                  >
                    {o.text}
                  </NavLink>
                </NavItem>
              )
          )}
        </Nav>
        <TabContent activeTab={selectedIndex + ""}>
          <TabPane tabId="1">{self.renderPreview(self)}</TabPane>
          <TabPane tabId="2">{self.renderPreview(self)}</TabPane>
          <TabPane tabId="3">{self.renderPreview(self)}</TabPane>
        </TabContent>
      </div>
    );
  }

  renderPreview(self) {
    const { widgetView, selectedIndex } = self.state;
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="text-center">
            <button
              className={classnames({
                btn: true,
                "btn-info": widgetView,
                "btn-success": !widgetView
              })}
              style={{ width: "100%" }}
              onClick={self.do$toggleView}
            >
              {!widgetView ? "SCRIPT PREVIEW" : "WIDGET PREVIEW"}
            </button>
          </div>
          {!widgetView ? (
            <PreviewScript className="mt-3">
              {scriptTemplate(_.get(items, [selectedIndex, "params"], {}))}
            </PreviewScript>
          ) : (
            <h4 className="text-center">WIDGET PREVIEW</h4>
          )}
        </div>
      </div>
    );
  }

  render() {
    const self = this;
    return (
      <div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1 className="text-center">Preview</h1>
          </div>
          <div className="col-md-12 mt-2">
            {//self.renderDropDown(self)
            self.renderTabs(self)}
          </div>
        </div>
      </div>
    );
  }
}
