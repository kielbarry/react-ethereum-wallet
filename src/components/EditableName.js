import React, { Component } from 'react';
import { connect } from 'react-redux';

import clickOutside from 'react-click-outside';

import ContentEditable from 'react-contenteditable';
// utils and actions
import * as Utils from '../utils/utils.js';
// import * as Actions from '../actions/actions.js';
import {
  updateContractName,
  updateWalletContractName,
  updateAddressName,
} from '../actions/actions.js';
export class EditableName extends Component {
  constructor(props) {
    super(props);

    // TODO: logic for contracts
    let wallet = this.props.reducers.selectedWallet;
    let walletName = wallet.wallet.name;
    console.log(walletName);
    this.state = {
      //<<<<<<< Updated upstream
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
    {
      /*}
=======
      // contentEditable: false,
      contentEditable: true,
    };
    this.toggleEditability = this.toggleEditability.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  toggleEditability(e){
    console.log(e);
    console.log('prev state', this.state.contentEditable);
    this.setState({ contentEditable: !this.state.contentEditable });
>>>>>>> Stashed changes
*/
    }
  };

  // updateContractName
  // updateWalletContractName

  updateName(e, wallet) {
    this.setState({ name: e.target.value });
    this.props.updateAddressName({
      address: wallet.address,
      name: e.target.value,
    });
  }

  render() {
    let type = this.props.addressType;
    let wallet =
      type === 'address'
        ? this.props.reducers.selectedWallet
        : this.props.reducers.selectedContract;
    return (
      <h1>
        {/*<<<<<<< Updated upstream*/}
        <ContentEditable
          id="editableName"
          className="edit-name"
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.state.contentEditable}
          onChange={this.handleChange} // handle innerHTML change
          tagName="em" // Use a custom HTML tag (uses a div by default)
        />
        {/*}
=======
        {wallet !== undefined && wallet !== '' ? (
          <input className="edit-name" onChange={e => this.updateName(e, wallet)} />
          // <div onChange={e => this.updateName(e, wallet)}>
          //   <em
          //     className="edit-name"
          //     contentEditable={this.state.contentEditable}
          //     // contentEditable
          //     // onFocus={e => this.toggleEditability(e)}
          //     // onClick={e => this.toggleEditability(e)}
          //     // onChange={e => this.updateName(e, wallet)}
          //   >
          //     {wallet.name ? wallet.name : 'Account' + wallet.number}
          //   </em>
          // </div>
        ) : (
          'Unnamed'
        )}
>>>>>>> Stashed changes
*/}
        <i className="edit-icon icon-pencil" />
      </h1>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

// const mapStateToProps = state => ({
//   Wallets: state.reducers.Wallets,
//   selectedWallet: state.reducers.selectedWallet,
//   selectedContract: state.reducers.selectedContract,
// });

export default connect(
  mapStateToProps,
  { updateContractName, updateWalletContractName, updateAddressName }
)(EditableName);
