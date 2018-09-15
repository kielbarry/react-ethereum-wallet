import React, { Component } from 'react';

class MistAlertBubble extends Component {
  constructor(props) {
    super(props);
    this.state = { displayAlertMessage: false };
  }

  toggleAlertMessage(e) {
    this.state.displayAlertMessage
      ? this.setState({ displayAlertMessage: false })
      : this.setState({ displayAlertMessage: true });
  }

  renderMistAlertBubble() {
    var cn = require('classnames');
    var newStyles = cn({
      'show-alert': true,
      'alert-bubble': true,
      'is-hidden': this.state.displayAlertMessage,
    });

    return (
      <div className={newStyles}>
        <button onClick={() => this.toggleAlertMessage()}>
          <span className="icon-bell" />
        </button>
      </div>
    );
  }

  renderMistAlert() {
    var cn = require('classnames');
    var newStyles = cn({
      'alert-banner': true,
      'is-hidden': !this.state.displayAlertMessage,
    });

    return (
      <div className={newStyles}>
        <section>
          <h1> ⚠︎ Warning</h1>
          <button
            type="button"
            className="hide-alert close-button"
            onClick={() => this.toggleAlertMessage()}
          >
            &times;
          </button>
          <p>
            Due to a vulnerability affecting all released versions of the Mist
            beta browser, we urge you for the time being, not to browse
            untrusted websites with Mist. Users of "Ethereum Wallet" desktop app
            are not affected.
          </p>
          <p>
            <a
              className="hide-alert button"
              onClick={() => this.toggleAlertMessage()}
            >
              Close this message
            </a>
            <a
              className="hide-alert button download-button"
              href="https://github.com/ethereum/mist/releases"
            >
              Download Ethereum Wallet
            </a>
          </p>
        </section>
      </div>
    );
  }

  render() {
    return !this.state.displayAlertMessage
      ? this.renderMistAlertBubble()
      : this.renderMistAlert();
  }
}

export default MistAlertBubble;
