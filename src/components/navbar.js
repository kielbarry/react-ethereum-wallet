import React, { Component } from 'react';
import '../stylesheets/navbar.css';
import { HeaderField, NetworkHeader, BalanceHeader } from './elements/navbarFields';
import { DefaultNavFields } from '../constants/FieldConstants.jsx';

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
            {DefaultNavFields.map(
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
