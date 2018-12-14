import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SecurityIcon } from '../components/elements/SecurityIcon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('title html', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders sticky header', () => {
    const tree = renderer
      .create(
        <div className="dapp-sticky-bar dapp-container">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash="0x0000000000000000000000000000000000000000"
          />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('account information', () => {
  it('renders account card', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h1>
            <span>Account</span>
            <em className="edit-name">Account</em>
            <i className="edit-icon icon-pencil" />
          </h1>
          <h2 className="copyable-address">
            <i className="icon-key" title="Account" />
            <span>0x0000000000000000000000000000000000000000</span>
          </h2>
          <div className="clear" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('renders sticky container', () => {
  it('renders account description', () => {
    const tree = renderer
      .create(
        <div className="account-info">
          <h3>NOTE </h3>
          <p>
            Accounts can't display incoming transactions, but can receive, hold
            and send Ether. To see incoming transactions create a wallet
            contract to store ether.
          </p>
          <p>
            If your balance doesn't seem updated, make sure that you are in sync
            with the network.
          </p>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
