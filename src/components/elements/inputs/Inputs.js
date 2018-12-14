import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/actions';

export class Inputs extends Component {
  renderAddress(input) {
    return (
      <React.Fragment>
        <input
          onChange={this.props.onChange}
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
          onChange={this.props.onChange}
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
          onChange={this.props.onChange}
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
          onChange={this.props.onChange}
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
          cols="20"
          rows="5"
          placeholder="['my text', 12345, '0x...']"
          onChange={this.props.onChange}
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
          onChange={this.props.onChange}
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
          onChange={this.props.onChange}
          index={input.index}
          name={input.name}
          inputType={input.type}
        />
      </React.Fragment>
    );
  }

  render() {
    const input = {
      ...this.props.data,
      index: this.props.index,
    };
    const type = this.props.data.type.match(/[a-z]+/i)[0];
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
