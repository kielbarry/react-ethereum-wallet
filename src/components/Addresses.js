import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountItem from './elements/AccountItem.js';

export class Addresses extends Component {
  render() {
    if (this.props.reducers.Wallets !== undefined) {
      const wallets = this.props.reducers.Wallets;
      const icon = 'icon-key';
      return (
        <React.Fragment>
          {Object.keys(wallets).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={wallets[address]}
              currency={this.props.reducers.currency}
              web3={this.props.web3}
              props={this.props}
              addressType="Wallets"
            />
          ))}
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Addresses);
