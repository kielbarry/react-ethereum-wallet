import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Identicon } from 'ethereum-react-components';
import * as Actions from '../../actions/actions';

export class RadioTokenSelect extends Component {
  constructor(props) {
    super(props);
    this.chooseToken = this.chooseToken.bind(this);
  }

  chooseToken(e) {
    const tokens = this.props.tokens;
    if (e.target.value === 'ether') {
      this.props.updateTokenToSend({
        sendToken: false,
        tokenToSend: {},
      });
    } else {
      this.props.updateTokenToSend({
        sendToken: true,
        tokenToSend: Object.assign({}, tokens[e.target.value]),
      });
    }
  }

  renderEtherChoice() {
    return (
      <li onClick={e => this.chooseToken(e)}>
        <input
          type="radio"
          id="ether"
          value="ether"
          name="choose-token"
          onClick={e => {
            this.chooseToken(e);
          }}
        />
        <label htmlFor="ether">
          <span className="ether-symbol">Ξ</span>
          <span className="token-name">ETHER</span>
          <span className="balance">TODO</span>
        </label>
      </li>
    );
  }

  renderTokensChoice() {
    const tokens = this.props.tokens;
    const wallet = this.props.wallet;
    return (
      <React.Fragment>
        {Object.keys(tokens).map(token => (
          <li key={shortid.generate()}>
            <input
              type="radio"
              id={`token-${tokens[token].address}`}
              value={tokens[token].address}
              name="choose-token"
              onClick={e => {
                this.chooseToken(e);
              }}
            />
            <label htmlFor={`token-${tokens[token].address}`}>
              <Identicon
                classes="dapp-identicon dapp-tiny"
                title
                size="tiny"
                address={token}
              />
              <span className="token-name">{tokens[token].name}</span>
              <span className="balance">
                {tokens[token].balance}
                &nbsp;
                {tokens[token].symbol}
              </span>
            </label>
          </li>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const tokens = this.props.tokens;
    return (
      <ul className="select-token">
        {this.renderEtherChoice()}
        {tokens ? this.renderTokensChoice() : null}
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
