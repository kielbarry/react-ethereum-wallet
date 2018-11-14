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

  // it('renders wallet link', () => {
  //   const tree = renderer
  //     .create(
  //       <StaticRouter location="someLocation">
  //         <Link
  //           to={{ pathname: '/wallet/new' }}
  //           className="wallet-box create add-contract"
  //         >
  //           <div className="account-pattern">+</div>
  //           <h3>ADD WALLET CONTRACT</h3>
  //         </Link>
  //         <div className="dapp-clear-fix" />
  //       </StaticRouter>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
