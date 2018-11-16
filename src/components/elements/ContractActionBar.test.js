import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account information', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const address = '0x0000000000000000000000000000000000000000';
  const transferEtherAddress = '/send/' + address;
  const etherScanAddress = 'https://etherscan.io/address/' + address;

  it('renders contract action bar', () => {
    const tree = renderer
      .create(
        <aside className="dapp-actionbar">
          <nav>
            <ul>
              <li>
                <a href={transferEtherAddress} title={address}>
                  <i className="icon-arrow-down" />
                  Transfer Ether &amp; Tokens
                </a>
              </li>
              <li>
                <a href={etherScanAddress} target="noopener noreferrer _blank">
                  <i className="icon-info" />
                  View on Etherscan
                </a>
              </li>
              <CopyToClipboard text={address}>
                <li>
                  <button
                    className="copy-to-clipboard-button"
                    onClick={() => {}}
                  >
                    <i className="icon-docs" />
                    Copy address
                  </button>
                </li>
              </CopyToClipboard>
              <li>
                <button
                  className="qrcode-button"
                  onClick={{ modals: { displayQRCode: true } }}
                >
                  <i className="icon-camera" />
                  Show QR-Code
                </button>
              </li>
              <li>
                <button
                  className="interface-button"
                  onClick={{ modals: { displayJSONInterface: true } }}
                >
                  <i className="icon-settings" />
                  Show Interface
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
