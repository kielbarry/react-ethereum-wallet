import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import AccountItem from './elements/AccountItem';

export class Addresses extends Component {
  render() {
    if (this.props.reducers.Wallets !== undefined) {
      const wallets = this.props.reducers.Wallets;
      const icon = 'icon-key';
      return (
        <div className="wallet-box-list">
          {Object.keys(wallets).map((address, i) => (
            <AccountItem
              key={shortid.generate()}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={wallets[address]}
              currency={this.props.reducers.currency}
              web3={this.props.web3}
              reducers={this.props.reducers}
              ObservedTokens={this.props.reducers.ObservedTokens}
              addressType="Wallets"
              index={i}
            />
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Addresses);
