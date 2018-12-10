import React, { Component } from 'react';
import { connect } from 'react-redux';

import clickOutside from 'react-click-outside';

import ContentEditable from 'react-contenteditable';
// utils and actions
import * as Utils from '../utils/utils.js';
import * as Actions from '../actions/actions.js';

export class EditableName extends Component {
  constructor(props) {
    super(props);

    // TODO: logic for contracts
    let wallet = this.props.reducers.selectedWallet;
    let walletName = wallet.name;

    this.state = {
      contentEditable: false,
      newName: '',
      html: `
            ${walletName ? walletName : 'Account ' + wallet.number} 
          `,
    };
    this.toggleEditability = this.toggleEditability.bind(this);
    this.contentEditable = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.state.contentEditable !== prevState.contentEditable) {
      return true;
    }
    return false;
  }

  handleChange = e => {
    let wallet = this.props.reducers.selectedWallet;
    this.setState({
      newName: e.target.value,
    });
    this.props.updateAddressName({
      name: e.target.value,
      address: wallet.address,
    });
  };

  handleClickOutside(e) {
    let id = e.target.getAttribute('id');
    e.target.getAttribute('id') !== 'editableName'
      ? this.setState({ contentEditable: false })
      : this.toggleEditability(e);
  }

  toggleEditability = e => {
    if (e.target.getAttribute('contenteditable') === 'false') {
      this.setState({
        contentEditable: true,
        newName: e.target.value,
      });
    }
  };

  render() {
    let type = this.props.addressType;
    let wallet =
      type === 'address'
        ? this.props.reducers.selectedWallet
        : this.props.reducers.selectedContract;
    return (
      <h1>
        <ContentEditable
          id="editableName"
          className="edit-name"
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.state.contentEditable}
          onChange={this.handleChange} // handle innerHTML change
          tagName="em" // Use a custom HTML tag (uses a div by default)
        />
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
