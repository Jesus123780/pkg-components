import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';


export const Example = ({children}) => {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

  return (
    <div>
      {/* <div ref={componentRef}>
        {children}
      </div>
      <button onClick={handlePrint}>Print this out!</button> */}
    </div>
  );
};