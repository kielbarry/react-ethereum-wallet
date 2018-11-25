import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';
import { SecurityIcon } from './SecurityIcon.js';

export class RadioTokenSelect extends Component {
  render() {
    console.log('props', this.props);
    console.log('tokens', this.props.tokens);
    console.log('wallet', this.props.wallet);
    // let sw = this.props.reducers.selectedWallet;
    // let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    let tokens = this.props.tokens;
    let wallet = this.props.wallet;

    return (
      <ul className="select-token">
        <li>
          <input type="radio" id="ether" value="ether" name="choose-token" />
          <label for="ether">
            <span class="ether-symbol">Ξ</span>
            <span class="token-name">ETHER</span>
            <span class="balance">TODO</span>
          </label>
        </li>
        {tokens
          ? Object.keys(tokens).map(token => (
              <li>
                <input
                  type="radio"
                  id={'token-' + tokens[token].address}
                  value={tokens[token].address}
                  name="choose-token"
                />
                <label for={'token-' + tokens[token].address}>
                  <SecurityIcon
                    type="radioToken"
                    classes="dapp-identicon dapp-tiny"
                    hash={token}
                  />
                  <span class="token-name">{tokens[token].name}</span>
                  <span class="balance">
                    {tokens[token].balance}
                    &nbsp;
                    {tokens[token].symbol}
                  </span>
                </label>
              </li>
            ))
          : null}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(RadioTokenSelect);
