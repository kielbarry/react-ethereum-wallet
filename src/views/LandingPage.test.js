import React from 'react';
import renderer from 'react-test-renderer';
import Slide from '@material-ui/core/Slide';
import * as Constants from './LandingPageTestConstants';

describe('landing page links', () => {
  Object.keys(Constants.providerConstants).map(prov => {
    it('renders correctly`${prov}` link', () => {
      const tree = renderer
        .create(
          <li>
            <a
              href={Constants.providerConstants[prov].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {prov}
            </a>
          </li>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
