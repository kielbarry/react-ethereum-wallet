import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Identicon } from 'ethereum-react-components';

import shortid from 'shortid';

export class TokenList extends Component {
  // TODO: turn these renders into stateless
  renderIdentity(token) {
    let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    return (
      <td>
        <Identicon
          classes="dapp-identicon dapp-tiny"
          title
          size="tiny"
          address={tokens[token].address}
        />
        <strong>{tokens[token].name}</strong>
      </td>
    );
  }

  renderInfo(token) {
    let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    return (
      <td>
        {tokens[token].balance}
        &nbsp;
        {tokens[token].symbol}
      </td>
    );
  }

  renderLink(token) {
    let sw = this.props.reducers.selectedWallet;
    let sendUrl = sw.address + '/';
    return (
      <td>
        <Link
          to={{ pathname: '/send-token/' + sendUrl + token }}
          title="sendUrlForToken"
        >
          <i className="icon-arrow-up">&nbsp;</i>
          Send
        </Link>
      </td>
    );
  }

  render() {
    //TODO: what if selected contract
    let tokens = this.props.reducers.selectedWallet.wallet.tokens;
    return (
      <table className="token-list dapp-zebra">
        <tbody>
          {Object.keys(tokens).map(token => (
            <tr key={shortid.generate()}>
              {this.renderIdentity(token)}
              {this.renderInfo(token)}
              {this.renderLink(token)}
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
