import React from 'react';
import renderer from 'react-test-renderer';
import { AccountItem } from './elements/AccountItem.js';

import { StaticRouter } from 'react-router';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import Web3 from 'web3';

describe('Addresses html', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders account item', () => {
    const props = {
      currency: 'ETHER',
      web3: {
        web3Instance: new Web3(),
      },
    };
    const store = mockStore(props);
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <AccountItem
            key={'0x0000000000000000000000000000000000000000'}
            number={0}
            icon="icon-key"
            address={'0x0000000000000000000000000000000000000000'}
            wallet={{
              '0x0000000000000000000000000000000000000000': { balance: 0 },
            }}
            store={store}
            reducers={{ currency: 'ETHER' }}
            props={props}
          />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
