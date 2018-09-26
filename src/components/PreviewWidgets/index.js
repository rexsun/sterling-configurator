import _ from "lodash";
import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PreviewScript from "../PreviewScript";

const items = [
  { text: "Select a workflow" },
  { text: "Workflow 1" },
  { text: "Workflow 2" },
  { text: "Workflow 3" }
];

const scriptTemplate = `<script>
var partnerName = 'Fountain';
function init1() {        
    var config = new sterlingts.Config(accessToken);
    var workflowType = sterlingts.workflow.WorkflowType;
    var workflowOptions = {
            element: document.getElementById('widget1')
        };

    var workflow = new sterlingts.workflow.GetWorkflow(
            workflowType.CREATE_ACCOUNT,
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
<script src="http://dev.app.sterling.io/js/sterling.js?callback=init1"></script>
`;

export default class PreviewWidgets extends React.PureComponent {
  constructor(props) {
    super(props);

    const self = this;

    self.state = {
      dropdownOpen: false,
      selectedIndex: 0
    };

    self.do$toggle = () => {
      self.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    self.do$select = idx => {
      self.setState(prevState => ({
        selectedIndex: idx
      }));
    };
  }

  render() {
    const self = this;
    const { selectedIndex } = self.state;
    const configurations = _.get(self.props, ["configurations"], {});
    return (
      <div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <h1 className="text-center">Preview</h1>
          </div>
          <div className="col-md-12 mt-2">
            <Dropdown isOpen={self.state.dropdownOpen} toggle={self.do$toggle}>
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
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-xs-12">
            <h4>Script Preview</h4>
            <PreviewScript className="mt-3">{scriptTemplate}</PreviewScript>
          </div>
          <div className="col-md-6 col-xs-12">Widgets</div>
        </div>
      </div>
    );
  }
}
