import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tokenInterface } from '../../constants/TokenInterfaceConstant';
import TokenBox from '../elements/TokenBox';
import TestInputItem from '../elements/TestInputItem';
import {
  displayGlobalNotification,
  updateTokenToWatch,
  cancelTokenToWatch,
  closeModal,
  addObservedToken,
} from '../../actions/actions';

import ValidAddressDisplay from '../elements/ValidAddressDisplay';

class WatchToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      name: '',
      symbol: '',
      decimals: '',
      balance: '',
    };

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
    const web3 = this.props.web3.web3Instance;
    const TokenContract = new web3.eth.Contract(tokenInterface);
    TokenContract.options.address = address;
    this.setState({ address });
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
    // TODO: this is getting called twice when using copy/paste with keyboard shortcuts

    // TODO:validate inputs here

    const name = e.target.getAttribute('name');
    const value = e.target.value;

    const web3 = this.props.web3.web3Instance;
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
      const isAddress = web3.utils.isAddress(value);
      const toCheckSum = web3.utils.toChecksumAddress(value);
      const isCheckSummed = web3.utils.checkAddressChecksum(toCheckSum);
      if (isAddress && isCheckSummed) {
        this.getTokenContractInfo(value);
        return;
      }
    }

    this.setState({ [name]: value });
    this.props.updateTokenToWatch({
      name,
      value: e.target.value,
    });
  }

  cancelFunction(e) {
    this.props.cancelTokenToWatch(); // TODO:reset data values in inputs
    this.props.closeModal('displayWatchToken');
  }

  submitFunction(e) {
    let web3;
    const token = this.props.TokenToWatch;
    const address = token.address;
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

  renderInputs() {
    return (
      <React.Fragment>
        <h1>Add Token</h1>
        <h3>Token Contract Address</h3>
        <ValidAddressDisplay
          name="address"
          classes="dapp-address-input token-address"
          autoComplete={'off'}
          onChange={this.handleOnKeyUp}
        />
        <h3>Token name</h3>
        <div className="dapp-token-name-input">
          <input
            type="string"
            name="name"
            placeholder="Token name"
            className="name"
            onChange={this.handleOnKeyUp}
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
            onChange={this.handleOnKeyUp}
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
          onChange={this.handleOnKeyUp}
          value={this.state.decimals}
        />
        <br />
      </React.Fragment>
    );
  }

  renderButtons() {
    return (
      <div className="dapp-modal-buttons">
        <button className="cancel" onClick={this.cancelFunction}>
          Cancel
        </button>
        <button
          className="ok dapp-primary-button"
          onClick={this.submitFunction}
        >
          OK
        </button>
      </div>
    );
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    const { TokenToWatch } = this.props;
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-token">
          {this.renderInputs()}
          <h3>Preview</h3>
          <TokenBox key={TokenToWatch.address} token={TokenToWatch} />
          {this.renderButtons()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  TokenToWatch: state.reducers.TokenToWatch,
  web3: state.web3,
});

export default connect(
  mapStateToProps,
  {
    displayGlobalNotification,
    updateTokenToWatch,
    cancelTokenToWatch,
    closeModal,
    addObservedToken,
  }
)(WatchToken);
