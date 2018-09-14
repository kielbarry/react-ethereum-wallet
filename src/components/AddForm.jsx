import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as Utils from '../utils/utils.js';

export class AddForm extends Component {

  componentWillMount(){
    // document.body.addEventListener()
  }

  componentWillUnmount(){
    // document.body.removeEventListener()
  }


  renderRedirectButton() {
    let field = this.props.field
    // let web3 = this.props.web3
    return (
      <a href={field.link} 
      className={field.buttonClass}>
        <div className="account-pattern">+</div>
        <h3>{field.buttonDescription}</h3>
      </a>
    );
  }

  renderActionButton() {
    let field = this.props.field
    let onClickFunction
    switch (field.buttonDescription) {
      case 'ADD ACCOUNT':
        onClickFunction = function(e) {
          if(field.buttonDescription === 'ADD ACCOUNT') {
            e.preventDefault()
          }
        }
        break;
      case 'WATCH CONTRACT':
        onClickFunction = function(e) {
          console.log("here in onclick")
        }
        break;
      default:
        onClickFunction = function(e){
          console.log("asdfasdfa")
        }
        break;
    }
    return (
      <React.Fragment>
        <h2>{field.title}</h2>
        <p>{field.contractDescription}</p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list" />
        <button className={field.buttonClass}
        onClick={onClickFunction}>
          <div className="account-pattern">+</div>
          <h3>{field.buttonDescription}</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  render() {
    let field = this.props.field
    // let web3
    // if(this.props.web3 != null) web3 = this.props.web3.web3Instance
    return (
      <React.Fragment>
        { field.redirect 
          ? this.renderRedirectButton()
          : this.renderActionButton()
        }
      </React.Fragment>
    );
  }
};


const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(AddForm);
