import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedContract } from '../../actions/actions.js';
import SecurityIcon from './SecurityIcon.js';
import { displayPriceFormatter } from '../../utils/utils.js';
import { makeID } from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import NumberFormat from 'react-number-format';

import TokenListForItems from './TokenListForItems.js';

import { EthAddress, Identicon } from 'ethereum-react-components';

class ContractItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);

    this.state = {
      fakeAddress: makeID(),
    };
    this.fakeAddressInterval = setInterval(() => {
      this.setState({
        fakeAddress: makeID(),
      });
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.fakeAddressInterval);
  }

  openAccountPage(e) {
    let obj = {
      contract: this.props.contract,
      currency: this.props.reducers.currency,
      exchangeRates: this.props.reducers.exchangeRates,
      addressType: 'contract',
    };

    this.props.selectedContract({
      contract: this.props.contract,
      currency: this.props.reducers.currency,
      exchangeRates: this.props.reducers.exchangeRates,
      addressType: 'contract',
    });
  }

  //snapshotted
  renderBalance() {
    let contract = this.props.contract;
    return (
      <React.Fragment>
        <NumberFormat
          className="account-balance"
          value={displayPriceFormatter(this.props, contract.balance)}
          displayType={'text'}
          thousandSeparator={true}
        />
        <span> {this.props.reducers.currency} </span>
      </React.Fragment>
    );
  }

  //snapshotted
  renderPendingProgress() {
    let percent = this.props.contract.confirmationNumber / 12;
    return (
      <div className="dapp-progress">
        <div className="dapp-bar" style={{ width: { percent } + '%' }} />
      </div>
    );
  }

  renderPendingSecurityIcon() {
    return (
      <React.Fragment>
        <SecurityIcon
          type="contractItem"
          classes={'dapp-identicon dapp-small dapp-icon-loading'}
          hash={this.state.fakeAddress}
        />
      </React.Fragment>
    );
  }

  renderPending() {
    return (
      <React.Fragment>
        {this.renderPendingProgress()}
        {this.renderPendingSecurityIcon()}
      </React.Fragment>
    );
  }

  renderName() {
    let contract = this.props.contract;
    let pending = this.props.pending;
    pending ? (pending = true) : (pending = false);
    return (
      <React.Fragment>
        {!pending ? (
          <TokenListForItems
            addressType={this.props.addressType}
            address={contract.contractAddress}
          />
        ) : null}
        <h3 className="not-ens-name">
          <i className="icon-eye" />
          &nbsp;
          {!pending
            ? contract['contract-name'] === undefined
              ? 'UNNAMED'
              : contract['contract-name']
            : 'UNNAMED'}
        </h3>
      </React.Fragment>
    );
  }

  renderCreating() {
    return (
      <React.Fragment>
        <span className="account-balance">
          Creating
          <span>...</span>
        </span>
        {/*<span className="account-id creating" />*/}
        <EthAddress
          short
          classes="account-id creating"
          address={this.state.fakeAddress}
        />
      </React.Fragment>
    );
  }

  render() {
    let contract = this.props.contract;
    let pending = this.props.pending;

    pending ? (pending = true) : (pending = false);

    // eslint-disable-next-line
    Object.keys(contract).length === 0 && contract.constructor === Object
      ? (pending = true)
      : null;

    let address;
    // eslint-disable-next-line
    !pending ? (address = contract.contractAddress) : null;

    let ContractUrl = '/contract/';
    // eslint-disable-next-line
    !pending ? (ContractUrl += address) : null;

    // eslint-disable-next-line
    !pending ? clearInterval(this.fakeAddressInterval) : null;

    return (
      <React.Fragment>
        <Link
          to={{ pathname: ContractUrl }}
          onClick={e => this.openAccountPage(e)}
          className={!pending ? 'wallet-box' : 'wallet-box creating wallets'}
        >
          {!pending ? (
            <React.Fragment>
              <SecurityIcon
                type="contractItem"
                classes={'dapp-identicon dapp-small'}
                hash={address}
              />
            </React.Fragment>
          ) : (
            this.renderPending()
          )}
          {this.renderName()}
          {!pending ? this.renderBalance() : this.renderCreating()}
          <EthAddress short classes="account-id" address={address} />
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
  { selectedContract, ...Actions }
)(ContractItem);
