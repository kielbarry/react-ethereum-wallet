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
    return (
      <React.Fragment>
        <h4>
          tosentence name <em>- Address</em>
        </h4>
        <input onChange={e => this.updateFunctionInputValue(e)}>
          attributes
        </input>
      </React.Fragment>
    );
  }
  renderBool() {
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>-Boolean</em>
        </h4>
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
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>- Bytes</em>
        </h4>
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
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>- signed integeger</em>
        </h4>
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
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>- JSON</em>
        </h4>
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
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>- JSON</em>
        </h4>
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
    return (
      <React.Fragment>
        <h4>
          tosentence name
          <em>- unsigned integeger</em>
        </h4>
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
    let type = this.props.input.type;
    {
      /*}
      <React.Fragment>
        type === 'address'
          ? {this.renderAddress(input)}
          : type === 'bool'
              ?  {this.renderBool(input)}
              : type === 'bytes'
                ?  {this.renderBytes(input)}
                : type === 'int'
                   ? {this.renderInt(input)}
                   : type === 'json'
                      ?  {this.renderJson(input)}
                      : type === 'string'
                        ?  {this.renderString(input)}
                        : type === 'uint'
                          ? {this.renderUint(input)}
                          : null
      </React.Fragment>
    */
    }

    return (
      <React.Fragment>
        {this.renderAddress()}
        {this.renderBool()}
        {this.renderBytes()}
        {this.renderInt()}
        {this.renderJson()}
        {this.renderString()}
        {this.renderUint()}
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
