import React from "react";

export default class Master extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <div className="col-md-12">{children}</div>
      </div>
    );
  }
}
