import React, { Component } from 'react';

export class ExecutableContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContractFunctions: false,
    };
  }

  toggleContractInfo(e) {
    this.setState({ showContractFunctions: !this.state.showContractFunctions });
  }

  render() {
    let show = this.state.showContractFunctions;
    let divStyle;
    show === undefined || show
      ? (divStyle = { display: 'block' })
      : (divStyle = { display: 'none' });
    return (
      <div className="execute-contract">
        <button
          className="toggle-visibility dapp-block-button dapp-small"
          onClick={e => this.toggleContractInfo(e)}
        >
          Hide contract info
        </button>
        <div className="dapp-clear-fix" />
        <div className="row clear" style={divStyle}>
          <ExecuteConstants />
          <ExecuteFunctions />
        </div>
      </div>
    );
  }
}

export default ExecutableContract;
