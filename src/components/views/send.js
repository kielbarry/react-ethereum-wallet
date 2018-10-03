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
        <div className="row clear from-to">
          <div className="col col-6 mobile-full from">
            <h3>From</h3>
            <div className="dapp-select-account send-from">
              <select name="dapp-select-account" className="send-from">
                <option value="0x6a6964034c192ccaa8594a179db7a98ad581e4f2">
                  <span role="img" aria-label="key">
                    🔑
                  </span>
                  "Main account (Etherbase) - 0.21 USD (0.00 ETHER)""
                </option>
              </select>
              <span
                className="dapp-identicon dapp-small"
                title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one"
              >
                <img src="" className="identicon-pixel" alt="" />
              </span>
            </div>
          </div>
          <div className="col col-6 mobile-full">
            <h3>To</h3>
            <div className="dapp-address-input">
              <input
                type="text"
                name="to"
                placeholder="0x000000.."
                className="to"
                autoFocus={true}
              />
            </div>
          </div>
          <div className="dapp-clear-fix" />
        </div>
        <div className="row clear">
          <div className="col col-6 mobile-full amount">
            <h3>Amount</h3>
            <input
              type="text"
              min="0"
              step="any"
              name="amount"
              placeholder="0.0"
              className="dapp-large"
              pattern="[0-9\.,]*"
            />
            <br />
            <label>
              <input type="checkbox" className="send-all" />
              Send everything
            </label>
            <p className="send-info">
              You want to send <strong>0 USD</strong> in Ether, using exchange
              rates from
              <a
                href="https://www.cryptocompare.com/coins/eth/overview/BTC"
                target="noopener noreferrer _blank"
              >
                {' '}
                cryptocompare.com
              </a>
              .<br />
              Which is currently an equivalent of <strong>0 ETHER</strong>.
            </p>
          </div>
          <div className="col col-6 mobile-full">
            <br />
            <br />
            <div className="token-ether">
              <span className="ether-symbol">Ξ</span>
              <span className="token-name">ETHER</span>
              <span className="balance">
                5,538.38 USD (26.41223000001 ETHER)
              </span>
            </div>
          </div>
          <div className="dapp-clear-fix" />
        </div>

        <FormInput />
        <LatestTransactions />
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
