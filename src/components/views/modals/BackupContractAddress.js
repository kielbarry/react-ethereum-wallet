import React, { Component } from 'react';
import { connect } from 'react-redux';

class BackupContractAddress extends Component {
  constructor(props) {
    super(props);
    this.cancelFunction = this.cancelFunction.bind(this);
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div
        className={this.props.display}
        style={divStyle}
        name="views_modals_backupContractAddress"
      >
        <h1>title</h1>
        <p>description</p>
        <pre style={{ fontSize: '0.75em' }}>checksum address</pre>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(BackupContractAddress);
