import React from 'react';
import renderer from 'react-test-renderer';

describe('wallet html', () => {
  it('renders wallet description', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          <h2>Wallet Contracts</h2>
          <p>
            These contracts are stored on the blockchain and can hold and secure
            Ether. They can have multiple accounts as owners and keep a full log
            of all transactions.
          </p>
          <div className="dapp-clear-fix" />
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
