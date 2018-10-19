import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/actions.js';

class JSONInterface extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.props.display !== prevProps.display ||
      this.props.JSONInterface !== prevProps.JSONInterface
    ) {
      return true;
    }
    return false;
  }

  closeModal(e) {
    e.preventDefault();
    if (e.target.getAttribute('id') === 'JSONInterface') {
      this.props.closeModal('displayJSONInterface');
    }
  }
  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div
        className={this.props.display}
        style={divStyle}
        onClick={e => this.closeModal(e)}
        id="JSONInterface"
      >
        <section className="dapp-modal-container">
          <h1>Contract JSON Interface</h1>
          <textarea
            name="jsonInterface"
            cols="40"
            rows="10"
            value={this.props.JSONInterface}
            defaultValue={this.props.JSONInterface}
          />
          <p>
            If you want to have someone else execute this contract, send this
            information along with the contract's address.
          </p>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { ...Actions }
)(JSONInterface);
