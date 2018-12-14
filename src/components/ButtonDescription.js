import React from 'react';

export const ButtonDescription = props => {
  return (
    <React.Fragment>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

export default ButtonDescription;
