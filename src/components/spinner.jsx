import React, {useRef} from 'react';
const Spinner = () => {
  const spinnerRef = useRef();
  let i = 0;
  const animate = () => {
    i += 5;
    spinnerRef.current.style.transform = `rotate(${i}deg)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
  return <div className="spinner" style={{position: `absolute`, left: `50%`, top: `50%`, transform: `translate(-50%, -50%)`}}>
    <img ref={spinnerRef} src="img/spinner.png" width="70"/>
  </div>;
};
export default Spinner;
