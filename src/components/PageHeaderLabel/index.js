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
`;

const component = props => {
  const { text } = props;

  return (
    <StyledWrapper>
      <Alert color="dark">{text}</Alert>
    </StyledWrapper>
  );
};

export default component;
