import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import '../stylesheets/navbar.css';

import Tooltip from '@material-ui/core/Tooltip';
import SettingsSharp from '@material-ui/icons/SettingsSharp';
import IconButton from '@material-ui/core/IconButton';

import NumberFormat from 'react-number-format';
import { displayPriceFormatter } from '../utils/utils';

import { NavFields } from '../constants/FieldConstants';
import SU from './elements/SelectableUnit';

const HeaderField = field => {
  return (
    <li className={field.liClass}>
      <Link to={field.href}>
        <i className={field.icon} />
        <span>{field.displayText}</span>
      </Link>
    </li>
  );
};

export class NavBar extends Component {
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
    if (typeof prevProps.reducers.blockHeader.number === undefined) return;
    if (
      prevProps.reducers.blockHeader.number !==
      this.props.reducers.blockHeader.number
    ) {
      clearInterval(this.interval);
      let time = 0;
      this.interval = setInterval(() => {
        time += 1;
        let text = 's since last block';
        if (time < 3600 > 59) {
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
    const scrollPosition = window.scrollY;
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

  redirectToSettings(e) {
    this.props.history.push('/');
  }

  renderBalanceHeader() {
    return (
      <li className="balance-nav-li wallet-balance">
        <h3>Balance</h3>
        <span className="account-balance">
          <NumberFormat
            value={displayPriceFormatter(
              this.props,
              this.props.reducers.totalBalance
            )}
            displayType="text"
            thousandSeparator
          />
          &nbsp;
          <span className="inline-form" name="unit">
            <button
              type="button"
              data-name="unit"
              data-value="ether"
              onClick={() => this.toggleSU()}
            >
              {this.props.reducers.currency}
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
      <React.Fragment>
        <li className="block-info dapp-flex-item">
          <Tooltip title="Change Network">
            <IconButton
              aria-label="Delete"
              onClick={e => this.redirectToSettings(e)}
            >
              <SettingsSharp />
            </IconButton>
          </Tooltip>
          <i className="icon-feed" />
          <span style={inlineStyle} className="hide-on-small">
            {this.props.reducers.peerCount}
            &nbsp; peers
          </span>
          &nbsp; &nbsp;| &nbsp; &nbsp;
          <i className="icon-layers" />
          <span>&nbsp; {this.props.reducers.blockHeader.number}</span>
          <i className="icon-clock" style={inlineStyle} />
          <span className="hide-on-small">&nbsp; {this.state.time}</span>
        </li>
      </React.Fragment>
    );
  }

  render() {
    const cn = require('classnames');
    const newStyles = cn({
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
            {this.renderNetworkHeader()}
            {this.renderHeaderField(NavFields.Contracts)}
            {this.renderBalanceHeader()}
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

export default connect(mapStateToProps)(withRouter(NavBar));
