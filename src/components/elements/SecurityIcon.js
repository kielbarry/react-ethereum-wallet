import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import makeBlockie from 'ethereum-blockies-base64';
import { updateTransactionToSend } from '../../actions/actions.js';

const ToolTip = props => {
  return (
    <span
      className={props.classes}
      title="This is a security icon.  If there were any change to the address, 
    the resulting icon would be a completely different one"
      src={props.icon}
      style={props.divStyle}
    >
      <img
        src={props.icon}
        style={props.divStyle}
        className="identicon-pixel"
        alt=""
      />
    </span>
  );
};

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
  const { classes } = this.props;
  return (
    <React.Fragment>
      <ToolTip classes={classes} icon={icon} divStyle={divStyle} />
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
      {props.type === 'accountRoute' ? (
        <Link
          to={{ pathname: '/account/' + props.hash }}
          title={props.hash}
          // onClick={e => updateToTransaction(e)}
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
