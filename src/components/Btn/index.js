import React from "react";
import styled from "styled-components";

const myStyle = `
  border-radius: 0;
  background-color: #add7c7;
  border-color: #add7c7;
  color: black;
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: bold;
  line-height: 3em;

  &:hover {
    background-color: #add7c7;
    border-color: #add7c7;
  }
`;

const StyledLink = styled("a")`
  ${myStyle};
`;
const StyledButton = styled("button")`
  ${myStyle};
`;

const component = props => {
  const { href } = props;
  return !href ? <StyledButton {...props} /> : <StyledLink {...props} />;
};

export default component;
