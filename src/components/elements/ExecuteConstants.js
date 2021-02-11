import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { Identicon } from 'ethereum-react-components';
import Inputs from './inputs/Inputs.js';
import * as Helpers from '../../utils/helperFunctions';
import * as Actions from '../../actions/actions';
import web3 from '../../web3';

export class ExecuteConstants extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.executeInput = this.executeInput.bind(this);
    this.updateToTransaction = this.updateToTransaction.bind(this);
  }

  executeInput(e, input, func) {
    if (!web3) {
      return;
    }

    const index = e.target.getAttribute('index');
    const value = e.target.value;

    const BN = web3.utils.BN;
    const contractInfo = this.state.reducers.selectedContract.contract;

    const jsonInterface = contractInfo.jsonInterface;
    const funcName = func.name;

    func.inputs[index].value = value;
    console.log(...func.inputs);

    const inputs = func.inputs.map(inp => {
      return inp.type.includes('int')
        ? new BN(web3.utils.toWei(inp.value.replace(',', '.')))
        : inp.value;
    });

    const contract = new web3.eth.Contract(
      JSON.parse(jsonInterface),
      contractInfo.contractAddress
    );

    contract.options.address = contractInfo.contractAddress;

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
        msg: err,
      });
    }
  }

  // snapshotted
  renderFunctionInputs(func) {
    return (
      <tr key={shortid.generate()}>
        <td>
          <h3>{Helpers.toSentence(func.name)}</h3>
          {func.inputs.length > 0
            ? func.inputs.map((input, index) => (
                <React.Fragment key={shortid.generate()}>
                  <h4>
                    <span className="dapp-punctuation">_</span>
                    {Helpers.toSentence(input.name)}
                    &nbsp;
                    <em>- {input.type}</em>
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

  // snapshotted
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

  updateToTransaction(e) {
    e.stopPropagation();
    console.warn('todo: moved from security icon and need to pudate');
  }

  // snapshotted
  renderAddress(output) {
    const address = output.value !== '' ? output.value : '0x';
    return (
      <span className="address dapp-shorten-text not-ens-name">
        <Identicon
          classes="dapp-identicon dapp-tiny"
          title
          size="tiny"
          address={address}
        />
        <Link
          to={{ pathname: `/send-from/${address}` }}
          title={address}
          onClick={e => this.updateToTransaction(e)}
        >
          {address}
        </Link>
      </span>
    );
  }

  // snapshotted
  renderBool(output) {
    const bool = output.value === true;
    const text = bool ? 'YES ' : 'NO ';
    const icon = bool ? 'icon-check' : 'icon-ban';
    return (
      <React.Fragment>
        {text}
        <em>
          <span className={`icon ${icon}`} />
        </em>
      </React.Fragment>
    );
  }

  // snapshotted
  renderFunctionOutputs(func) {
    return (
      <tr key={shortid.generate()}>
        <td>
          <dl className={`constant-${func.name} dapp-zebra`}>
            {func.outputs.map((output, index) => (
              <React.Fragment>
                {output.name !== '' ? (
                  <dt>{Helpers.toSentence(output.name)}</dt>
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
    const contract = this.state.reducers.selectedContract.contract;
    const constants = this.state.reducers.ObservedContracts[contract.address]
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
