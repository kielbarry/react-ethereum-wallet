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
  const etherScanAddress = 'https://etherscan.io/address/' + address;
  const transferEtherAddress = '/send/' + address;
  const changellyAddress =
    'https://changelly.com/widget/v1?auth=email&amp;from=USD&amp;to=ETH&amp;merchant_id=47f87f7cddda&amp;address=' +
    address +
    '&amp;amount=1&amp;ref_id=e25c5a2e8719&amp;color=02a8f3';

  it('renders account action bar', () => {
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
                <a href={changellyAddress} target="noopener noreferrer _blank">
                  <i className="icon-ethereum" />
                  Buy ether
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
            </ul>
          </nav>
        </aside>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
