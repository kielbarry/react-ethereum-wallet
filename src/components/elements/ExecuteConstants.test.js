import React from 'react';
import renderer from 'react-test-renderer';
import NumberFormat from 'react-number-format';
import { StaticRouter } from 'react-router-dom';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Inputs } from '../elements/inputs/Inputs.js';
import { SecurityIcon } from '../elements/SecurityIcon.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('renders executable constants', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders functions with inputs', () => {
    const input = {
      name: '_owner',
      type: 'address',
      typeShort: 'address',
      value: '',
    };
    const tree = renderer
      .create(
        <tr key={'1'}>
          <td>
            <h3> Function Name</h3>
            <React.Fragment>
              <h4>
                <span className="dapp-punctuation">_</span>
                {input.name}
                &nbsp;
                <em>-&nbsp; {input.type}</em>
              </h4>
              <Inputs data={input} index={0} onChange={() => {}} />
            </React.Fragment>
          </td>
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders functions without inputs', () => {
    const tree = renderer
      .create(
        <tr key={'2'}>
          <td>
            <h3> Function Name</h3>
          </td>
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders security icon with href', () => {
    const tree = renderer
      .create(
        <span className="address dapp-shorten-text not-ens-name">
          <StaticRouter context={{}}>
            <SecurityIcon
              type="transactionHref"
              classes={'dapp-identicon dapp-tiny'}
              hash={'0x0000000000000000000000000000000000000000'}
            />
          </StaticRouter>
        </span>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders bool true', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          YES
          <em>
            <span className={'icon icon-check'} />
          </em>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders bool false', () => {
    const tree = renderer
      .create(
        <React.Fragment>
          NO
          <em>
            <span className={'icon icon-ban'} />
          </em>
        </React.Fragment>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders functions with ouputs', () => {
    const output = {
      name: '',
      type: 'string',
      value: '0x0000000000000000000000000000000000000000',
    };

    const tree = renderer
      .create(
        <tr key={'1'}>
          <td>
            <dl className={'constant-testFunc dapp-zebra'}>
              <React.Fragment>
                <dt>Func Name</dt>
                <dd className="output">output.value</dd>
              </React.Fragment>
            </dl>
          </td>
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders functions without outputs', () => {
    const tree = renderer
      .create(
        <tr key={'2'}>
          <td>
            <dl className={'constant-testFunc dapp-zebra'} />
          </td>
        </tr>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: import nested snapshots
  it('renders whole component', () => {
    const tree = renderer
      .create(
        <div className="col col-8 mobile-full contract-info">
          <h2>Read from contract</h2>
          <table className="contract-constants dapp-zebra">
            <tbody>
              {/*
              {constants
                ? constants.map(func => (
                    <React.Fragment>
                      {this.renderFunctionInputs(func)}
                      {this.renderFunctionOutputs(func)}
                    </React.Fragment>
                  ))
                : ''}
              }
            */}
            </tbody>
          </table>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
