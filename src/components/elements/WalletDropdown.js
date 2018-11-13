import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import { sortByBalance } from '../../utils/helperFunctions.js';

import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  keyIcon: {
    width: '3%',
    display: 'inline-block',
    WebkitTransform: 'rotate(45deg)',
    MozTransform: 'rotate(45deg)',
    MsTransform: 'rotate(45deg)',
    OTransform: 'rotate(45deg)',
    transform: 'rotate(45deg)',
  },
});

export class WalletDropdown extends Component {
  constructor(props) {
    super(props);
    let WalletsCombined = sortByBalance(
      Object.keys(this.props.reducers.Wallets)
        .map(address => {
          return {
            ...this.props.reducers.Wallets[address],
            address,
            addressType: 'walletAddress',
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
    this.props.updateMainDCF({
      name: 'MainOwnerAddress',
      value: this.state.fromWallet,
    });
    this.chooseWallet = this.chooseWallet.bind(this);
  }

  chooseWallet(e) {
    this.setState({ fromWallet: e.target.value });
    if (this.state.dropdownConfig === 'Send') {
      this.props.updateTransactionToSend({
        name: e.target.getAttribute('name'),
        value: e.target.value,
      });
      return;
    }

    if (this.state.dropdownConfig === 'DeployContractForm') {
      this.props.updateMainDCF({
        name: 'MainOwnerAddress',
        value: e.target.value,
      });
      return;
    }

    if (this.state.dropdownConfig === 'ExecuteFunctions') {
      this.props.updateExecutingWallet({
        name: 'executingWallet',
        value: e.target.value,
      });
    }
  }

  render() {
    let wallets = this.state.Wallets;
    let config = this.state.dropdownConfig;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <select
          className={config.selectClassName}
          name={config.selectName}
          onChange={e => this.chooseWallet(e)}
          value={this.state.fromWallet}
        >
          {wallets.map(w => {
            return (
              <option key={shortid.generate()} value={w.address}>
                {w.addressType === 'walletAddress' ? '🔑 ' : null}
                {this.props.web3 && this.props.web3.web3Instance
                  ? Number(
                      Utils.displayPriceFormatter(
                        this.props,
                        w.balance,
                        'ETHER'
                      )
                    ).toFixed(2)
                  : Number(w.balance).toFixed(2)}
                &nbsp; - &nbsp; ETHER
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

export default compose(
  withStyles(styles, { name: 'WalletDropdown' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(WalletDropdown);
