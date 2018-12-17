import React, { Component } from 'react';
import web3 from '../../web3';
import cn from 'classnames/bind';
import { Identicon } from 'ethereum-react-components';

export class ValidAddressDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkIsAddress = this.checkIsAddress.bind(this);
  }

  handleInputChange(e) {
    const target = e.target.getAttribute('name');
    let targetValue = e.target.value;
    let isAddress = this.checkIsAddress(targetValue);
    this.setState(
      { isAddress: isAddress },
      this.setState({ inputValue: targetValue }, this.props.onChange(e))
    );
  }

  checkIsAddress(targetValue) {
    let isAddress;
    return targetValue !== '' && targetValue !== undefined
      ? (isAddress = web3.utils.isAddress(targetValue))
      : (isAddress = null);
  }

  renderIcon() {
    const { isAddress } = this.state;
    return (
      <React.Fragment>
        {isAddress === true ? (
          <Identicon
            classes="dapp-identicon dapp-tiny"
            title
            size="tiny"
            address={this.state.inputValue}
          />
        ) : (
          <i className="icon-shield" />
        )}
      </React.Fragment>
    );
  }

  render() {
    const newClasses = cn({
      [`${this.props.name}`]: !!this.props.name,
      'dapp-error': this.state.isAddress === false,
    });
    const { isAddress } = this.state;
    return (
      <div className={this.props.classes}>
        <input
          type="text"
          name={this.props.name}
          placeholder="0x000000.."
          className={newClasses}
          autoFocus
          autoComplete={this.props.autoComplete}
          onChange={e => this.handleInputChange(e)}
        />
        {isAddress === null || isAddress === undefined
          ? null
          : this.renderIcon()}
      </div>
    );
  }
}

export default ValidAddressDisplay;
