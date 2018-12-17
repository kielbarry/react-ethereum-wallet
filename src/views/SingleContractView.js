import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Identicon } from 'ethereum-react-components';
import ContractActionBar from '../components/elements/ContractActionBar';
import ExecutableContract from '../components/elements/ExecutableContract';
import ContractEvents from '../components/elements/ContractEvents';
import NoMatchingTransaction from '../components/elements/NoMatchingTransaction';
import LatestTransactions from '../components/elements/LatestTransactions';
import { displayPriceFormatter } from '../utils/utils';
// import * as Actions from '../actions/actions';
import {
  updateSelectedEvent,
  displayModal,
  addObservedContractFunctions,
  addObservedContractConstants,
  addDeployedContractFunctions,
  addDeployedContractConstants,
  updateInitialObservedContractMethodOutputs,
  updateInitialDeployedContractMethodOutputs,
  addPastContractLogs,
  updateContractLog,
} from '../actions/actions';
import NotFound from './NotFound';

const StickyBar = ({ address }) => {
  return (
    <div className="dapp-sticky-bar dapp-container">
      <Identicon classes="dapp-identicon" title address={address} />
    </div>
  );
};

StickyBar.propTypes = {
  address: PropTypes.string,
};

const StatelessSummary = ({ contract }) => {
  return (
    <React.Fragment>
      <h1>
        <em className="edit-name">{contract['contract-name']}</em>
        <i className="edit-icon icon-pencil" />
      </h1>
      <h2 className="copyable-address">
        <i className="icon-key" title="Account" />
        <span>{contract.address}</span>
      </h2>
      <div className="clear" />
    </React.Fragment>
  );
};

StatelessSummary.propTypes = {
  contract: PropTypes.object,
};

