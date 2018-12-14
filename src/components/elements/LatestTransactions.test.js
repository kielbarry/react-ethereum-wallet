import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { StaticRouter } from 'react-router';

import { SecurityIcon } from './SecurityIcon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders latest transactions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders date', () => {
    const tree = renderer
      .create(
        <td
          className="time simptip-position-right simptip-movable"
          data-tool-tip="Fri Nov 16 2018 12:57:18 GMT+0100 (Central European Standard Time)"
        >
          <h2>Nov</h2>
          <p>16</p>
        </td>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders transaction types', () => {
    const tree = renderer
      .create(
        <td className="account-name">
          <h2>Transaction Type</h2>
          <p>
            <span className="address dapp-shorten-text not-ens-name">
              <StaticRouter context={{}}>
                <SecurityIcon
                  type="transactionHref"
                  classes="dapp-identicon dapp-tiny"
                  hash="0x0000000000000000000000000000000000000000"
                />
              </StaticRouter>
            </span>
            <span className="arrow">→</span>
            <span className="address dapp-shorten-text not-ens-name">
              <StaticRouter context={{}}>
                <SecurityIcon
                  type="transactionHref"
                  classes="dapp-identicon dapp-tiny"
                  hash="0x0000000000000000000000000000000000000000"
                />
              </StaticRouter>
            </span>
          </p>
        </td>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders pending tx', () => {
    const tree = renderer.create(<td className="info">Pending...</td>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tx with confirmations', () => {
    const tree = renderer
      .create(<td className="info">0 of 12 Confirmations</td>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders balance', () => {
    const tree = renderer
      .create(<td className="transaction-amount minus">- 0 ETHER</td>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders minus icon', () => {
    const tree = renderer
      .create(
        <td>
          <i className="icon-arrow-right minus" />
        </td>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: import nested snapshots
  it('renders pending table row', () => {
    const tree = renderer
      .create(
        <tr
          className="unconfirmed"
          key="0x0000000000000000000000000000000000000000"
          data-transaction-hash="0x0000000000000000000000000000000000000000"
          data-block-hash="0x0000000000000000000000000000000000000000"
          onClick={() => {}}
        >
          {/*
		        {this.renderDateInfo(tx)}
		        {this.renderTransactionType(tx)}
		        {this.renderTransactionInfo(tx)}
		        {this.renderTransactionAmount(tx)}
		        {this.renderIcon()}
		      */}
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: import nested snapshots
  it('renders table row', () => {
    const tree = renderer
      .create(
        <tr
          className=""
          key="0x0000000000000000000000000000000000000000"
          data-transaction-hash="0x0000000000000000000000000000000000000000"
          data-block-hash="0x0000000000000000000000000000000000000000"
          onClick={() => {}}
        >
          {/*
		        {this.renderDateInfo(tx)}
		        {this.renderTransactionType(tx)}
		        {this.renderTransactionInfo(tx)}
		        {this.renderTransactionAmount(tx)}
		        {this.renderIcon()}
		      */}
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: import nested snapshots
  it('renders whole component', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>Latest transactions</h2>
          <br />
          <input
            type="text"
            className="filter-transactions"
            placeholder="Filter transactions"
          />
          <table className="dapp-zebra transactions">
            <tbody>
              {/*
	            {Object.keys(transactions).map(txHash => (
	              <React.Fragment>
	                {this.renderTableRow(transactions[txHash])}
	                {this.renderProgressBar(transactions[txHash])}
	              </React.Fragment>
	            ))}
	          */}
            </tbody>
          </table>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
