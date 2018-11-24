import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SecurityIcon from './elements/SecurityIcon';

import shortid from 'shortid';

export class TokenList extends Component {
  render() {
    let sw = this.props.reducers.selectedWallet;
    //TODO: what if selected contract
    let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    let sendUrl = sw.address + '/';

    return (
      <table className="token-list dapp-zebra">
        <tbody>
          {Object.keys(tokens).map(token => (
            <tr key={shortid.generate()}>
              <td>
                <SecurityIcon
                  type="accountItem"
                  classes="dapp-identicon dapp-tiny"
                  hash={tokens[token].address}
                />
                <strong>{tokens[token].name}</strong>
              </td>
              <td>
                {tokens[token].balance}
                &nbsp;
                {tokens[token].symbol}
              </td>
              <td>
                <Link
                  to={{ pathname: '/send-token/' + sendUrl + token }}
                  title="sendUrlForToken"
                >
                  <i className="icon-arrow-up">&nbsp;</i>
                  Send
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(TokenList);
