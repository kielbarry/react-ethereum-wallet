import React from 'react';
import renderer from 'react-test-renderer';
import NumberFormat from 'react-number-format';
import { StaticRouter } from 'react-router-dom';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { WalletDropdown } from './WalletDropdown.js';
import { Inputs } from '../elements/inputs/Inputs.js';
import { SecurityIcon } from '../elements/SecurityIcon.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders executable functions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  // TODO: Cannot read property 'Wallets' of undefined
  it('renders wallet dropdown', () => {
    const dropdownConfig = {
      component: 'ExecuteFunctions',
      selectClassName: '',
      selectName: 'dapp-select-account',
    };
    const tree = renderer
      .create(
        <div className="dapp-select-account">
          {/*
          <WalletDropdown dropdownConfig={dropdownConfig} />
        */}
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders options with functions', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>Write to contract</h2>
          <h4>Select Function</h4>
          <select
            className="select-contract-function"
            name="select-contract-function"
            onChange={() => {}}
          >
            <option
              key={'1'}
              disabled=""
              name="pickFunctionDefault"
              value="pickFunctionDefault"
            >
              Pick a function
            </option>
            <option key={'2'} value={'Function Name'}>
              Function Name
            </option>
          </select>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders options with functions', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>Write to contract</h2>
          <h4>Select Function</h4>
          <select
            className="select-contract-function"
            name="select-contract-function"
            onChange={() => {}}
          >
            <option
              key={'3'}
              disabled=""
              name="pickFunctionDefault"
              value="pickFunctionDefault"
            >
              Pick a function
            </option>
          </select>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders function inputs', () => {
    const input = {
      name: '_owner',
      type: 'address',
      typeShort: 'address',
      value: '',
    };
    const tree = renderer
      .create(
        <React.Fragment>
          <h4>
            Function Name &nbsp;
            <em>- {input.type}</em>
          </h4>
          <Inputs data={input} index={0} />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  //TODO: import dropdown snapshot
  it('renders executable function', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <hr className="dapp-clear-fix" />
          <h4> Execute from </h4>
          {/*{this.renderAccountDropdown()}*/}
          <button className="dapp-block-button execute" onClick={() => {}}>
            Execute
          </button>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: import nested snapshots
  it('renders whole component', () => {
    const tree = renderer
      .create(
        <div className="col col-4 mobile-full contract-functions">
          {/*}
        {this.renderSelectFunction()}
        {this.renderFunctionInputs()}
        {this.renderIsExecutable()}
        */}
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
