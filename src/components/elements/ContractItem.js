import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedContract } from '../../actions/actions.js';
import SecurityIcon from './SecurityIcon.js';
import * as Utils from '../../utils/utils.js';

class ContractItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  openAccountPage() {
    this.props.selectedContract({
      contract: this.props.contract,
      currency: this.props.reducers.currency,
      exchangeRates: this.props.reducers.exchangeRates,
      addressType: 'contract',
    });
  }

  renderBalance() {
    let contract = this.props.contract;
    return (
      <React.Fragment>
        <span className="account-balance">
          {this.props.web3 && this.props.web3.web3Instance
            ? Utils.displayPriceFormatter(this.props, contract.balance)
            : contract.balance}
          <span> {this.props.reducers.currency} </span>
        </span>
      </React.Fragment>
    );
  }

  render() {
    let contract = this.props.contract;
    let address = contract.address;
    const AccountURL = '/account/' + address;
    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          <SecurityIcon
            type="contractItem"
            classes="dapp-identicon dapp-small"
            hash={address}
          />
          <ul className="token-list" />
          <h3 className="not-ens-name">
            <i className="icon-doc" />
            {contract['contract-name']}
          </h3>
          {this.renderBalance()}
          <span className="account-id">{address}</span>
        </Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { selectedContract }
)(ContractItem);
