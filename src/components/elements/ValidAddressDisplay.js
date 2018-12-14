import React, { Component } from 'react';

export class ValidAddressDisplay extends Component {
  constructor(props) {
    super(props);
    this.state;
  }

  renderIcon() {
    return (
      <React.Fragment>
        {this.state.toIsAddress &&
        typeof this.state.toIsAddress === typeof true ? (
          <Identicon
            classes="dapp-identicon dapp-tiny"
            title
            size="tiny"
            address={this.state.toAddress}
          />
        ) : this.state.toIsAddress === null ||
          this.state.toIsAddress === undefined ? null : (
          <i className="icon-shield" />
        )}
      </React.Fragment>
    );
  }

  render() {
    const cn = require('classnames');
    const newClasses = cn({
      to: true,
      'dapp-error': this.state.toIsAddress === false,
    });
    return (
      <div className="dapp-address-input">
        <input
          type="text"
          name="to"
          placeholder="0x000000.."
          className={newClasses}
          autoFocus
          // value={tx.to}
          // onChange={e => this.handleInputChange(e)}
          // onKeyUp={e => this.handleInputChange(e)}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
        {this.renderIcon()}
      </div>
    );
  }
}

export default ValidAddressDisplay;
