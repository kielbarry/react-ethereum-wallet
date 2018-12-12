import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayModal, tokenToDelete } from '../../actions/actions.js';

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';

import { makeID } from '../../utils/helperFunctions.js';

import { EthAddress, Identicon } from 'ethereum-react-components';

export class TokenBox extends Component {
  constructor(props) {
    super(props);
    this.invokeContractMethod = this.invokeContractMethod.bind(this);
    this.getTotalBalance = this.getTotalBalance.bind(this);
    this.deleteTokenModal = this.deleteTokenModal.bind(this);
  }

  invokeContractMethod(TokenContract, variableMethodName, address) {
    try {
      TokenContract.methods[variableMethodName](address)
        .call()
        .then(result => {
          console.log('result', result);
          // this.setState({ [variableMethodName]: result });
          // this.props.updateTokenToWatch({
          //   name: variableMethodName,
          //   value: result,
          // });
        });
    } catch (err) {
      console.warn('Err :', err);
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: err.message,
      });
    }
  }

  getTotalBalance() {
    // console.log('in getTotalBalance');
    let wallets = this.props.reducers.Wallets;
    let walletContracts = this.props.reducers.WalletContracts;

    // console.log(' here in wallets', wallets);
    // console.log(' here in walletContracts', walletContracts);

    let web3 = this.props.web3.web3Instance;
    let TokenContract = new web3.eth.Contract(tokenInterface);

    // Object.keys(wallets).map(address => {
    //   TokenContract.options.address = address
    //   this.invokeContractMethod(TokenContract, 'balanceOf', address)
    // })

    //TODO: delete, this is just for testing
    //contract address
    TokenContract.options.address =
      '0x57b8eec126c44408da88b3c580f9a019b5cbcb46';
    //address for balance
    this.invokeContractMethod(
      TokenContract,
      'balanceOf',
      '0x60160E29cc7F310892a197f2f13A0D81c2d864df'
    );
  }

  deleteTokenModal(e) {
    this.props.tokenToDelete(this.props.token);
    this.props.displayModal('displayDeleteToken');
  }

  renderBalance() {
    let token = this.props.token;
    return (
      <span className="account-balance">
        {token.balance}
        <span>{token.symbol}</span>
      </span>
    );
  }

  render() {
    console.log(this.props);

    var GeoPattern = require('geopattern');
    var pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    let iconStyle = { backgroundImage: pattern.toDataUrl() };
    let token = this.props.token;

    console.log(this.props.reducers.ObservedTokens);
    console.log(
      Object.keys(this.props.reducers.ObservedTokens).includes(token.address)
    );

    //TODO: WIP
    // if(
    //   token !== {} &&
    //   token.address !== '' &&
    //   !this.props.reducers.ObservedTokens.includes(token.address)
    //   ) {

    //   console.log("about to invoke getTotalBalance")
    //   this.getTotalBalance()
    // }

    let address =
      token === {} || token.address === '' ? makeID() : token.address;

    return (
      <div className="wallet-box tokens" style={iconStyle}>
        <Identicon
          classes="dapp-identicon dapp-small"
          title
          size="small"
          address={address}
        />
        <h3>{token.name}</h3>
        <button
          className="delete-token"
          onClick={e => this.deleteTokenModal(e)}
        >
          <i className="icon-trash" />
        </button>
        {this.renderBalance()}
        <EthAddress short classes="account-id" address={address} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { displayModal, tokenToDelete }
)(TokenBox);
