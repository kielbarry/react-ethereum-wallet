import React, { Component } from 'react';
import { connect } from 'react-redux';
// import cn from 'classnames';

import '../stylesheets/navbar.css';
import { HeaderField, NetworkHeader, BalanceHeader } from './elements/navbarFields';
import { DefaultNavFields } from '../constants/FieldConstants.jsx';

const SwitchHeader = ({ field, i, properties }) => {
  if (field.type === 'peerInfo') {
    return <NetworkHeader properties={properties} field={field} key={`navfield-${i}`} />;
  } else {
    return <BalanceHeader properties={properties} field={field} key={`navfield-${i}`}/>;
  }
};



class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {small: false, sticky: false}
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let scrollPosition = window.scrollY
    if (scrollPosition > 150) {
      this.setState({small: true, sticky: true})
    } else if (scrollPosition > 48) {
      this.setState({small: true, sticky: false})
    } else {
      this.setState({small: false, sticky: false})
    }
  };

  render() {
    var cn = require('classnames');
    var newStyles = cn({
      'dapp-header': true,
      'dapp-full-header': true,
      'dapp-sticky-bar': true,
      'dapp-small': this.state.small,
      'sticky': this.state.sticky
    });

    return (
      <header className={newStyles}>
        <nav>
          <ul>
            {DefaultNavFields.map(
              (f, i) =>
                f.type === 'link' ? (
                  <HeaderField field={f} key={`navfield-${i}`} />
                ) : (
                  <SwitchHeader properties={this.props} field={f} i={i} key={`navfield-${i}`} />
                )
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  timeSinceLastBlock: state.reducers.timeSinceLastBlock,
  peerCount: state.reducers.peerCount,
  peerCountIntervalId: state.reducers.peerCountIntervalId,
  totalBalance: state.reducers.totalBalance,
  blockHeader: state.reducers.blockHeader,
  // ...state,
  currency: state.reducers.currency,
});

export default connect(mapStateToProps)(NavBar);
