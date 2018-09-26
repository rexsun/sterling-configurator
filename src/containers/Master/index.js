import React from "react";
import PreviewWidgets from "../../components/PreviewWidgets";
import PageHeaderLabel from "../../components/PageHeaderLabel";
import StepNavigator from "../../components/StepNavigator";

export default class Master extends React.PureComponent {
  render() {
    const self = this;
    const { children, currentStep, headerText } = self.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="row mt-3">
              <div className="col-md-12">
                <StepNavigator step={currentStep} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <PageHeaderLabel text={headerText} />
              </div>
            </div>
            {children}
            <div className="row">
              <div className="col-md-12">
                <hr />
              </div>
              <div className="col-md-12 text-right">
                {!(currentStep > 4) ? (
                  <div>
                    {!!(currentStep - 1) && (
                      <a
                        href={`/#/step${currentStep - 1}`}
                        className="btn btn-secondary"
                      >
                        &lt; BACK
                      </a>
                    )}
                    <a
                      href={`/#/step${currentStep + 1}`}
                      className="btn btn-primary ml-1"
                    >
                      {!(currentStep === 4) ? "NEXT >" : "SUBMIT"}
                    </a>
                  </div>
                ) : (
                  <a href="/#/step1" className="btn btn-primary ml-1">
                    CREATE ANOHTER WIDGET
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <PreviewWidgets />
          </div>
        </div>
      </div>
    );
  }
}
