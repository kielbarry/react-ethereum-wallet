import React from 'react';
import renderer from 'react-test-renderer';
import NumberFormat from 'react-number-format';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders contract action bar', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders contract balance', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <NumberFormat
            className="account-balance"
            value={0}
            displayType="text"
            thousandSeparator
          />
          <span> 'ETHER' </span>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders progress', () => {
    const tree = renderer
      .create(
        <div className="dapp-progress">
          <div className="dapp-bar" style={{ width: `${50}%` }} />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders contract name', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <ul className="token-list" />
          <h3 className="not-ens-name">
            <i className="icon-eye" />
            &nbsp; Contract Name
          </h3>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders creating loader', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <span className="account-balance">
            Creating
            <span>...</span>
          </span>
          <span className="account-id creating" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
