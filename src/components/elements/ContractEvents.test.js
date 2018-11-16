import React from 'react';
import renderer from 'react-test-renderer';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contract events', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders date td', () => {
    const tree = renderer
      .create(
        <td
          className="time simptip-position-right simptip-movable"
          data-tooltip="//TODO: get timestamp"
        >
          <h2>Nov</h2>
          <p>16</p>
        </td>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO:
  // it('renders log event', () => {
  //   const tree = renderer
  //     .create(
  //       <td className="account-name">
  //         <h2>{props.log.event}</h2>
  //         <p
  //           key="1"
  //           style={{ wordBreak: 'break-word' }}
  //         >
  //           {props.val} : &nbsp; <strong> {props.log.returnValues[props.val]}</strong>
  //           <br />
  //         </p>
  //       </td>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // TODO
  // it('renders emptylog event', () => {
  //   const tree = renderer
  //     .create(
  //       <td className="account-name">
  //         <h2>{props.log.event}</h2>
  //       </td>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // TODO
  // it('renders whole component', () => {
  //   const tree = renderer
  //     .create(
  //       <table className="dapp-zebra transactions">
  //       <tbody>
  //         {logs.map(log => (
  //           <tr
  //             key="1"
  //             onClick={{modals: {displayEventModal: true}}}
  //             data-transaction-hash="0x0000000000000000000000000000000000000000"
  //             data-block-hash="0x0000000000000000000000000000000000000000"
  //           >
  //             <DateFormat log={log} />
  //             <Event log={log} />
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
