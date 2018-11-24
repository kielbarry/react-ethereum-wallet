import React from 'react';

import CustomContracts from '../components/CustomContracts.js';
import CustomTokens from '../components/CustomTokens.js';

const Title = () => {
  return (
    <h1>
      <strong>Contracts</strong>
    </h1>
  );
};

const ContractsView = () => {
  return (
    <div className="dapp-container">
      <Title />
      <CustomContracts />
      <CustomTokens />
    </div>
  );
};

export default ContractsView;
