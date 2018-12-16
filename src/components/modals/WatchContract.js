import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../elements/InputItem.jsx';
import TestInputItem from '../elements/TestInputItem';
import * as Actions from '../../actions/actions';
import {
  updateContractToWatch,
  cancelContractToWatch,
  closeModal,
  addObservedContract,
  displayGlobalNotification,
} from '../../actions/actions.js';
import web3 from '../../web3';

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
    placeholder:
      '[{type: &quot;constructor&quot;, name: &quot;MyContract&quot;, &quot;inputs&quot;:[{"name&quot;:&quot;_param1&quot;, &quot;type&quot;:&quot;address&quot;}]}, {...}]',
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
    const contract = this.props.reducers.ContractToWatch;
    console.log(contract);
    if (web3) {
      const con = {};
      try {
        web3.eth.getBalance(contract.address, (err, res) => {
          if (err) console.warn(err);
          console.log('res received', res);
          contract.balance = res;
          contract.logs = [];
          contract.contractAddress = contract.address;
          con[contract.address] = contract;

          const {
            ContractsPendingConfirmations,
            WalletContracts,
          } = this.props.reducers;
          const deployedWalletContracts = Object.assign(
            {},
            ContractsPendingConfirmations,
            WalletContracts
          );

          console.log('here in watch COntracts', deployedWalletContracts);

          contract.deployedWalletContract = Object.keys(
            deployedWalletContracts
          ).includes(contract.address);

          this.props.addObservedContract(con);
          this.props.displayGlobalNotification({
            display: true,
            type: 'success',
            msg: 'Added custom contract',
          });
        });
      } catch (err) {
        console.warn(err);
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg: 'Error retreiving balance for the added contract',
        });
      }
    }
    this.props.closeModal('displayWatchContract');
  }

  renderInputs() {
    return (
      <React.Fragment>
        <h1>Watch contract</h1>
        {listInputs.map((field, i) => (
          <TestInputItem
            key={`contract-field-${i}`}
            field={field}
            onKeyUp={e => this.handleOnKeyUp(e)}
          />
        ))}
      </React.Fragment>
    );
  }

  renderButtons() {
    return (
      <div className="dapp-modal-buttons">
        <button className="cancel" onClick={e => this.cancelFunction(e)}>
          Cancel
        </button>
        <button
          className="ok dapp-primary-button"
          onClick={e => this.submitFunction(e)}
        >
          OK
        </button>
      </div>
    );
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-custom-contract">
          {this.renderInputs()}
          {this.renderButtons()}
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
  {
    updateContractToWatch,
    cancelContractToWatch,
    closeModal,
    addObservedContract,
    displayGlobalNotification,
  }
)(WatchItem);
