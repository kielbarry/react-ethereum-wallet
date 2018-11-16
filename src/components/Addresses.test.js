import React from 'react';
import renderer from 'react-test-renderer';
import AccountItem from './elements/AccountItem.js';

describe('Addresses html', () => {
  it('renders account item', () => {
    const tree = renderer
      .create(
        <AccountItem
          key={'0x0000000000000000000000000000000000000000'}
          number={0}
          icon="icon-key"
          address={'0x0000000000000000000000000000000000000000'}
          wallet={{
            '0x0000000000000000000000000000000000000000': { balance: 0 },
          }}
          props={this.props}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
