import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  constructor(props){
    super(props)
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }


  handleOnKeyUp(e) {
    console.log(e)
    console.log("advfadsvf")
  }

  render() {
    // var cn = require('classnames');
    // var newClasses = cn({
    // });
    return (
      <div className="dapp-modal-overlay">
        <section className="dapp-modal-container modals-add-custom-contract">
          <h1>Watch contract</h1>

           <InputItem 
              key={`contract-field-100`} 
              field={listInputs[0]} 
              onKeyPress={ this.handleOnKeyUp }
              onClick={this.unitSelected}
              onKeyUp={ this.handleOnKeyUp }
              />
          {
            listInputs.map((field, i) => (

              <InputItem 
              key={`contract-field-${i}`} 
              field={field} 
              onKeyPress={ this.handleOnKeyUp }
              />
            ))
          }

          <div className="dapp-modal-buttons">
            <button className="cancel">Cancel</button>
            <button className="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(WatchItem);
