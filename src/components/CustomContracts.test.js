import React from 'react';
import renderer from 'react-test-renderer';
import { ContractSectionList } from '../../constants/FieldConstants.js';

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
