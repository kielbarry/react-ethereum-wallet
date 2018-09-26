import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { selectedWallet } from '../../actions/actions.js';

import makeBlockie from 'ethereum-blockies-base64';

import * as Utils from '../../utils/utils.js';

class ContractItem extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  openAccountPage() {
    this.props.selectedContract = {
      contract: this.props.contract,
      currency: this.props.reducers.currency,
      exchangeRates: this.props.reducers.exchangeRates,
    };
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
    // let currency = this.props.reducers.currency;
    let contract = this.props.contract;
    let address = contract.address;
    const icon = makeBlockie(address);
    const AccountURL = '/account/' + address;
    let divStyle = {
      backgroundImage: 'url(' + icon + ')',
    };

    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          <span
            className="dapp-identicon dapp-small"
            title="This is a security icon.  If there were any change to the address, 
          the resulting icon would be a completely different one"
            style={divStyle}
          >
            <img style={divStyle} className="identicon-pixel" alt="" />
          </span>
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

export default connect(mapStateToProps)(ContractItem);
