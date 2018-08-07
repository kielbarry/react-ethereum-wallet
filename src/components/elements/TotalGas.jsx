import React from 'react';

export const TotalGas = ({ field }) => {
  
  return (
    <div className="row clear total">
        <div className="col col-12 mobile-full">
            <h3>total</h3>
            <span className="amount">0.000106 ETHER</span>
        </div>
        <div className="dapp-clear-fix"></div>
    </div>
  );
};

export default TotalGas;
