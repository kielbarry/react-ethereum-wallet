import React, { Component } from 'react';
import '../stylesheets/navbar.css';
import { HeaderField, NetworkHeader, BalanceHeader } from './elements/navbarFields';

const navFields = [
  {
    type: 'link',
    href: '/',
    liClass: 'wallet-nav-li',
    icon: 'icon-wallet',
    displayText: 'Wallets'
  },
  {
    type: 'link',
    href: '/send-from',
    liClass: 'send-nav-li',
    icon: 'icon-arrow-up',
    displayText: 'Send'
  },
  {
    type: 'peerInfo',
    liClass: 'block-info dapp-flex-item',
    firstIcon: 'icon-feed',
    firstText: 'peers',
    firstClass: '',
    secondIcon: 'icon-layers',
    secondText: 'since last block',
    secondClass: 'hide-on-small'
  },
  {
    type: 'link',
    href: '/contracts',
    liClass: 'contracts-nav-li',
    icon: 'icon-docs',
    displayText: 'Contracts'
  },
  {
    type: 'balanceInfo',
    liClass: 'balance-nav-li wallet-balance',
    firstText: 'Balance',
    firstClass: 'account-balance',
    secondText: 'ETHER'
  }
];

const SwitchHeader = ({ field, i }) => {
  if (field.type === 'peerInfo') {
    return <NetworkHeader field={field} key={`navfield-${i}`} />;
  } else {
    return <BalanceHeader field={field} key={`navfield-${i}`} />;
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    // var cn = require('classnames');
    this.state = {
      totalBalance: 0.0
    };
  }

  render() {
    return (
      <header className="dapp-header dapp-full-header">
        <nav>
          <ul>
            {navFields.map(
              (f, i) =>
                f.type === 'link' ? (
                  <HeaderField field={f} key={`navfield-${i}`} />
                ) : (
                  <SwitchHeader field={f} i={i} key={`navfield-${i}`} />
                )
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
