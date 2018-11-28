import React, { Component } from 'react';
import { connect } from 'react-redux';
// utils and actions
import * as Utils from '../utils/utils.js';
import * as Actions from '../actions/actions.js';

// NO MOAR MULTISIG

//TODO: notify me on event checkbox? then toast?

// put in support for 721 ?
// maybe have user input search for the contract by name ?
// maybe have them define what kind of erc standard with input ?

// markdown with

export class EditableName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentEditable: false,
    };
  }

  toggleEditability = e => {
    console.log(e);
    console.log('prev state', this.state.contentEditable);
    this.setState({ contentEditable: !this.state.contentEditable });
  };

  render() {
    console.log('in editable name', this.props);
    let type = this.props.addressType;
    let wallet =
      type === 'address'
        ? this.props.reducers.selectedWallet
        : this.props.reducers.selectedContract;
    return (
      <h1>
        {wallet !== undefined && wallet !== '' ? (
          <em
            className="edit-name"
            contentEditable={this.state.contentEditable}
            onClick={e => this.toggleEditability(e)}
          >
            {wallet.name ? wallet.name : 'Account' + wallet.number}
          </em>
        ) : (
          'Unnamed'
        )}
        <i className="edit-icon icon-pencil" />
      </h1>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(EditableName);
