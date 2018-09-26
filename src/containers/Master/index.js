import React from "react";
import PreviewWidgets from "../../components/PreviewWidgets";

export default class Master extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xs-12">{children}</div>
          <div className="col-md-6 col-xs-12">
            <PreviewWidgets />
          </div>
        </div>
      </div>
    );
  }
}
