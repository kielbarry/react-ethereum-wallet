import React, { Component } from 'react';

class NoConnection extends Component {
  constructor(props) {
    super(props);
    this.state = { noConnection: this.props.connection === null };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connection === null && this.props.connection !== null) {
      this.setState({ noConnection: false });
      document.body.classList.remove('disable-scroll', 'blur', 'app-blur');
    } else if (
      prevProps.connection !== null &&
      this.props.connection === null
    ) {
      this.setState({ noConnection: true });
      document.body.classList.add('disable-scroll', 'blur', 'app-blur');
    }
  }

  toggleNoConnection(e) {
    this.state.noConnection
      ? this.setState({ noConnection: false })
      : this.setState({ noConnection: true });
  }

  render() {
    var cn = require('classnames');
    var newClasses = cn({
      'dapp-modal-overlay': this.state.noConnection,
    });
    let newStyle = {
      display: !this.state.noConnection ? 'none' : 'block',
    };
    return (
      <div className={newClasses} style={newStyle}>
        <section className="dapp-modal-container">
          <p>
            Unable to connect. Please start geth with the following options:
            <br />
            <br />
            <small>
              <code>
                geth --rpc --ws --wsorigins "{window.location.origin}" --light
              </code>
              <br />
              <br />
              Optional add:
              <code>--unlock &lt;yourAccount&gt;</code>
            </small>
          </p>
          <div
            className="dapp-modal-buttons"
            onClick={() => this.toggleNoConnection()}
          >
            <button className="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </div>
    );
  }
}

export default NoConnection;
