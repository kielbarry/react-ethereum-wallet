import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';

export const SecurityIcon = ({ wallet }) => {
  const icon = makeBlockie(wallet);
  let divStyle = {
    backgroundImage: 'url(' + icon + ')',
  };
  return (
    <React.Fragment>
      <span
        className="dapp-identicon dapp-small"
        title="This is a security icon.  If there were any change to the address, 
      the resulting icon would be a completely different one"
        src={icon}
        style={divStyle}
      >
        <img src={icon} style={divStyle} className="identicon-pixel" alt="" />
      </span>
    </React.Fragment>
  );
};

export default SecurityIcon;
