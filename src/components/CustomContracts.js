import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core/styles';
import ContractItem from './elements/ContractItem.js';
import { ContractSectionList } from './../constants/FieldConstants.js';
import * as Actions from './../actions/actions.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const ContractDescription = () => {
  let CC = ContractSectionList.CustomContracts;
  return (
    <React.Fragment>
      <h2>{CC.title}</h2>
      <p>{CC.contractDescription}</p>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

class CustomContracts extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (
      !isEqual(
        prevProps.reducers.ObservedContracts,
        this.props.reducers.ObservedContracts
      )
    ) {
      return true;
    }
    return false;
  }

  renderWatchContractButton() {
    let CC = ContractSectionList.CustomContracts;
    return (
      <React.Fragment>
        <button
          className={CC.buttonClass}
          onClick={() => this.props.displayModal('displayWatchContract')}
        >
          <div className="account-pattern">+</div>
          <h3>{CC.buttonDescription}</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  renderObservedContracts() {
    let obj = this.props.reducers;
    if (
      obj.ObservedContracts !== undefined &&
      Object.keys(obj.ObservedContracts).length !== 0
    ) {
      const contracts = this.props.reducers.ObservedContracts;
      console.log('RENDERING OBSERVED Contracts', contracts);
      return (
        <React.Fragment>
          <div className="wallet-box-list">
            {Object.keys(contracts).map(contract => (
              <ContractItem
                key={shortid.generate()}
                contract={contracts[contract]}
                addressType="ObservedContracts"
              />
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="contracts-view-custom-contracts">
        <ContractDescription />
        {this.renderObservedContracts()}
        {this.renderWatchContractButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'CustomContracts' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(CustomContracts);
