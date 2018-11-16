import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import makeBlockie from 'ethereum-blockies-base64';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account information', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const hash = '0x0000000000000000000000000000000000000000';
  const icon = makeBlockie(hash);
  let divStyle = {
    backgroundImage: 'url(' + icon + ')',
  };

  it('renders security icon without link', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <span
            className="dapp-identicon dapp-small"
            title="This is a security icon.  If there were any change to the address, 
            the resulting icon would be a completely different one"
            src={icon}
            style={divStyle}
          >
            <img
              src={icon}
              style={divStyle}
              className="identicon-pixel"
              alt=""
            />
          </span>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders security icon with link', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <span
            className="dapp-identicon dapp-small"
            title="This is a security icon.  If there were any change to the address, 
            the resulting icon would be a completely different one"
            src={icon}
            style={divStyle}
          >
            <img
              src={icon}
              style={divStyle}
              className="identicon-pixel"
              alt=""
            />
          </span>
          <StaticRouter context={{}}>
            <Link
              to={{ pathname: '/send-from/' + hash }}
              title={hash}
              onClick={() => {
                return {
                  name: 'to',
                  value: hash,
                };
              }}
            >
              {hash}
            </Link>
          </StaticRouter>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
