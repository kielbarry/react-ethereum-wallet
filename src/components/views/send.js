import React, { Component } from 'react';

import Slider from '../elements/Slider.jsx';
import TotalGas from '../elements/TotalGas.jsx';

//exp
import FormInput from '../elements/FormInput.jsx';
import LatestTransactions from '../elements/LatestTransactions.jsx';
// import ShowMoreOptions from '../elements/ShowMoreOptions.jsx';

// import PageHeader from '../elements/PageHeaders.jsx';
// import { SendPageHeader } from '../../constants/FieldConstants.jsx';

class SendContractForm extends Component {
  render() {
    return (
      <form
        className="account-send-form"
        action="about:blank"
        target="dapp-form-helper-iframe"
        autoComplete="on"
      >
        <h1>
          <strong>Send</strong> Funds
        </h1>

        <FormInput />
        <LatestTransactions />
        {/*
        <ShowMoreOptions />
        */}
        <Slider />
        <TotalGas />

        <button type="submit" className="dapp-block-button">
          Send
        </button>
      </form>
    );
  }
}

export default SendContractForm;
