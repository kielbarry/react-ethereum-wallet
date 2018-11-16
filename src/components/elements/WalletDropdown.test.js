import React from 'react';
import renderer from 'react-test-renderer';

import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SecurityIcon } from '../elements/SecurityIcon.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders wallet dropdown', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const config = {
    // component: 'ExecuteFunctions',
    selectClassName: '',
    selectName: 'dapp-select-account',
  };

  it('renders wallet addresses', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <select
            className={config.selectClassName}
            name={config.selectName}
            onChange={() => {}}
            value="0x0000000000000000000000000000000000000000"
          >
            <option
              key="1"
              value={'0x0000000000000000000000000000000000000000'}
            >
              '🔑 ' 0 &nbsp; - &nbsp; ETHER
            </option>
          </select>
          <StaticRouter context={{}}>
            <SecurityIcon
              type="address"
              classes="dapp-identicon dapp-small"
              hash="0x0000000000000000000000000000000000000000"
            />
          </StaticRouter>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders contract addresses', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <select
            className={config.selectClassName}
            name={config.selectName}
            onChange={() => {}}
            value="0x0000000000000000000000000000000000000000"
          >
            <option
              key="1"
              value={'0x0000000000000000000000000000000000000000'}
            >
              0 &nbsp; - &nbsp; ETHER
            </option>
          </select>
          <StaticRouter context={{}}>
            <SecurityIcon
              type="address"
              classes="dapp-identicon dapp-small"
              hash="0x0000000000000000000000000000000000000000"
            />
          </StaticRouter>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
