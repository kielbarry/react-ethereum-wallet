import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
// import SecurityIcon from './SecurityIcon.js';
import { SecurityIcon } from './SecurityIcon.js';
import NumberFormat from 'react-number-format';

import TokenListForItems from './TokenListForItems.js';

import { EthAddress, Identicon } from 'ethereum-react-components';

// const openAccountPage = (w, props) => {
//   console.log(this)
//   console.log(props)
//   console.log(selectedWallet)
//   console.log(this.selectedWallet())
//   selectedWallet({
//     address: props.address,
//     number: props.number,
//     wallet: props.wallet,
//     currency: props.currency,
//     addressType: 'account',
//   });
// }

// export const AccountItem = props => {
//   props = Object.assign({}, props, props.props);
//   let wallet = props.wallet;
//   let address = props.address;
//   let number = props.number;
//   const AccountURL = '/account/' + address;

//   console.log(this)
//   console.log(openAccountPage)

//   return (
//     <Link
//       to={{ pathname: AccountURL }}
//       onClick={w => openAccountPage(w, props)}
//       className="wallet-box"
//     >
//       <SecurityIcon
//         type="accountItem"
//         classes="dapp-identicon dapp-small"
//         hash={props.address}
//       />
//       <ul className="token-list" />
//       <h3 className="not-ens-name">
//         <i className={props.icon} title="Account" />
//         Account {number}
//       </h3>
//       {props.web3 && props.web3.web3Instance ? (
//         <NumberFormat
//           className="account-balance"
//           value={Utils.displayPriceFormatter(props, wallet.balance)}
//           displayType={'text'}
//           thousandSeparator={true}
//         />
//       ) : (
//         <NumberFormat
//           className="account-balance"
//           value={wallet.balance}
//           displayType={'text'}
//           thousandSeparator={true}
//         />
//       )}
//       <span> {props.currency} </span>
//       <span className="account-id">{address}</span>
//     </Link>
//   );
// };

// export default AccountItem;

export class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  openAccountPage(w) {
    this.props.selectedWallet({
      address: this.props.address,
      number: this.props.number,
      wallet: this.props.wallet,
      currency: this.props.reducers.currency,
      addressType: 'account',
    });
  }

  renderBalance() {
    let wallet = this.props.wallet;
    return (
      <React.Fragment>
        {this.props.web3 && this.props.web3.web3Instance ? (
          <NumberFormat
            className="account-balance"
            value={Utils.displayPriceFormatter(this.props, wallet.balance)}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            className="account-balance"
            value={wallet.balance}
            displayType={'text'}
            thousandSeparator={true}
          />
        )}
        <span> {this.props.reducers.currency} </span>
      </React.Fragment>
    );
  }

  render() {
    let address = this.props.address;
    let number = this.props.number;
    const AccountURL = '/account/' + address;
    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          {/*}
          <SecurityIcon
            type="accountItem"
            classes="dapp-identicon dapp-small"
            hash={this.props.address}
          />
        */}
          <Identicon size="small" address={this.props.address} />
          <TokenListForItems
            addressType={this.props.addressType}
            address={this.props.address}
          />
          <h3 className="not-ens-name">
            <i className={this.props.icon} title="Account" />
            Account {number}
          </h3>
          {this.renderBalance()}
          <EthAddress short className="account-id" address={address} />
          {/*<span className="account-id">{address}</span>*/}
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
  { selectedWallet, ...Actions }
)(AccountItem);
