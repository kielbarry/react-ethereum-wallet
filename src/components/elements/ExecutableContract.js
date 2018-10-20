import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class ExecutableContract extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // contract: this.props.reducers.selectedContract.contract,
    //   // ObservedContracts: this.props.reducers.ObservedContracts,
    //   // selectedFunction: this.props.reducers.selectedFunction,
    //   // selectedContract: this.props.reducers.selectedContract,
    //   ...this.props,
    //   showContractFunctions: true,
    // };
    this.state = this.props;
    this.chooseFunction = this.chooseFunction.bind(this);
    // this.setState({ showContractFunctions: true });
  }

  /**
  Watches custom events

  @param {Object} contract the account object with .jsonInterface
  */
  renderFunctionInputs() {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address]
      .contractFunctions;

    let inputs = this.props.reducers.selectedFunction.inputs;
    console.log(this.props.reducers.selectedFunction);
    console.log(inputs);
    console.log(inputs.length);
    // .inputs
    return (
      <React.Fragment>
        {inputs
          ? inputs.map(input => (
              <React.Fragment>
                <h4>
                  {Helpers.toSentence(input.name)}><em>- {input.type}</em>
                </h4>
                <input
                  type="number"
                  step="1"
                  placeholder="-123"
                  name="elements_input_int"
                />
              </React.Fragment>
            ))
          : null}
      </React.Fragment>
    );
  }

  chooseFunction(e) {
    let contract = this.state.reducers.selectedContract.contract;
    let functions = this.state.reducers.ObservedContracts[contract.address];
    let func = functions.contractFunctions[e.target.selectedIndex - 1];
    if (func.name === e.target.value) {
      func['contractAddress'] = contract.address;
      this.props.updateSelectedFunction(func);
    } else {
      //TODO: global
    }
  }

  renderExecuteFunctions() {
    let contract = this.state.reducers.selectedContract.contract;
    let functions = this.state.reducers.ObservedContracts[contract.address]
      .contractFunctions;
    return (
      <div className="col col-4 mobile-full contract-functions">
        <h2>Write to contract</h2>
        <h4>Select Function</h4>
        <select
          className="select-contract-function"
          name="select-contract-function"
          onChange={e => this.chooseFunction(e)}
        >
          <option disabled="">Pick a function</option>
          {functions
            ? functions.map((c, i) => (
                <option value={c.name}>
                  {Helpers.toSentence(c.name, true)}
                </option>
              ))
            : ''}
        </select>
        {this.renderFunctionInputs()}
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
                      </td>
                    </tr>
                    <tr key={shortid.generate()}>
                      <td>
                        <dl className={'constant-' + func.name + ' dapp-zebra'}>
                          <dd className="output">
                            {Helpers.unCamelCaseToSentence(func.name)}
                            <br />
                          </dd>
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
    console.log('here intoggleContractInfo', e);
    this.setState({ showContractFunctions: !this.state.showContractFunctions });
  }

  render() {
    // let contract = this.props.reducers.selectedContract.contract;
    // let functions = this.props.reducers.ObservedContracts[contract.address]
    //   .contractFunctions;
    // let constants = this.props.reducers.ObservedContracts[contract.address]
    //   .contractConstants;
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
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(ExecutableContract);
