import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import Inputs from '../elements/inputs/Inputs.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class ExecutableContract extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.chooseFunction = this.chooseFunction.bind(this);
    this.chooseWallet = this.chooseWallet.bind(this);
    this.executeContractFunction = this.executeContractFunction.bind(this);

    // this.props.selectedFunction.executingWallet
    //   ? null
    //   : this.props.updateExecutingWallet({
    //       name: 'executingWallet',
    //       value: this.props.reducers.Wallets[0],
    //     });
  }

  /**
  Watches custom events

  @param {Object} contract the account object with .jsonInterface
  */
  renderFunctionInputs() {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address]
      .contractFunctions;

    let selectedFunction = this.props.reducers.selectedFunction;
    let inputs = selectedFunction !== undefined ? selectedFunction.inputs : [];
    // let inputs = this.props.reducers.selectedFunction.inputs;
    return (
      <React.Fragment>
        {inputs
          ? inputs.map((input, index) => (
              <React.Fragment>
                <h4>
                  {Helpers.toSentence(input.name)}
                  &nbsp;
                  <em>- {input.type}</em>
                </h4>

                <Inputs data={input} index={index} />
              </React.Fragment>
            ))
          : null}
      </React.Fragment>
    );
  }

  chooseFunction(e) {
    let contract = this.state.reducers.selectedContract.contract;
    let functions = this.state.reducers.ObservedContracts[contract.address];
    if (e.target.name === 'pickFunctionDefault') {
      this.props.updateSelectedFunction({});
      return;
    }
    let func = functions.contractFunctions[e.target.selectedIndex - 1];
    console.log('here in choose function', func);
    if (func.name === e.target.value) {
      func['contractAddress'] = contract.address;
      this.props.updateSelectedFunction(func);
    } else {
      //TODO: global
      /*
      Transaction sent in green
      Returned error: authentication needed: password or unlock
      */
    }
  }

  chooseWallet(e) {
    this.props.updateExecutingWallet({
      name: 'executingWallet',
      value: e.target.value,
    });
  }

  executeContractFunction(e) {
    console.log('in executeContractFunction', e);
    console.log(this.props.selectedFunction);
  }

  renderExecuteFunctions() {
    let contract = this.state.reducers.selectedContract.contract;
    let functions = this.state.reducers.ObservedContracts[contract.address]
      .contractFunctions;
    let wallets = this.state.reducers.Wallets;
    return (
      <div className="col col-4 mobile-full contract-functions">
        <h2>Write to contract</h2>
        <h4>Select Function</h4>
        <select
          className="select-contract-function"
          name="select-contract-function"
          onChange={e => this.chooseFunction(e)}
        >
          <option disabled="" name="pickFunctionDefault">
            Pick a function
          </option>
          {functions
            ? functions.map((c, i) => (
                <option value={c.name}>
                  {Helpers.toSentence(c.name, true)}
                </option>
              ))
            : ''}
        </select>
        {this.renderFunctionInputs()}
        <hr className="dapp-clear-fix" />
        <h4> Execute from </h4>
        <div className="dapp-select-account">
          <select
            name="dapp-select-account"
            onChange={e => this.chooseWallet(e)}
          >
            {Object.keys(wallets).map(w => {
              let balance = wallets[w];
              return (
                <React.Fragment>
                  <option key={shortid.generate()} value={w}>
                    {this.props.web3 && this.props.web3.web3Instance
                      ? Utils.displayPriceFormatter(
                          this.props,
                          balance,
                          'ETHER'
                        )
                      : balance}
                    &nbsp; - &nbsp;
                    {w}
                  </option>
                </React.Fragment>
              );
            })}
          </select>
          <SecurityIcon
            type="address"
            classes="dapp-identicon dapp-small"
            hash="toBeReplaced"
          />
        </div>
        <button
          className="dapp-block-button execute"
          onClick={e => this.executeContractFunction(e)}
        >
          Execute
        </button>
      </div>
    );
  }

  renderConstantFunctions() {
    let contract = this.state.reducers.selectedContract.contract;
    let constants = this.state.reducers.ObservedContracts[contract.address]
      .contractConstants;
    return (
      <React.Fragment>
        <table className="contract-constants dapp-zebra">
          <tbody>
            {constants
              ? constants.map(func => (
                  <React.Fragment>
                    <tr key={shortid.generate()}>
                      <td>
                        <h3>{Helpers.unCamelCaseToSentence(func.name)}</h3>
                        {func.inputs.length > 0
                          ? func.inputs.map((input, index) => (
                              <React.Fragment>
                                <h4>
                                  <span className="dapp-punctuation">_</span>
                                  {input.name}
                                  &nbsp;
                                  <em>-&nbsp; {input.type}</em>
                                </h4>
                                <Inputs data={input} index={index} />
                              </React.Fragment>
                            ))
                          : null}
                      </td>
                    </tr>
                    <tr key={shortid.generate()}>
                      <td>
                        <dl className={'constant-' + func.name + ' dapp-zebra'}>
                          {func.outputs.map((output, index) => (
                            <React.Fragment>
                              {output.name !== '' ? (
                                <dt>
                                  {Helpers.unCamelCaseToSentence(output.name)}
                                </dt>
                              ) : null}
                              <dd className="output">
                                {output.value}
                                <br />
                              </dd>
                            </React.Fragment>
                          ))}
                        </dl>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              : ''}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  toggleContractInfo(e) {
    this.setState({ showContractFunctions: !this.state.showContractFunctions });
  }

  render() {
    let show = this.state.showContractFunctions;
    let divStyle;
    show === undefined || show
      ? (divStyle = { display: 'block' })
      : (divStyle = { display: 'none' });
    return (
      <div className="execute-contract">
        <button
          className="toggle-visibility dapp-block-button dapp-small"
          onClick={e => this.toggleContractInfo(e)}
        >
          Hide contract info
        </button>
        <div className="dapp-clear-fix" />
        <div className="row clear" style={divStyle}>
          <div className="col col-8 mobile-full contract-info">
            <h2>Read from contract</h2>
            {this.renderConstantFunctions()}
          </div>
          {this.renderExecuteFunctions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  contract: state.reducers.contract,
  ObservedContracts: state.reducers.ObservedContracts,
  selectedFunction: state.reducers.selectedFunction,
  selectedContract: state.reducers.selectedContract,
  showContractFunctions: state.reducers.showContractFunctions,
  Wallets: state.reducers.Wallets,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(ExecutableContract);
