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
import Btn from "../Btn";
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

const widgetImageHost =
  "https://www.sterlingnow.io/wp-content/uploads/2018/09/";
const widgetImages = {
  "1": [
    {
      src: "widget-WF-AC-page-1.png"
    },
    {
      src: "widget-WF-AC-page-2.png"
    },
    {
      src: "widget-WF-AC-page-3.png"
    },
    {
      src: "widget-WF-AC-page-4.png"
    },
    {
      src: "widget-WF-AC-page-5.png"
    }
  ],
  "2": [
    {
      src: "widget-WF-SS-page-1.png"
    },
    {
      src: "widget-WF-SS-page-2.png"
    },
    {
      src: "widget-WF-SS-page-3.png"
    }
  ],
  "3": [
    {
      src: "widget-WF-RR-page-1.png"
    }
  ]
};

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

function renderSlide(dom, photos) {
  const domId = _.get(dom, [0, "id"], "");
  if (!!domId && !_.isEmpty(photos)) {
    const domWidth = dom.width();
    const domHeight = "600";
    const images = _
      .map(
        photos,
        o => `<div><img data-u="image" src="${widgetImageHost}${o.src}"/></div>`
      )
      .join("");
    const html = `
      <div id="${domId}_slide" class="slide-container" style="width:${domWidth}px;height:${domHeight}px;">
        <div class="slide-item" data-u="slides" style="position:absolute;top:0px;left:0px;width:${domWidth}px;height:${domHeight}px;overflow:hidden;">
        ${images}
        </div>
        <div class="jssora02l" data-u="arrowleft"></div>
        <div class="jssora02r" data-u="arrowright"></div>
      </div>`;
    dom.html(html);
    return true;
  }
  return false;
}

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

    self.do$loadScript = _.throttle(cls => {
      const idx = _.get(self.state, "selectedIndex", "1");
      const dom = $(`#code_review_${idx}`);
      dom.removeClass("loaded");
      dom.removeClass("loading");
      setTimeout(() => {
        dom.addClass(cls);
      }, 100);
    }, 300);

    self.do$initSlider = _.throttle(() => {
      const idx = _.get(self.state, "selectedIndex", "1");
      const inited = renderSlide(
        $(`#widget_review_${idx}`),
        _.get(widgetImages, [idx], [])
      );
      const options = {
        $AutoPlay: false,
        $FillMode: 5,
        $ArrowNavigatorOptions: {
          $Class: $JssorArrowNavigator$,
          $ChanceToShow: 2,
          $AutoCenter: 2
        }
      };
      !!inited &&
        setTimeout(() => {
          new $JssorSlider$(`widget_review_${idx}_slide`, options);
        }, 200);
    }, 500);
  }

  componentDidMount() {
    this.do$loadScript("loaded");
  }

  componentDidUpdate() {
    this.do$loadScript("loading");
    this.do$initSlider();
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
              <Btn
                className={classnames({
                  btn: true,
                  "btn-info": widgetView,
                  "btn-success": !widgetView
                })}
                style={{ width: "100%" }}
                onClick={self.do$toggleView}
              >
                {!widgetView ? "SCRIPT PREVIEW" : "WIDGET PREVIEW"}
              </Btn>
            </div>
            {!widgetView ? (
              <PreviewScript id={`code_review_${tabKey}`} className="mt-3">
                {scriptTemplate(_.get(items, [selectedIndex, "params"], {}))}
              </PreviewScript>
            ) : (
              <div className="my-3">
                <div
                  id={`widget_review_${tabKey}`}
                  className="slide-injector"
                />
              </div>
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
        </div>
      </div>
    );
  }
}
