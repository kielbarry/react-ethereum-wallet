import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTransactionToSend } from '../../actions/actions.js';

export const SecurityIcon = props => {
  const icon = makeBlockie(props.hash);
  let divStyle = {
    backgroundImage: 'url(' + icon + ')',
  };

  function updateToTransaction(e) {
    e.stopPropagation();
    updateTransactionToSend({
      name: 'to',
      value: props.hash,
    });
  }

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
        <Link
          to={{ pathname: '/send-from/' + props.hash }}
          title={props.hash}
          onClick={e => updateToTransaction(e)}
        >
          {props.hash}
        </Link>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default connect(
  null,
  { updateTransactionToSend }
)(SecurityIcon);
