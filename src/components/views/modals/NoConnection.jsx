import React, { Component } from 'react';

class NoConnection extends Component {

  constructor(props) {
    super(props)
    console.log("here in NoConnection", this.props)
    this.state = { 'noConnection': true }
  }

  toggleNoConnection(e) {
    this.state.noConnection
      ? this.setState({ noConnection: false })
      : this.setState({ noConnection: true });
  }
  
  render() {

    var cn = require('classnames');
    var newStyles = cn({
      "dapp-modal-overlay": this.state.noConnection,
    });

    return (
      <div className={ newStyles }>
        <section className="dapp-modal-container">
          <p>Unable to connect. Please start geth with the following options:
            <br />
            <br />
            <small>
              <code>geth --rpc --ws --wsorigins "{ window.location.origin }" --light</code>
              <br />
              <br />Optional add: 
              <code>--unlock &lt;yourAccount&gt;</code>
            </small>
          </p>
          <div className="dapp-modal-buttons" onClick={( ) => this.toggleNoConnection() }>  
            <button className="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </div>
    );
  }
}

export default NoConnection;