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
  render() {
    return (
      {
        w === undefined || w === '' 
        ?
          (<h1>
            <span>Account {sw.number}</span>
            <em className="edit-name">Account {sw.number}</em>
            <i className="edit-icon icon-pencil" />
          </h1>)
        : null
      }
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
