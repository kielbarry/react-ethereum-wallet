import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';
import TokenBox from '../elements/TokenBox.js';
import TestInputItem from '../elements/TestInputItem.js';
import * as Actions from '../../actions/actions.js';

class WatchToken extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.props, {
      address: '',
      name: '',
      symbol: '',
      decimals: '',
      balance: '',
    });

    this.invokeContractMethod = this.invokeContractMethod.bind(this);
    this.getTokenContractInfo = this.getTokenContractInfo.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }

  invokeContractMethod(TokenContract, variableMethodName) {
    try {
      TokenContract.methods[variableMethodName]()
        .call()
        .then(result => {
          console.log('result', result);
          this.setState({ [variableMethodName]: result });
          this.props.updateTokenToWatch({
            name: variableMethodName,
            value: result,
          });
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

  getTokenContractInfo(address) {
    let web3 = this.props.web3.web3Instance;
    let TokenContract = new web3.eth.Contract(tokenInterface);
    TokenContract.options.address = address;
    this.setState({ address: address });
    this.props.updateTokenToWatch({
      name: 'address',
      value: address,
    });
    this.invokeContractMethod(TokenContract, 'symbol');
    this.invokeContractMethod(TokenContract, 'name');
    this.invokeContractMethod(TokenContract, 'decimals');
    this.invokeContractMethod(TokenContract, 'totalSupply');
  }

  handleOnKeyUp(e) {
    //TODO: this is getting called twice when using copy/paste with keyboard shortcuts

    // TODO:validate inputs here

    let name = e.target.getAttribute('name');
    let value = e.target.value;

    let web3 = this.props.web3.web3Instance;
    // TODO: checks coin symbol against MEW list?
    // var l = e.currentTarget.value.length;
    // if (!tokenAddress && l > 2 && l < 6) {
    //   e.currentTarget.value += '.thetoken.eth';
    //   e.currentTarget.setSelectionRange(l, l + 13);
    // }

    // if (
    //   !tokenAddress ||
    //   (template.data &&
    //     template.data.address &&
    //     template.data.address == tokenAddress)
    // )
    //   return;

    if (name === 'address' && value.length === 42) {
      let isAddress = web3.utils.isAddress(value);
      let toCheckSum = web3.utils.toChecksumAddress(value);
      let isCheckSummed = web3.utils.checkAddressChecksum(toCheckSum);
      if (isAddress && isCheckSummed) {
        this.getTokenContractInfo(value);
        return;
      }
    }

    this.setState({ [name]: value });
    this.props.updateTokenToWatch({
      name: name,
      value: e.target.value,
    });
  }

  cancelFunction(e) {
    this.props.cancelTokenToWatch(); // TODO:reset data values in inputs
    this.props.closeModal('displayWatchToken');
  }

  submitFunction(e) {
    let web3;
    let token = this.props.reducers.TokenToWatch;
    let address = token.address;
    if (this.props.web3.web3Instance) {
      this.props.addObservedToken({
        address: token.address,
        value: token,
      });
      this.props.displayGlobalNotification({
        display: true,
        type: 'success',
        msg: 'Added custom token',
      });
    } else {
      // TODO:trigger global notification here
    }
    this.props.closeModal('displayWatchToken');
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    var GeoPattern = require('geopattern');
    var pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    let iconStyle = { backgroundImage: pattern.toDataUrl() };
    let TokenToWatch = this.props.reducers.TokenToWatch;

    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-token">
          <h1>Add Token</h1>
          <h3>Token Contract Address</h3>
          <div className="dapp-address-input">
            <input
              type="text"
              name="address"
              placeholder="0x000000"
              className="token-address"
              onChange={e => this.handleOnKeyUp(e)}
              value={this.state.address}
            />
          </div>
          <h3>Token name</h3>
          <div className="dapp-token-name-input">
            <input
              type="string"
              name="name"
              placeholder="Token name"
              className="name"
              onChange={e => this.handleOnKeyUp(e)}
              value={this.state.name}
            />
          </div>
          <h3>Token symbol</h3>
          <div className="dapp-token-symbol-input">
            <input
              type="string"
              name="symbol"
              placeholder="Token symbol"
              className="symbol"
              onChange={e => this.handleOnKeyUp(e)}
              value={this.state.symbol}
            />
          </div>
          <h3>Decimals places of smallest unit</h3>
          <input
            type="number"
            min="0"
            step="1"
            name="decimals"
            placeholder="2"
            className="decimals"
            onChange={e => this.handleOnKeyUp(e)}
            value={this.state.decimals}
          />
          <br />
          <h3>Preview</h3>
          <TokenBox key={TokenToWatch.address} token={TokenToWatch} />
          <div className="dapp-modal-buttons">
            <button className="cancel" onClick={() => this.cancelFunction()}>
              Cancel
            </button>
            <button
              className="ok dapp-primary-button"
              onClick={() => this.submitFunction()}
            >
              OK
            </button>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(WatchToken);
