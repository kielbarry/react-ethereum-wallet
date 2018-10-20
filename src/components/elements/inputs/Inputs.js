import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/actions.js';
import * as Utils from '../../../utils/utils.js';
import * as Helpers from '../../../utils/helperFunctions.js';

export class Inputs extends Component {
  constructor(props) {
    super(props);
    this.updateFunctionInputValue = this.updateFunctionInputValue.bind(this);
  }

  updateFunctionInputValue(e) {
    console.log(e);
    console.log(e.target);
  }

  renderAddress() {
    console.log('here in renderAddress');
    return (
      <React.Fragment>
        <input onChange={e => this.updateFunctionInputValue(e)} />
      </React.Fragment>
    );
  }
  renderBool() {
    console.log('here in renderBool');
    return (
      <React.Fragment>
        <input
          type="checkbox"
          name="elements_input_bool"
          onChange={e => this.updateFunctionInputValue(e)}
        />
        <label>contract buttons</label>
      </React.Fragment>
    );
  }
  renderBytes() {
    console.log('here in renderBytes');
    return (
      <React.Fragment>
        <input
          type="text"
          pattern="^(0x)?[0-9a-fA-F]+$"
          placeholder="0x1234af..."
          name="elements_input_bytes"
          onChange={e => this.updateFunctionInputValue(e)}
        />
      </React.Fragment>
    );
  }
  renderInt() {
    console.log('here in renderInt');
    return (
      <React.Fragment>
        <input
          type="number"
          step="1"
          placeholder="-123"
          name="elements_input_int"
          onChange={e => this.updateFunctionInputValue(e)}
        />
      </React.Fragment>
    );
  }
  renderJson() {
    console.log('here in renderJson');
    return (
      <React.Fragment>
        <textarea
          name="elements_input_json"
          cols="20"
          rows="5"
          placeholder="['my text', 12345, '0x...']"
          onChange={e => this.updateFunctionInputValue(e)}
        >
          value
        </textarea>
      </React.Fragment>
    );
  }
  renderString() {
    console.log('here in renderString');
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="MyString"
          name="elements_input_string"
          onChange={e => this.updateFunctionInputValue(e)}
        />
      </React.Fragment>
    );
  }
  renderUint() {
    console.log('here in renderUint');
    return (
      <React.Fragment>
        <input
          type="number"
          step="1"
          min="0"
          placeholder="1234"
          name="elements_input_uint"
          onChange={e => this.updateFunctionInputValue(e)}
        />
      </React.Fragment>
    );
  }

  render() {
    // let type = this.props.input.type;
    let input = this.props.data;
    let type = this.props.data.type.match(/[a-z]+/i)[0];
    console.log(input);
    console.log(type);
    return (
      <React.Fragment>
        {type === 'address'
          ? this.renderAddress(input)
          : type === 'bool'
            ? this.renderBool(input)
            : type === 'bytes'
              ? this.renderBytes(input)
              : type === 'int'
                ? this.renderInt(input)
                : type === 'json'
                  ? this.renderJson(input)
                  : type === 'string'
                    ? this.renderString(input)
                    : type === 'uint'
                      ? this.renderUint(input)
                      : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(Inputs);
