import React from 'react';
import renderer from 'react-test-renderer';
import { ContractSectionList } from '../constants/FieldConstants';
import { TokenBox } from './elements/TokenBox';

describe('custom contracts html', () => {
  const CT = ContractSectionList.CustomTokens;
  it('renders token description', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>{CT.title}</h2>
          <p>{CT.contractDescription}</p>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders token box', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button className="wallet-box-list">
            <TokenBox
              key="0x0000000000000000000000000000000000000000"
              token={{
                address: '0x0000000000000000000000000000000000000000',
                name: 'fakeToken',
                symbol: 'fakeSymbol',
                division: '18',
              }}
            />
          </button>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders token box', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className={CT.buttonClass}
            onClick={{ modals: { displayWatchToken: true } }}
            style={{ float: 'left' }}
          >
            <div className="account-pattern">+</div>
            <h3>{CT.buttonDescription}</h3>
          </button>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders auto scan', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className="wallet-box create token-auto-scan"
            title="Automatically scan for balances of popular tokens on your accounts."
            // onClick={e => this.autoScanTokens(e)}
          >
            <div className="account-pattern">
              <div className="icon icon-target" />
            </div>
            <h3>Auto-Scan</h3>
          </button>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: combine snapshots to snapshot test full component
  // it('renders auto scan', () => {
  //   const tree = renderer
  //     .create(
  //     	<React.Fragment>
  //        <button
  //            className="wallet-box create token-auto-scan"
  //            title="Automatically scan for balances of popular tokens on your accounts."
  //            // onClick={e => this.autoScanTokens(e)}
  //          >
  //           <div className="account-pattern">
  //             <div className="icon icon-target" />
  //           </div>
  //           <h3>Auto-Scan</h3>
  //         </button>
  // 			<div className="dapp-clear-fix" />
  // 		</React.Fragment>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
