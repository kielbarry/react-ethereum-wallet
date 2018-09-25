import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions.js';

// import * as Utils from '../utils/utils.js';

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillMount() {
    // document.body.addEventListener()
  }

  componentWillUnmount() {
    // document.body.removeEventListener()
  }

  renderRedirectButton() {
    let field = this.props.field;
    return (
      <a href={field.link} className={field.buttonClass}>
        <div className="account-pattern">+</div>
        <h3>{field.buttonDescription}</h3>
      </a>
    );
  }

  renderActionButton() {
    let field = this.props.field;
    let onClickFunction;

    switch (field.buttonDescription) {
      case 'ADD ACCOUNT':
        onClickFunction = e => {
          if (field.buttonDescription === 'ADD ACCOUNT') e.preventDefault();
        };
        break;
      case 'WATCH CONTRACT':
        onClickFunction = e => {
          this.props.displayModal('displayWatchContract');
        };
        break;
      case 'WATCH CUSTOM TOKEN':
        onClickFunction = e => {
          this.props.displayModal('displayWatchCustomToken');
        };
        break;
      default:
        onClickFunction = e => {
          console.log('field.buttonDescription', field.buttonDescription);
        };
        break;
    }
    return (
      <React.Fragment>
        <h2>{field.title}</h2>
        <p>{field.contractDescription}</p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list" />
        <button className={field.buttonClass} onClick={onClickFunction}>
          <div className="account-pattern">+</div>
          <h3>{field.buttonDescription}</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  render() {
    let field = this.props.field;
    return (
      <React.Fragment>
        {field.redirect
          ? this.renderRedirectButton()
          : this.renderActionButton()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  modals: state.modals,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(AddForm);
