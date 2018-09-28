import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../../elements/InputItem.jsx';
import TestInputItem from '../../elements/TestInputItem.jsx';
import * as Actions from '../../../actions/actions.js';

const listInputs = [
  {
    title: 'Contract JSON Interface',
    divClass: 'dapp-json-interface-input',
    editor: 'textarea',
    type: 'text',
    name: 'jsonInterface',
    placeholder: '',
    className: 'jsonInterface',
    cols: '30',
    rows: '10',
  },
];

class JsonInterface extends Component {
  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-custom-contract">
          <h1>Watch contract</h1>

          {listInputs.map((field, i) => (
            <TestInputItem key={`contract-field-${i}`} field={field} />
          ))}
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(JsonInterface);
