const WholeScreenWrapper = children => (
  <div
    style={`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`}
  >
    {children}
  </div>
);

export default WholeScreenWrapper;
