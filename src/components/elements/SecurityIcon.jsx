import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { Link } from 'react-router-dom';

export const SecurityIcon = props => {
  const icon = makeBlockie(props.hash);
  let divStyle = {
    backgroundImage: 'url(' + icon + ')',
  };
  return (
    <React.Fragment>
      <span
        className={props.classes}
        title="This is a security icon.  If there were any change to the address, 
      the resulting icon would be a completely different one"
        src={icon}
        style={divStyle}
      >
        <img src={icon} style={divStyle} className="identicon-pixel" alt="" />
      </span>
      {props.type === 'transactionHref' ? (
        <Link to={{ pathname: '/send/' + props.hash }} title="{props.hash}">
          {props.hash}
        </Link>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default SecurityIcon;
