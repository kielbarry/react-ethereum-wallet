import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../../elements/InputItem.jsx';
import TestInputItem from '../../elements/TestInputItem.js';
import * as Actions from '../../../actions/actions.js';

const listInputs = [
  {
    title: 'Contract Address',
    divClass: 'dapp-address-input',
    editor: 'input',
    type: 'text',
    name: 'address',
    placeholder: '0x000000',
    className: 'contract-address',
  },
  {
    title: 'Contract name',
    divClass: 'dapp-contract-name-input',
    editor: 'input',
    type: 'string',
    name: 'contract-name',
    placeholder: 'Name this contract',
    className: 'name',
  },
  {
    title: 'JSON Interface',
    divClass: 'dapp-json-interface-input',
    editor: 'textarea',
    type: 'text',
    name: 'jsonInterface',
    placeholder: `[{type: &quot;constructor&quot;, name: &quot;MyContract&quot;, &quot;inputs&quot;:[{"name&quot;:&quot;_param1&quot;, &quot;type&quot;:&quot;address&quot;}]}, {...}]`,
    className: 'jsonInterface',
    cols: '30',
    rows: '10',
  },
];

class WatchItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      return true;
    }
    return false;
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    this.props.updateContractToWatch({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  cancelFunction(e) {
    this.props.cancelContractToWatch(); // TODO:reset data values in inputs
    this.props.closeModal('displayWatchContract');
  }

  submitFunction(e) {
    let web3;
    let contract = this.props.reducers.ContractToWatch;

    if (this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
      // let newContract = new web3.eth.Contract(
      //   contract.jsonInterface,
      //   contract.address
      // );

      let con = {};
      web3.eth.getBalance(contract.address, (err, res) => {
        //if err global note
        contract.balance = res;
        con[contract['contract-name']] = contract;
        this.props.addObservedContract(con);
      });
    } else {
      // TODO:trigger global notification here
    }
    this.props.closeModal('displayWatchContract');
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-custom-contract">
          <h1>Watch contract</h1>

          {listInputs.map((field, i) => (
            <TestInputItem
              key={`contract-field-${i}`}
              field={field}
              onKeyUp={e => this.handleOnKeyUp(e)}
            />
          ))}

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
  // return {modals: state.modals}
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(WatchItem);
