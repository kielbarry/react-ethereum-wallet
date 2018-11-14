import React, { Component } from 'react';

import CustomContracts from '../CustomContracts.js';
import CustomTokens from '../CustomTokens.js';

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
