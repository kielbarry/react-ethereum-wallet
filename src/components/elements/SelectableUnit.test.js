import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders selectable unit', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders dropdown', () => {
    const cn = require('classnames');
    const newClasses = cn({
      'simple-modal': true,
      animate: false,
    });
    const tree = renderer
      .create(
        <div id="selectableUnitDrawer" className={newClasses} ref={() => {}}>
          <ul>
            <li key="1">
              <button data-value="ETHER" onClick={() => {}}>
                ETHER
              </button>
            </li>
          </ul>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
