import React, { Component } from 'react';

import InputItem from '../../elements/InputItem.jsx';

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
  render() {
    return (
      <div className="dapp-modal-overlay">
        <section className="dapp-modal-container modals-add-custom-contract">
          <h1>Watch contract</h1>

          {listInputs.map((field, i) => (
            <InputItem key={`contract-field-${i}`} field={field} />
          ))}

          <div className="dapp-modal-buttons">
            <button className="cancel">Cancel</button>
            <button className="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </div>
    );
  }
}

export default WatchItem;
