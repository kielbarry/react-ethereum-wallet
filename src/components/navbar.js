import React, { Component } from 'react';
import { connect } from 'react-redux';
import SU from './elements/SelectableUnit.js';
import { Link } from 'react-router-dom';
import '../stylesheets/navbar.css';
import { NavFields } from '../constants/FieldConstants.js';
import * as Utils from '../utils/utils.js';

import NumberFormat from 'react-number-format';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.setState({
      small: false,
      sticky: false,
      time: 'Waiting for blocks...',
    });
    this.setState({ displaySU: false });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (typeof prevProps.blockHeader.number === undefined) return;
    if (prevProps.blockHeader.number !== this.props.blockHeader.number) {
      clearInterval(this.interval);
      let time = 0;
      this.interval = setInterval(() => {
        time += 1;
        let text = 's since last block';
        if (3600 > time > 59) {
          time = Math.floor(time / 60);
          text = ' minutes since last block';
        }
        if (time > 3599) {
          time = Math.floor(time / 3600);
          text = ' hours since last block';
        }
        this.setState({ time: time + text });
      }, 1000);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.interval);
  }

  handleScroll() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 150) {
      this.setState({ small: true, sticky: true });
    } else if (scrollPosition > 48) {
      this.setState({ small: true, sticky: false });
    } else {
      this.setState({ small: false, sticky: false });
    }
  }

  renderHeaderField(field) {
    return (
      <li className={field.liClass}>
        <Link to={field.href}>
          <i className={field.icon} />
          <span>{field.displayText}</span>
        </Link>
      </li>
    );
  }

  toggleSU() {
    this.state.displaySU
      ? this.setState({ displaySU: false })
      : this.setState({ displaySU: true });
  }

  renderBalanceHeader(field) {
    return (
      <li className={field.liClass}>
        <h3>{field.firstText}</h3>
        <span className={field.firstClass}>
          {this.props.web3 && this.props.web3.web3Instance ? (
            <NumberFormat
              value={Utils.displayPriceFormatter(
                this.props,
                this.props.totalBalance
              )}
              displayType={'text'}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={this.props.totalBalance}
              displayType={'text'}
              thousandSeparator={true}
            />
          )}
          <span className="inline-form" name="unit">
            <button
              type="button"
              data-name="unit"
              data-value="ether"
              onClick={() => this.toggleSU()}
            >
              {this.props.currency}
            </button>
            <SU displaySU={this.state.displaySU} />
          </span>
        </span>
      </li>
    );
  }

  renderNetworkHeader(field) {
    const inlineStyle = { marginLeft: '10px' };
    return (
      <li className={field.liClass}>
        <i className={field.firstIcon} />
        <span style={inlineStyle} className={field.secondClass}>
          {this.props.peerCount}
          &nbsp;
          {field.firstText}
        </span>
        &nbsp; &nbsp;| &nbsp; &nbsp;
        <i className={field.secondIcon} />
        <span>&nbsp; {this.props.blockHeader.number}</span>
        <i className={field.thirdIcon} style={inlineStyle} />
        <span className={field.secondClass}>&nbsp; {this.state.time}</span>
      </li>
    );
  }

  render() {
    var cn = require('classnames');
    var newStyles = cn({
      'dapp-header': true,
      'dapp-sticky-bar': true,
      'dapp-small': this.state.small,
      sticky: this.state.sticky,
    });

    return (
      <header className={newStyles}>
        <nav>
          <ul>
            {this.renderHeaderField(NavFields.Wallet)}
            {this.renderHeaderField(NavFields.Send)}
            {this.renderNetworkHeader(NavFields.PeerInfo)}
            {this.renderHeaderField(NavFields.Contracts)}
            {this.renderBalanceHeader(NavFields.BalanceInfo)}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  ...state,

  timeSinceLastBlock: state.reducers.timeSinceLastBlock,
  peerCount: state.reducers.peerCount,
  peerCountIntervalId: state.reducers.peerCountIntervalId,
  totalBalance: state.reducers.totalBalance,
  blockHeader: state.reducers.blockHeader,
  currency: state.reducers.currency,
});

export default connect(mapStateToProps)(NavBar);
