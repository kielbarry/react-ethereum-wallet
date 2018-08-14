import React, { Component } from 'react';

class NoConnection extends Component {
  
  render() {

    var cn = require('classnames');
    var newStyles = cn({
      "dapp-modal-overlay": this.props.validStyles,
    });

    return (
      <div className={ newStyles }>
        <section className="dapp-modal-container" style={{ display: 'none' }}>
          <p>Unable to connect. Please start geth with the following options:
            <br />
            <br />
            <small>
              <code>geth --rpc --ws --wsorigins "{ window.location.origin }"</code>
              <br />
              <br />Optional add: 
              <code>--unlock &lt;yourAccount&gt;</code>
            </small>
          </p>
          <div className="dapp-modal-buttons" onClick={() => this.props.onClick()}>  
            <button className="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </div>
    );
  }
}

export default NoConnection;