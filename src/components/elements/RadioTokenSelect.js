import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';
import { SecurityIcon } from './SecurityIcon.js';

export class RadioTokenSelect extends Component {
  render() {
    console.log(this.props);
    let sw = this.props.reducers.selectedWallet;
    let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    return (
      <ul>
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
                    hash={sw.address}
                  />
                  <span class="token-name">tokens[token].name</span>
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
