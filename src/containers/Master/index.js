import React from "react";
import classnames from "classnames";

import Btn from "../../components/Btn";
import PreviewWidgets from "../../components/PreviewWidgets";
import PageHeaderLabel from "../../components/PageHeaderLabel";
import StepNavigator from "../../components/StepNavigator";
import LogoBar from "../../components/LogoBar";

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
                      <Btn
                        href={`/#/step${currentStep - 1}`}
                        className="btn btn-secondary"
                      >
                        &lt; BACK
                      </Btn>
                    )}
                    <Btn
                      href={`/#/step${currentStep + 1}`}
                      className={classnames("btn ml-1", {
                        "btn-primary": !(currentStep === 4),
                        "btn-orange": currentStep === 4
                      })}
                    >
                      {!(currentStep === 4) ? "NEXT >" : "SUBMIT"}
                    </Btn>
                  </div>
                ) : (
                  <Btn href="/#/step1" className="btn btn-primary ml-1">
                    CREATE ANOHTER WIDGET
                  </Btn>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <PreviewWidgets />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <LogoBar />
          </div>
        </div>
      </div>
    );
  }
}
