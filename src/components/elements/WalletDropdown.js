import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import { sortByBalance } from '../../utils/helperFunctions.js';

import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class WalletDropdown extends Component {
  constructor(props) {
    super(props);
    let WalletsCombined = sortByBalance(
      Object.keys(this.props.reducers.Wallets)
        .map(address => {
          return {
            address,
            addressType: 'walletAddress',
            balance: this.props.reducers.Wallets[address],
          };
        })
        .concat(
          Object.keys(this.props.reducers.WalletContracts).map(address => {
            let contract = this.props.reducers.WalletContracts[address];
            return {
              ...contract,
              address,
              addressType: 'contractAddress',
            };
          })
        )
    );
    this.state = {
      Wallets: WalletsCombined,
      fromWallet: WalletsCombined[0].address,
      dropdownConfig: this.props.dropdownConfig,
    };
    this.chooseWallet = this.chooseWallet.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
  }

  chooseWallet(e) {
    console.log('e.target in chooseWallet', e.target);
    console.log('e.target in chooseWallet', e.target.value);
    this.setState({ executingWallet: e.target.value });
    this.props.updateExecutingWallet({
      name: 'executingWallet',
      value: e.target.value,
    });
  }

  // TODO: FROM SEND VIEW
  selectWallet(e) {
    this.setState({ fromWallet: e.target.value });
    // TODO:validate inputs here
    this.props.updateTransactionToSend({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  // TODO: FROM DEPLOY CONTRACT FORM
  selectWallet(e) {
    // TODO:validate inputs here
    let obj = { ...this.props.reducers.DeployContractForm };
    obj.MainOwnerAddress = e.target.value;
    console.log(obj);
    this.props.updateMainContractAddress(obj);
    // this.props.updateDeployContractForm(obj);
  }

  render() {
    let wallets = this.state.Wallets;
    let config = this.state.dropdownConfig;
    return (
      <React.Fragment>
        <select
          // Send view settings
          // className="send-from"
          // name="from"

          // DCF settings
          // className="send-from"
          // name="MainOwnerAddress"
          className={config.selectClassName}
          name={config.selectName}
          onChange={e => this.chooseWallet(e)}
          value={this.state.executingWallet}
        >
          {Object.keys(wallets).map(w => {
            let balance = wallets[w].balance;
            let address = wallets[w].address;
            let type = wallets[w].addressType;
            return (
              <option key={shortid.generate()} value={address}>
                {type === 'walletAddress' ? '🔑 ' : null}
                {this.props.web3 && this.props.web3.web3Instance
                  ? Number(
                      Utils.displayPriceFormatter(this.props, balance, 'ETHER')
                    ).toFixed(2)
                  : Number(balance).toFixed(2)}
                &nbsp; - &nbsp; 'ETHER'
              </option>
            );
          })}
        </select>
        <SecurityIcon
          type="address"
          classes="dapp-identicon dapp-small"
          hash={this.state.fromWallet}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(WalletDropdown);
