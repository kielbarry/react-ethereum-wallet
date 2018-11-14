import React from 'react';
import renderer from 'react-test-renderer';
import { ContractSectionList } from '../../constants/FieldConstants.js';

describe('title html', () => {
  it('renders title', () => {
    const tree = renderer
      .create(
        <h1>
          <strong>Contracts</strong>
        </h1>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('custom contracts html', () => {
  const CC = ContractSectionList.CustomContracts;

  it('renders contract description', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>{CC.title}</h2>
          <p>{CC.contractDescription}</p>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders watch contract button', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className={CC.buttonClass}
            onClick={() => this.props.displayModal('displayWatchContract')}
          >
            <div className="account-pattern">+</div>
            <h3>{CC.buttonDescription}</h3>
          </button>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders watch contract button', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className={CC.buttonClass}
            onClick={() => this.props.displayModal('displayWatchContract')}
          >
            <div className="account-pattern">+</div>
            <h3>{CC.buttonDescription}</h3>
          </button>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('custome tokens html', () => {
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

  it('renders add token button', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className={CT.buttonClass}
            onClick={() => this.props.displayModal('displayWatchToken')}
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

  it('renders add token button', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <button
            className={CT.buttonClass}
            onClick={() => this.props.displayModal('displayWatchToken')}
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

  it('renders autoscan', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          {this.props.reducers.network === 'main' ? (
            <button
              className="wallet-box create token-auto-scan"
              title="Automatically scan for balances of popular tokens on your accounts."
              onClick={e => this.autoScanTokens(e)}
            >
              <div className="account-pattern">
                <div className="icon icon-target" />
              </div>
              <h3>Auto-Scan</h3>
            </button>
          ) : null}
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
