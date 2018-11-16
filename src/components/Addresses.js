import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountItem from './elements/AccountItem.js';

class Addresses extends Component {
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
              props={this.props}
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
