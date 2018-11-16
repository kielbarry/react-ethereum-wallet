import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import SecurityIcon from '../components/elements/SecurityIcon.js';

describe('title html', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders title', () => {
    const tree = renderer
      .create(
        <div className="dapp-sticky-bar dapp-container">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={'0x0000000000000000000000000000000000000000'}
          />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('account information', () => {
  it('renders title', () => {
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
            <span>{'0x0000000000000000000000000000000000000000'}</span>
          </h2>
          <div className="clear" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('renders sticky container', () => {
  it('renders title', () => {
    const tree = renderer
      .create(
        <div className="dapp-sticky-bar dapp-container">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={'0x0000000000000000000000000000000000000000'}
          />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
