import React from 'react';

export const AccountItem = ({ field }) => {
  
  const AccountURL= "TODO"

  return (
    <React.Fragment>
      <a className="wallet-box" href={ AccountURL }>
        <span className="dapp-identicon dapp-small"
        title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one"
        />
        <img className="identicon-pixel" src={ AccountURL } />

        <ul className="token-list">
                    
        </ul>
        <h3 className="not-ens-name">
          <i className="icon-key" title="Account"></i>
          Account 1
        </h3>

        <span className="account-balance">
        0.00
            <span>
                ether
            </span>
        </span>
        <span className="account-id">0x4decf83B51EC35775619F3aa446959eCB9236c62</span>
        </a>
    </React.Fragment>
  );
};

export default AccountItem;