export class SingleContractView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      // dailyEtherLimit: '',
      // requiredSignatures: '',
      // ownersList: '',
      showContractFunctions: true,
    };
    this.redirectToOwnersSingleView = this.redirectToOwnersSingleView.bind(
      this
    );
    this.watchContractEvents = this.watchContractEvents.bind(this);
    this.toggleContractInfo = this.toggleContractInfo.bind(this);
    this.displayEventModal = this.displayEventModal.bind(this);
    this.executeAndWatch = this.executeAndWatch.bind(this);
    this.executeFunctions = this.executeFunctions.bind(this);
    this.updateContractWithMethods = this.updateContractWithMethods.bind(this);
    // this.updateContractWithMethodOutputs = this.updateContractWithMethodOutputs.bind(
    //   this
    // );
    // this.setState({ showContractFunctions: true });
  }

  componentDidMount() {
    this.setState({ displaySU: false });
    // this.setState({ showContractFunctions: true });
  }

  displayEventModal(e, log) {
    const {
      selectedContract: { contract },
    } = this.props;

    const mutableLog = log;
    mutableLog.originalContractName = contract['contract-name'];
    mutableLog.originalContractAddress = contract.address;

    updateSelectedEvent(mutableLog);
    displayModal('displayEventInfo');
  }

  executeAndWatch(e, contract) {
    console.log('yes here inexecuteAndWatch ', contract);
    this.executeFunctions(e, contract);
    this.watchContractEvents(e, contract);
  }

  updateContractWithMethods(contract, contractFunctions, contractConstants) {
    console.log('yes here in updateContractWithMethods');
    if (!contract.deployedWalletContract) {
      addObservedContractFunctions({
        address: contract.address,
        value: contractFunctions,
        name: 'contractFunctions',
      });
      addObservedContractConstants({
        address: contract.address,
        value: contractConstants,
        name: 'contractConstants',
      });
    } else {
      addDeployedContractFunctions({
        address: contract.address,
        value: contractFunctions,
        name: 'contractFunctions',
      });
      addDeployedContractConstants({
        address: contract.address,
        value: contractConstants,
        name: 'contractConstants',
      });
    }
  }

  updateContractWithMethodOutputs(contract, method, index) {
    if (!contract.deployedWalletContract) {
      updateInitialObservedContractMethodOutputs({
        contractAddress: contract.address,
        name: method.name,
        index,
        value: method.outputs,
      });
    } else {
      updateInitialDeployedContractMethodOutputs({
        contractAddress: contract.address,
        name: method.name,
        index,
        value: method.outputs,
      });
    }
  }

  executeFunctions(e, contract) {
    let web3;
    if (this.props.web3 && this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
    } else {
      return;
    }

    const contractInstance = new web3.eth.Contract(
      JSON.parse(contract.jsonInterface),
      contract.address
    );
    // should i bag this and instead of push to array, redux it and set key to function name?
    // START
    const contractFunctions = [];
    const contractConstants = [];

    JSON.parse(contract.jsonInterface).map(func => {
      if (func.type == 'function') {
        func.constant
          ? contractConstants.push(func)
          : contractFunctions.push(func);
      }
    });

    // console.log("contractFunctions", contractFunctions)
    // console.log("contractConstants", contractConstants)

    this.updateContractWithMethods(
      contract,
      contractFunctions,
      contractConstants
    );

    // console.log("is it a deployed wallet contract?! ", contract.deployedWalletContract)

    // // TODO: conditional to update either observed contracts,
    // // selected wallet, or deployed wallet contracts
    // // right now is only updating observed contracts
    // this.props.addObservedContractFunctions({
    //   address: contract.address,
    //   value: contractFunctions,
    //   name: 'contractFunctions',
    // });
    // this.props.addObservedContractConstants({
    //   address: contract.address,
    //   value: contractConstants,
    //   name: 'contractConstants',
    // });
    // END
    contractConstants.map((method, index) => {
      const args = method.inputs.map(input => {
        input.typeShort = input.type.match(/[a-z]+/i)[0];
        input.value === undefined || input.value === null
          ? (input.value = '')
          : null;
        if (input.typeShort === 'bytes' && input.value === '') {
          input.value = '0x0000000000000000000000000000000000000000';
        } else if (input.value === '' && input.typeShort !== 'address') {
          input.value = '0x00';
        }
        return input.value;
      });

      console.log('method: ', method);
      console.log('args: ', ...args);
      console.log('name: ', method.name);

      // try {
      contractInstance.methods[method.name](...args).call(res => {
        console.log('RES', res);
        console.log('method.outputs', method.outputs);
        console.log(
          'contractInstance.methods[method.name]',
          contractInstance.methods[method.name]
        );
        method.outputs.map((output, i) => (method.outputs[i].value = res[i]));
      });
      // } catch (err) {
      //   console.warn('method: ', method);
      //   console.warn('args: ', ...args);
      //   console.warn('name: ', method.name);
      //   console.warn(err);
      // }

      this.updateContractWithMethodOutputs(contract, method, index);

      // this.props.updateInitialContractMethodOutputs({
      //   contractAddress: contract.address,
      //   name: method.name,
      //   index: index,
      //   value: method.outputs,
      // });
    });
  }

  /*
  Watches custom events

  @param {Object} contract the account object with .jsonInterface
  */
  watchContractEvents(e, contract) {
    let web3;
    if (this.props.web3 && this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
    } else {
      return;
    }

    const contractInstance = new web3.eth.Contract(
      JSON.parse(contract.jsonInterface),
      contract.address
    );

    // TODO indicate block range
    const subscription = contractInstance.events.allEvents({});

    contractInstance.getPastEvents('allEvents', (error, logs) => {
      if (!error && logs.length > 0) {
        logs.forEach(log => {
          web3.eth.getBlock(log.blockNumber, (err, res) => {
            // convert to milliseconds
            log.timestamp = new Date(res.timestamp * 1000);
            addPastContractLogs(log);
          });
        });
      } else {
        console.warn('error', error);
        // TODO: global notification
      }
    });

    subscription.on('data', log => {
      web3.eth.getBlock(log.blockNumber, (err, res) => {
        if (err) console.warn(err);
        if (res) {
          // convert to milliseconds
          log.timestamp = new Date(res.timestamp * 1000);
          updateContractLog(log);
        }
      });
    });
  }

  toggleContractInfo(e) {
    const { showContractFunctions } = this.state;
    this.setState({ showContractFunctions: !showContractFunctions });
  }

  redirectToOwnersSingleView(e) {
    console.log(e);
    // determine if address if for account or contract
    // gather info from wallet or contract redux state objects
    // aciont for updateSelectedContract or updateSelectedWallet
  }

  renderWalletDetails() {
    return (
      <React.Fragment>
        <div className="row clear wallet-info">
          <div className="col col-4 mobile-full">
            <h3>
              Daily limit
              <span style={{ fontWeight: 200 > 10.0 }}> ether</span>
            </h3>
            10.00 ether remaining today
          </div>
          <div className="col col-4 mobile-full">
            <h3>Required signatures</h3> 2
          </div>
          <div className="col col-4 mobile-full">
            <h3>Owners</h3>
          </div>
          security icons
        </div>
        <div className="account-info">
          <h3>Note</h3>
          <p>
            Most exchanges don&apos;t support receiving ether from a contract
            wallet yet. Be sure to move your balance to an account address
            first!
          </p>
        </div>
      </React.Fragment>
    );
  }

  renderSummary() {
    const {
      selectedContract: { contract },
    } = this.props;
    return (
      <div className="accounts-page-summary">
        <Identicon classes="dapp-identicon" title address={contract.address} />
        <header>
          <StatelessSummary contract={contract} />
          <span className="account-balance">
            {displayPriceFormatter(this.props, contract.balance)}
            {contract.balance}
          </span>
        </header>
        <table className="token-list dapp-zebra">
          <tbody />
        </table>
        {contract.deployedWalletContract ? this.renderWalletDetails() : null}
      </div>
    );
  }

  renderEvents() {
    const {
      selectedContract: { contract },
    } = this.props;
    const { logs } = contract;
    // const logs = contract.logs ? contract.logs : undefined;
    return (
      <React.Fragment>
        <h2>Latest events</h2>
        <br />
        <div>
          <label htmlFor="watch-events-checkbox">
            <input
              type="checkbox"
              id="watch-events-checkbox"
              className="toggle-watch-events"
              onClick={e => this.executeAndWatch(e, contract)}
            />
            Watch contract events
          </label>
        </div>
        <br />
        <input
          type="text"
          className="filter-transactions"
          placeholder="Filter events"
        />
        <br />
        {logs && logs.length ? <ContractEvents /> : null}
      </React.Fragment>
    );
  }

  renderAccountTransactions() {
    const {
      Transactions,
      selectedContract: {
        contract: { address },
      },
    } = this.props;
    const accountTxns = {};
    Object.keys(Transactions).forEach(hash => {
      if (
        Transactions[hash].from === address.toLowerCase() ||
        Transactions[hash].to === address.toLowerCase()
      ) {
        accountTxns[hash] = Transactions[hash];
      }
      return null;
    });
    return (
      <React.Fragment>
        {Object.keys(accountTxns).length &&
        accountTxns.constructor === Object ? (
          <LatestTransactions transactions={accountTxns} />
        ) : (
          <NoMatchingTransaction />
        )}
      </React.Fragment>
    );
  }

  renderSingleContract() {
    const {
      selectedContract: { contract },
    } = this.props;
    const contractFunctions = contract.contractFunctions
      ? contract.contractFunctions
      : undefined;
    const contractConstants = contract.contractConstants
      ? contract.contractConstants
      : undefined;

    return (
      <div className="dapp-container accounts-page">
        <StickyBar address={contract.address} />
        {this.renderSummary()}
        <ContractActionBar contract={contract} />
        {contractConstants &&
        contractFunctions &&
        (contractConstants.length || contractFunctions.length) ? (
          <ExecutableContract />
        ) : null}
        <div className="accounts-transactions">
          {this.renderEvents()}
          {this.renderAccountTransactions()}
        </div>
      </div>
    );
  }

  render() {
    const { selectedContract } = this.props;
    return selectedContract === undefined || selectedContract === '' ? (
      <NotFound />
    ) : (
      this.renderSingleContract()
    );
  }
}

SingleContractView.propTypes = {
  contract: PropTypes.object,
  selectedContract: PropTypes.shape({
    contract: PropTypes.object,
    currency: PropTypes.string,
    exchangeRates: PropTypes.object,
    addressType: PropTypes.string,
  }),
  Transactions: PropTypes.object,
};

const mapStateToProps = state => ({
  selectedContract: state.reducers.selectedContract,
  Transactions: state.reducers.Transactions,
  reducers: {
    currency: state.reducers.currency,
  },
  web3: state.web3,
});

export default connect(
  mapStateToProps,
  null
)(SingleContractView);
