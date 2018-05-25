import React, { Component } from 'react'


import '../stylesheets/mergedstyles.css'

class MistAlert extends Component {
  render() {
    return (
      <div className="alert-banner hidden:{{alertViewState}}">
        <section>
          <h1> ⚠︎ Warning</h1>
          <button type="button" className="hide-alert close-button">&times;</button>
          <p>
            Due to a vulnerability affecting all released versions of the Mist beta browser, we urge you for the time being, not to browse untrusted websites with Mist. Users of "Ethereum Wallet" desktop app are not affected.
          </p>
          <p>
            <a className="hide-alert button" href="javascript:void(0)">Close this message</a>
            <a className="hide-alert button download-button" href="https://github.com/ethereum/mist/releases">Download Ethereum Wallet</a>
          </p>
        </section>
      </div>
    )
  }
}

export default MistAlert