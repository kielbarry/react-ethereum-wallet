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
    console.log('updateFunctionInputValue');
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    this.props.updateFunctionInput({
      name: e.target.getAttribute('name'),
      type: e.target.getAttribute('inputType'),
      index: e.target.getAttribute('index'),
      value: e.target.value,
    });
  }

  renderAddress(input) {
    return (
      <React.Fragment>
        <input
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          placeholder="0x123456..."
          className=" abi-input"
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }
  renderBool(input) {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
        <label>contract buttons</label>
      </React.Fragment>
    );
  }
  renderBytes(input) {
    return (
      <React.Fragment>
        <input
          type="text"
          pattern="^(0x)?[0-9a-fA-F]+$"
          placeholder="0x1234af..."
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }
  renderInt(input) {
    return (
      <React.Fragment>
        <input
          type="number"
          step="1"
          placeholder="-123"
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }
  renderJson(input) {
    return (
      <React.Fragment>
        <textarea
          name="elements_input_json"
          cols="20"
          rows="5"
          placeholder="['my text', 12345, '0x...']"
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        >
          value
        </textarea>
      </React.Fragment>
    );
  }
  renderString(input) {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="MyString"
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }
  renderUint(input) {
    return (
      <React.Fragment>
        <input
          type="number"
          step="1"
          min="0"
          placeholder="1234"
          onChange={e => this.updateFunctionInputValue(e)}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }

  render() {
    let input = {
      ...this.props.data,
      index: this.props.index,
    };
    let type = this.props.data.type.match(/[a-z]+/i)[0];
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
