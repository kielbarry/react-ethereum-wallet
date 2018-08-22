import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Utils from '../utils/utils.js';

const RedirectButton = ({ field }) => {
  return (
    <a href={field.link} className={field.buttonClass}>
      <div className="account-pattern">+</div>
      <h3>{field.buttonDescription}</h3>
    </a>
  );
};

export class ActionButton extends Component {
  render() {
    let field = this.props.field
    return (
      <React.Fragment>
        <h2>{field.title}</h2>
        <p>{field.contractDescription}</p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list" />
        <button className={field.buttonClass}>
          <div className="account-pattern">+</div>
          <h3>{field.buttonDescription}</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }
};

export class AddForm extends Component {

render() {
  let field = this.props.field

  // console.log(Utils.createNewAccount)
  // console.log(this.props.field)

  return (
    <React.Fragment>
      {field.redirect ? (
        <RedirectButton field={field} />
      ) : (
        <ActionButton field={field} />
      )}
    </React.Fragment>
  );
}
};


const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(AddForm);
