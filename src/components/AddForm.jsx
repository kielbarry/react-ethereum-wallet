import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as Utils from '../utils/utils.js';

export class RedirectButton extends Component {

  render() {
    let field = this.props.field
    let web3 = this.props.web3
    function createAccount(e){
      console.log("XXXXXXXXXXXXXXXXXXXXXX", e)
      // e.preventDefault();
      if(field.buttonDescription === 'ADD ACCOUNT') {
        e.preventDefault()
        // console.log(Utils.createNewAccount)
        // console.log(web3)
        // Utils.createNewAccount(web3)
      }
    }
    return (
      <a href={field.link} 
      className={field.buttonClass}
      onClick={createAccount}>
        <div className="account-pattern">+</div>
        <h3>{field.buttonDescription}</h3>
      </a>
    );
  }
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
    let web3

    if(this.props.web3 != null) web3 = this.props.web3.web3Instance

    return (
      <React.Fragment>
        {field.redirect ? (
          <RedirectButton field={field} web3={web3}/>
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
