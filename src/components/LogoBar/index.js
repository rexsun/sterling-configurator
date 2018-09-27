import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  height: 80px;

  & .row {
    margin: 0;
  }

  & .label {
    font-size: 12px;
    line-height: 80px;
    height: 80px;
    border-top: solid 1px #e2e2e2;
    border-bottom: solid 1px #e2e2e2;
    font-weight: bold;
    letter-spacing: 2px;
  }

  & .logo {
    height: 80px;
    max-width: 220px
    width: 220px;
    background-color: #212121;
    padding: 0;

    img {
      width: 220px;
      height: 80px;
    }
  }
`;

const component = props => {
  const { className } = props;

  return (
    <StyledWrapper className={className}>
      <div className="row">
        <div className="col text-right label">POWERED BY</div>
        <div className="col text-right logo">
          <img src="/logo.jpg" />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default component;
