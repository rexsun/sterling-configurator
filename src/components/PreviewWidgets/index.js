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
  NavLink
} from "reactstrap";

import PreviewScript from "../PreviewScript";
import LogoBar from "../LogoBar";
import PageHeaderLabel from "../../components/PageHeaderLabel";

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

    self.do$loadScript = _.throttle(() => {
      const idx = _.get(self.state, "selectedIndex", "1");
      const dom = $(`#code_review_${idx}`);
      dom.removeClass("loaded");
      setTimeout(() => {
        dom.addClass("loaded");
      }, 200);
    }, 300);
  }

  componentDidMount() {
    this.do$loadScript();
  }

  componentDidUpdate() {
    this.do$loadScript();
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

  renderTabHeads(self) {
    const { selectedIndex } = self.state;
    return (
      <Nav pills justified>
        {_.map(
          items,
          (o, i) =>
            !i ? null : (
              <NavItem key={`previewtab_${i}`}>
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
    );
  }

  renderTabContents(self) {
    const { selectedIndex } = self.state;
    return (
      <TabContent activeTab={selectedIndex + ""}>
        {_.map(["1", "2", "3"], (o, i) => self.renderPreview(self, o))}
      </TabContent>
    );
  }

  renderPreview(self, tabKey) {
    const { widgetView, selectedIndex } = self.state;
    return (
      <TabPane key={`preview_${tabKey}`} tabId={tabKey}>
        <div className="row">
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
              <PreviewScript id={`code_review_${tabKey}`} className="mt-3">
                {scriptTemplate(_.get(items, [selectedIndex, "params"], {}))}
              </PreviewScript>
            ) : (
              <h4 className="text-center">WIDGET PREVIEW</h4>
            )}
          </div>
        </div>
      </TabPane>
    );
  }

  render() {
    const self = this;
    return (
      <div>
        <div className="row">
          <div className="col-md-12 mt-3 mb-2">{self.renderTabHeads(self)}</div>
          <div className="col-md-12 mt-2">
            <PageHeaderLabel className="gray" text="Workflow Preview" />
          </div>
          <div className="col-md-12 mt-2">
            {/*self.renderDropDown(self)*/}
            {self.renderTabContents(self)}
          </div>
          <div className="col-md-12 mt-2">
            <LogoBar />
          </div>
        </div>
      </div>
    );
  }
}
