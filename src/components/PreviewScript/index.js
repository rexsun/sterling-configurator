import styled from "styled-components";

const component = styled.pre`
  width: 100%;
  background: transparent;
  color: white;
  font-family: Consolas, Courier;
  line-height: 1.5em;
  font-size: 14px;
  padding: 15px;
  position: relative;
  z-index: 0;
  overflow: hidden;

  &:before {
    width: 900px;
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    transform: scaleY(0);
    transform-origin: 50% 0;
    transition: transform 0.5s ease-out;
  }

  &.loaded:before {
    transform: scaleY(1);
    transition: none;
  }

  &.loading:before {
    transform: scaleY(1);
  }
`;

export default component;
