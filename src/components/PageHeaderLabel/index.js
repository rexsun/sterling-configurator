import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";

const StyledWrapper = styled.div`
  & .alert.alert-dark {
    text-transform: uppercase;
    border-radius: 0;
    background-color: #212121;
    color: white;
    font-size: 1.4em;
    letter-spacing: 0.2em;
  }

  &.gray .alert.alert-dark {
    background-color: #b2b2b2;
    color: black;
  }
`;

const component = props => {
  const { text, className } = props;

  return (
    <StyledWrapper className={className}>
      <Alert color="dark">{text}</Alert>
    </StyledWrapper>
  );
};

export default component;
