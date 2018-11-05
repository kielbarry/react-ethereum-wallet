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
  }
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
