import React from 'react';
import renderer from 'react-test-renderer';

describe('title html', () => {
  it('renders title', () => {
    const tree = renderer
      .create(
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
