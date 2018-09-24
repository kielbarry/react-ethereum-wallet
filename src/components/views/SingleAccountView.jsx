import React, { Component } from 'react';
import { connect } from 'react-redux';

import SU from '../elements/selectableUnit.js';
import AccountActionBar from '../elements/AccountActionBar.js';
import NotFound from './NotFound.jsx';

import makeBlockie from 'ethereum-blockies-base64';
import * as Utils from '../../utils/utils.js';

export class SingleAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ displaySU: false });
  }

  toggleSU() {
    if (this.state.displaySU === undefined) this.setState({ displaySU: false });
    else {
      this.state.displaySU
        ? this.setState({ displaySU: false })
        : this.setState({ displaySU: true });
    }
  }

  renderSingleAccount() {
    console.log(this.props);

    let sw = this.props.reducers.selectedWallet;
    const icon = makeBlockie(sw.address);
    let divStyle = {
      backgroundImage: 'url(' + icon + ')',
    };
    return (
      <div className="dapp-container accounts-page">
        <div className="dapp-sticky-bar dapp-container" />
        <div className="accounts-page-summary">
          <span
            className="dapp-identicon"
            title="This is a security icon.  If there were any change to the address, 
						the resulting icon would be a completely different one"
            src={icon}
            style={divStyle}
          >
            <img
              src={icon}
              style={divStyle}
              className="identicon-pixel"
              alt=""
            />
          </span>
          <header>
            <h1>
              <span>Account {sw.number}</span>
              <em className="edit-name">Account {sw.number}</em>
              <i className="edit-icon icon-pencil" />
            </h1>
            <h2 className="copyable-address">
              <i className="icon-key" title="Account" />
              <span>{sw.address}</span>
            </h2>
            <div className="clear" />
            <span className="account-balance">
              {this.props.web3 && this.props.web3.web3Instance
                ? Utils.displayPriceFormatter(this.props, sw.wallet)
                : sw.wallet}
              <span className="inline-form" name="unit">
                <button
                  type="button"
                  data-name="unit"
                  data-value={this.props.reducers.currency}
                  onClick={() => this.toggleSU()}
                >
                  {this.props.reducers.currency}
                </button>
                <SU displaySU={this.state.displaySU} />
              </span>
            </span>
            {/* Account infos */}
            <div className="account-info">
              <h3>NOTE </h3>
              <p>
                Accounts can't display incoming transactions, but can receive,
                hold and send Ether. To see incoming transactions create a
                wallet contract to store ether.
              </p>
              <p>
                If your balance doesn't seem updated, make sure that you are in
                sync with the network.
              </p>
            </div>
          </header>
        </div>
        <AccountActionBar props={sw} />
      </div>
    );
  }

  render() {
    return this.props.reducers.selectedWallet === undefined ? (
      <NotFound />
    ) : (
      this.renderSingleAccount()
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(SingleAccountView);
