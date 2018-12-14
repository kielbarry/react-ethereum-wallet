import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomContracts from '../components/CustomContracts.js';
import CustomTokens from '../components/CustomTokens.js';
import DeployToken from '../components/DeployToken.js';

const Title = () => {
  return (
    <h1>
      <strong>Contracts</strong>
    </h1>
  );
};

export class ContractsView extends Component {
  render() {
    return (
      <div className="dapp-container">
        <Title />
        <CustomContracts />
        <CustomTokens />
        {this.props.network !== 'mainnet' ? <DeployToken /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  network: state.network,
});

export default connect(
  mapStateToProps,
  null
)(ContractsView);
