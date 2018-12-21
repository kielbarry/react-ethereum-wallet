import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Identicon } from 'ethereum-react-components';
import WalletDropdown from './elements/WalletDropdown';
import { updateTransactionToSend } from '../actions/actions';
import { combineWallets, sortByBalance } from '../utils/helperFunctions';
import ValidAddressDisplay from './elements/ValidAddressDisplay';

export class Send extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { Wallets, WalletContracts } = this.props;
    const combinedWallets = combineWallets(Wallets, WalletContracts);
    this.props.updateTransactionToSend({
      name: 'from',
      value: combinedWallets[0].address,
    });
  }

  handleInputChange(e) {
    const target = e.target.getAttribute('name');
    let targetValue = e.target.value;
    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
    });
  }

  renderFrom() {
    const dropdownConfig = {
      component: 'Send',
      selectClassName: 'send-from',
      selectName: 'from',
    };
    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <WalletDropdown dropdownConfig={dropdownConfig} />
        </div>
      </div>
    );
  }

  renderTo() {
    return (
      <div className="col col-6 mobile-full">
        <h3>To</h3>
        <ValidAddressDisplay
          name="to"
          classes="dapp-address-input"
          autoComplete={'true'}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="row clear from-to">
        {this.renderFrom()}
        {this.renderTo()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  TransactionToSend: state.reducers.TransactionToSend,
  Wallets: state.reducers.Wallets,
  WalletContracts: state.reducers.WalletContracts,
});

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(Send);
