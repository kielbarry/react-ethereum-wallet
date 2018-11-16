import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import Inputs from '../elements/inputs/Inputs.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class ExecuteConstants extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.executeInput = this.executeInput.bind(this);
  }

  executeInput(e, input, func) {
    let web3 = this.props.web3 ? this.props.web3.web3Instance : null;
    if (!web3) {
      return;
    }

    let index = e.target.getAttribute('index');
    let value = e.target.value;

    const BN = web3.utils.BN;
    let contractInfo = this.state.reducers.selectedContract.contract;

    let jsonInterface = contractInfo.jsonInterface;
    let funcName = func.name;

    func.inputs[index].value = value;
    console.log(...func.inputs);

    let inputs = func.inputs.map(inp => {
      return inp.type.includes('int')
        ? new BN(web3.utils.toWei(inp.value.replace(',', '.')))
        : inp.value;
    });

    let contract = new web3.eth.Contract(
      JSON.parse(jsonInterface),
      contractInfo.contractAddress
    );

    // Couldn't decode bool from ABI
    // reliably recreate it?
    // can maybe make a PR

    // dot test on test net for ENS
    // get ens address
    // resolver contract is only on the mainnet
    // http://docs.ens.domains/en/latest/introduction.html

    // breakout readme for open fashion
    // gear for easy dev / easy getting started for contributions
    // there will be more eyeballs soon

    contract.options['address'] = contractInfo.contractAddress;
    console.log(contractInfo);
    console.log(contract.options);

    try {
      contract.methods[funcName](...inputs)
        .call()
        .then((err, res) => {
          err ? console.warn(err) : console.log('here is res', res);
        });
    } catch (err) {
      console.error(err);
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: 'errarrrrr',
      });
    }
  }

  // snapshotted
  renderFunctionInputs(func) {
    return (
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
                  <Inputs
                    data={input}
                    index={index}
                    onChange={e => this.executeInput(e, input, func)}
                  />
                </React.Fragment>
              ))
            : null}
        </td>
      </tr>
    );
  }

  //snapshotted
  renderOutputType(output) {
    return (
      <dd className="output">
        {output.type === 'address'
          ? this.renderAddress(output)
          : output.type === 'bool'
          ? this.renderBool(output)
          : output.value}
      </dd>
    );
  }

  // snapshotted
  renderAddress(output) {
    return (
      <span className="address dapp-shorten-text not-ens-name">
        <SecurityIcon
          type="transactionHref"
          classes={'dapp-identicon dapp-tiny'}
          hash={output.value !== '' ? output.value : '0x'}
        />
      </span>
    );
  }

  // snapshotted
  renderBool(output) {
    let bool = output.value === true;
    let text = bool ? 'YES ' : 'NO ';
    let icon = bool ? 'icon-check' : 'icon-ban';
    return (
      <React.Fragment>
        {text}
        <em>
          <span className={'icon ' + icon} />
        </em>
      </React.Fragment>
    );
  }

  // snapshotted
  renderFunctionOutputs(func) {
    return (
      <tr key={shortid.generate()}>
        <td>
          <dl className={'constant-' + func.name + ' dapp-zebra'}>
            {func.outputs.map((output, index) => (
              <React.Fragment>
                {output.name !== '' ? (
                  <dt>{Helpers.unCamelCaseToSentence(output.name)}</dt>
                ) : null}

                {this.renderOutputType(output)}
              </React.Fragment>
            ))}
          </dl>
        </td>
      </tr>
    );
  }

  // TODO: snapshot
  render() {
    let contract = this.state.reducers.selectedContract.contract;
    let constants = this.state.reducers.ObservedContracts[contract.address]
      .contractConstants;
    return (
      <div className="col col-8 mobile-full contract-info">
        <h2>Read from contract</h2>
        <table className="contract-constants dapp-zebra">
          <tbody>
            {constants
              ? constants.map(func => (
                  <React.Fragment>
                    {this.renderFunctionInputs(func)}
                    {this.renderFunctionOutputs(func)}
                  </React.Fragment>
                ))
              : ''}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  contract: state.reducers.contract,
  ObservedContracts: state.reducers.ObservedContracts,
  selectedContract: state.reducers.selectedContract,
  showContractFunctions: state.reducers.showContractFunctions,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(ExecuteConstants);
