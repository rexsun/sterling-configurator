import styled from "styled-components";

const WholeScreenWrapper = styled.div`
  position: fixed;
  top: -100px;
  left: -100px;
  width: calc(100% + 200px);
  height: calc(100% + 200px);
  background: rgba(0, 0, 0, 0.2);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WholeScreenWrapper;
