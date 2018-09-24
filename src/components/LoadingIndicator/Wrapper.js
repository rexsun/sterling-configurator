import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin: 2em auto;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  position: relative;
`;

Wrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Wrapper;
